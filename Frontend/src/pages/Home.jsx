import React, { useEffect, useMemo, useState } from 'react';
import PortfolioGrid from '../components/portfolio/PortfolioGrid';
import DesignLoader from '../components/common/DesignLoader';
import FlexPrinterHeroAnimation from '../components/common/FlexPrinterHeroAnimation';
import { getDesigns } from '../services/api';

function Home() {
  const [designs, setDesigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [previewDesign, setPreviewDesign] = useState(null);

  useEffect(() => {
    const fetchAllPosts = async () => {
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
            item.imageUrl ||
            item.image ||
            item.url ||
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
        setError(fetchError?.response?.data?.message || fetchError.message || 'Failed to load posts');
      } finally {
        setLoading(false);
      }
    };

    fetchAllPosts();
  }, []);

  const categoryRows = useMemo(() => {
    const grouped = designs.reduce((accumulator, design) => {
      const key = design.category || 'Other';
      if (!accumulator[key]) {
        accumulator[key] = [];
      }
      accumulator[key].push(design);
      return accumulator;
    }, {});

    return Object.entries(grouped).map(([category, categoryDesigns]) => ({
      category,
      designs: categoryDesigns,
    }));
  }, [designs]);

  return (
    <section className="relative overflow-hidden space-y-6 rounded-2xl border border-slate-200 bg-linear-to-br from-sky-200/50 via-emerald-100/40 to-lime-100/50 p-3 sm:space-y-8 sm:rounded-3xl sm:p-6">
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute -left-20 -top-16 h-72 w-72 rounded-full bg-sky-500/20 blur-3xl" />
        <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-lime-400/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.22),transparent_38%),radial-gradient(circle_at_80%_35%,rgba(16,185,129,0.2),transparent_40%),radial-gradient(circle_at_50%_90%,rgba(163,230,53,0.2),transparent_45%)]" />
      </div>

      <div className="relative z-10 grid gap-4 rounded-xl border border-slate-200 bg-white/70 p-4 backdrop-blur-md sm:gap-6 sm:rounded-2xl sm:p-8 lg:grid-cols-2 lg:items-center">
        <div className="space-y-3 text-center sm:space-y-4 sm:text-left">
          <p className="text-xs uppercase tracking-[0.2em] text-emerald-700 sm:text-sm sm:tracking-[0.25em] font-['Poppins','Trebuchet_MS',sans-serif]">Mauli Graphics </p>
          <h1 className="text-2xl leading-tight text-slate-900 sm:text-5xl font-['Cormorant_Garamond',Georgia,serif] font-semibold tracking-wide">
            Colorful Printing & Creative Design That Brings Your Brand To Life
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-slate-700 sm:text-[1.03rem] font-['Nunito','Segoe_UI',sans-serif]">
            From flex banners and business cards to social posts and brand kits, every design is crafted to print beautifully and stand out online.
          </p>
        </div>

        <div className="mx-auto w-full max-w-xs rounded-xl border border-slate-200 bg-linear-to-br from-white to-cyan-50/50 p-3 shadow-[0_16px_45px_rgba(12,74,110,0.18)] backdrop-blur-sm sm:max-w-md sm:rounded-2xl sm:p-4">
          <p className="mb-2 text-center text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-700 sm:mb-3 sm:text-xs sm:tracking-[0.2em]"> High Quality Printing and Design Solutions</p>
          <FlexPrinterHeroAnimation />
        </div>

        <div className="mt-6 flex flex-wrap gap-3">
          {/* <Link to="/portfolio" className="rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400">
            View Portfolio
          </Link>
          <Link to="/contact" className="rounded-lg border border-white/20 px-5 py-3 font-semibold text-white transition hover:bg-white/10">
            Contact Me
          </Link> */}
        </div>
      </div>

      <div className="relative z-10 space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Mauli Designs</h2>
          <p className="text-slate-700">Latest design posts from the studio.</p>
        </div>

        {loading && (
          <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-slate-200 bg-white/75 p-6 text-slate-700">
            <DesignLoader />
            <p>Loading posts...</p>
          </div>
        )}
        {error && <p className="rounded-lg border border-red-300/60 bg-red-50 p-4 text-red-700">{error}</p>}
        {!loading && !error &&
          categoryRows.map((row) => (
            <div key={row.category} className="space-y-3">
              <h3 className="text-xl font-semibold text-slate-900">{row.category}</h3>
              <PortfolioGrid designs={row.designs} onPreview={setPreviewDesign} />
            </div>
          ))}
      </div>

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

      {/* <div className="rounded-2xl border border-cyan-400/20 bg-cyan-500/10 p-6">
        <h2 className="text-2xl font-bold text-white">Ready to Start Your Design Project?</h2>
        <p className="mt-2 text-slate-200">Share your requirements and get a quick response for your custom design order.</p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link to="/contact" className="rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400">
            Contact Now
          </Link>
          <a
            href="https://wa.me/919000000000"
            target="_blank"
            rel="noreferrer"
            className="rounded-lg border border-white/20 px-5 py-3 font-semibold text-white transition hover:bg-white/10"
          >
            WhatsApp Chat
          </a>
        </div>
      </div> */}
    </section>
  );
}

export default Home;
