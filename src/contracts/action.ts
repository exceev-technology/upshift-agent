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
  // Whether these parameters change an existing dossier, which must then name its expected state.
  mutatesExistingRecord: (params: unknown) => boolean;
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
  mutatesExistingRecord: Requirement<z.infer<TSchema>, boolean>;
  requiresApproval: boolean;
}): ActionDefinition => {
  const { requiredEvidence, mutatesExistingRecord } = definition;

  // Only called with parameters already validated by `params`.
  return {
    ...definition,
    requiredEvidence: (params) =>
      typeof requiredEvidence === 'function' ? requiredEvidence(params as z.infer<TSchema>) : requiredEvidence,
    mutatesExistingRecord: (params) =>
      typeof mutatesExistingRecord === 'function'
        ? mutatesExistingRecord(params as z.infer<TSchema>)
        : mutatesExistingRecord,
  };
};

// Fixed by the system, never by the model.
export type ActionIdentity = {
  workspaceId: string;
  delegatorId: string;
  agent: { name: string; version: string };
  skill: { name: string; version: string };
  model: string;
};

export type ActionProposal = {
  identity: ActionIdentity;
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
  | 'missing-evidence'
  | 'unverified-evidence'
  | 'missing-precondition'
  | 'stale-state';

export type ActionVerdict =
  | { status: 'ready'; action: ActionDefinition; params: unknown; approval?: ActionApproval }
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
  registry: ActionRegistry;
  // The agent's delegation: action identifiers it may propose.
  allowedActions: readonly string[];
  currentState?: string;
  executedIntentIds: ReadonlySet<string>;
  // References the server resolved in the CRM, per evidence key: they exist, belong to the dossier and have
  // the kind that key expects. A reference verified for one key never counts for another.
  verifiedEvidence: ReadonlyMap<string, ReadonlySet<string>>;
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

// An approval is bound to the exact content and intent: any change needs a new approval.
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
  if (context.executedIntentIds.has(proposal.intentId)) {
    return { status: 'already-done', intentId: proposal.intentId };
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
  if (action.mutatesExistingRecord(parsed.data) && expectedState === undefined) {
    return refuse('missing-precondition', `${action.id} modifie un dossier existant : état attendu requis`);
  }
  if (expectedState !== undefined && expectedState !== context.currentState) {
    return refuse(
      'stale-state',
      `État attendu ${expectedState}, état courant ${context.currentState ?? 'inconnu'}`,
    );
  }

  if (!action.requiresApproval) {
    return { status: 'ready', action, params: parsed.data };
  }

  const contentHash = hashActionContent(proposal);
  const approval = context.approvals.get(contentHash);

  if (approval === undefined) {
    return { status: 'awaiting-approval', contentHash };
  }

  return { status: 'ready', action, params: parsed.data, approval };
};
