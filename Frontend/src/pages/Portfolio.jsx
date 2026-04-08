import React, { useEffect, useMemo, useState } from 'react';
import FilterButtons from '../components/portfolio/FilterButtons';
import PortfolioGrid from '../components/portfolio/PortfolioGrid';
import DesignLoader from '../components/common/DesignLoader';
import { getDesigns } from '../services/api';
import portfolioImage from '../assets/Portfolio/WhatsApp Image 2026-03-05 at 3.32.13 PM.jpeg';

const normalizeDesignImageUrl = (rawUrl = '') => {
  const value = String(rawUrl || '').trim();

  if (!value) return '';

  if (/^https?:\/\//i.test(value)) {
    return value.replace(/^http:\/\//i, 'https://');
  }

  const normalizedPath = value.replace(/^\/+/, '');
  if (normalizedPath.startsWith('uploads/')) {
    return `/api/${normalizedPath}`;
  }

  return value;
};

function Portfolio() {
  const [designs, setDesigns] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [previewDesign, setPreviewDesign] = useState(null);

  useEffect(() => {
    const fetchDesigns = async () => {
      setLoading(true);
      setError('');

      try {
        const data = await getDesigns();
        const list = Array.isArray(data) ? data : data?.designs || [];

        const normalized = list.map((item, index) => ({
          id: item._id || item.id || String(index),
          title: item.title || 'Untitled',
          category: item.category || 'Other',
          description: item.description || 'No description available',
          imageUrl:
            normalizeDesignImageUrl(item.imageUrl || item.image || item.url) ||
            'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=900&q=80',
          createdAt: item.createdAt || item.updatedAt || null,
        }));

        const sorted = [...normalized].sort((a, b) => {
          const aTime = a.createdAt ? new Date(a.createdAt).getTime() : 0;
          const bTime = b.createdAt ? new Date(b.createdAt).getTime() : 0;
          return bTime - aTime;
        });

        setDesigns(sorted);
      } catch (fetchError) {
        setError(fetchError?.response?.data?.message || fetchError.message || 'Failed to load designs');
      } finally {
        setLoading(false);
      }
    };

    fetchDesigns();
  }, []);

  const categories = useMemo(() => {
    const unique = [...new Set(designs.map((design) => design.category))];
    return ['All', ...unique];
  }, [designs]);

  const filteredDesigns = useMemo(() => {
    if (activeCategory === 'All') {
      return designs;
    }
    return designs.filter((design) => design.category === activeCategory);
  }, [activeCategory, designs]);

  const latestThreeDesigns = useMemo(() => {
    if (activeCategory !== 'All') {
      return filteredDesigns.slice(0, 3);
    }

    const usedCategories = new Set();
    const uniqueCategoryDesigns = [];

    for (const design of filteredDesigns) {
      if (usedCategories.has(design.category)) {
        continue;
      }

      usedCategories.add(design.category);
      uniqueCategoryDesigns.push(design);

      if (uniqueCategoryDesigns.length === 3) {
        break;
      }
    }

    return uniqueCategoryDesigns;
  }, [activeCategory, filteredDesigns]);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white/65 p-4 sm:p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Portfolio</h1>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start">
          <img
            src={portfolioImage}
            alt="Portfolio logo"
            className="h-24 w-auto rounded-lg object-contain"
          />
          <p className="text-slate-700">Welcome to our creative showcase!
Here you can explore some of the best design and printing work created by Dhairyshil Vijay Mohite from Watar, Karad.
We believe every design tells a story — and our work reflects creativity, quality, and professionalism..</p>
        </div>
      </div>

      <FilterButtons categories={categories} activeCategory={activeCategory} onChange={setActiveCategory} />

      {loading && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white/80 p-6 text-slate-700">
          <DesignLoader />
          <p>Loading designs...</p>
        </div>
      )}
      {error && <p className="rounded-lg border border-red-300/60 bg-red-50 p-4 text-red-700">{error}</p>}
      {!loading && !error && <PortfolioGrid designs={latestThreeDesigns} onPreview={setPreviewDesign} />}

      {previewDesign && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/75 p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-3xl rounded-2xl border border-white/10 bg-slate-950 p-4 sm:p-6">
            <div className="mb-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-cyan-300">{previewDesign.category}</p>
                <h3 className="text-xl font-semibold text-white">{previewDesign.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewDesign(null)}
                className="rounded-md border border-white/20 px-3 py-1.5 text-sm text-white hover:bg-white/10"
              >
                Close
              </button>
            </div>

            <img
              src={previewDesign.imageUrl}
              alt={previewDesign.title}
              className="max-h-[65vh] w-full rounded-xl object-contain"
            />

            <p className="mt-4 text-slate-300">{previewDesign.description}</p>
          </div>
        </div>
      )}
    </section>
  );
}

export default Portfolio;
