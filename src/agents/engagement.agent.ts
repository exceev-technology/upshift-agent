import { defineAgent } from 'twenty-sdk/define';

import { AGENTS } from 'src/catalog/agents';
import { renderAgentPrompt } from 'src/catalog/render';
import { SKILLS } from 'src/catalog/skills';
import {
  ENGAGEMENT_AGENT_UNIVERSAL_IDENTIFIER,
  ENGAGEMENT_ROLE_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineAgent({
  universalIdentifier: ENGAGEMENT_AGENT_UNIVERSAL_IDENTIFIER,
  name: AGENTS.engagement.name,
  label: AGENTS.engagement.label,
  description: AGENTS.engagement.mission,
  icon: 'IconMessages',
  responseFormat: { type: 'text' },
  prompt: renderAgentPrompt(AGENTS.engagement, SKILLS),
  roleUniversalIdentifier: ENGAGEMENT_ROLE_UNIVERSAL_IDENTIFIER,
});
