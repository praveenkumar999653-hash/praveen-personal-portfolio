
import React from 'react';

const Footer = () => {
  return (
    <footer className="relative z-10 select-none border-t border-white/10 bg-[#050505] px-6 py-16 text-white md:px-12">
      <div className="mx-auto flex max-w-7xl flex-col space-y-12">

        {/* Brand and Quick Links */}
        <div className="flex flex-col items-start justify-between gap-8 border-b border-white/10 pb-12 md:flex-row md:items-center">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-2xl font-black tracking-tighter text-red-600 drop-shadow-[0_2px_15px_rgba(220,38,38,0.9)]">
              PRAVEENKUMAR
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-white" />
            </div>

            <p className="text-xs font-mono uppercase tracking-widest text-white/50">
              // PERSONAL PORTFOLIO • 2026
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap gap-6 text-xs font-mono uppercase tracking-widest text-white/70 md:gap-8"
          >
            <a href="#home" className="transition-colors hover:text-red-500">Home</a>
            <a href="#about" className="transition-colors hover:text-red-500">About</a>
            <a href="#skills" className="transition-colors hover:text-red-500">Skills</a>
            <a href="#projects" className="transition-colors hover:text-red-500">Projects</a>
            <a href="#contact" className="transition-colors hover:text-red-500">Contact</a>
          </nav>
        </div>

        {/* Contact and Social Links */}
        <div className="flex flex-col items-start justify-between gap-6 text-xs font-mono text-white/60 md:flex-row md:items-center">
          <div className="flex flex-wrap items-center gap-6">
            <a
              href="mailto:praveenkumar999653@gmail.com"
              className="uppercase tracking-wider transition-colors hover:text-red-500"
            >
              Email //
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="uppercase tracking-wider transition-colors hover:text-red-500"
            >
              LinkedIn //
            </a>

            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="uppercase tracking-wider transition-colors hover:text-red-500"
            >
              Instagram //
            </a>
          </div>

          <div className="uppercase tracking-widest text-white/40">
            LOCATION: INDIA
          </div>
        </div>

        {/* Copyright and Tagline */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-center text-[11px] font-mono uppercase tracking-widest text-white/40 md:flex-row md:text-left">
          <p>
            &copy; {new Date().getFullYear()} Praveenkumar. All Rights Reserved.
          </p>

          <p className="text-red-500/80">
            CREATIVITY • TECHNOLOGY • TRAVEL
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;