import assert from 'node:assert/strict';
import { validateXyz } from '../services/xyzValidation.ts';
import { validateResearchRequirements } from '../services/researchValidation.ts';
import { generateMaterialHypothesis } from '../services/materialGenerator.ts';
import type { UserRequirements } from '../types.ts';

const valid = `2\nwater fragment\nO 0 0 0\nH 0.96 0 0`;
const validResult = validateXyz(valid);
assert.equal(validResult.valid, true);
assert.equal(validResult.atoms.length, 2);
assert.equal(validateXyz(`1\ncomment\nC Infinity 0 0`).valid, false);
assert.equal(validateXyz(`1\ncomment\nXx 0 0 0`).valid, false);
assert.equal(validateXyz(`2\ncomment\nC 0 0 0`).valid, false);
assert.equal(validateXyz(`1\ncomment\nC 0 0 0\nH 1 1 1`).valid, false);

const requirements: UserRequirements = {
  functionality: 'Reversible adsorption',
  targetPollutant: 'Methylene blue',
  waterMatrix: 'Synthetic freshwater',
  operatingConditions: 'pH 6–8, 25 °C, 0.1 g/L',
  compatibility: 'Low leaching',
  regulatoryCompliance: 'Report calibration and blanks',
  conductivity: 'Not specified',
  elasticity: 'Medium',
  biodegradability: 'Medium',
};
const context = validateResearchRequirements(requirements);
assert.equal(context.valid, true);
assert.equal(context.warnings.length, 0);
const first = await generateMaterialHypothesis(requirements);
const second = await generateMaterialHypothesis(requirements);
assert.equal(first.provenance.inputHash, second.provenance.inputHash);
assert.equal(first.validationStatus, 'hypothesis-only');
assert.match(first.validationSummary, /No chemical/);

console.log('Validation and hypothesis-generation tests passed.');
