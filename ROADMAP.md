# Research Roadmap

## Near term: 1–2 months

Add a versioned JSON Schema for research-question records and output provenance. Add browser-accessible export of the full input, warnings, output, and software revision. Add accessibility and usability testing with environmental-chemistry researchers. Add deterministic clock injection for reproducible tests and continuous integration for `npm run test`, `npm run typecheck`, `npm run build`, and `npm run example`.

Define a reviewed data contract for future experimental measurements, including units, independent-batch identifiers, blanks, calibration metadata, uncertainty, and exclusion reasons. Do not add model fitting until a real, documented dataset is supplied.

## Medium term: 3–6 months

Implement an optional literature-review connector that stores source URLs, retrieval dates, search terms, and quoted evidence. It must distinguish retrieved evidence from model-generated suggestions and never claim novelty from an incomplete search. Add a cheminformatics validation service that checks molecular graph consistency, valence, formal charge, stereochemistry, and polymer repeat-unit representation.

Create a separate analysis package for curated adsorption data. It should implement unit-safe mass balance, uncertainty propagation, independent-replicate handling, transparent Langmuir/Freundlich and kinetic model comparisons, residual diagnostics, confidence intervals, and sensitivity analyses. The package should include reviewed reference datasets and negative controls rather than simulated evidence.

## Long term: research collaboration

Integrate validated quantum-chemistry and molecular-simulation workflows with pinned software versions, input decks, convergence criteria, and benchmark systems. Add aqueous speciation and equilibrium modeling only after selecting and documenting thermodynamic assumptions. Add toxicity and regulatory modules only through authoritative, jurisdiction-specific sources with provenance and expert review. Establish a collaborative benchmark of polymer sorbents with raw data, batch metadata, failed runs, and persistent identifiers.
