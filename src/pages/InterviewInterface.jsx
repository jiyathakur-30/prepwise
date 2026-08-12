import React from 'react';
import { Link } from 'react-router-dom';

export default function InterviewInterface() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-2xl font-light text-brand-text mb-4">Interview Session</h1>
        <p className="text-brand-muted mb-8">The interview interface would load here.</p>
        <Link to="/dashboard" className="text-brand-primary hover:underline">View Feedback Dashboard</Link>
      </div>
    </div>
  );
}
