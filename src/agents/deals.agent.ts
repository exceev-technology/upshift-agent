import { defineAgent } from 'twenty-sdk/define';

import { AGENTS } from 'src/catalog/agents';
import { renderAgentPrompt } from 'src/catalog/render';
import { SKILLS } from 'src/catalog/skills';
import {
  DEALS_AGENT_UNIVERSAL_IDENTIFIER,
  DEALS_ROLE_UNIVERSAL_IDENTIFIER,
} from 'src/constants/universal-identifiers';

export default defineAgent({
  universalIdentifier: DEALS_AGENT_UNIVERSAL_IDENTIFIER,
  name: AGENTS.deals.name,
  label: AGENTS.deals.label,
  description: AGENTS.deals.mission,
  icon: 'IconBriefcase',
  responseFormat: { type: 'text' },
  prompt: renderAgentPrompt(AGENTS.deals, SKILLS),
  roleUniversalIdentifier: DEALS_ROLE_UNIVERSAL_IDENTIFIER,
});
