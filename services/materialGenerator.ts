import type { MaterialData, UserRequirements } from '../types';

const PROMPT_VERSION = 'local-template-v1';

function stableHash(input: string): string {
  let hash = 2166136261;
  for (let i = 0; i < input.length; i += 1) hash = Math.imul(hash ^ input.charCodeAt(i), 16777619);
  return (hash >>> 0).toString(16).padStart(8, '0');
}

function buildInputString(requirements: UserRequirements): string {
  return Object.entries(requirements).map(([key, value]) => `${key}=${value.trim()}`).join('|');
}

export async function generateMaterialHypothesis(requirements: UserRequirements): Promise<MaterialData> {
  const input = buildInputString(requirements);
  const inputHash = stableHash(input);
  const pollutant = requirements.targetPollutant.trim() || 'the target pollutant';
  const matrix = requirements.waterMatrix.trim() || 'the specified water matrix';
  const materialName = `Candidate polymer sorbent ${inputHash.slice(0, 6).toUpperCase()}`;
  const xyzCoordinates = `6\nIllustrative placeholder repeat-unit fragment; not a validated structure\nC 0.000 0.000 0.000\nC 1.540 0.000 0.000\nO 2.100 1.200 0.000\nC 3.540 1.200 0.000\nO 4.100 2.400 0.000\nH -0.600 0.900 0.000`;

  return {
    materialName,
    description: `This is a literature-screening hypothesis for a polymer-based sorbent intended to investigate ${pollutant} removal from ${matrix}. The candidate is not a discovered material, and the placeholder coordinates are not a molecular model. The stated functionality is: ${requirements.functionality || 'not specified'}.`,
    xyzCoordinates,
    synthesisMethodology: 'Do not use this text as an experimental procedure. Before any laboratory work, define a complete reaction scheme, verify reagent and hazard information, calculate stoichiometry, select controls, and obtain qualified chemical-safety review. The current repository intentionally provides no synthetic recipe.',
    validationSummary: 'No chemical, computational, toxicological, adsorption, or experimental validation has been performed. This output is a structured hypothesis record only. A valid study must measure independent replicates and report uncertainty, controls, calibration, mass balance, and matrix effects.',
    validationStatus: 'hypothesis-only',
    limitations: [
      'No literature search or novelty check was performed.',
      'No polymer connectivity, molecular weight, morphology, charge state, or aqueous stability is represented.',
      'No adsorption capacity, kinetics, selectivity, regeneration, toxicity, or regulatory conclusion can be inferred.',
      'The XYZ fragment is illustrative and must not be submitted to simulation or used as a synthesis specification without expert review.',
    ],
    provenance: {
      generator: 'local deterministic template; no external model call',
      promptVersion: PROMPT_VERSION,
      createdAt: new Date().toISOString(),
      inputHash,
    },
  };
}
