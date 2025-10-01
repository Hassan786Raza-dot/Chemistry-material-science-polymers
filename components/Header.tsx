
import React from 'react';
import { AtomIcon } from './icons/AtomIcon';

export const Header: React.FC = () => {
  return (
    <header className="bg-brand-secondary/50 backdrop-blur-md sticky top-0 z-10 border-b border-white/10 shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center gap-4">
          <AtomIcon className="w-10 h-10 text-brand-primary" />
          <div>
            <h1 className="text-xl md:text-2xl font-bold text-brand-light tracking-wider">
              Sustainable Material Designer
            </h1>
            <p className="text-xs text-gray-400">Powered by Computational Chemistry & AI</p>
          </div>
        </div>
      </div>
    </header>
  );
};
