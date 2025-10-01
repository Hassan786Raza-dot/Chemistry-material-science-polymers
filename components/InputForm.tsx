import React, { useState } from 'react';
import type { UserRequirements } from '../types';
import { BeakerIcon } from './icons/BeakerIcon';
import { WandIcon } from './icons/WandIcon';

interface InputFormProps {
  onDesign: (requirements: UserRequirements) => void;
  isLoading: boolean;
}

const FormField: React.FC<{
  id: keyof UserRequirements;
  label: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  error?: string;
}> = ({ id, label, placeholder, value, onChange, error }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-brand-primary mb-2">
      {label}
    </label>
    <textarea
      id={id}
      name={id}
      rows={3}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full bg-brand-dark/50 border rounded-lg px-3 py-2 text-brand-light focus:ring-2 transition duration-200 ${
        error 
        ? 'border-red-500 ring-red-500' 
        : 'border-brand-secondary focus:ring-brand-primary focus:border-brand-primary'
      }`}
      required={id === 'functionality' || id === 'useCase'}
      aria-invalid={!!error}
      aria-describedby={error ? `${id}-error` : undefined}
    />
    {error && <p id={`${id}-error`} className="mt-2 text-sm text-red-400 animate-fade-in">{error}</p>}
  </div>
);

const SelectField: React.FC<{
  id: keyof UserRequirements;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: readonly string[];
}> = ({ id, label, value, onChange, options }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-brand-primary mb-2">
      {label}
    </label>
    <select
      id={id}
      name={id}
      value={value}
      onChange={onChange}
      className="w-full bg-brand-dark/50 border border-brand-secondary rounded-lg px-3 py-2 text-brand-light focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition duration-200"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

const CONDUCTIVITY_OPTIONS = ['Not Required', 'High', 'Medium', 'Low', 'Insulator'] as const;
const ELASTICITY_OPTIONS = ['Not Required', 'High', 'Medium', 'Low', 'Rigid'] as const;
const BIODEGRADABILITY_OPTIONS = ['Not Required', 'High', 'Medium', 'Low', 'Non-biodegradable'] as const;

export const InputForm: React.FC<InputFormProps> = ({ onDesign, isLoading }) => {
  const [requirements, setRequirements] = useState<UserRequirements>({
    functionality: '',
    useCase: '',
    compatibility: '',
    environment: '',
    conductivity: 'Not Required',
    elasticity: 'Not Required',
    biodegradability: 'Not Required',
    regulatoryCompliance: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof UserRequirements, string>>>({});

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof UserRequirements, string>> = {};
    if (!requirements.functionality.trim()) {
      newErrors.functionality = 'Material Functionality is a required field.';
    }
    if (!requirements.useCase.trim()) {
      newErrors.useCase = 'Intended Use / Application is a required field.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setRequirements((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof UserRequirements]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof UserRequirements];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onDesign(requirements);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center gap-3">
        <BeakerIcon className="w-8 h-8 text-brand-primary" />
        <h2 className="text-2xl font-bold text-brand-primary tracking-wide">Define Your Material</h2>
      </div>

      <FormField
        id="functionality"
        label="Material Functionality*"
        placeholder="e.g., Biodegradable polymer with high tensile strength and self-healing properties."
        value={requirements.functionality}
        onChange={handleChange}
        error={errors.functionality}
      />
      <FormField
        id="useCase"
        label="Intended Use / Application*"
        placeholder="e.g., Flexible electronics, smart textiles, or medical implants."
        value={requirements.useCase}
        onChange={handleChange}
        error={errors.useCase}
      />
      <FormField
        id="compatibility"
        label="Compatibility Requirements"
        placeholder="e.g., Must be non-toxic, biocompatible with human tissue, and soluble in water."
        value={requirements.compatibility}
        onChange={handleChange}
      />
      <FormField
        id="environment"
        label="Operating Environment"
        placeholder="e.g., Stable in humid conditions, temperatures from -20°C to 80°C, and resistant to UV radiation."
        value={requirements.environment}
        onChange={handleChange}
      />
      
      <div className="pt-4 border-t border-brand-secondary/50">
         <h3 className="text-lg font-semibold text-brand-light mb-4">Specific Properties</h3>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
           <SelectField
            id="conductivity"
            label="Conductivity"
            value={requirements.conductivity}
            onChange={handleChange}
            options={CONDUCTIVITY_OPTIONS}
           />
           <SelectField
            id="elasticity"
            label="Elasticity"
            value={requirements.elasticity}
            onChange={handleChange}
            options={ELASTICITY_OPTIONS}
           />
           <SelectField
            id="biodegradability"
            label="Biodegradability"
            value={requirements.biodegradability}
            onChange={handleChange}
            options={BIODEGRADABILITY_OPTIONS}
           />
         </div>
         <FormField
            id="regulatoryCompliance"
            label="Regulatory & Compliance Needs"
            placeholder="e.g., FDA-approved for medical devices, RoHS compliant for electronics."
            value={requirements.regulatoryCompliance}
            onChange={handleChange}
          />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-3 bg-brand-primary hover:bg-teal-400 disabled:bg-gray-500 text-brand-dark font-bold py-3 px-4 rounded-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
      >
        {isLoading ? (
          <>
            <div className="w-5 h-5 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
            Designing...
          </>
        ) : (
          <>
            <WandIcon className="w-6 h-6" />
            Design Material
          </>
        )}
      </button>
    </form>
  );
};