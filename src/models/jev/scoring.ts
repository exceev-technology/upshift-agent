import type { JevQuestions, JevScoreAnswer } from 'src/models/jev/types';

// Interpretable qualification score (brief §11): separate dimensions, described levels,
// versioned business weights. Exclusion conditions are checked in code before any action.

export type QualificationDimension = 'fit' | 'need' | 'intent' | 'timing';

export const QUALIFICATION_DIMENSIONS: QualificationDimension[] = ['fit', 'need', 'intent', 'timing'];

export type ScoringGrid = {
  version: string;
  // Level descriptions are the Jev Score criteria, from the lowest to the highest.
  dimensions: Record<QualificationDimension, { instructions: string; levels: string[]; weight: number }>;
};

export const buildScoreQuestions = (grid: ScoringGrid): JevQuestions =>
  Object.fromEntries(
    QUALIFICATION_DIMENSIONS.map((dimension) => [
      dimension,
      {
        type: 'score' as const,
        instructions: grid.dimensions[dimension].instructions,
        criteria: grid.dimensions[dimension].levels,
      },
    ]),
  );

// A Jev Score is the probability-weighted mean of the level indexes, from 0 to levels - 1.
export const scoreToPercent = (answer: Pick<JevScoreAnswer, 'score'>, levelCount: number) => {
  if (levelCount < 2) {
    throw new RangeError('A score needs at least two levels');
  }

  const topLevel = levelCount - 1;

  // Out-of-range scores are refused rather than clamped: they signal a malformed answer.
  if (answer.score < 0 || answer.score > topLevel + 1e-9) {
    throw new RangeError(`Score ${answer.score} is outside 0–${topLevel}`);
  }

  return Math.round((Math.min(answer.score, topLevel) / topLevel) * 1000) / 10;
};

export type DimensionResult =
  | { status: 'evaluated'; percent: number; confidence: number }
  // Unknown is not negative: the dimension is left out and reported.
  | { status: 'unknown'; reason: string };

export type PriorityResult = {
  gridVersion: string;
  // Weighted over the evaluated dimensions only; null when nothing could be evaluated.
  priority: number | null;
  // Share of the total weight that was evaluated, displayed next to the priority.
  coverage: number;
  unknown: QualificationDimension[];
  lowestConfidence: number | null;
};

// A priority on the business grid, not a probability of signing.
export const combinePriority = (
  grid: ScoringGrid,
  results: Record<QualificationDimension, DimensionResult>,
): PriorityResult => {
  let weightedSum = 0;
  let evaluatedWeight = 0;
  let totalWeight = 0;
  let lowestConfidence: number | null = null;
  const unknown: QualificationDimension[] = [];

  for (const dimension of QUALIFICATION_DIMENSIONS) {
    const { weight } = grid.dimensions[dimension];
    const result = results[dimension];

    totalWeight += weight;

    if (result.status === 'unknown') {
      unknown.push(dimension);
      continue;
    }

    weightedSum += result.percent * weight;
    evaluatedWeight += weight;
    lowestConfidence =
      lowestConfidence === null ? result.confidence : Math.min(lowestConfidence, result.confidence);
  }

  return {
    gridVersion: grid.version,
    priority: evaluatedWeight > 0 ? Math.round((weightedSum / evaluatedWeight) * 10) / 10 : null,
    coverage: totalWeight > 0 ? evaluatedWeight / totalWeight : 0,
    unknown,
    lowestConfidence,
  };
};

export type ConfidenceThresholds = { act: number; verify: number };

export type ConfidenceDecision = 'act' | 'verify' | 'collect-more';

// Tune thresholds on the calibration cases (brief §15). A high confidence never replaces
// the permissions or a mandatory approval.
export const decideOnConfidence = (
  confidence: number,
  thresholds: ConfidenceThresholds,
): ConfidenceDecision => {
  if (confidence >= thresholds.act) {
    return 'act';
  }

  return confidence >= thresholds.verify ? 'verify' : 'collect-more';
};
