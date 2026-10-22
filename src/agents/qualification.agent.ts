import { defineAgent } from 'twenty-sdk/define';

import { AGENTS } from 'src/catalog/agents';
import { renderAgentPrompt } from 'src/catalog/render';
import { SKILLS } from 'src/catalog/skills';
import {
  QUALIFICATION_AGENT_UNIVERSAL_IDENTIFIER,
  QUALIFICATION_ROLE_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineAgent({
  universalIdentifier: QUALIFICATION_AGENT_UNIVERSAL_IDENTIFIER,
  name: AGENTS.qualification.name,
  label: AGENTS.qualification.label,
  description: AGENTS.qualification.mission,
  icon: 'IconTargetArrow',
  responseFormat: { type: 'text' },
  prompt: renderAgentPrompt(AGENTS.qualification, SKILLS),
  roleUniversalIdentifier: QUALIFICATION_ROLE_UNIVERSAL_IDENTIFIER,
});
