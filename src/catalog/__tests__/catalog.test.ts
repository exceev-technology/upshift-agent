import { AGENTS } from 'src/catalog/agents';
import { renderAgentPrompt, renderSkillContent } from 'src/catalog/render';
import { SKILLS } from 'src/catalog/skills';
import type { SkillKey } from 'src/catalog/types';
import * as identifiers from 'src/constants/universal-identifiers';
import { describe, expect, it } from 'vitest';

const UUID_V4 = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;
const SEMVER = /^\d+\.\d+\.\d+$/;

const agents = Object.values(AGENTS);
const skills = Object.values(SKILLS);

const agentsUsing = (key: SkillKey) => agents.filter((agent) => agent.skills.includes(key));

describe('catalogue', () => {
  it('keeps four agents and eight skills', () => {
    expect(agents).toHaveLength(4);
    expect(skills).toHaveLength(8);
  });

  it('only references skills that exist', () => {
    for (const agent of agents) {
      for (const key of agent.skills) {
        expect(SKILLS[key], `${agent.name} → ${key}`).toBeDefined();
      }
    }
  });

  it('uses every skill in at least one agent', () => {
    for (const skill of skills) {
      expect(agentsUsing(skill.key).length, skill.name).toBeGreaterThan(0);
    }
  });

  // Recette « Réutilisation » : un même skill utilisé par au moins deux agents.
  it('shares S3 and S4 between at least two agents', () => {
    expect(agentsUsing('s3').length).toBeGreaterThanOrEqual(2);
    expect(agentsUsing('s4').length).toBeGreaterThanOrEqual(2);
  });

  it('gives unique kebab-case names and semantic versions', () => {
    const names = [...agents, ...skills].map((entry) => entry.name);

    expect(new Set(names).size).toBe(names.length);
    for (const entry of [...agents, ...skills]) {
      expect(entry.name).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(entry.version).toMatch(SEMVER);
    }
  });
});

describe('rendering', () => {
  it('shows the code and version in the skill content', () => {
    const content = renderSkillContent(SKILLS.s3);

    expect(content).toContain('S3 · Qualifier et scorer');
    expect(content).toContain(`version ${SKILLS.s3.version}`);
  });

  it('lists the same skill version in every agent that uses it', () => {
    const reference = `${SKILLS.s3.name} v${SKILLS.s3.version}`;

    for (const agent of agentsUsing('s3')) {
      expect(renderAgentPrompt(agent, SKILLS)).toContain(reference);
    }
  });
});

describe('universal identifiers', () => {
  const values = Object.entries(identifiers).filter(([name]) =>
    name.endsWith('_UNIVERSAL_IDENTIFIER'),
  );

  it('are unique UUID v4', () => {
    const uuids = values.map(([, value]) => value);

    expect(new Set(uuids).size).toBe(uuids.length);
    for (const [name, value] of values) {
      expect(value, name).toMatch(UUID_V4);
    }
  });
});
