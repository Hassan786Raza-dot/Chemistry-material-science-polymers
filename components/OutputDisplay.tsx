import React, { useCallback, useMemo } from 'react';
import type { MaterialData } from '../types';
import { DownloadIcon } from './icons/DownloadIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { ClipboardIcon } from './icons/ClipboardIcon';
import { MoleculeViewer } from './MoleculeViewer';

interface OutputDisplayProps {
  data: MaterialData;
}

const OutputSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
    <div className="bg-brand-dark/50 p-4 rounded-lg border border-brand-secondary/50">
        <div className="flex items-center gap-3 mb-3">
            {icon}
            <h4 className="text-lg font-semibold text-brand-light">{title}</h4>
        </div>
        <div className="prose prose-invert prose-sm max-w-none text-gray-300">
            {children}
        </div>
    </div>
);

const validateXyz = (xyz: string): boolean => {
    if (!xyz || typeof xyz !== 'string') return false;
    const lines = xyz.trim().split('\n');
    if (lines.length < 3) return false;

    const atomCount = parseInt(lines[0], 10);
    if (isNaN(atomCount) || atomCount <= 0) return false;

    // Actual atoms start from line 2 (index)
    if (lines.length - 2 !== atomCount) return false;

    for (let i = 2; i < lines.length; i++) {
      const parts = lines[i].trim().split(/\s+/);
      if (parts.length !== 4) return false;
      const [ , x, y, z] = parts;
      if (isNaN(parseFloat(x)) || isNaN(parseFloat(y)) || isNaN(parseFloat(z))) {
        return false;
      }
    }

    return true;
};


export const OutputDisplay: React.FC<OutputDisplayProps> = ({ data }) => {
  const isXyzValid = useMemo(() => validateXyz(data.xyzCoordinates), [data.xyzCoordinates]);

  const handleDownload = useCallback(() => {
    if (!isXyzValid) return; // Guard clause
    const blob = new Blob([data.xyzCoordinates], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${data.materialName.replace(/\s+/g, '_') || 'material'}.xyz`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }, [data.materialName, data.xyzCoordinates, isXyzValid]);

  return (
    <div className="w-full space-y-6 animate-fade-in">
      <div className="text-center">
        <h3 className="text-3xl font-bold text-brand-primary">{data.materialName}</h3>
        <p className="text-gray-300 mt-2 text-base whitespace-pre-wrap">{data.description}</p>
      </div>

      <OutputSection title="Synthesis Methodology" icon={<ClipboardIcon className="w-6 h-6 text-brand-primary" />}>
        <p className="whitespace-pre-wrap">{data.synthesisMethodology}</p>
      </OutputSection>

      <OutputSection title="AI Validation Summary" icon={<ShieldCheckIcon className="w-6 h-6 text-brand-primary" />}>
        <p className="whitespace-pre-wrap">{data.validationSummary}</p>
      </OutputSection>
      
      <div>
        <h4 className="text-lg font-semibold text-brand-light mb-2 text-center">Molecular Structure</h4>
        <div className="bg-brand-dark p-4 rounded-md border border-brand-secondary aspect-square">
            {isXyzValid ? (
                <MoleculeViewer xyzData={data.xyzCoordinates} />
            ) : (
                <div className="flex items-center justify-center h-full text-red-400">
                    <p>Invalid or malformed molecular structure data received.</p>
                </div>
            )}
        </div>
      </div>
      
      <button
        onClick={handleDownload}
        disabled={!isXyzValid}
        className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-2 px-4 rounded-lg shadow-md transform hover:scale-105 transition duration-300 ease-in-out"
      >
        <DownloadIcon className="w-5 h-5" />
        Download .xyz File
      </button>
    </div>
  );
};