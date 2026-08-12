import assert from 'node:assert/strict';
import { validateXyz } from '../services/xyzValidation.ts';

const valid = `2\nwater fragment\nO 0 0 0\nH 0.96 0 0`;
const validResult = validateXyz(valid);
assert.equal(validResult.valid, true);
assert.equal(validResult.atoms.length, 2);

assert.equal(validateXyz(`1\ncomment\nC Infinity 0 0`).valid, false);
assert.equal(validateXyz(`1\ncomment\nXx 0 0 0`).valid, false);
assert.equal(validateXyz(`2\ncomment\nC 0 0 0`).valid, false);
assert.equal(validateXyz(`1\ncomment\nC 0 0 0\nH 1 1 1`).valid, false);

console.log('XYZ validation tests passed.');
