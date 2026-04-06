import React from 'react';
import DesignCard from './DesignCard';

function PortfolioGrid({ designs, onPreview }) {
  if (!designs.length) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white/70 p-8 text-center text-slate-600">
        No designs found for this category.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-5">
      {designs.map((design) => (
        <DesignCard key={design.id} design={design} onPreview={onPreview} />
      ))}
    </div>
  );
}

export default PortfolioGrid;
