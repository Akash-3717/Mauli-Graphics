import React from 'react';
function FilterButtons({ categories, activeCategory, onChange }) {
  return (
    <div className="mb-6 flex flex-wrap gap-2">
      {categories.map((category) => {
        const isActive = activeCategory === category;

        return (
          <button
            key={category}
            type="button"
            onClick={() => onChange(category)}
            className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
              isActive
                ? 'border-cyan-500 bg-cyan-100 text-cyan-800'
                : 'border-slate-300 bg-white/70 text-slate-700 hover:border-cyan-500/60 hover:text-cyan-800'
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
}

export default FilterButtons;
