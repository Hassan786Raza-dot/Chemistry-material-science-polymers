# Usage Guide

## Run the local application

Install dependencies and start the Vite development server:

```bash
npm install
npm run dev
```

The browser interface records a research question and produces a local hypothesis record. Complete at least the functionality and target-pollutant fields. Review every warning before treating the record as an experimental design input.

## Run the reproducible example

The repository includes a complete example that does not require an API key or network access:

```bash
npm install
npm run example
```

The command reads `examples/example-research-question.json`, validates the research context, runs the deterministic local generator, and writes `examples/example-output.json`. The output contains the original requirements, validation warnings, a hypothesis-only material record, an input hash, generator version, and timestamp.

## Interpret the output correctly

The output is a structured starting point for literature review and experimental planning. It is not a molecular simulation, adsorption prediction, toxicity assessment, regulatory determination, or synthesis protocol. The XYZ fragment is illustrative and is validated only for basic file structure and finite coordinates. A researcher must independently verify chemical identity, polymer connectivity, charge, morphology, stability, leaching, analytical calibration, and treatment performance.

## Research-analysis integration hook

This repository intentionally does not fabricate adsorption or kinetics data. A future analysis module should accept raw, immutable measurements using an explicit schema with columns for experiment ID, independent batch, pollutant, matrix, pH, temperature, dose, contact time, initial concentration, equilibrium concentration, measured uncertainty, and analytical method. It should then calculate mass-balance quantities with units, retain every observation, apply pre-registered exclusion rules, and report uncertainty and diagnostics. Any model-fitting module should expose residuals, parameter confidence intervals, goodness-of-fit, and sensitivity to starting values rather than returning only a preferred fit.

## Validation commands

```bash
npm run test
npm run typecheck
npm run build
npm run example
```

The first three commands test the application. The final command tests the end-to-end example and regenerates its output file. Do not commit `examples/example-output.json` if timestamps are undesirable for your workflow; use it as a local smoke-test artifact or replace timestamps with a fixed test clock in CI.
