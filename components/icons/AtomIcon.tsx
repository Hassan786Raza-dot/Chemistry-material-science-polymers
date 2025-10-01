
import React from 'react';

export const AtomIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="1" />
    <path d="M20.2 20.2c2.04-2.03.02-5.91-2.81-8.74s-6.7-4.85-8.74-2.81" />
    <path d="M3.8 3.8c-2.04 2.03-.02 5.91 2.81 8.74s6.7 4.85 8.74 2.81" />
    <path d="M3.8 20.2c-2.03-2.04 5.91-.02 8.74-2.81s4.85-6.7 2.81-8.74" />
    <path d="M20.2 3.8c2.03 2.04-5.91.02-8.74 2.81s-4.85 6.7-2.81 8.74" />
  </svg>
);
