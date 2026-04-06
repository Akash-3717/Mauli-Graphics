import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="border-t border-slate-300/80 bg-white/70 backdrop-blur-sm">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-4 px-4 py-5 text-xs text-slate-700 sm:gap-6 sm:px-6 sm:py-8 sm:text-sm md:grid-cols-3 lg:px-8">
        <div>
          <p className="text-sm font-semibold text-slate-900 sm:text-base">Mauli Graphics</p>
          <p className="mt-1 sm:mt-2">Graphic Designer and flex Printing Shop Website</p>
        </div>

        <div>
          <p className="font-semibold text-slate-900">Quick Links</p>
          <div className="mt-1.5 flex flex-col gap-1.5 sm:mt-2 sm:flex-row sm:flex-wrap sm:gap-3">
            <Link to="/" className="transition hover:text-cyan-800">Home</Link>
            <Link to="/portfolio" className="transition hover:text-cyan-800">Portfolio</Link>
            <Link to="/contact" className="transition hover:text-cyan-800">Contact</Link>
          </div>
        </div>

        <div>
          <p className="font-semibold text-slate-900">Social Media</p>
          <div className="mt-1.5 flex flex-col gap-1.5 sm:mt-2 sm:flex-row sm:flex-wrap sm:gap-3">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="transition hover:text-cyan-800">@mauli_graphics_03</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="transition hover:text-cyan-800">@dhairya_dm_50</a>
       
          </div>
        </div>
      </div>

      <div className="border-t border-slate-300/80 px-4 py-3 text-center text-[11px] text-slate-500 sm:px-6 sm:py-4 sm:text-xs lg:px-8">
        © {new Date().getFullYear()} Mauli Graphics. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
