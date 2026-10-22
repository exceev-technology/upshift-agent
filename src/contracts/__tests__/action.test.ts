import { AGENTS } from 'src/catalog/agents';
import {
  checkActionProposal,
  hashActionContent,
  type ActionCheckContext,
  type ActionProposal,
} from 'src/contracts/action';
import { ACTION_REGISTRY } from 'src/contracts/action-registry';
import { describe, expect, it } from 'vitest';

const RECORD_ID = '0f8a4c7e-3b2d-4e6f-9a1b-2c3d4e5f6a7b';
const DRAFT_NOTE_ID = '6d1e2f3a-4b5c-4d7e-8f9a-0b1c2d3e4f5a';
const SOURCE_REF = 'corpus-essai#12';

const identity: ActionProposal['identity'] = {
  workspaceId: 'workspace-test',
  delegatorId: 'member-test',
  agent: { name: 'engagement-agent', version: '0.1.0' },
  skill: { name: 's7-organise-follow-up', version: '0.1.0' },
  model: 'simulated',
};

const taskProposal = (overrides: Partial<ActionProposal> = {}): ActionProposal => ({
  identity,
  actionId: 'crm.task.create',
  schemaVersion: '0.1.0',
  params: { recordId: RECORD_ID, title: 'Relancer le prospect', dueAt: '2026-11-05T09:00:00Z' },
  preconditions: { expectedState: 'QUALIFIED', evidence: {} },
  intentId: 'intent-1',
  ...overrides,
});

const sendProposal = (overrides: Partial<ActionProposal> = {}): ActionProposal => ({
  identity,
  actionId: 'engagement.message.send-test',
  schemaVersion: '0.1.0',
  params: { recordId: RECORD_ID, channel: 'test', recipient: 'prospect@example.test', body: 'Bonjour' },
  preconditions: { expectedState: 'QUALIFIED', evidence: { draft: DRAFT_NOTE_ID } },
  intentId: 'intent-2',
  ...overrides,
});

// Trusted server state: delegation, dossier state, resolved evidence and recorded approvals.
const context = (overrides: Partial<ActionCheckContext> = {}): ActionCheckContext => ({
  registry: ACTION_REGISTRY,
  allowedActions: AGENTS.engagement.allowedActions,
  currentState: 'QUALIFIED',
  executedIntentIds: new Set(),
  verifiedEvidence: new Map([
    ['draft', new Set([DRAFT_NOTE_ID])],
    ['source', new Set([SOURCE_REF])],
  ]),
  approvals: new Map(),
  ...overrides,
});

const approvalFor = (proposal: ActionProposal) =>
  new Map([[hashActionContent(proposal), { approvedBy: 'member-test', approvedAt: '2026-10-22T10:00:00Z' }]]);

