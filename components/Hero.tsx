
import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="text-center py-10 md:py-16">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-brand-light">
        The Future of Materials, <span className="text-brand-primary">Designed Today</span>.
      </h1>
      <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
        Leverage the power of generative AI to conceptualize revolutionary soft materials. Define your requirements and let our advanced model generate a plausible molecular structure and properties for your next big discovery.
      </p>
    </div>
  );
};
