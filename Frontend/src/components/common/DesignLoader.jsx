import React from 'react';

function DesignLoader() {
  return (
    <div className="relative h-12 w-12" role="status" aria-label="Loading designs">
      <span className="absolute inset-0 rounded-full border-4 border-cyan-300/25" />
      <span className="absolute inset-0 rounded-full border-4 border-transparent border-t-cyan-400 animate-spin" />
      <span className="absolute inset-2 rounded-full border-2 border-transparent border-b-cyan-300 animate-spin [animation-direction:reverse] [animation-duration:1.1s]" />
      <span className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.8)]" />
    </div>
  );
}

export default DesignLoader;