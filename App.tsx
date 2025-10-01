import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { InputForm } from './components/InputForm';
import { OutputDisplay } from './components/OutputDisplay';
import { Loader } from './components/Loader';
import { designMaterial } from './services/geminiService';
import type { MaterialData, UserRequirements } from './types';
import { Hero } from './components/Hero';

// Helper function to parse API errors for more user-friendly messages
const parseApiError = (error: unknown): string => {
  if (error instanceof Error) {
    const message = error.message || '';
    
    // Check for common Gemini API error patterns
    if (message.includes('SAFETY')) {
      return 'The request was blocked by the AI\'s safety filters. Please modify your input and try again.';
    }
    if (message.includes('API key not valid') || message.includes('API_KEY_INVALID')) {
      return 'API configuration error. Please contact the administrator.';
    }
    if (message.includes('429') || message.toLowerCase().includes('resource has been exhausted')) {
       return 'The service is currently experiencing high demand. Please try again in a few moments.';
    }
    if (message.includes('400')) {
        return `There was a problem with the request. The AI reported: ${message}. Please check your inputs.`;
    }
    
    // Fallback for other errors from the API
    return `An API error occurred: ${message}`;
  }
  
  return 'An unexpected error occurred. Please try again.';
};


const App: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [materialData, setMaterialData] = useState<MaterialData | null>(null);

  const handleDesignRequest = useCallback(async (requirements: UserRequirements) => {
    setIsLoading(true);
    setError(null);
    setMaterialData(null);

    try {
      const result = await designMaterial(requirements);
      setMaterialData(result);
    } catch (e: unknown) {
      setError(parseApiError(e));
    } finally {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="min-h-screen bg-brand-dark text-brand-light font-sans">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Hero />
        <div className="bg-brand-secondary/30 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-10 border border-white/10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            <InputForm onDesign={handleDesignRequest} isLoading={isLoading} />
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold mb-4 text-brand-primary tracking-wide">Generated Material</h2>
              <div className="flex-grow bg-brand-dark/50 p-6 rounded-lg border border-brand-primary/20 min-h-[300px] flex items-center justify-center">
                {isLoading && <Loader />}
                {error && <div className="text-red-400 text-center animate-fade-in">{error}</div>}
                {materialData && <OutputDisplay data={materialData} />}
              </div>
            </div>
          </div>
        </div>
      </main>
      <footer className="text-center py-6 text-gray-500 text-sm">
        <p>Powered by Gemini API. For research and simulation purposes only.</p>
      </footer>
    </div>
  );
};

export default App;