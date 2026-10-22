import { defineSkill } from 'twenty-sdk/define';

import { renderSkillContent } from 'src/catalog/render';
import { SKILLS } from 'src/catalog/skills';
import { S3_QUALIFY_SCORE_SKILL_UNIVERSAL_IDENTIFIER } from 'src/constants/universal-identifiers';

export default defineSkill({
  universalIdentifier: S3_QUALIFY_SCORE_SKILL_UNIVERSAL_IDENTIFIER,
  name: SKILLS.s3.name,
  label: `${SKILLS.s3.code} · ${SKILLS.s3.label}`,
  description: SKILLS.s3.objective,
  icon: 'IconGauge',
  content: renderSkillContent(SKILLS.s3),
});
