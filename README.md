# Research Hypothesis Workspace

This repository is a **transparent hypothesis-recording tool** for polymer-based environmental chemistry questions. It captures the target pollutant, water matrix, operating conditions, compatibility constraints, and desired material properties, then creates a deterministic local record with explicit limitations and provenance.

It is **not** an adsorption-analysis pipeline, molecular-simulation package, synthesis planner, regulatory assessment, or evidence of treatment performance. The repository contains no experimental data and makes no claims about removal capacity, kinetics, toxicity, novelty, or chemical feasibility.

## Scope and scientific safeguards

The application deliberately avoids browser-side API keys and external model calls. Its current generator is a local template (`services/materialGenerator.ts`) so the same inputs produce the same candidate description apart from the creation timestamp. Every output is labeled `hypothesis-only`. The XYZ fragment is illustrative and must not be used as a validated molecular graph, simulation input, or synthesis specification.

For a publication-grade study, add separate versioned folders for raw data, metadata, analysis scripts, figures, and supporting information. Report independent experimental replicates, calibration, uncertainty, controls, mass balance, matrix effects, and all failed or excluded runs using pre-specified exclusion rules.

## Requirements

Use Node.js 22 or another current LTS release, npm, and a modern browser. No API key or external service is required.

```bash
npm install
npm run typecheck
npm run build
npm run test
```

`npm run build` creates the production bundle in `dist/`. `npm run typecheck` runs the TypeScript compiler without emitting files. `npm run test` runs the deterministic validation tests.

## Repository map

| Path | Role | Inputs | Outputs |
|---|---|---|---|
| `components/InputForm.tsx` | Captures explicit research context | User-entered requirements | Typed `UserRequirements` |
| `services/materialGenerator.ts` | Creates a local hypothesis record | `UserRequirements` | `MaterialData` with limitations and provenance |
| `services/xyzValidation.ts` | Strictly parses XYZ text | XYZ string | Parsed atoms and validation errors |
| `components/MoleculeViewer.tsx` | Displays a 2D illustration | Validated XYZ fragment | Non-interpretive SVG illustration |
| `components/OutputDisplay.tsx` | Displays status, limitations, and provenance | `MaterialData` | Reviewer-facing record and optional download |
| `tests/` | Regression checks | Fixtures and pure functions | Pass/fail results |

## Reproducibility and bias checklist

Before using any output in a paper, record the Git commit, Node version, npm version, input text, input hash, generator version, and creation timestamp. Confirm that the output remains labeled as a hypothesis and that no sentence is presented as experimentally or computationally validated without supporting evidence.

For an actual adsorption or materials study, do not add selective filtering in the user interface. Store every run, preserve raw files, define exclusion criteria before analysis, report independent replicates and uncertainty, and generate every figure from version-controlled scripts. A separate research-analysis package should include an environment lockfile, raw-data manifest, data dictionary, calibration records, and a release DOI.

## Known limitations

The local generator does not search literature, infer polymer connectivity, calculate molecular properties, model aqueous equilibria, fit isotherms or kinetics, assess toxicity, check regulations, or perform laboratory validation. The XYZ validator checks file syntax and finite coordinates only; it does not verify bond orders, charges, stereochemistry, polymer morphology, or chemical feasibility.
