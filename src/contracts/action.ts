import { createHash } from 'node:crypto';
import type { z } from 'zod';

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
  // Evidence references the proposal must carry, e.g. the source of a new prospect.
  requiredEvidence: string[];
  requiresApproval: boolean;
};

export type ActionRegistry = Record<string, ActionDefinition>;

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
    evidence: Record<string, string>;
  };
  // Same intent, same effect: a replayed event must not create a second record, task or message.
  intentId: string;
  approval?: { approvedBy: string; contentHash: string };
};

export type ActionRefusalReason =
  | 'unknown-action'
  | 'forbidden-action'
  | 'not-delegated'
  | 'schema-version-mismatch'
  | 'invalid-params'
  | 'missing-evidence'
  | 'stale-state'
  | 'approval-mismatch';

export type ActionVerdict =
  | { status: 'ready'; action: ActionDefinition; params: unknown }
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

export type ActionCheckContext = {
  registry: ActionRegistry;
  // The agent's delegation: action identifiers it may propose.
  allowedActions: readonly string[];
  currentState?: string;
  executedIntentIds: ReadonlySet<string>;
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

// An approval is bound to the exact content: any change to the action or its parameters voids it.
export const hashActionContent = (
  proposal: Pick<ActionProposal, 'actionId' | 'schemaVersion' | 'params'>,
) =>
  createHash('sha256')
    .update(stableStringify([proposal.actionId, proposal.schemaVersion, proposal.params]))
    .digest('hex');

const refuse = (reason: ActionRefusalReason, detail: string): ActionVerdict => ({
  status: 'refused',
  reason,
  detail,
});

export const checkActionProposal = (
  proposal: ActionProposal,
  context: ActionCheckContext,
): ActionVerdict => {
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
    return refuse(
      'invalid-params',
      parsed.error.issues.map((issue) => `${issue.path.join('.') || '(racine)'} : ${issue.message}`).join(' ; '),
    );
  }

  const missingEvidence = action.requiredEvidence.filter(
    (key) => !proposal.preconditions.evidence[key],
  );

  if (missingEvidence.length > 0) {
    return refuse('missing-evidence', `Preuves manquantes : ${missingEvidence.join(', ')}`);
  }

  const { expectedState } = proposal.preconditions;

  if (expectedState !== undefined && expectedState !== context.currentState) {
    return refuse(
      'stale-state',
      `État attendu ${expectedState}, état courant ${context.currentState ?? 'inconnu'}`,
    );
  }

  if (action.requiresApproval) {
    const contentHash = hashActionContent(proposal);

    if (proposal.approval === undefined) {
      return { status: 'awaiting-approval', contentHash };
    }
    if (proposal.approval.contentHash !== contentHash) {
      return refuse('approval-mismatch', 'Le contenu a changé depuis l’approbation');
    }
  }

  return { status: 'ready', action, params: parsed.data };
};
