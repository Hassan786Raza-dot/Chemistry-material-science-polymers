# Open Issues and Required Research Inputs

This repository is now a safer and more transparent hypothesis workspace, but it is not the missing publication-grade environmental-chemistry analysis pipeline. The following items remain open because the linked repository contains no manuscript, raw measurements, characterization files, adsorption isotherms, kinetic time series, calibration data, or experimental metadata.

| Priority | Open issue | Why it matters | Required input or future work |
|---|---|---|---|
| Critical | No validated polymer structure representation | XYZ syntax does not encode polymer connectivity, bond order, charge, morphology, or repeat-unit boundaries | Supply reviewed molecular graphs/repeat-unit definitions and choose a cheminformatics representation |
| Critical | No experimental data or analytical method | Removal, adsorption capacity, kinetics, selectivity, and uncertainty cannot be estimated | Add raw replicate data, calibration records, blanks, detection limits, units, and instrument metadata |
| Critical | No evidence for safety or regulatory claims | Toxicity, leaching, disposal, and regulatory status are context-specific | Provide jurisdiction, material composition, leachate testing, toxicology evidence, and expert review |
| Important | No literature search or novelty protocol | The tool cannot establish novelty or identify prior art | Add a provenance-preserving literature connector and a human-reviewed evidence set |
| Important | No aqueous equilibrium or speciation model | pH, ionic strength, competing solutes, and charge state can change treatment behavior | Define thermodynamic assumptions and validate against reference systems before implementation |
| Important | No adsorption/kinetic analysis module | The current app does not analyze measurements | Build a separate raw-data analysis package with pre-registered models, residual diagnostics, confidence intervals, and uncertainty propagation |
| Important | No benchmark or external evaluation | Hypothesis quality and warning usefulness are not yet measured | Create a blinded, expert-reviewed benchmark including contradictory and infeasible cases |
| Minor | Timestamp affects exact output bytes | Provenance is useful but makes snapshots differ between runs | Inject a test clock or compare outputs after removing timestamp fields |

Until these issues are resolved, no output from this application should be used as evidence of chemical feasibility, treatment efficacy, toxicity, regulatory compliance, or material novelty.
