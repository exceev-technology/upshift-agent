import { defineSkill } from 'twenty-sdk/define';

import { renderSkillContent } from 'src/catalog/render';
import { SKILLS } from 'src/catalog/skills';
import { S6_ANALYSE_REPLY_SKILL_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';

export default defineSkill({
  universalIdentifier: S6_ANALYSE_REPLY_SKILL_UNIVERSAL_IDENTIFIER,
  name: SKILLS.s6.name,
  label: `${SKILLS.s6.code} · ${SKILLS.s6.label}`,
  description: SKILLS.s6.objective,
  icon: 'IconMessageCircle',
  content: renderSkillContent(SKILLS.s6),
});
