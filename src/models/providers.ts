import type { ImplementationStatus } from 'src/catalog/types';

// Generative model targets (brief §05, §12). In Upshift an agent's model is selected with `modelId`
// among the providers configured in the workspace AI settings; Jev has its own adapter (src/models/jev).
// MVP: two providers really tested on the same skill contract. Update `status` only with evidence.
export type GenerativeProvider = {
  key: string;
  label: string;
  status: ImplementationStatus;
};

export const GENERATIVE_PROVIDERS: GenerativeProvider[] = [
  { key: 'gemini', label: 'Gemini (Google)', status: 'planned' },
  { key: 'gpt', label: 'GPT (OpenAI)', status: 'planned' },
  { key: 'deepseek', label: 'DeepSeek', status: 'planned' },
  { key: 'qwen', label: 'Qwen (Alibaba)', status: 'planned' },
  { key: 'claude', label: 'Claude (Anthropic)', status: 'planned' },
];
