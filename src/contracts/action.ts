import { createHash } from 'node:crypto';
import { z } from 'zod';

// Typed action contract (brief §12). A model output is only a proposal: the server checks it
// against the registry, the agent's delegation, the evidence and the dossier state before any write.

// Action policy categories (brief §13). The category decides what may run autonomously.
export type ActionCategory =
  | 'consultation'
  | 'bounded-change'
  | 'external-contact'
  | 'commercial-commitment'
  | 'forbidden';

export type ActionDefinition = {
  id: string;
  schemaVersion: string;
  category: ActionCategory;
  description: string;
  params: z.ZodType;
  // Evidence keys the proposal must carry for these (validated) parameters.
  requiredEvidence: (params: unknown) => string[];
  // What each evidence key must attest for these parameters, e.g. the outcome a stage proof records.
  evidenceClaims: (params: unknown) => Record<string, unknown>;
  // Dossier states in which the action must not run, e.g. after a contact refusal.
  blockedStates: readonly string[];
  // The existing record these parameters change, if any. It must belong to the checked dossier, and the
  // proposal must then name the dossier state it expects.
  targetRecordId: (params: unknown) => string | undefined;
  // The target must then equal the match found by the server's deduplication (none for a creation).
  deduplicated: boolean;
  // External recipient, which must be one of the trusted test recipients.
  recipient: (params: unknown) => string | undefined;
  // Workspace member the action assigns work to, which must be an authorised assignee.
  assignee: (params: unknown) => string | undefined;
  requiresApproval: boolean;
};

export type ActionRegistry = Record<string, ActionDefinition>;

type Requirement<TParams, TValue> = TValue | ((params: TParams) => TValue);

// Declares an action whose requirements may depend on its parameters, typed from its schema.
export const defineAction = <TSchema extends z.ZodType>(definition: {
  id: string;
  schemaVersion: string;
  category: ActionCategory;
  description: string;
  params: TSchema;
  requiredEvidence: Requirement<z.infer<TSchema>, string[]>;
  evidenceClaims?: (params: z.infer<TSchema>) => Record<string, unknown>;
  blockedStates?: readonly string[];
  // Omit for an action that only creates records.
  targetRecordId?: (params: z.infer<TSchema>) => string | undefined;
  deduplicated?: boolean;
  recipient?: (params: z.infer<TSchema>) => string | undefined;
  assignee?: (params: z.infer<TSchema>) => string | undefined;
  requiresApproval: boolean;
}): ActionDefinition => {
  const { requiredEvidence, evidenceClaims, targetRecordId, recipient, assignee } = definition;

  // Only called with parameters already validated by `params`.
  return {
    ...definition,
    requiredEvidence: (params) =>
      typeof requiredEvidence === 'function' ? requiredEvidence(params as z.infer<TSchema>) : requiredEvidence,
    evidenceClaims: (params) => evidenceClaims?.(params as z.infer<TSchema>) ?? {},
    blockedStates: definition.blockedStates ?? [],
    targetRecordId: (params) => targetRecordId?.(params as z.infer<TSchema>),
    deduplicated: definition.deduplicated ?? false,
    recipient: (params) => recipient?.(params as z.infer<TSchema>),
    assignee: (params) => assignee?.(params as z.infer<TSchema>),
  };
};

// Supplied by the server in the check context, never by the proposal or the model.
export type ActionIdentity = {
  workspaceId: string;
  delegatorId: string;
  agent: { name: string; version: string };
  skill: { name: string; version: string };
  model: string;
};

export type ActionProposal = {
  actionId: string;
  schemaVersion: string;
  params: unknown;
  preconditions: {
    expectedState?: string;
    // Evidence key → reference, e.g. a record id. The server resolves every reference before the check.
    evidence: Record<string, string>;
  };
  // Same intent, same effect: a replayed event must not create a second record, task or message.
  intentId: string;
};

// The proposal may come from model output: its shape is validated before anything reads it.
const proposalEnvelopeSchema = z.object({
  actionId: z.string().min(1),
  schemaVersion: z.string().min(1),
  params: z.unknown(),
  preconditions: z.object({
    expectedState: z.string().min(1).optional(),
    evidence: z.record(z.string(), z.string().min(1)),
  }),
  intentId: z.string().min(1),
});

export type ActionApproval = { approvedBy: string; approvedAt: string };