describe('checkActionProposal', () => {
  it('accepts a delegated action with valid parameters', () => {
    expect(checkActionProposal(taskProposal(), context()).status).toBe('ready');
  });

  it('refuses a malformed proposal instead of throwing', () => {
    const withoutPreconditions: Record<string, unknown> = { ...taskProposal() };
    delete withoutPreconditions.preconditions;

    expect(checkActionProposal(withoutPreconditions, context())).toMatchObject({
      status: 'refused',
      reason: 'invalid-proposal',
    });
    expect(checkActionProposal('crm.task.create', context())).toMatchObject({
      status: 'refused',
      reason: 'invalid-proposal',
    });
  });

  it('refuses an unknown action', () => {
    const verdict = checkActionProposal(taskProposal({ actionId: 'crm.invent' }), context());

    expect(verdict).toMatchObject({ status: 'refused', reason: 'unknown-action' });
  });

  it('refuses a forbidden action even when it is delegated', () => {
    const verdict = checkActionProposal(
      taskProposal({ actionId: 'crm.record.destroy', params: { recordId: RECORD_ID } }),
      context({ allowedActions: ['crm.record.destroy'] }),
    );

    expect(verdict).toMatchObject({ status: 'refused', reason: 'forbidden-action' });
  });

  it("refuses an action outside the agent's delegation", () => {
    const verdict = checkActionProposal(
      taskProposal(),
      context({ allowedActions: AGENTS.acquisition.allowedActions }),
    );

    expect(verdict).toMatchObject({ status: 'refused', reason: 'not-delegated' });
  });

  it('refuses invalid parameters returned by a model', () => {
    const verdict = checkActionProposal(
      taskProposal({ params: { recordId: 'not-a-uuid', title: '', dueAt: 'tomorrow' } }),
      context(),
    );

    expect(verdict).toMatchObject({ status: 'refused', reason: 'invalid-params' });
  });

  it('does not repeat an intent that already ran', () => {
    const verdict = checkActionProposal(
      taskProposal(),
      context({ executedIntentIds: new Set(['intent-1']) }),
    );

    expect(verdict).toEqual({ status: 'already-done', intentId: 'intent-1' });
  });

  it('refuses when required evidence is missing', () => {
    const verdict = checkActionProposal(
      sendProposal({ preconditions: { expectedState: 'QUALIFIED', evidence: {} } }),
      context(),
    );

    expect(verdict).toMatchObject({ status: 'refused', reason: 'missing-evidence' });
  });

  it('refuses evidence the server could not resolve in the dossier', () => {
    const verdict = checkActionProposal(
      sendProposal({ preconditions: { expectedState: 'QUALIFIED', evidence: { draft: 'made-up' } } }),
      context(),
    );

    expect(verdict).toMatchObject({ status: 'refused', reason: 'unverified-evidence' });
  });

  it('refuses a reference verified for another kind of evidence', () => {
    const verdict = checkActionProposal(
      sendProposal({ preconditions: { expectedState: 'QUALIFIED', evidence: { draft: SOURCE_REF } } }),
      context(),
    );

    expect(verdict).toMatchObject({ status: 'refused', reason: 'unverified-evidence' });
  });

  it('refuses a change to an existing dossier without its expected state', () => {
    const verdict = checkActionProposal(taskProposal({ preconditions: { evidence: {} } }), context());

    expect(verdict).toMatchObject({ status: 'refused', reason: 'missing-precondition' });
  });

  it('accepts a creation without an expected state', () => {
    const upsert = taskProposal({
      actionId: 'crm.prospect.upsert',
      params: {
        companyName: 'Exemple SARL',
        source: { reference: SOURCE_REF, retrievedAt: '2026-10-22T08:00:00Z' },
      },
      preconditions: { evidence: { source: SOURCE_REF } },
    });

    expect(
      checkActionProposal(upsert, context({ allowedActions: AGENTS.acquisition.allowedActions })).status,
    ).toBe('ready');
  });

  it('requires the expected state when an upsert matches an existing company', () => {
    const match = (preconditions: ActionProposal['preconditions']) =>
      taskProposal({
        actionId: 'crm.prospect.upsert',
        params: {
          companyName: 'Exemple SARL',
          source: { reference: SOURCE_REF, retrievedAt: '2026-10-22T08:00:00Z' },
          matchedRecordId: RECORD_ID,
        },
        preconditions,
      });
    const acquisition = context({ allowedActions: AGENTS.acquisition.allowedActions });

    expect(checkActionProposal(match({ evidence: { source: SOURCE_REF } }), acquisition)).toMatchObject({
      status: 'refused',
      reason: 'missing-precondition',
    });
    expect(
      checkActionProposal(match({ expectedState: 'QUALIFIED', evidence: { source: SOURCE_REF } }), acquisition)
        .status,
    ).toBe('ready');
  });

  it('requires the stage proof only for a won or lost outcome', () => {
    const toStage = (stage: string) =>
      taskProposal({
        actionId: 'crm.opportunity.update-stage',
        params: { opportunityId: RECORD_ID, stage },
        preconditions: { expectedState: 'QUALIFIED', evidence: {} },
      });
    const deals = context({ allowedActions: AGENTS.deals.allowedActions });

    expect(checkActionProposal(toStage('PROPOSAL'), deals).status).toBe('ready');
    expect(checkActionProposal(toStage('WON'), deals)).toMatchObject({
      status: 'refused',
      reason: 'missing-evidence',
    });
  });

  it('refuses when the dossier changed since the proposal', () => {
    const verdict = checkActionProposal(taskProposal(), context({ currentState: 'CONTACT_REFUSED' }));

    expect(verdict).toMatchObject({ status: 'refused', reason: 'stale-state' });
  });

  it('waits for an approval recorded by the server', () => {
    const verdict = checkActionProposal(sendProposal(), context());

    expect(verdict).toEqual({ status: 'awaiting-approval', contentHash: hashActionContent(sendProposal()) });
  });

  it('ignores an approval claimed inside the proposal', () => {
    const forged = { ...sendProposal(), approval: { approvedBy: 'agent', contentHash: hashActionContent(sendProposal()) } };

    expect(checkActionProposal(forged, context()).status).toBe('awaiting-approval');
  });

  it('runs once the server recorded an approval for the exact content', () => {
    const verdict = checkActionProposal(sendProposal(), context({ approvals: approvalFor(sendProposal()) }));

    expect(verdict).toMatchObject({ status: 'ready', approval: { approvedBy: 'member-test' } });
  });

  it('asks again when the content changed after approval', () => {
    const edited = sendProposal({
      params: { recordId: RECORD_ID, channel: 'test', recipient: 'prospect@example.test', body: 'Autre texte' },
    });

    expect(checkActionProposal(edited, context({ approvals: approvalFor(sendProposal()) })).status).toBe(
      'awaiting-approval',
    );
  });
});

describe('action registry', () => {
  it('declares every action delegated to an agent', () => {
    for (const agent of Object.values(AGENTS)) {
      for (const actionId of agent.allowedActions) {
        expect(ACTION_REGISTRY[actionId], `${agent.name} → ${actionId}`).toBeDefined();
      }
    }
  });
});
