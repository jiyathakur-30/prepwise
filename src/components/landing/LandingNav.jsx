import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function LandingNav() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-black/60 backdrop-blur-md">
      <div className="max-w-[1600px] mx-auto px-6 md:px-10 lg:px-16 h-full flex items-center justify-between">
        <Link
          to="/"
          className="font-sans text-sm font-light tracking-[0.15em] text-brand-text/80 hover:text-brand-text transition-colors"
        >
          PREPWISE<span className="text-brand-primary">.</span>
        </Link>
        <Link
          to="/select"
          className="group inline-flex items-center gap-2 text-xs font-light tracking-wide text-brand-muted hover:text-brand-text transition-colors"
        >
          Start Interview
          <ArrowRight
            size={14}
            className="text-brand-primary/60 transition-all duration-500 group-hover:translate-x-1 group-hover:text-brand-primary"
          />
        </Link>
      </div>
    </header>
  );
}
