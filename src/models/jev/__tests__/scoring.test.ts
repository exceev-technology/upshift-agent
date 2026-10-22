import {
  buildScoreQuestions,
  combinePriority,
  decideOnConfidence,
  scoreToPercent,
  type ScoringGrid,
} from 'src/models/jev/scoring';
import { describe, expect, it } from 'vitest';

const levels = ['Faible', 'Moyen', 'Fort'];

// Test grid only: the real grid comes from the business research.
const grid: ScoringGrid = {
  version: 'test-1',
  dimensions: {
    fit: { instructions: 'Adéquation du prospect au profil client idéal', levels, weight: 0.4 },
    need: { instructions: 'Pertinence du besoin documenté', levels, weight: 0.3 },
    intent: { instructions: "Force du signal d'intention", levels, weight: 0.2 },
    timing: { instructions: 'Temporalité du projet', levels, weight: 0.1 },
  },
};

const evaluated = (percent: number, confidence = 0.8) => ({
  status: 'evaluated' as const,
  percent,
  confidence,
});

describe('scoreToPercent', () => {
  it('normalises the documented example (1.43 on three levels)', () => {
    expect(scoreToPercent({ score: 1.43 }, 3)).toBe(71.5);
  });

  it('refuses a scale with fewer than two levels', () => {
    expect(() => scoreToPercent({ score: 0 }, 1)).toThrow(RangeError);
  });

  it('refuses a score outside the scale instead of clamping it', () => {
    expect(() => scoreToPercent({ score: 2.5 }, 3)).toThrow(RangeError);
  });
});

describe('buildScoreQuestions', () => {
  it('asks one Score question per dimension with ordered levels', () => {
    const questions = buildScoreQuestions(grid);

    expect(Object.keys(questions)).toEqual(['fit', 'need', 'intent', 'timing']);
    expect(questions.fit).toEqual({ type: 'score', instructions: grid.dimensions.fit.instructions, criteria: levels });
  });
});

describe('combinePriority', () => {
  it('weights the evaluated dimensions with the grid', () => {
    const result = combinePriority(grid, {
      fit: evaluated(100),
      need: evaluated(50, 0.6),
      intent: evaluated(0),
      timing: evaluated(100),
    });

    expect(result).toMatchObject({ gridVersion: 'test-1', priority: 65, unknown: [], lowestConfidence: 0.6 });
    expect(result.coverage).toBeCloseTo(1);
  });

  it('treats an unknown dimension as missing, not as zero', () => {
    const result = combinePriority(grid, {
      fit: evaluated(100),
      need: evaluated(50),
      intent: { status: 'unknown', reason: 'Aucun signal observé' },
      timing: evaluated(100),
    });

    expect(result.priority).toBe(81.3);
    expect(result.coverage).toBeCloseTo(0.8);
    expect(result.unknown).toEqual(['intent']);
  });

  it('gives no priority when nothing could be evaluated', () => {
    const unknown = { status: 'unknown' as const, reason: 'Données insuffisantes' };
    const result = combinePriority(grid, { fit: unknown, need: unknown, intent: unknown, timing: unknown });

    expect(result).toMatchObject({ priority: null, coverage: 0, lowestConfidence: null });
  });
});

describe('decideOnConfidence', () => {
  const thresholds = { act: 0.8, verify: 0.5 };

  it('maps confidence to act, verify or collect-more', () => {
    expect(decideOnConfidence(0.9, thresholds)).toBe('act');
    expect(decideOnConfidence(0.6, thresholds)).toBe('verify');
    expect(decideOnConfidence(0.2, thresholds)).toBe('collect-more');
  });
});
