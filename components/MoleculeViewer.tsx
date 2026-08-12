import React, { useMemo } from 'react';
import { validateXyz } from '../services/xyzValidation';

const COLORS: Record<string, string> = { H: '#fff', C: '#282828', N: '#3b82f6', O: '#ef4444', S: '#eab308', P: '#f97316' };

export const MoleculeViewer: React.FC<{ xyzData: string }> = ({ xyzData }) => {
  const atoms = useMemo(() => validateXyz(xyzData).atoms, [xyzData]);
  if (!atoms.length) return <div className="flex h-full items-center justify-center text-gray-400">No valid coordinate fragment.</div>;
  const minX = Math.min(...atoms.map((a) => a.x)); const maxX = Math.max(...atoms.map((a) => a.x));
  const minY = Math.min(...atoms.map((a) => -a.y)); const maxY = Math.max(...atoms.map((a) => -a.y));
  const width = Math.max(maxX - minX, 1) + 2; const height = Math.max(maxY - minY, 1) + 2;
  return <div className="relative h-full w-full"><span className="absolute left-2 top-2 z-10 rounded bg-black/60 px-2 py-1 text-xs text-gray-300">2D illustration; not a validated molecular graph</span><svg viewBox={`${minX - 1} ${minY - 1} ${width} ${height}`} className="h-full w-full" role="img" aria-label="Illustrative projection of coordinate points"><g>{atoms.slice(1).map((atom, index) => { const previous = atoms[index]; return <line key={`line-${index}`} x1={previous.x} y1={-previous.y} x2={atom.x} y2={-atom.y} stroke="#64748b" strokeWidth="0.08" />; })}{atoms.map((atom, index) => <circle key={`atom-${index}`} cx={atom.x} cy={-atom.y} r="0.18" fill={COLORS[atom.element] || '#f472b6'} stroke="#fff" strokeWidth="0.03" />)}</g></svg></div>;
};
