import React, { useMemo } from 'react';
import type { MaterialData } from '../types';
import { VALIDATION_STATUS_LABELS } from '../types';
import { validateXyz } from '../services/xyzValidation';
import { MoleculeViewer } from './MoleculeViewer';

export const OutputDisplay: React.FC<{ data: MaterialData }> = ({ data }) => {
  const xyz = useMemo(() => validateXyz(data.xyzCoordinates), [data.xyzCoordinates]);
  const download = () => {
    if (!xyz.valid) return;
    const safeName = data.materialName.replace(/[^a-zA-Z0-9_-]+/g, '_').slice(0, 80) || 'hypothesis';
    const url = URL.createObjectURL(new Blob([data.xyzCoordinates], { type: 'text/plain;charset=utf-8' }));
    const link = document.createElement('a'); link.href = url; link.download = `${safeName}.xyz`; link.click(); URL.revokeObjectURL(url);
  };

  return <article className="w-full space-y-5" aria-live="polite">
    <div className="rounded-lg border border-amber-500/60 bg-amber-950/40 p-4">
      <strong className="block text-amber-200">{VALIDATION_STATUS_LABELS[data.validationStatus]}</strong>
      <span className="mt-1 block text-sm text-amber-100">A generated record is not evidence of treatment performance, safety, novelty, or synthesis feasibility.</span>
    </div>
    <header>
      <h3 className="text-3xl font-bold text-brand-primary">{data.materialName}</h3>
      <p className="mt-2 whitespace-pre-wrap text-gray-300">{data.description}</p>
    </header>
    <section className="rounded-lg border border-brand-secondary/50 bg-brand-dark/50 p-4"><h4 className="mb-2 text-lg font-semibold">Rationale and boundaries</h4><p className="whitespace-pre-wrap text-gray-300">{data.validationSummary}</p></section>
    <section className="rounded-lg border border-brand-secondary/50 bg-brand-dark/50 p-4"><h4 className="mb-2 text-lg font-semibold">What must happen before research use</h4><p className="whitespace-pre-wrap text-gray-300">{data.synthesisMethodology}</p><ul className="mt-3 list-disc space-y-1 pl-5 text-sm text-gray-300">{data.limitations.map((item) => <li key={item}>{item}</li>)}</ul></section>
    <section><h4 className="mb-2 text-center text-lg font-semibold">Illustrative coordinate fragment</h4><div className="aspect-square rounded-md border border-brand-secondary bg-brand-dark p-4">{xyz.valid ? <MoleculeViewer xyzData={data.xyzCoordinates} /> : <div className="text-red-300">Invalid XYZ record: {xyz.errors.join(' ')}</div>}</div><button type="button" onClick={download} disabled={!xyz.valid} className="mt-3 w-full rounded-lg bg-green-700 px-4 py-2 font-bold text-white disabled:cursor-not-allowed disabled:bg-gray-600">Download illustrative .xyz</button></section>
    <footer className="rounded-lg border border-white/10 p-3 text-xs text-gray-400">Generator: {data.provenance.generator} · Template: {data.provenance.promptVersion} · Input hash: {data.provenance.inputHash} · Created: {data.provenance.createdAt}</footer>
  </article>;
};
