import React, { useMemo } from 'react';

interface Atom {
  element: string;
  x: number;
  y: number;
  z: number;
}

interface Bond {
  atom1: number;
  atom2: number;
}

// CPK coloring for common elements
const CPK_COLORS: { [key: string]: string } = {
  H: '#FFFFFF',
  C: '#282828',
  N: '#0000FF',
  O: '#FF0000',
  F: '#90E050',
  CL: '#1FF01F',
  BR: '#A62929',
  I: '#940094',
  S: '#FFFF00',
  P: '#FFA500',
  B: '#FA8072',
  SI: '#F0C8A0',
  DEFAULT: '#FFC0CB', // Pink for unknown elements
};

// Covalent radii for bond calculation (in Angstroms)
const COVALENT_RADII: { [key: string]: number } = {
  H: 0.37,
  C: 0.77,
  N: 0.75,
  O: 0.73,
  F: 0.71,
  S: 1.02,
  CL: 0.99,
  P: 1.1,
  SI: 1.17,
  BR: 1.14,
  I: 1.33,
  DEFAULT: 0.8,
};

const getAtomColor = (element: string) => CPK_COLORS[element.toUpperCase()] || CPK_COLORS.DEFAULT;
const getCovalentRadius = (element: string) => COVALENT_RADII[element.toUpperCase()] || COVALENT_RADII.DEFAULT;

const parseXyzData = (xyzData: string): Atom[] => {
  const lines = xyzData.trim().split('\n');
  if (lines.length < 3) return [];

  const atoms: Atom[] = [];
  for (let i = 2; i < lines.length; i++) {
    const [element, x, y, z] = lines[i].trim().split(/\s+/);
    if (element && x && y && z) {
      atoms.push({
        element,
        x: parseFloat(x),
        y: parseFloat(y),
        z: parseFloat(z),
      });
    }
  }
  return atoms;
};

const calculateBonds = (atoms: Atom[]): Bond[] => {
  const bonds: Bond[] = [];
  const bondTolerance = 1.2; // Allow for slightly longer bonds

  for (let i = 0; i < atoms.length; i++) {
    for (let j = i + 1; j < atoms.length; j++) {
      const atom1 = atoms[i];
      const atom2 = atoms[j];
      const distance = Math.sqrt(
        Math.pow(atom1.x - atom2.x, 2) +
        Math.pow(atom1.y - atom2.y, 2) +
        Math.pow(atom1.z - atom2.z, 2)
      );

      const maxBondLength = (getCovalentRadius(atom1.element) + getCovalentRadius(atom2.element)) * bondTolerance;

      if (distance > 0.5 && distance < maxBondLength) {
        bonds.push({ atom1: i, atom2: j });
      }
    }
  }
  return bonds;
};


export const MoleculeViewer: React.FC<{ xyzData: string }> = ({ xyzData }) => {
  const { atoms, bonds } = useMemo(() => {
    const parsedAtoms = parseXyzData(xyzData);
    const calculatedBonds = calculateBonds(parsedAtoms);
    return { atoms: parsedAtoms, bonds: calculatedBonds };
  }, [xyzData]);

  if (atoms.length === 0) {
    return <div className="flex items-center justify-center h-full text-gray-400">No molecule to display</div>;
  }

  // Project 3D to 2D and find bounding box to scale/center the molecule
  const projectedAtoms = atoms.map(atom => ({ ...atom, projX: atom.x, projY: -atom.y })); // Invert Y for standard screen coordinates

  const padding = 20;
  const minX = Math.min(...projectedAtoms.map(a => a.projX));
  const maxX = Math.max(...projectedAtoms.map(a => a.projX));
  const minY = Math.min(...projectedAtoms.map(a => a.projY));
  const maxY = Math.max(...projectedAtoms.map(a => a.projY));

  const contentWidth = maxX - minX;
  const contentHeight = maxY - minY;

  const viewBoxWidth = contentWidth > 0.1 ? contentWidth + padding * 2 : 100;
  const viewBoxHeight = contentHeight > 0.1 ? contentHeight + padding * 2 : 100;
  const viewBoxX = minX - padding;
  const viewBoxY = minY - padding;

  const atomRadius = Math.min(viewBoxWidth, viewBoxHeight) * 0.05;
  const bondWidth = atomRadius * 0.2;

  return (
    <svg
      width="100%"
      height="100%"
      viewBox={`${viewBoxX} ${viewBoxY} ${viewBoxWidth} ${viewBoxHeight}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <g>
        {bonds.map((bond, index) => {
          const atom1 = projectedAtoms[bond.atom1];
          const atom2 = projectedAtoms[bond.atom2];
          return (
            <line
              key={index}
              x1={atom1.projX}
              y1={atom1.projY}
              x2={atom2.projX}
              y2={atom2.projY}
              stroke="#555"
              strokeWidth={bondWidth}
            />
          );
        })}
        {projectedAtoms.map((atom, index) => (
          <circle
            key={index}
            cx={atom.projX}
            cy={atom.projY}
            r={atomRadius}
            fill={getAtomColor(atom.element)}
            stroke="#FFFFFF"
            strokeWidth={bondWidth * 0.5}
          />
        ))}
      </g>
    </svg>
  );
};