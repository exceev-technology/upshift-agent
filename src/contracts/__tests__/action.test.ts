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
  preconditions: { evidence: {} },
  intentId: 'intent-1',
  ...overrides,
});

const sendProposal = (overrides: Partial<ActionProposal> = {}): ActionProposal => ({
  identity,
  actionId: 'engagement.message.send-test',
  schemaVersion: '0.1.0',
  params: { recordId: RECORD_ID, channel: 'test', recipient: 'prospect@example.test', body: 'Bonjour' },
  preconditions: { evidence: { draft: 'note-42' } },
  intentId: 'intent-2',
  ...overrides,
});

const context = (overrides: Partial<ActionCheckContext> = {}): ActionCheckContext => ({
  registry: ACTION_REGISTRY,
  allowedActions: AGENTS.engagement.allowedActions,
  executedIntentIds: new Set(),
  ...overrides,
});

describe('checkActionProposal', () => {
  it('accepts a delegated action with valid parameters', () => {
    expect(checkActionProposal(taskProposal(), context()).status).toBe('ready');
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
    const verdict = checkActionProposal(sendProposal({ preconditions: { evidence: {} } }), context());

    expect(verdict).toMatchObject({ status: 'refused', reason: 'missing-evidence' });
  });

  it('refuses when the dossier changed since the proposal', () => {
    const verdict = checkActionProposal(
      taskProposal({ preconditions: { expectedState: 'QUALIFIED', evidence: {} } }),
      context({ currentState: 'CONTACT_REFUSED' }),
    );

    expect(verdict).toMatchObject({ status: 'refused', reason: 'stale-state' });
  });

  it('waits for an approval bound to the exact content', () => {
    const verdict = checkActionProposal(sendProposal(), context());

    expect(verdict).toEqual({ status: 'awaiting-approval', contentHash: hashActionContent(sendProposal()) });
  });

  it('runs once the exact content is approved', () => {
    const approval = { approvedBy: 'member-test', contentHash: hashActionContent(sendProposal()) };

    expect(checkActionProposal(sendProposal({ approval }), context()).status).toBe('ready');
  });

  it('refuses an approval given for different content', () => {
    const approval = { approvedBy: 'member-test', contentHash: hashActionContent(sendProposal()) };
    const edited = sendProposal({
      approval,
      params: { recordId: RECORD_ID, channel: 'test', recipient: 'prospect@example.test', body: 'Autre texte' },
    });

    expect(checkActionProposal(edited, context())).toMatchObject({
      status: 'refused',
      reason: 'approval-mismatch',
    });
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
