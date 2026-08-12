import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ user, theme, onChangeTheme, onLogout }) {
  return (
    <nav className="sticky top-0 z-50 h-16 bg-brand-bg/90 backdrop-blur-sm border-b border-brand-border flex items-center justify-between px-6">
      <Link to="/" className="text-sm font-light tracking-tight text-brand-text">PrepWise</Link>
      <div className="flex items-center gap-6">
        {user ? (
          <>
            <Link to="/dashboard" className="text-sm text-brand-muted hover:text-brand-text">Dashboard</Link>
            <button onClick={onLogout} className="text-sm text-brand-muted hover:text-brand-text">Sign Out</button>
          </>
        ) : (
          <select
            value={theme}
            onChange={(e) => onChangeTheme(e.target.value)}
            className="bg-brand-surface border border-brand-border rounded text-sm text-brand-text px-2 py-1"
          >
            <option value="midnight">Midnight</option>
            <option value="graphite">Graphite</option>
            <option value="light">Light</option>
          </select>
        )}
      </div>
    </nav>
  );
}
