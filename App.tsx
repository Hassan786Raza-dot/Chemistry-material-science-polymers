import React, { useCallback, useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { InputForm } from './components/InputForm';
import { OutputDisplay } from './components/OutputDisplay';
import { Loader } from './components/Loader';
import { generateMaterialHypothesis } from './services/materialGenerator';
import type { MaterialData, UserRequirements } from './types';

const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [materialData, setMaterialData] = useState<MaterialData | null>(null);
  const handleDesign = useCallback(async (requirements: UserRequirements) => {
    setIsLoading(true); setError(null); setMaterialData(null);
    try { setMaterialData(await generateMaterialHypothesis(requirements)); }
    catch (cause) { setError(cause instanceof Error ? cause.message : 'Unable to create the hypothesis record.'); }
    finally { setIsLoading(false); }
  }, []);
  return <div className="min-h-screen bg-brand-dark font-sans text-brand-light"><Header /><main className="container mx-auto px-4 py-8"><Hero /><div className="grid grid-cols-1 gap-8 rounded-2xl border border-white/10 bg-brand-secondary/30 p-6 shadow-2xl lg:grid-cols-2 lg:p-10"><section><h2 className="mb-4 text-2xl font-bold text-brand-primary">Define a research question</h2><InputForm onDesign={handleDesign} isLoading={isLoading} /></section><section><h2 className="mb-4 text-2xl font-bold text-brand-primary">Hypothesis record</h2><div className="flex min-h-[420px] items-center justify-center rounded-lg border border-brand-primary/20 bg-brand-dark/50 p-6">{isLoading ? <Loader /> : error ? <p role="alert" className="text-center text-red-300">{error}</p> : materialData ? <OutputDisplay data={materialData} /> : <p className="text-center text-gray-400">Complete the required research fields to create a transparent, local hypothesis record.</p>}</div></section></div></main><footer className="py-6 text-center text-sm text-gray-500">Research hypothesis workspace · No external API calls · Not a substitute for chemical, safety, or experimental validation.</footer></div>;
};
export default App;
