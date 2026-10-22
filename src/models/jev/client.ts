import {
  jevResponseSchema,
  type JevQuestions,
  type JevResponse,
} from 'src/models/jev/types';

export const JEV_ENDPOINT = 'https://api.typesafe.ai/v1/systemone';
export const DEFAULT_JEV_MODEL = 'jev-latest';

export type JevErrorKind =
  | 'not-configured'
  | 'unauthorized'
  | 'invalid-request'
  | 'unavailable'
  | 'invalid-response';

// Every failure surfaces as a JevError, so callers record an explicit state instead of a fictive success.
export class JevError extends Error {
  constructor(
    readonly kind: JevErrorKind,
    message: string,
  ) {
    super(message);
    this.name = 'JevError';
  }
}

export type JevAskInput = { state: unknown; questions: JevQuestions };

export type JevClient = {
  // Simulated answers are labelled in traces and docs; they never validate the real integration.
  readonly mode: 'live' | 'simulated';
  ask(input: JevAskInput): Promise<JevResponse>;
};

type HttpJevClientOptions = {
  apiKey: string;
  model?: string;
  timeoutMs?: number;
  fetchImpl?: typeof fetch;
};

const checkAnswers = (response: JevResponse, questions: JevQuestions) => {
  for (const [id, question] of Object.entries(questions)) {
    if (response.answers[id]?.type !== question.type) {
      throw new JevError('invalid-response', `Réponse absente ou d'un autre type pour la question ${id}`);
    }
  }

  return response;
};

export const createHttpJevClient = ({
  apiKey,
  model = DEFAULT_JEV_MODEL,
  timeoutMs = 15_000,
  fetchImpl = fetch,
}: HttpJevClientOptions): JevClient => ({
  mode: 'live',
  async ask({ state, questions }) {
    let response: Response;

    try {
      response = await fetchImpl(JEV_ENDPOINT, {
        method: 'POST',
        headers: { 'content-type': 'application/json', authorization: `Bearer ${apiKey}` },
        body: JSON.stringify({ model, state, questions }),
        signal: AbortSignal.timeout(timeoutMs),
      });
    } catch (error) {
      throw new JevError(
        'unavailable',
        `Jev injoignable : ${error instanceof Error ? error.message : String(error)}`,
      );
    }

    if (response.status === 401 || response.status === 403) {
      throw new JevError('unauthorized', `Jev a refusé la clé (${response.status})`);
    }
    if (response.status === 400 || response.status === 422) {
      throw new JevError('invalid-request', `Requête Jev invalide (${response.status}) : ${await response.text()}`);
    }
    if (!response.ok) {
      throw new JevError('unavailable', `Jev indisponible (${response.status})`);
    }

    let body: unknown;

    try {
      body = await response.json();
    } catch {
      throw new JevError('invalid-response', 'Réponse Jev illisible');
    }

    const parsed = jevResponseSchema.safeParse(body);

    if (!parsed.success) {
      throw new JevError('invalid-response', `Réponse Jev non conforme : ${parsed.error.message}`);
    }

    return checkAnswers(parsed.data, questions);
  },
});

// Logic functions receive the application variables as environment variables.
export const createJevClientFromEnv = (
  env: Record<string, string | undefined> = process.env,
  options: Pick<HttpJevClientOptions, 'timeoutMs' | 'fetchImpl'> = {},
): JevClient => {
  const apiKey = env.TYPESAFE_API_KEY;

  if (!apiKey) {
    throw new JevError('not-configured', "TYPESAFE_API_KEY n'est pas renseignée dans les variables de l'application");
  }

  return createHttpJevClient({ ...options, apiKey, model: env.JEV_MODEL || DEFAULT_JEV_MODEL });
};

// Unblocks development while access is missing (brief §05). Never reported as a tested integration.
export const createSimulatedJevClient = (
  respond: (input: JevAskInput) => JevResponse,
): JevClient => ({
  mode: 'simulated',
  async ask(input) {
    return checkAnswers(jevResponseSchema.parse(respond(input)), input.questions);
  },
});
