import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

export default function AuthSplash({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      const user = { email, name: email.split('@')[0] };
      localStorage.setItem('prepwise_user', JSON.stringify(user));
      onLoginSuccess(user);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm">
        <h1 className="text-2xl font-light text-brand-text mb-6 text-center">Welcome to PrepWise</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 bg-brand-surface border border-brand-border rounded-lg text-brand-text placeholder:text-brand-muted focus:outline-none focus:border-brand-primary"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 bg-brand-surface border border-brand-border rounded-lg text-brand-text placeholder:text-brand-muted focus:outline-none focus:border-brand-primary"
          required
        />
        <button type="submit" className="w-full p-3 bg-brand-primary text-white rounded-lg font-light flex items-center justify-center gap-2 hover:opacity-90 transition-opacity">
          Sign In <ArrowRight size={16} />
        </button>
      </form>
    </div>
  );
}
