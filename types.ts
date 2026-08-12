export interface UserRequirements {
  functionality: string;
  targetPollutant: string;
  waterMatrix: string;
  operatingConditions: string;
  compatibility: string;
  regulatoryCompliance: string;
  conductivity: string;
  elasticity: string;
  biodegradability: string;
}

export type ValidationStatus = 'hypothesis-only' | 'chemically-reviewed' | 'experimentally-validated';

export interface MaterialData {
  materialName: string;
  description: string;
  xyzCoordinates: string;
  synthesisMethodology: string;
  validationSummary: string;
  validationStatus: ValidationStatus;
  limitations: string[];
  provenance: {
    generator: string;
    promptVersion: string;
    createdAt: string;
    inputHash: string;
  };
}

export interface XyzAtom {
  element: string;
  x: number;
  y: number;
  z: number;
}

export interface XyzValidation {
  valid: boolean;
  errors: string[];
  atomCount: number;
  atoms: XyzAtom[];
}

export const DEFAULT_REQUIREMENTS: UserRequirements = {
  functionality: '',
  targetPollutant: '',
  waterMatrix: '',
  operatingConditions: '',
  compatibility: '',
  regulatoryCompliance: '',
  conductivity: 'Not specified',
  elasticity: 'Not specified',
  biodegradability: 'Not specified',
};

export const VALIDATION_STATUS_LABELS: Record<ValidationStatus, string> = {
  'hypothesis-only': 'Hypothesis only — not chemically or experimentally validated',
  'chemically-reviewed': 'Chemically reviewed — experimental validation still required',
  'experimentally-validated': 'Experimentally validated — attach supporting evidence',
};
