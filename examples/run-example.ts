import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import type { UserRequirements } from '../types.ts';
import { generateMaterialHypothesis } from '../services/materialGenerator.ts';
import { validateResearchRequirements } from '../services/researchValidation.ts';

const root = resolve(import.meta.dirname, '..');
const inputPath = resolve(root, 'examples/example-research-question.json');
const outputPath = resolve(root, 'examples/example-output.json');
const requirements = JSON.parse(await readFile(inputPath, 'utf8')) as UserRequirements;
const validation = validateResearchRequirements(requirements);
if (!validation.valid) throw new Error(validation.errors.join(' '));
const record = await generateMaterialHypothesis(requirements);
await writeFile(outputPath, `${JSON.stringify({ requirements, validation, record }, null, 2)}\n`);
console.log(`Wrote ${outputPath}`);
console.log(`Warnings: ${validation.warnings.length}; status: ${record.validationStatus}`);
