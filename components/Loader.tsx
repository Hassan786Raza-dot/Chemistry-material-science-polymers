
import React from 'react';
import { AtomIcon } from './icons/AtomIcon';

export const Loader: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-brand-primary animate-fade-in">
      <AtomIcon className="w-16 h-16 animate-pulse-fast" />
      <p className="text-lg font-semibold tracking-wider">Generating Material...</p>
      <p className="text-sm text-gray-400">This may take a moment.</p>
    </div>
  );
};