export type ActionRefusalReason =
  | 'invalid-proposal'
  | 'unknown-action'
  | 'forbidden-action'
  | 'not-delegated'
  | 'schema-version-mismatch'
  | 'invalid-params'
  | 'intent-conflict'
  | 'duplicate-mismatch'
  | 'target-mismatch'
  | 'recipient-not-allowed'
  | 'assignee-not-allowed'
  | 'evidence-mismatch'
  | 'state-not-allowed'
  | 'missing-evidence'
  | 'unverified-evidence'
  | 'missing-precondition'
  | 'stale-state';

export type ActionVerdict =
  | {
      status: 'ready';
      action: ActionDefinition;
      params: unknown;
      // The trusted identity, recorded in the journal with the action.
      identity: ActionIdentity;
      approval?: ActionApproval;
    }
  | { status: 'already-done'; intentId: string }
  | { status: 'awaiting-approval'; contentHash: string }
  | { status: 'refused'; reason: ActionRefusalReason; detail: string };

// What the journal records once an action ran (or did not).
export type ActionResult = {
  intentId: string;
  status: 'succeeded' | 'refused' | 'waiting' | 'failed';
  affectedRecordIds: string[];
  detail?: string;
};

// Everything here comes from trusted server state, never from the proposal or the model.
export type ActionCheckContext = {
  // Organisation, delegator, agent, skill and model of the run, with their versions.
  identity: ActionIdentity;
  registry: ActionRegistry;
  // The agent's delegation: action identifiers it may propose.
  allowedActions: readonly string[];
  // Records of the dossier whose state and evidence were loaded (company, people, opportunity…).
  dossierRecordIds: ReadonlySet<string>;
  currentState?: string;
  // Intents already executed, with the content hash each one ran with.
  executedIntents: ReadonlyMap<string, string>;
  // The existing record the server's deduplication matched for this proposal, if any.
  deduplicationMatch?: string;
  // Test recipients allowed on the test channel, lower-cased.
  allowedRecipients: ReadonlySet<string>;
  // Workspace members work may be assigned to, e.g. the dossier owner.
  allowedAssigneeIds: ReadonlySet<string>;
  // References the server resolved in the CRM, per evidence key, with the value each one attests (the
  // outcome of a stage proof, the text of a draft…). A reference verified for one key never counts for another.
  verifiedEvidence: ReadonlyMap<string, ReadonlyMap<string, unknown>>;
  // Approvals recorded by authorised members, keyed by the content hash they approved.
  approvals: ReadonlyMap<string, ActionApproval>;
};

const stableStringify = (value: unknown): string => {
  if (Array.isArray(value)) {
    return `[${value.map(stableStringify).join(',')}]`;
  }
  if (value !== null && typeof value === 'object') {
    const entries = Object.entries(value as Record<string, unknown>)
      .filter(([, entry]) => entry !== undefined)
      .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));

    return `{${entries.map(([key, entry]) => `${JSON.stringify(key)}:${stableStringify(entry)}`).join(',')}}`;
  }

  return JSON.stringify(value);
};

// Binds approvals and replays to the exact content and intent: any change needs a new approval.
export const hashActionContent = (
  proposal: Pick<ActionProposal, 'actionId' | 'schemaVersion' | 'params' | 'intentId'>,
) =>
  createHash('sha256')
    .update(
      stableStringify([proposal.actionId, proposal.schemaVersion, proposal.params, proposal.intentId]),
    )
    .digest('hex');

const refuse = (reason: ActionRefusalReason, detail: string): ActionVerdict => ({
  status: 'refused',
  reason,
  detail,
});

const describeIssues = (error: z.ZodError) =>
  error.issues.map((issue) => `${issue.path.join('.') || '(racine)'} : ${issue.message}`).join(' ; ');

