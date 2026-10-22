import { z } from 'zod';

// Shapes of the TypeSafe System One HTTP API (POST /v1/systemone).
// Choice picks one option, Score places the state on ordered levels, Noul estimates a yes/no.

export type JevQuestion =
  | { type: 'choice'; instructions: string; criteria: Record<string, string> }
  // Levels from the lowest to the highest; the answer's score is a mean of their indexes.
  | { type: 'score'; instructions: string; criteria: string[] }
  | { type: 'noul'; instructions: string };

export type JevQuestions = Record<string, JevQuestion>;

const probability = z.number().min(0).max(1);

const choiceAnswerSchema = z.object({
  type: z.literal('choice'),
  choice: z.string(),
  confidence: probability,
  probabilities: z.record(z.string(), probability),
});

const scoreAnswerSchema = z.object({
  type: z.literal('score'),
  score: z.number().min(0),
  confidence: probability,
  probabilities: z.record(z.string(), probability),
  legend: z.record(z.string(), z.string()).optional(),
});

// Noul has no confidence: a value near 0.5 means yes and no are similarly likely.
const noulAnswerSchema = z.object({
  type: z.literal('noul'),
  noul: probability,
});

// The response is validated at runtime: a typed SDK does not prove what comes over the wire.
export const jevResponseSchema = z.object({
  model: z.string(),
  answers: z.record(
    z.string(),
    z.discriminatedUnion('type', [choiceAnswerSchema, scoreAnswerSchema, noulAnswerSchema]),
  ),
  usage: z.object({ input_tokens: z.number(), output_tokens: z.number() }).optional(),
});

export type JevChoiceAnswer = z.infer<typeof choiceAnswerSchema>;
export type JevScoreAnswer = z.infer<typeof scoreAnswerSchema>;
export type JevNoulAnswer = z.infer<typeof noulAnswerSchema>;
export type JevResponse = z.infer<typeof jevResponseSchema>;
export type JevAnswer = JevResponse['answers'][string];
