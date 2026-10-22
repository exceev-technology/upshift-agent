import { AGENTS } from 'src/catalog/agents';
import {
  checkActionProposal,
  hashActionContent,
  type ActionCheckContext,
  type ActionIdentity,
  type ActionProposal,
} from 'src/contracts/action';
import { ACTION_REGISTRY, CONTACT_REFUSED } from 'src/contracts/action-registry';
import { describe, expect, it } from 'vitest';

const RECORD_ID = '0f8a4c7e-3b2d-4e6f-9a1b-2c3d4e5f6a7b';
const DRAFT_NOTE_ID = '6d1e2f3a-4b5c-4d7e-8f9a-0b1c2d3e4f5a';
const SOURCE_REF = 'corpus-essai#12';
const OWNER_ID = '5e6f7a8b-9c0d-4e1f-8a2b-3c4d5e6f7a8b';
const OTHER_OPPORTUNITY_ID = '7c8d9e0f-1a2b-4c3d-9e4f-5a6b7c8d9e0f';
const EXISTING_TASK_ID = '3a4b5c6d-7e8f-4a9b-8c0d-1e2f3a4b5c6d';

const identity: ActionIdentity = {
  workspaceId: 'workspace-test',
  delegatorId: 'member-test',
  agent: { name: 'engagement-agent', version: '0.1.0' },
  skill: { name: 's7-organise-follow-up', version: '0.1.0' },
  model: 'simulated',
};

const taskProposal = (overrides: Partial<ActionProposal> = {}): ActionProposal => ({
  actionId: 'crm.task.create',
  schemaVersion: '0.1.0',
  params: { recordId: RECORD_ID, title: 'Relancer le prospect', dueAt: '2026-11-05T09:00:00Z' },
  preconditions: { expectedState: 'QUALIFIED', evidence: {} },
  intentId: 'intent-1',
  ...overrides,
});

const sendProposal = (overrides: Partial<ActionProposal> = {}): ActionProposal => ({
  actionId: 'engagement.message.send-test',
  schemaVersion: '0.1.0',
  params: { recordId: RECORD_ID, channel: 'test', recipient: 'prospect@example.test', body: 'Bonjour' },
  preconditions: { expectedState: 'QUALIFIED', evidence: { draft: DRAFT_NOTE_ID } },
  intentId: 'intent-2',
  ...overrides,
});

// Trusted server state: delegation, dossier state, resolved evidence and recorded approvals.
const context = (overrides: Partial<ActionCheckContext> = {}): ActionCheckContext => ({
  identity,
  registry: ACTION_REGISTRY,
  allowedActions: AGENTS.engagement.allowedActions,
  dossierRecordIds: new Set([RECORD_ID]),
  currentState: 'QUALIFIED',
  executedIntents: new Map(),
  allowedRecipients: new Set(['prospect@example.test']),
  // Each verified reference with the value it attests.
  verifiedEvidence: new Map<string, ReadonlyMap<string, unknown>>([
    ['draft', new Map([[DRAFT_NOTE_ID, { recordId: RECORD_ID, body: 'Bonjour' }]])],
    ['source', new Map([[SOURCE_REF, { kind: 'corpus' }]])],
  ]),
  allowedAssigneeIds: new Set([OWNER_ID]),
  approvals: new Map(),
  ...overrides,
});

const approvalFor = (proposal: ActionProposal) =>
  new Map([[hashActionContent(proposal), { approvedBy: 'member-test', approvedAt: '2026-10-22T10:00:00Z' }]]);

