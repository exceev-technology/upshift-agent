import { z } from 'zod';

import { defineAction, type ActionRegistry } from 'src/contracts/action';

const recordId = z.uuid();

// Dossier state recorded when a prospect refuses contact: every follow-up stops (brief §13).
export const CONTACT_REFUSED = 'CONTACT_REFUSED';

const OPPORTUNITY_STAGES = ['MEETING', 'PROPOSAL', 'WON', 'LOST', 'DEFERRED'] as const;

// The stages each stage may be reached from: a first draft, to align with the workspace pipeline.
// Won and lost are final, and no stage can be skipped.
export const STAGE_TRANSITIONS: Record<(typeof OPPORTUNITY_STAGES)[number], readonly string[]> = {
  MEETING: ['NEW', 'DEFERRED'],
  PROPOSAL: ['MEETING', 'DEFERRED'],
  WON: ['PROPOSAL'],
  LOST: ['NEW', 'MEETING', 'PROPOSAL', 'DEFERRED'],
  DEFERRED: ['NEW', 'MEETING', 'PROPOSAL'],
};

// Starter registry for the commercial cycle. Parameters and evidence are a first draft from the
// brief (§10, §12); refine them with the business process before implementing each tool.
export const ACTION_REGISTRY: ActionRegistry = {
  'crm.prospect.upsert': defineAction({
    id: 'crm.prospect.upsert',
    schemaVersion: '0.1.0',
    category: 'bounded-change',
    description: 'Créer ou rapprocher une entreprise prospect, avec sa provenance et sa date.',
    // The source is the verified `source` evidence and is not repeated here, so the recorded provenance
    // can only be the one the server resolved.
    params: z.object({
      companyName: z.string().min(1),
      domain: z.string().min(1).optional(),
      retrievedAt: z.iso.datetime(),
      // Set when deduplication (S2) matched an existing company: the update then targets it.
      matchedRecordId: recordId.optional(),
    }),
    requiredEvidence: ['source'],
    targetRecordId: (params) => params.matchedRecordId,
    // The match must equal the server's deduplication result, so a known company is never created twice.
    deduplicated: true,
    matchedRecordId: (params) => params.matchedRecordId,
    requiresApproval: false,
  }),
  'crm.prospect.update-qualification': defineAction({
    id: 'crm.prospect.update-qualification',
    schemaVersion: '0.1.0',
    category: 'bounded-change',
    description: 'Enregistrer le score de priorité, la version de la grille, les réserves et les manques.',
    params: z.object({
      recordId,
      priorityScore: z.number().min(0).max(100).nullable(),
      gridVersion: z.string().min(1),
      reservations: z.array(z.string()),
      missingInformation: z.array(z.string()),
    }),
    requiredEvidence: ['scoring'],
    // The recorded score is the one the verified scoring artifact holds, never a model-supplied value.
    evidenceClaims: (params) => ({
      scoring: { recordId: params.recordId, priorityScore: params.priorityScore, gridVersion: params.gridVersion },
    }),
    targetRecordId: (params) => params.recordId,
    requiresApproval: false,
  }),
  'engagement.message.draft': defineAction({
    id: 'engagement.message.draft',
    schemaVersion: '0.1.0',
    category: 'bounded-change',
    description: "Enregistrer un brouillon de message sur le dossier, sans l'envoyer.",
    params: z.object({ recordId, channel: z.literal('test'), body: z.string().min(1) }),
    requiredEvidence: [],
    blockedStates: [CONTACT_REFUSED],
    targetRecordId: (params) => params.recordId,
    requiresApproval: false,
  }),
  'engagement.message.send-test': defineAction({
    id: 'engagement.message.send-test',
    schemaVersion: '0.1.0',
    category: 'external-contact',
    description: "Envoyer un message approuvé à un destinataire de test, sur le canal d'essai.",
    params: z.object({
      recordId,
      channel: z.literal('test'),
      recipient: z.email(),
      body: z.string().min(1),
    }),
    requiredEvidence: ['draft'],
    // The text sent is exactly the text of the verified draft of this dossier.
    evidenceClaims: (params) => ({ draft: { recordId: params.recordId, body: params.body } }),
    blockedStates: [CONTACT_REFUSED],
    targetRecordId: (params) => params.recordId,
    recipient: (params) => params.recipient,
    requiresApproval: true,
  }),
  'crm.task.create': defineAction({
    id: 'crm.task.create',
    schemaVersion: '0.1.0',
    category: 'bounded-change',
    description: 'Créer la prochaine tâche du dossier, avec un responsable et une échéance.',
    params: z.object({
      recordId,
      title: z.string().min(1),
      dueAt: z.iso.datetime(),
      assigneeId: recordId.optional(),
    }),
    requiredEvidence: [],
    blockedStates: [CONTACT_REFUSED],
    targetRecordId: (params) => params.recordId,
    // An equivalent open task found by the server is reused, never created again (S7).
    deduplicated: true,
    assignee: (params) => params.assigneeId,
    requiresApproval: false,
  }),
  'deals.proposal.prepare': defineAction({
    id: 'deals.proposal.prepare',
    schemaVersion: '0.1.0',
    category: 'commercial-commitment',
    description: 'Préparer une proposition à partir du catalogue et des conditions validés.',
    params: z.object({
      opportunityId: recordId,
      items: z
        .array(
          z.object({
            label: z.string().min(1),
            quantity: z.number().positive(),
            unitPrice: z.number().nonnegative(),
          }),
        )
        .min(1),
      discountPercent: z.number().min(0).max(100),
    }),
    requiredEvidence: ['qualifiedNeed'],
    blockedStates: [CONTACT_REFUSED],
    targetRecordId: (params) => params.opportunityId,
    requiresApproval: true,
  }),
  'crm.opportunity.update-stage': defineAction({
    id: 'crm.opportunity.update-stage',
    schemaVersion: '0.1.0',
    category: 'bounded-change',
    description: "Faire avancer l'opportunité ; une issue gagnée ou perdue exige la pièce prévue.",
    params: z.object({
      opportunityId: recordId,
      stage: z.enum(OPPORTUNITY_STAGES),
    }),
    // Only a terminal outcome needs its proof, and the proof must record that outcome for this opportunity.
    requiredEvidence: (params) => (params.stage === 'WON' || params.stage === 'LOST' ? ['stageProof'] : []),
    evidenceClaims: (params) =>
      params.stage === 'WON' || params.stage === 'LOST'
        ? { stageProof: { opportunityId: params.opportunityId, outcome: params.stage } }
        : {},
    allowedFromStates: (params) => STAGE_TRANSITIONS[params.stage],
    targetRecordId: (params) => params.opportunityId,
    requiresApproval: false,
  }),
  // Kept in the registry so a recommendation to run it is refused explicitly (brief §13).
  'crm.record.destroy': defineAction({
    id: 'crm.record.destroy',
    schemaVersion: '0.1.0',
    category: 'forbidden',
    description: 'Suppression définitive : interdite aux agents.',
    params: z.object({ recordId }),
    requiredEvidence: [],
    targetRecordId: (params) => params.recordId,
    requiresApproval: true,
  }),
};
