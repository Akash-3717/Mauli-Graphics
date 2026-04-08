import React from 'react';
import { normalizeDesignImageUrl } from '../../services/api';
function DesignTable({ designs, onDelete, deletingId }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white/80 p-5">
      <h2 className="mb-4 text-xl font-semibold text-slate-900">Design List</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full table-auto text-left text-sm text-slate-700">
          <thead>
            <tr className="border-b border-slate-200 text-slate-600">
              <th className="px-3 py-2">Preview</th>
              <th className="px-3 py-2">Title</th>
              <th className="px-3 py-2">Category</th>
              <th className="px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {designs.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-3 py-4 text-center text-slate-500">
                  No design entries found.
                </td>
              </tr>
            ) : (
              designs.map((design) => (
                <tr key={design.id} className="border-b border-slate-100">
                  <td className="px-3 py-2">
                    <img src={normalizeDesignImageUrl(design.imageUrl)} alt={design.title} className="h-12 w-12 rounded object-cover" />
                  </td>
                  <td className="px-3 py-2">{design.title}</td>
                  <td className="px-3 py-2">{design.category}</td>
                  <td className="px-3 py-2">
                    <button
                      type="button"
                      onClick={() => onDelete(design.id)}
                      disabled={deletingId === design.id}
                      className="rounded-md bg-red-500/80 px-3 py-1 text-white transition hover:bg-red-500 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {deletingId === design.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default DesignTable;