describe('checkActionProposal', () => {
  it('accepts a delegated action with valid parameters', () => {
    expect(checkActionProposal(taskProposal(), context()).status).toBe('ready');
  });

  it('records the trusted identity, never one claimed by the proposal', () => {
    const forged = { ...taskProposal(), identity: { ...identity, agent: { name: 'deals-agent', version: '9.9.9' } } };

    expect(checkActionProposal(forged, context())).toMatchObject({ status: 'ready', identity });
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

  it('does not repeat an intent that already ran with the same content', () => {
    const verdict = checkActionProposal(
      taskProposal(),
      context({ executedIntents: new Map([['intent-1', hashActionContent(taskProposal())]]) }),
    );

    expect(verdict).toEqual({ status: 'already-done', intentId: 'intent-1' });
  });

  it('refuses an intent id already used for a different action', () => {
    const verdict = checkActionProposal(
      taskProposal(),
      context({ executedIntents: new Map([['intent-1', 'hash-of-another-action']]) }),
    );

    expect(verdict).toMatchObject({ status: 'refused', reason: 'intent-conflict' });
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
      params: { companyName: 'Exemple SARL', retrievedAt: '2026-10-22T08:00:00Z' },
      preconditions: { evidence: { source: SOURCE_REF } },
    });

    expect(
      checkActionProposal(upsert, context({ allowedActions: AGENTS.acquisition.allowedActions })).status,
    ).toBe('ready');
  });

  it('never takes the prospect source from the params, only from verified evidence', () => {
    const upsert = taskProposal({
      actionId: 'crm.prospect.upsert',
      params: {
        companyName: 'Exemple SARL',
        retrievedAt: '2026-10-22T08:00:00Z',
        source: { reference: 'invented-source' },
      },
      preconditions: { evidence: { source: SOURCE_REF } },
    });
    const verdict = checkActionProposal(upsert, context({ allowedActions: AGENTS.acquisition.allowedActions }));

    expect(verdict.status).toBe('ready');
    expect(verdict.status === 'ready' ? verdict.params : undefined).not.toHaveProperty('source');
  });

  it('requires the expected state when an upsert matches an existing company', () => {
    const match = (preconditions: ActionProposal['preconditions']) =>
      taskProposal({
        actionId: 'crm.prospect.upsert',
        params: {
          companyName: 'Exemple SARL',
          retrievedAt: '2026-10-22T08:00:00Z',
          matchedRecordId: RECORD_ID,
        },
        preconditions,
      });
    const acquisition = context({
      allowedActions: AGENTS.acquisition.allowedActions,
      deduplicationMatch: RECORD_ID,
    });

    expect(checkActionProposal(match({ evidence: { source: SOURCE_REF } }), acquisition)).toMatchObject({
      status: 'refused',
      reason: 'missing-precondition',
    });
    expect(
      checkActionProposal(match({ expectedState: 'QUALIFIED', evidence: { source: SOURCE_REF } }), acquisition)
        .status,
    ).toBe('ready');
  });

  it('refuses to create a company the server already matched', () => {
    const duplicate = taskProposal({
      actionId: 'crm.prospect.upsert',
      params: { companyName: 'Exemple SARL', retrievedAt: '2026-10-22T08:00:00Z' },
      preconditions: { evidence: { source: SOURCE_REF } },
    });

    expect(
      checkActionProposal(
        duplicate,
        context({ allowedActions: AGENTS.acquisition.allowedActions, deduplicationMatch: RECORD_ID }),
      ),
    ).toMatchObject({ status: 'refused', reason: 'duplicate-mismatch' });
  });

  it('refuses a recipient outside the trusted test recipients', () => {
    const realRecipient = sendProposal({
      params: { recordId: RECORD_ID, channel: 'test', recipient: 'client@real-company.example', body: 'Bonjour' },
    });

    expect(checkActionProposal(realRecipient, context())).toMatchObject({
      status: 'refused',
      reason: 'recipient-not-allowed',
    });
  });

  it('accepts a won stage only with a proof of a win for this opportunity', () => {
    const toWon = taskProposal({
      actionId: 'crm.opportunity.update-stage',
      params: { opportunityId: RECORD_ID, stage: 'WON' },
      preconditions: { expectedState: 'PROPOSAL', evidence: { stageProof: 'proof-1' } },
    });
    const withProof = (attested: { opportunityId: string; outcome: string }) =>
      context({
        allowedActions: AGENTS.deals.allowedActions,
        dossierRecordIds: new Set([RECORD_ID, OTHER_OPPORTUNITY_ID]),
        currentState: 'PROPOSAL',
        verifiedEvidence: new Map([['stageProof', new Map([['proof-1', attested]])]]),
      });
    const refusal = { status: 'refused', reason: 'evidence-mismatch' };

    expect(checkActionProposal(toWon, withProof({ opportunityId: RECORD_ID, outcome: 'WON' })).status).toBe('ready');
    expect(checkActionProposal(toWon, withProof({ opportunityId: RECORD_ID, outcome: 'LOST' }))).toMatchObject(refusal);
    expect(
      checkActionProposal(toWon, withProof({ opportunityId: OTHER_OPPORTUNITY_ID, outcome: 'WON' })),
    ).toMatchObject(refusal);
  });

  it('never reopens a closed opportunity nor skips a stage', () => {
    const toProposal = (from: string) =>
      checkActionProposal(
        taskProposal({
          actionId: 'crm.opportunity.update-stage',
          params: { opportunityId: RECORD_ID, stage: 'PROPOSAL' },
          preconditions: { expectedState: from, evidence: {} },
        }),
        context({ allowedActions: AGENTS.deals.allowedActions, currentState: from }),
      );

    expect(toProposal('MEETING').status).toBe('ready');
    expect(toProposal('WON')).toMatchObject({ status: 'refused', reason: 'transition-not-allowed' });
    expect(toProposal('NEW')).toMatchObject({ status: 'refused', reason: 'transition-not-allowed' });
  });

  it('reuses an equivalent open task instead of creating it again', () => {
    expect(checkActionProposal(taskProposal(), context({ deduplicationMatch: EXISTING_TASK_ID }))).toMatchObject({
      status: 'refused',
      reason: 'duplicate-mismatch',
    });
  });

  it('refuses a message whose text differs from the verified draft', () => {
    const altered = sendProposal({
      params: { recordId: RECORD_ID, channel: 'test', recipient: 'prospect@example.test', body: 'Texte modifié' },
    });

    expect(checkActionProposal(altered, context())).toMatchObject({
      status: 'refused',
      reason: 'evidence-mismatch',
    });
  });

  it('stops follow-ups once the prospect refused contact', () => {
    const followUp = taskProposal({ preconditions: { expectedState: CONTACT_REFUSED, evidence: {} } });

    expect(checkActionProposal(followUp, context({ currentState: CONTACT_REFUSED }))).toMatchObject({
      status: 'refused',
      reason: 'state-not-allowed',
    });
  });

  it('assigns tasks only to authorised members', () => {
    const assignTo = (assigneeId: string) =>
      taskProposal({
        params: { recordId: RECORD_ID, title: 'Relancer le prospect', dueAt: '2026-11-05T09:00:00Z', assigneeId },
      });

    expect(checkActionProposal(assignTo(OWNER_ID), context()).status).toBe('ready');
    expect(checkActionProposal(assignTo('9f8e7d6c-5b4a-4c3d-8e2f-1a0b9c8d7e6f'), context())).toMatchObject({
      status: 'refused',
      reason: 'assignee-not-allowed',
    });
  });

  it('requires the stage proof only for a won or lost outcome', () => {
    const toStage = (stage: string) =>
      taskProposal({
        actionId: 'crm.opportunity.update-stage',
        params: { opportunityId: RECORD_ID, stage },
        preconditions: { expectedState: 'MEETING', evidence: {} },
      });
    const deals = context({ allowedActions: AGENTS.deals.allowedActions, currentState: 'MEETING' });

    expect(checkActionProposal(toStage('PROPOSAL'), deals).status).toBe('ready');
    expect(checkActionProposal(toStage('WON'), deals)).toMatchObject({
      status: 'refused',
      reason: 'missing-evidence',
    });
  });

  it('refuses to change a record outside the checked dossier', () => {
    const otherOpportunity = taskProposal({
      actionId: 'crm.opportunity.update-stage',
      params: { opportunityId: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d', stage: 'PROPOSAL' },
      preconditions: { expectedState: 'QUALIFIED', evidence: {} },
    });

    expect(
      checkActionProposal(otherOpportunity, context({ allowedActions: AGENTS.deals.allowedActions })),
    ).toMatchObject({ status: 'refused', reason: 'target-mismatch' });
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

    const editedDraft = new Map<string, ReadonlyMap<string, unknown>>([
      ['draft', new Map([[DRAFT_NOTE_ID, { recordId: RECORD_ID, body: 'Autre texte' }]])],
    ]);

    expect(
      checkActionProposal(
        edited,
        context({ approvals: approvalFor(sendProposal()), verifiedEvidence: editedDraft }),
      ).status,
    ).toBe('awaiting-approval');
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
