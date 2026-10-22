import { defineSkill } from 'twenty-sdk/define';

import { renderSkillContent } from 'src/catalog/render';
import { SKILLS } from 'src/catalog/skills';
import { S2_ENRICH_DEDUPLICATE_SKILL_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';

export default defineSkill({
  universalIdentifier: S2_ENRICH_DEDUPLICATE_SKILL_UNIVERSAL_IDENTIFIER,
  name: SKILLS.s2.name,
  label: `${SKILLS.s2.code} · ${SKILLS.s2.label}`,
  description: SKILLS.s2.objective,
  icon: 'IconUserSearch',
  content: renderSkillContent(SKILLS.s2),
});
