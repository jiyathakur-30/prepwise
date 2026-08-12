import React from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function MainLayout({ children, user, theme, onChangeTheme, onLogout }) {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <div className="relative min-h-screen bg-brand-bg text-brand-text overflow-hidden flex flex-col transition-colors duration-300">

      {/* Premium Background Ambient Gradient Blobs (hidden in Light Mode and on the cinematic landing page) */}
      {theme !== 'light' && !isLanding && (
        <>
          <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] rounded-full bg-brand-primary/10 filter blur-[120px] mix-blend-screen pointer-events-none animate-blob-spin-1" />
          <div className="absolute bottom-[-10%] right[-10%] w-[50vw] h-[50vw] max-w-[600px] rounded-full bg-brand-secondary/8 filter blur-[120px] mix-blend-screen pointer-events-none animate-blob-spin-2" />
        </>
      )}

      {/* Sticky Premium Navbar (hidden on the cinematic landing page which has its own minimal nav) */}
      {!isLanding && (
        <Navbar
          user={user}
          theme={theme}
          onChangeTheme={onChangeTheme}
          onLogout={onLogout}
        />
      )}

      {/* Main Page Content Wrapper */}
      <main className="relative flex-grow flex flex-col z-10">
        {children}
      </main>

      {/* Footer (hidden on the cinematic landing page) */}
      {!isLanding && (
      <footer className="relative z-10 border-t border-brand-border bg-brand-bg/80 backdrop-blur-sm py-8 mt-auto transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-col items-center md:items-start">
            <span className="font-display font-extrabold text-sm tracking-tight text-brand-text">
              PrepWise
            </span>
            <span className="text-[10px] text-brand-muted mt-0.5">
              Your AI Interview Coach &copy; {new Date().getFullYear()}. All rights reserved.
            </span>
          </div>
          <div className="flex gap-6 text-xs text-brand-muted">
            <a href="#" className="hover:text-brand-text transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-brand-text transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-brand-text transition-colors">Documentation</a>
          </div>
        </div>
      </footer>
      )}

      {/* Landing page gets a minimal black footer area */}
      {isLanding && (
        <footer className="relative z-10 bg-black py-10 px-6 text-center">
          <span className="text-[10px] font-light text-white/15 tracking-[0.3em] uppercase">
            PrepWise &copy; {new Date().getFullYear()} &middot; Interview Intelligence System
          </span>
        </footer>
      )}
    </div>
  );
}
