import { defineSkill } from 'twenty-sdk/define';

import { renderSkillContent } from 'src/catalog/render';
import { SKILLS } from 'src/catalog/skills';
import { S8_PREPARE_OFFER_SKILL_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';

export default defineSkill({
  universalIdentifier: S8_PREPARE_OFFER_SKILL_UNIVERSAL_IDENTIFIER,
  name: SKILLS.s8.name,
  label: `${SKILLS.s8.code} · ${SKILLS.s8.label}`,
  description: SKILLS.s8.objective,
  icon: 'IconFileInvoice',
  content: renderSkillContent(SKILLS.s8),
});
