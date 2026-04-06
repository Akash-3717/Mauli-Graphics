import React from 'react';

function Contact() {
  return (
    <section className="space-y-8">
      <div className="rounded-2xl border border-slate-200 bg-linear-to-br from-white/85 to-cyan-50/35 p-6 sm:p-8">
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-cyan-700">Get In Touch</p>
        <h1 className="text-3xl font-bold text-slate-900 sm:text-5xl">Let’s Build Your Next Design</h1>
        <p className="mt-4 max-w-3xl text-slate-700">
          Need posters, banners, social creatives, or flex printing work? Reach out directly and we’ll respond quickly.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white/80 p-6 sm:p-8">
          <h2 className="mb-5 text-2xl font-bold text-slate-900">Contact Information</h2>

          <div className="space-y-4 text-slate-700">
            <p><span className="font-semibold text-slate-900">Email:</span> mauligraphics03@gmail.com</p>
            <p><span className="font-semibold text-slate-900">WhatsApp:</span> +91 9604008727</p>
            <p><span className="font-semibold text-slate-900">Location:</span> Watar, Karad, Maharashtra</p>
            <p>
              <span className="font-semibold text-slate-900">Instagram:</span>{' '}
              <a href="https://instagram.com/mauli_graphics_03" target="_blank" rel="noreferrer" className="text-cyan-700 hover:text-cyan-800">
                @mauli_graphics_03
              </a>
              {' '}and{' '}
              <a href="https://instagram.com/dhairya_dm_50" target="_blank" rel="noreferrer" className="text-cyan-700 hover:text-cyan-800">
                @dhairya_dm_50
              </a>
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="https://wa.me/919604008727"
              target="_blank"
              rel="noreferrer"
              className="inline-block rounded-lg bg-cyan-500 px-4 py-2 font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Chat on WhatsApp
            </a>
         
          </div>
        </div>
      </div>

    </section>
  );
}

export default Contact;
