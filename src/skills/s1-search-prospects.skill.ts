import { defineSkill } from 'twenty-sdk/define';

import { renderSkillContent } from 'src/catalog/render';
import { SKILLS } from 'src/catalog/skills';
import { S1_SEARCH_SKILL_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';

export default defineSkill({
  universalIdentifier: S1_SEARCH_SKILL_UNIVERSAL_IDENTIFIER,
  name: SKILLS.s1.name,
  label: `${SKILLS.s1.code} · ${SKILLS.s1.label}`,
  description: SKILLS.s1.objective,
  icon: 'IconSearch',
  content: renderSkillContent(SKILLS.s1),
});
