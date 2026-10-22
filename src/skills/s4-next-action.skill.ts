import { defineSkill } from 'twenty-sdk/define';

import { renderSkillContent } from 'src/catalog/render';
import { SKILLS } from 'src/catalog/skills';
import { S4_NEXT_ACTION_SKILL_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';

export default defineSkill({
  universalIdentifier: S4_NEXT_ACTION_SKILL_UNIVERSAL_IDENTIFIER,
  name: SKILLS.s4.name,
  label: `${SKILLS.s4.code} · ${SKILLS.s4.label}`,
  description: SKILLS.s4.objective,
  icon: 'IconRoute',
  content: renderSkillContent(SKILLS.s4),
});
