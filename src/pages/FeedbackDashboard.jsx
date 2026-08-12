import React from 'react';
import { Link } from 'react-router-dom';

export default function FeedbackDashboard() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-2xl font-light text-brand-text mb-4">Feedback Dashboard</h1>
        <p className="text-brand-muted mb-8">Your performance results would appear here.</p>
        <Link to="/" className="text-brand-primary hover:underline">Back to Home</Link>
      </div>
    </div>
  );
}
