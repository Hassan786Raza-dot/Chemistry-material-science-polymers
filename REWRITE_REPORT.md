# Repository Rewrite Report

## Step 1 – Current code map

The original repository was a React/Vite interface with generic material-property inputs, a browser-side Gemini client, a prompt that asked a language model to invent materials and synthesis procedures, a permissive XYZ parser, and a heuristic SVG molecule display. It contained no Python scripts, notebooks, environmental-chemistry data, adsorption measurements, statistical models, figures, or paper-generation scripts. The original `services/geminiService.ts` was therefore not an analysis pipeline for the claimed research project.

The rewrite now maps the application explicitly as a **research-hypothesis workspace**. `components/InputForm.tsx` captures target pollutant, water matrix, operating conditions, functionality, compatibility, regulatory needs, and optional properties. `services/materialGenerator.ts` produces a deterministic local hypothesis record. `services/xyzValidation.ts` performs strict syntax and finite-coordinate validation. `components/MoleculeViewer.tsx` displays only a labeled 2D illustration. `components/OutputDisplay.tsx` exposes validation status, limitations, and provenance. `tests/xyzValidation.test.ts` contains regression tests.

## Step 2 – Issues detected and addressed

The original application exposed a Gemini API key through `vite.config.ts` and `services/geminiService.ts`; the external dependency, browser-side client, and environment replacement logic were removed. The original prompt presented generated synthesis text and coordinate strings as plausible validated outputs; the rewrite labels every result `hypothesis-only`, removes the synthesis recipe, and records explicit limitations. The original XYZ check accepted non-finite values and unknown elements; the new validator requires a strict integer count, known element symbols, exact records, and finite coordinates. The original bond inference was removed because distance thresholds cannot validate bond order, charge, polymer connectivity, or chemical feasibility.

The rewrite also removes external CDN imports for the unused model, adds `typecheck` and `test` scripts, adds a lockfile through `npm install`, updates metadata and README claims, and documents that the repository contains no experimental data or publication-grade analysis.

## Step 3 – Improved unbiased pipeline

The intended workflow is now: define the research question and experimental context; create a deterministic hypothesis record; preserve the exact input hash and generator version; inspect the output’s limitations; and require independent chemical, safety, computational, and experimental review before any research use. The application does not perform model selection, data cleaning, outlier removal, adsorption fitting, p-value calculation, or performance prediction, so it cannot silently cherry-pick scientific results.

For the actual environmental-chemistry study, a separate analysis package is still required. It should store raw replicates, define exclusion rules before analysis, report all runs, propagate uncertainty, include controls and calibration, validate adsorption and kinetic assumptions, and generate figures from version-controlled scripts.

## Step 4 – Key rewritten code

The original browser-side model call was replaced by `generateMaterialHypothesis()` in `services/materialGenerator.ts`. The new function uses a local deterministic template and creates an input hash, timestamp, generator identifier, limitations list, and explicit status. `services/xyzValidation.ts` is a pure validation module suitable for unit testing. The output component prevents download of invalid coordinate text and labels the visual as illustrative rather than chemically validated.

These changes improve rigor by eliminating hidden external state, preventing secret exposure, making outputs auditable, and avoiding unsupported chemical claims. They do not transform the repository into a validated chemistry or adsorption-analysis package; that would require the missing manuscript, data, experimental metadata, and domain-specific analysis code.

## Step 5 – Reproducibility and reviewer-facing documentation

`README.md` now documents the scope, limitations, repository map, setup commands, reproducibility requirements, bias checklist, and known limitations. The package defines `npm run test`, `npm run typecheck`, and `npm run build`. No API key is required. The README recommends adding a separate versioned research-analysis package with raw data, metadata, calibration records, an environment lockfile, and a release DOI.

## Step 6 – Final validation checklist

| Check | Command | Result |
|---|---|---|
| Unit/regression tests | `npm run test` | Passed: XYZ validation tests passed |
| Type safety | `npm run typecheck` | Passed with exit code 0 |
| Production build | `npm run build` | Passed; Vite built 38 modules |
| Secret/obsolete model scan | `grep -RIn -E 'gemini|API_KEY|GEMINI'` excluding dependencies and build output | No matches |
| Reproducibility record | Git commit, input hash, generator version, timestamp | Implemented in output provenance |

Before a paper submission, confirm that no hypothesis output is cited as evidence; attach independent chemical and experimental validation; preserve all input records and failed candidates; and create the missing research-analysis repository. The current code is ready as a safer, honest hypothesis-recording application, not as evidence for a polymer water-treatment study.
