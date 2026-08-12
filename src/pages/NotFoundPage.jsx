import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-4xl font-light text-brand-text mb-4">404</h1>
        <p className="text-brand-muted mb-8">Page not found.</p>
        <Link to="/" className="text-brand-primary hover:underline">Go Home</Link>
      </div>
    </div>
  );
}
