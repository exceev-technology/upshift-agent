// Catalogue types, shared by the SDK entity files and the docs.
// They follow the brief: §07 (fiche agent), §09 (contrat minimum d'un skill).

// What the documentation must say about every capability (Definition of Done).
export type ImplementationStatus = 'planned' | 'simulated' | 'tested' | 'available';

export const IMPLEMENTATION_STATUS_LABEL: Record<ImplementationStatus, string> = {
  planned: 'prévu',
  simulated: 'simulé',
  tested: 'testé',
  available: 'disponible',
};

export type SkillKey = 's1' | 's2' | 's3' | 's4' | 's5' | 's6' | 's7' | 's8';

export type SkillContract = {
  key: SkillKey;
  // Display code used in the brief, e.g. "S3".
  code: string;
  // Unique skill name in the workspace, kebab-case.
  name: string;
  // Bump on every change to the content; running executions keep their version.
  version: string;
  label: string;
  objective: string;
  inputs: string[];
  outputs: string[];
  // Business parameters the skill reads (ICP, scoring grid...). They evolve without copying the skill.
  knowledge: string[];
  // Tools (logic functions) the skill expects. A skill never grants rights: the agent's role does.
  tools: string[];
  stopConditions: string[];
  effects: string[];
  tests: string[];
  status: ImplementationStatus;
};

export type AgentKey = 'acquisition' | 'qualification' | 'engagement' | 'deals';

export type AgentTrigger =
  | { type: 'manual' }
  | { type: 'schedule'; description: string }
  | { type: 'event'; description: string };

export type AgentState = 'draft' | 'ready-to-test' | 'active' | 'paused';

export type AgentCard = {
  key: AgentKey;
  // Display code used in the brief, e.g. "A".
  code: string;
  name: string;
  version: string;
  label: string;
  mission: string;
  owner: string;
  skills: SkillKey[];
  dataSources: string[];
  triggers: AgentTrigger[];
  // Jev takes the bounded decisions; the generative model analyses and drafts.
  models: { decisions: string; generation: string };
  allowedActions: string[];
  limits: string[];
  approvals: string[];
  handOff: string;
  state: AgentState;
};
