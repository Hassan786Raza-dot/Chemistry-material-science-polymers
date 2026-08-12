import React, { useState } from 'react';
import type { UserRequirements } from '../types';
import { DEFAULT_REQUIREMENTS } from '../types';

interface InputFormProps { onDesign: (requirements: UserRequirements) => void; isLoading: boolean; }

type TextField = { id: keyof UserRequirements; label: string; placeholder: string; required?: boolean };
const fields: TextField[] = [
  { id: 'functionality', label: 'Research functionality', placeholder: 'e.g., reversible adsorption of a charged organic pollutant', required: true },
  { id: 'targetPollutant', label: 'Target pollutant or analyte', placeholder: 'Name, formula, charge state, and concentration range', required: true },
  { id: 'waterMatrix', label: 'Water matrix', placeholder: 'e.g., synthetic freshwater, wastewater, seawater; include competing ions or organic matter' },
  { id: 'operatingConditions', label: 'Operating conditions', placeholder: 'pH, temperature, dosage, contact time, ionic strength, and flow/batch mode' },
  { id: 'compatibility', label: 'Compatibility and safety constraints', placeholder: 'Leaching, toxicity, regeneration, disposal, and material-stability constraints' },
  { id: 'regulatoryCompliance', label: 'Regulatory or reporting needs', placeholder: 'Applicable jurisdiction, standard methods, or required performance benchmarks' },
];
const choices = {
  conductivity: ['Not specified', 'High', 'Medium', 'Low', 'Insulator'],
  elasticity: ['Not specified', 'High', 'Medium', 'Low', 'Rigid'],
  biodegradability: ['Not specified', 'High', 'Medium', 'Low', 'Non-biodegradable'],
} as const;

export const InputForm: React.FC<InputFormProps> = ({ onDesign, isLoading }) => {
  const [requirements, setRequirements] = useState<UserRequirements>(DEFAULT_REQUIREMENTS);
  const [error, setError] = useState('');

  const update = (key: keyof UserRequirements, value: string) => setRequirements((current) => ({ ...current, [key]: value }));
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const missing = ['functionality', 'targetPollutant'].filter((key) => !requirements[key as keyof UserRequirements].trim());
    if (missing.length) { setError('Research functionality and target pollutant are required.'); return; }
    setError('');
    onDesign(requirements);
  };

  return <form onSubmit={submit} className="space-y-5" noValidate>
    <div className="rounded-lg border border-amber-500/40 bg-amber-950/30 p-4 text-sm text-amber-100">
      This workspace creates **hypotheses only**. It does not validate chemistry, predict treatment performance, approve materials, or provide a synthesis protocol.
    </div>
    {fields.map((field) => <label key={field.id} className="block">
      <span className="mb-2 block text-sm font-medium text-brand-primary">{field.label}{field.required ? ' *' : ''}</span>
      <textarea rows={3} value={requirements[field.id]} onChange={(event) => update(field.id, event.target.value)} placeholder={field.placeholder} required={field.required} className="w-full rounded-lg border border-brand-secondary bg-brand-dark/60 px-3 py-2 text-brand-light outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/40" />
    </label>)}
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {(Object.keys(choices) as Array<keyof typeof choices>).map((key) => <label key={key} className="block">
        <span className="mb-2 block text-sm font-medium capitalize text-brand-primary">{key}</span>
        <select value={requirements[key]} onChange={(event) => update(key, event.target.value)} className="w-full rounded-lg border border-brand-secondary bg-brand-dark/60 px-3 py-2 text-brand-light">
          {choices[key].map((option) => <option key={option}>{option}</option>)}
        </select>
      </label>)}
    </div>
    {error && <p role="alert" className="text-sm text-red-300">{error}</p>}
    <button type="submit" disabled={isLoading} className="w-full rounded-lg bg-brand-primary px-4 py-3 font-bold text-brand-dark transition hover:bg-teal-300 disabled:cursor-not-allowed disabled:bg-gray-500">
      {isLoading ? 'Preparing hypothesis…' : 'Create hypothesis record'}
    </button>
  </form>;
};
