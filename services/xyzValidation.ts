import type { XyzAtom, XyzValidation } from '../types';

const ELEMENTS = new Set([
  'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne', 'Na', 'Mg', 'Al', 'Si',
  'P', 'S', 'Cl', 'Ar', 'K', 'Ca', 'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co',
  'Ni', 'Cu', 'Zn', 'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr', 'Rb', 'Sr', 'Y', 'Zr',
  'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn', 'Sb', 'Te', 'I',
  'Xe', 'Cs', 'Ba', 'La', 'Ce', 'Pr', 'Nd', 'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy',
  'Ho', 'Er', 'Tm', 'Yb', 'Lu', 'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au',
  'Hg', 'Tl', 'Pb', 'Bi', 'Po', 'At', 'Rn', 'Fr', 'Ra', 'Ac', 'Th', 'Pa', 'U',
  'Np', 'Pu', 'Am', 'Cm', 'Bk', 'Cf', 'Es', 'Fm', 'Md', 'No', 'Lr', 'Rf', 'Db',
  'Sg', 'Bh', 'Hs', 'Mt', 'Ds', 'Rg', 'Cn', 'Nh', 'Fl', 'Mc', 'Lv', 'Ts', 'Og',
]);

export function validateXyz(xyz: string): XyzValidation {
  const errors: string[] = [];
  const atoms: XyzAtom[] = [];
  const lines = xyz.split(/\r?\n/).map((line) => line.trim()).filter(Boolean);

  if (lines.length < 3) {
    return { valid: false, errors: ['XYZ text must contain an atom count, comment, and at least one atom record.'], atomCount: 0, atoms };
  }

  if (!/^\d+$/.test(lines[0])) errors.push('The first line must be a non-negative integer atom count.');
  const atomCount = Number(lines[0]);
  if (!Number.isInteger(atomCount) || atomCount < 1 || atomCount > 10000) errors.push('Atom count must be an integer between 1 and 10,000.');

  const records = lines.slice(2);
  if (records.length !== atomCount) errors.push(`Atom count says ${atomCount}, but ${records.length} atom records were found.`);

  records.forEach((record, index) => {
    const parts = record.split(/\s+/);
    if (parts.length !== 4) {
      errors.push(`Atom record ${index + 1} must contain exactly: element x y z.`);
      return;
    }
    const [element, xText, yText, zText] = parts;
    if (!ELEMENTS.has(element)) errors.push(`Atom record ${index + 1} uses unknown element '${element}'.`);
    const coordinates = [xText, yText, zText].map(Number);
    if (!coordinates.every(Number.isFinite)) errors.push(`Atom record ${index + 1} contains a non-finite coordinate.`);
    if (coordinates.every(Number.isFinite)) atoms.push({ element, x: coordinates[0], y: coordinates[1], z: coordinates[2] });
  });

  return { valid: errors.length === 0, errors, atomCount: Number.isFinite(atomCount) ? atomCount : 0, atoms };
}
