import { defineSkill } from 'twenty-sdk/define';

import { renderSkillContent } from 'src/catalog/render';
import { SKILLS } from 'src/catalog/skills';
import { S5_PREPARE_CONTACT_SKILL_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';

export default defineSkill({
  universalIdentifier: S5_PREPARE_CONTACT_SKILL_UNIVERSAL_IDENTIFIER,
  name: SKILLS.s5.name,
  label: `${SKILLS.s5.code} · ${SKILLS.s5.label}`,
  description: SKILLS.s5.objective,
  icon: 'IconMail',
  content: renderSkillContent(SKILLS.s5),
});
