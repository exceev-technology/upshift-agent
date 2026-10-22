import type { ImplementationStatus } from 'src/catalog/types';

// AI providers (brief §05, §12). Built-in providers are activated with their API key in the workspace
// AI settings, and an agent picks its model with `modelId`; Jev comes through the TypeSafe AI provider.
// MVP: Jev plus two generative providers really tested on the same skill contract. Update `status` only with evidence.
export type AiProvider = {
  key: string;
  label: string;
  // Offered in the workspace AI settings (checked on ECC Upshift Agents, 22 Oct.).
  builtIn: boolean;
  status: ImplementationStatus;
};

export const AI_PROVIDERS: AiProvider[] = [
  { key: 'typesafe', label: 'Jev (TypeSafe AI)', builtIn: true, status: 'planned' },
  { key: 'anthropic', label: 'Claude (Anthropic)', builtIn: true, status: 'planned' },
  { key: 'google', label: 'Gemini (Google)', builtIn: true, status: 'planned' },
  { key: 'openai', label: 'GPT (OpenAI)', builtIn: true, status: 'planned' },
  { key: 'mistral', label: 'Mistral', builtIn: true, status: 'planned' },
  { key: 'xai', label: 'Grok (xAI)', builtIn: true, status: 'planned' },
  // Brief targets the workspace does not offer yet.
  { key: 'deepseek', label: 'DeepSeek', builtIn: false, status: 'planned' },
  { key: 'qwen', label: 'Qwen (Alibaba)', builtIn: false, status: 'planned' },
];
