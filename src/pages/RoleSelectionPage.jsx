import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ArrowLeft, Check } from 'lucide-react';

const roles = [
  { id: 'frontend', name: 'Frontend Engineer', desc: 'React, JavaScript, CSS, performance' },
  { id: 'backend', name: 'Backend Engineer', desc: 'Systems design, APIs, databases' },
  { id: 'systems', name: 'Systems Engineer', desc: 'Distributed systems, scalability' },
  { id: 'behavioral', name: 'Behavioral', desc: 'Leadership, collaboration, impact' },
];

export default function RoleSelectionPage() {
  const [selected, setSelected] = useState(null);
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6 py-20">
      <div className="max-w-2xl w-full">
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-brand-muted hover:text-brand-text transition-colors mb-10">
          <ArrowLeft size={16} /> Back
        </Link>
        <h1 className="text-3xl md:text-4xl font-light tracking-tight text-brand-text mb-4">Choose a role track</h1>
        <p className="text-brand-muted mb-10">Select a track to start your practice interview.</p>
        <div className="flex flex-col gap-3">
          {roles.map((role) => (
            <button
              key={role.id}
              onClick={() => setSelected(role.id)}
              className={`flex items-center justify-between p-5 rounded-lg border transition-all text-left ${
                selected === role.id
                  ? 'border-brand-primary bg-brand-primary/10'
                  : 'border-brand-border hover:border-white/20'
              }`}
            >
              <div>
                <div className="text-brand-text font-light">{role.name}</div>
                <div className="text-sm text-brand-muted">{role.desc}</div>
              </div>
              {selected === role.id && <Check size={20} className="text-brand-primary" />}
            </button>
          ))}
        </div>
        {selected && (
          <Link
            to="/interview"
            className="mt-8 inline-flex items-center gap-2 text-brand-text hover:text-brand-primary transition-colors"
          >
            Start Interview <ArrowRight size={18} />
          </Link>
        )}
      </div>
    </div>
  );
}
