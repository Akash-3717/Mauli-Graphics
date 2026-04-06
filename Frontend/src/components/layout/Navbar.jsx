import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import logo from '../../assets/logo/logo.png';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Contact', path: '/contact' },
];

function Navbar() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <header className="sticky top-0 z-50 border-b border-slate-300/70 bg-white/70 shadow-[0_10px_24px_rgba(15,23,42,0.12)] backdrop-blur-xl">
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-sky-500/30 via-emerald-400/20 to-lime-400/30" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-transparent via-white to-transparent" aria-hidden="true" />

      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-2 px-3 py-3 sm:gap-3 sm:px-6 lg:px-8">
        <NavLink to="/" className="group relative z-10 flex shrink-0 items-center gap-1.5 text-lg tracking-wide text-slate-900 sm:gap-3">
          <img src={logo} alt="Mauli Graphics logo" className="h-7 w-7 rounded-full border border-slate-300 bg-white/75 p-0.5 transition duration-300 group-hover:scale-110 group-hover:rotate-2 sm:h-10 sm:w-10 sm:p-1" />
          <div className="leading-tight">
            <span className="bg-linear-to-r from-sky-700 via-emerald-700 to-cyan-700 bg-clip-text text-[0.6rem] font-bold tracking-[0.08em] text-transparent drop-shadow-[0_1px_1px_rgba(15,23,42,0.2)] sm:text-lg sm:tracking-[0.14em] font-['Palatino_Linotype','Book_Antiqua',Palatino,serif]">
              MAULI GRAPHICS
            </span>
          </div>
        </NavLink>

        {!isAdminRoute && (
          <nav className="relative z-10 flex max-w-[68%] items-center gap-1 overflow-x-auto rounded-xl border border-slate-300 bg-white/75 p-1.5 sm:max-w-none sm:w-auto sm:gap-2" aria-label="Main navigation">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex-none whitespace-nowrap rounded-lg px-2 py-1.5 text-[11px] font-semibold transition duration-300 sm:px-4 sm:py-2 sm:text-sm ${
                    isActive
                      ? 'bg-linear-to-r from-sky-200 via-emerald-200 to-lime-200 text-slate-900 shadow-[0_6px_18px_rgba(16,185,129,0.35)] hover:-translate-y-0.5'
                      : 'text-slate-700 hover:-translate-y-0.5 hover:bg-white hover:text-slate-900 hover:shadow-[0_8px_20px_rgba(56,189,248,0.22)]'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

export default Navbar;