export const checkActionProposal = (
  candidate: unknown,
  context: ActionCheckContext,
): ActionVerdict => {
  const envelope = proposalEnvelopeSchema.safeParse(candidate);

  if (!envelope.success) {
    return refuse('invalid-proposal', describeIssues(envelope.error));
  }

  const proposal = envelope.data;
  const action = context.registry[proposal.actionId];

  if (action === undefined) {
    return refuse('unknown-action', `Action inconnue : ${proposal.actionId}`);
  }
  if (action.category === 'forbidden') {
    return refuse('forbidden-action', `Action interdite : ${action.id}`);
  }
  if (!context.allowedActions.includes(action.id)) {
    return refuse('not-delegated', `${action.id} ne fait pas partie de la délégation de l'agent`);
  }
  if (proposal.schemaVersion !== action.schemaVersion) {
    return refuse(
      'schema-version-mismatch',
      `Schéma ${proposal.schemaVersion} reçu, ${action.schemaVersion} attendu`,
    );
  }

  const parsed = action.params.safeParse(proposal.params);

  if (!parsed.success) {
    return refuse('invalid-params', describeIssues(parsed.error));
  }

  // A replay runs nothing twice, and an intent never covers a different action.
  const contentHash = hashActionContent({ ...proposal, params: parsed.data });
  const executedHash = context.executedIntents.get(proposal.intentId);

  if (executedHash !== undefined) {
    return executedHash === contentHash
      ? { status: 'already-done', intentId: proposal.intentId }
      : refuse('intent-conflict', `L'intention ${proposal.intentId} a déjà servi à une autre action`);
  }

  const target = action.targetRecordId(parsed.data);

  if (action.deduplicated && target !== context.deduplicationMatch) {
    return refuse(
      'duplicate-mismatch',
      `Le serveur a rapproché ${context.deduplicationMatch ?? 'aucune fiche'}, la proposition ${target ?? 'aucune fiche'}`,
    );
  }
  // State and evidence were checked for one dossier: the action may only change a record of that dossier.
  if (target !== undefined && !context.dossierRecordIds.has(target)) {
    return refuse('target-mismatch', `${target} n'appartient pas au dossier contrôlé`);
  }

  const recipient = action.recipient(parsed.data);

  if (recipient !== undefined && !context.allowedRecipients.has(recipient.toLowerCase())) {
    return refuse('recipient-not-allowed', `${recipient} n'est pas un destinataire de test autorisé`);
  }

  const assignee = action.assignee(parsed.data);

  if (assignee !== undefined && !context.allowedAssigneeIds.has(assignee)) {
    return refuse('assignee-not-allowed', `${assignee} ne peut pas recevoir de tâche sur ce dossier`);
  }

  const { evidence, expectedState } = proposal.preconditions;
  const missingEvidence = action.requiredEvidence(parsed.data).filter((key) => !evidence[key]);

  if (missingEvidence.length > 0) {
    return refuse('missing-evidence', `Preuves manquantes : ${missingEvidence.join(', ')}`);
  }

  const unverifiedEvidence = Object.entries(evidence).filter(
    ([key, reference]) => !context.verifiedEvidence.get(key)?.has(reference),
  );

  if (unverifiedEvidence.length > 0) {
    return refuse(
      'unverified-evidence',
      `Preuves introuvables dans le dossier : ${unverifiedEvidence.map(([key]) => key).join(', ')}`,
    );
  }

  // A proof must attest what the proposal claims, e.g. a lost outcome never authorises a won stage.
  const contradictedEvidence = Object.entries(action.evidenceClaims(parsed.data)).filter(
    ([key, claim]) =>
      stableStringify(context.verifiedEvidence.get(key)?.get(evidence[key] ?? '')) !== stableStringify(claim),
  );

  if (contradictedEvidence.length > 0) {
    return refuse(
      'evidence-mismatch',
      `Preuves en contradiction avec la proposition : ${contradictedEvidence.map(([key]) => key).join(', ')}`,
    );
  }
  if (target !== undefined && expectedState === undefined) {
    return refuse('missing-precondition', `${action.id} modifie un dossier existant : état attendu requis`);
  }
  if (expectedState !== undefined && expectedState !== context.currentState) {
    return refuse(
      'stale-state',
      `État attendu ${expectedState}, état courant ${context.currentState ?? 'inconnu'}`,
    );
  }
  if (context.currentState !== undefined && action.blockedStates.includes(context.currentState)) {
    return refuse('state-not-allowed', `${action.id} est interdite dans l'état ${context.currentState}`);
  }

  if (!action.requiresApproval) {
    return { status: 'ready', action, params: parsed.data, identity: context.identity };
  }

  const approval = context.approvals.get(contentHash);

  if (approval === undefined) {
    return { status: 'awaiting-approval', contentHash };
  }

  return { status: 'ready', action, params: parsed.data, identity: context.identity, approval };
};
