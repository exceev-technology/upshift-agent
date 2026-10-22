import { defineSkill } from 'twenty-sdk/define';

import { renderSkillContent } from 'src/catalog/render';
import { SKILLS } from 'src/catalog/skills';
import { S7_ORGANISE_FOLLOW_UP_SKILL_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';

export default defineSkill({
  universalIdentifier: S7_ORGANISE_FOLLOW_UP_SKILL_UNIVERSAL_IDENTIFIER,
  name: SKILLS.s7.name,
  label: `${SKILLS.s7.code} · ${SKILLS.s7.label}`,
  description: SKILLS.s7.objective,
  icon: 'IconCalendarEvent',
  content: renderSkillContent(SKILLS.s7),
});
