import React from 'react';
import { normalizeDesignImageUrl } from '../../services/api';
function DesignCard({ design, onPreview }) {
  const handleOpenPreview = () => {
    if (onPreview) {
      onPreview(design);
    }
  };

  return (
    <article
      className="group overflow-hidden rounded-xl border border-slate-200 bg-white/85 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/60 hover:shadow-xl hover:shadow-cyan-500/15"
      onClick={handleOpenPreview}
      role={onPreview ? 'button' : undefined}
      tabIndex={onPreview ? 0 : undefined}
      onKeyDown={
        onPreview
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                handleOpenPreview();
              }
            }
          : undefined
      }
    >
      <div className="aspect-4/3 overflow-hidden bg-slate-200">
        <img
          src={normalizeDesignImageUrl(design.imageUrl)}
          alt={design.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className="space-y-2 p-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-cyan-700">{design.category}</p>
        <h3 className="text-lg font-semibold text-slate-900">{design.title}</h3>
        <p className="line-clamp-2 text-sm text-slate-600">{design.description}</p>
        {onPreview && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onPreview(design);
            }}
            className="mt-2 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-800 transition hover:bg-slate-100"
          >
            Preview
          </button>
        )}
      </div>
    </article>
  );
}

export default DesignCard;
