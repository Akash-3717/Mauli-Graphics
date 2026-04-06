import React from 'react';
import { Link } from 'react-router-dom';

const highlights = [
  {
    title: 'Brand-first Design',
    description: 'Every visual is built to match your business identity and audience goals.',
  },
  {
    title: 'Fast Professional Delivery',
    description: 'Clear communication, structured workflow, and timely revisions.',
  },
  {
    title: 'Modern Visual Systems',
    description: 'Designs that stay consistent across social media, print, and digital platforms.',
  },
];

function About() {
  return (
    <section className="space-y-8">
      <div className="rounded-2xl border border-slate-200 bg-linear-to-br from-white/80 to-cyan-50/40 p-6 sm:p-8">
        <p className="mb-3 text-sm uppercase tracking-[0.2em] text-cyan-700">About The Designer</p>
        <h1 className="max-w-4xl text-3xl font-bold leading-tight text-slate-900 sm:text-5xl">
          Helping Businesses Build Strong Visual Identity Through Clean, Premium Design
        </h1>
        <p className="mt-4 max-w-3xl text-slate-700">
          Welcome to our creative world!
              I’m Dhairyshil Vijay Mohite, the founder and owner of our design and flex printing studio based in Watar,
          Karad. With a passion for creativity and visual branding, we help businesses, shops, events, 
          and individuals turn their ideas into impactful designs.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to="/portfolio"
            className="rounded-lg bg-cyan-500 px-5 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
          >
            View Portfolio
          </Link>
         
        </div>
      </div>

     
    </section>
  );
}

export default About;
