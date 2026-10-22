import { defineAgent } from 'twenty-sdk/define';

import { AGENTS } from 'src/catalog/agents';
import { renderAgentPrompt } from 'src/catalog/render';
import { SKILLS } from 'src/catalog/skills';
import {
  ACQUISITION_AGENT_UNIVERSAL_IDENTIFIER,
  ACQUISITION_ROLE_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineAgent({
  universalIdentifier: ACQUISITION_AGENT_UNIVERSAL_IDENTIFIER,
  name: AGENTS.acquisition.name,
  label: AGENTS.acquisition.label,
  description: AGENTS.acquisition.mission,
  icon: 'IconRadar',
  responseFormat: { type: 'text' },
  prompt: renderAgentPrompt(AGENTS.acquisition, SKILLS),
  roleUniversalIdentifier: ACQUISITION_ROLE_UNIVERSAL_IDENTIFIER,
});
