import type { UserRequirements } from '../types';

export interface ResearchValidation {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Performs transparent input sanity checks only. It does not establish chemical
 * feasibility, adsorption performance, toxicity, or regulatory compliance.
 */
export function validateResearchRequirements(requirements: UserRequirements): ResearchValidation {
  const errors: string[] = [];
  const warnings: string[] = [];
  if (!requirements.functionality.trim()) errors.push('Research functionality is required.');
  if (!requirements.targetPollutant.trim()) errors.push('Target pollutant or analyte is required.');
  if (!requirements.waterMatrix.trim()) warnings.push('Water matrix is unspecified; matrix effects cannot be assessed.');
  if (!requirements.operatingConditions.trim()) warnings.push('Operating conditions are unspecified; no treatment comparison can be designed.');
  if (!requirements.compatibility.trim()) warnings.push('Compatibility and safety constraints are unspecified.');
  if (!requirements.regulatoryCompliance.trim()) warnings.push('Regulatory/reporting requirements are unspecified.');

  const text = `${requirements.functionality} ${requirements.operatingConditions}`.toLowerCase();
  if (/(drink|potable|medical|implant|clinical)/.test(text)) warnings.push('This use case may require dedicated toxicology, exposure, ethics, and regulatory review.');
  if (/(highly conductive|high conductivity)/.test(text) && /(insulat|electrical insulation)/.test(text)) warnings.push('Conductivity and insulation requirements appear contradictory; resolve this before experimental design.');
  if (/(negative ph|ph\s*[-−]\d)/.test(text)) errors.push('The operating conditions contain an impossible negative pH statement.');
  if (/(temperature|temp)[^\d]{0,12}(-?\d{3,})\s*°?c/.test(text)) warnings.push('Check the stated temperature range and document material stability at that temperature.');
  return { valid: errors.length === 0, errors, warnings };
}
