import {
  createHttpJevClient,
  createJevClientFromEnv,
  createSimulatedJevClient,
  JEV_ENDPOINT,
} from 'src/models/jev/client';
import type { JevQuestions, JevResponse } from 'src/models/jev/types';
import { describe, expect, it, vi } from 'vitest';

const questions: JevQuestions = {
  intent: {
    type: 'choice',
    instructions: "Quelle est l'intention de cette réponse à une prise de contact ?",
    criteria: {
      interested: 'Le prospect manifeste un intérêt',
      objection: 'Le prospect formule une objection',
      refusal: 'Le prospect refuse le contact',
      insufficient: "Le message ne permet pas de conclure",
    },
  },
};

const okBody: JevResponse = {
  model: 'jev-latest',
  answers: {
    intent: {
      type: 'choice',
      choice: 'interested',
      confidence: 0.7,
      probabilities: { interested: 0.8, objection: 0.1, refusal: 0.05, insufficient: 0.05 },
    },
  },
  usage: { input_tokens: 120, output_tokens: 12 },
};

const respondWith = (status: number, body: unknown) =>
  vi.fn(async () => new Response(JSON.stringify(body), { status }));

const state = { reply: 'Bonjour, pouvons-nous en parler jeudi ?' };

describe('createHttpJevClient', () => {
  it('sends the model, state and questions with the API key', async () => {
    const fetchImpl = respondWith(200, okBody);
    const client = createHttpJevClient({ apiKey: 'test-key', fetchImpl });

    const response = await client.ask({ state, questions });

    expect(response.answers.intent).toMatchObject({ type: 'choice', choice: 'interested' });
    const [url, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(url).toBe(JEV_ENDPOINT);
    expect((init.headers as Record<string, string>).authorization).toBe('Bearer test-key');
    expect(JSON.parse(init.body as string)).toEqual({ model: 'jev-latest', state, questions });
  });

  it('reports a rejected request as invalid-request', async () => {
    const client = createHttpJevClient({ apiKey: 'test-key', fetchImpl: respondWith(422, { detail: [] }) });

    await expect(client.ask({ state, questions })).rejects.toMatchObject({ kind: 'invalid-request' });
  });

  it('reports a server failure as unavailable', async () => {
    const client = createHttpJevClient({ apiKey: 'test-key', fetchImpl: respondWith(503, {}) });

    await expect(client.ask({ state, questions })).rejects.toMatchObject({ kind: 'unavailable' });
  });

  it('reports a network failure as unavailable', async () => {
    const fetchImpl = vi.fn(async () => {
      throw new TypeError('fetch failed');
    });
    const client = createHttpJevClient({ apiKey: 'test-key', fetchImpl });

    await expect(client.ask({ state, questions })).rejects.toMatchObject({ kind: 'unavailable' });
  });

  it('rejects a response that misses an answer', async () => {
    const client = createHttpJevClient({
      apiKey: 'test-key',
      fetchImpl: respondWith(200, { ...okBody, answers: {} }),
    });

    await expect(client.ask({ state, questions })).rejects.toMatchObject({ kind: 'invalid-response' });
  });

  it('rejects an answer outside the documented ranges', async () => {
    const malformed = { ...okBody, answers: { intent: { ...okBody.answers.intent, confidence: 2 } } };
    const client = createHttpJevClient({ apiKey: 'test-key', fetchImpl: respondWith(200, malformed) });

    await expect(client.ask({ state, questions })).rejects.toMatchObject({ kind: 'invalid-response' });
  });

  it("rejects a choice outside the question's options", async () => {
    const unknown = { ...okBody, answers: { intent: { ...okBody.answers.intent, choice: 'enthusiastic' } } };
    const client = createHttpJevClient({ apiKey: 'test-key', fetchImpl: respondWith(200, unknown) });

    await expect(client.ask({ state, questions })).rejects.toMatchObject({ kind: 'invalid-response' });
  });

  it('rejects a score above the top level instead of treating it as maximal', async () => {
    const scoreQuestions: JevQuestions = {
      fit: { type: 'score', instructions: 'Adéquation au profil client idéal', criteria: ['Faible', 'Moyen', 'Fort'] },
    };
    const outOfRange: JevResponse = {
      model: 'jev-latest',
      answers: { fit: { type: 'score', score: 2.5, confidence: 0.9, probabilities: { '0': 0, '1': 0.5, '2': 0.5 } } },
    };
    const client = createHttpJevClient({ apiKey: 'test-key', fetchImpl: respondWith(200, outOfRange) });

    await expect(client.ask({ state, questions: scoreQuestions })).rejects.toMatchObject({
      kind: 'invalid-response',
    });
  });
});

describe('createJevClientFromEnv', () => {
  it('refuses to start without TYPESAFE_API_KEY', () => {
    expect(() => createJevClientFromEnv({})).toThrow(expect.objectContaining({ kind: 'not-configured' }));
  });

  it('uses JEV_MODEL when it is set', async () => {
    const fetchImpl = respondWith(200, { ...okBody, model: 'jev-preview' });
    const client = createJevClientFromEnv({ TYPESAFE_API_KEY: 'k', JEV_MODEL: 'jev-preview' }, { fetchImpl });

    await client.ask({ state, questions });

    const [, init] = fetchImpl.mock.calls[0] as unknown as [string, RequestInit];
    expect(JSON.parse(init.body as string).model).toBe('jev-preview');
  });
});

describe('createSimulatedJevClient', () => {
  it('labels its answers as simulated', async () => {
    const client = createSimulatedJevClient(() => okBody);

    expect(client.mode).toBe('simulated');
    await expect(client.ask({ state, questions })).resolves.toMatchObject({ model: 'jev-latest' });
  });

  it('reports a malformed simulated answer as invalid-response', async () => {
    const client = createSimulatedJevClient(() => ({ model: 'jev-latest' }) as unknown as JevResponse);

    await expect(client.ask({ state, questions })).rejects.toMatchObject({ kind: 'invalid-response' });
  });
});
