import { z } from 'zod';

import type { ActionRegistry } from 'src/contracts/action';

const recordId = z.uuid();

// Starter registry for the commercial cycle. Parameters and evidence are a first draft from the
// brief (§10, §12); refine them with the business process before implementing each tool.
export const ACTION_REGISTRY: ActionRegistry = {
  'crm.prospect.upsert': {
    id: 'crm.prospect.upsert',
    schemaVersion: '0.1.0',
    category: 'bounded-change',
    description: 'Créer ou rapprocher une entreprise prospect, avec sa provenance et sa date.',
    params: z.object({
      companyName: z.string().min(1),
      domain: z.string().min(1).optional(),
      source: z.object({ reference: z.string().min(1), retrievedAt: z.iso.datetime() }),
    }),
    requiredEvidence: ['source'],
    // Creates or matches a record; deduplication rules (S2) decide which.
    mutatesExistingRecord: false,
    requiresApproval: false,
  },
  'crm.prospect.update-qualification': {
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
    mutatesExistingRecord: true,
    requiresApproval: false,
  },
  'engagement.message.draft': {
    id: 'engagement.message.draft',
    schemaVersion: '0.1.0',
    category: 'bounded-change',
    description: "Enregistrer un brouillon de message sur le dossier, sans l'envoyer.",
    params: z.object({ recordId, channel: z.literal('test'), body: z.string().min(1) }),
    requiredEvidence: [],
    mutatesExistingRecord: true,
    requiresApproval: false,
  },
  'engagement.message.send-test': {
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
    mutatesExistingRecord: true,
    requiresApproval: true,
  },
  'crm.task.create': {
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
    mutatesExistingRecord: true,
    requiresApproval: false,
  },
  'deals.proposal.prepare': {
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
    mutatesExistingRecord: true,
    requiresApproval: true,
  },
  'crm.opportunity.update-stage': {
    id: 'crm.opportunity.update-stage',
    schemaVersion: '0.1.0',
    category: 'bounded-change',
    description: "Faire avancer l'opportunité ; une issue gagnée ou perdue exige la pièce prévue.",
    params: z.object({
      opportunityId: recordId,
      stage: z.enum(['MEETING', 'PROPOSAL', 'WON', 'LOST', 'DEFERRED']),
    }),
    requiredEvidence: ['stageProof'],
    mutatesExistingRecord: true,
    requiresApproval: false,
  },
  // Kept in the registry so a recommendation to run it is refused explicitly (brief §13).
  'crm.record.destroy': {
    id: 'crm.record.destroy',
    schemaVersion: '0.1.0',
    category: 'forbidden',
    description: 'Suppression définitive : interdite aux agents.',
    params: z.object({ recordId }),
    requiredEvidence: [],
    mutatesExistingRecord: true,
    requiresApproval: true,
  },
};
