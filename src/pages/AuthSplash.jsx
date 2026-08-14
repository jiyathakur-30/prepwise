import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Mail, User, Briefcase, ArrowRight, ShieldCheck, Cpu, ChevronDown } from 'lucide-react';
import AnimatedButton from '../components/AnimatedButton';
import DashboardCard from '../components/DashboardCard';

export default function AuthSplash({ onLoginSuccess }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedTrack, setSelectedTrack] = useState('Senior Frontend Engineer');
  const [customCareer, setCustomCareer] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleTrackChange = (e) => {
    const value = e.target.value;
    setSelectedTrack(value);
    if (value !== 'Other') {
      setCustomCareer('');
    }
    if (errorMsg) setErrorMsg('');
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMsg('Please enter your name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    const finalTargetJob = selectedTrack === 'Other' ? customCareer.trim() : selectedTrack.trim();

    if (selectedTrack === 'Other' && !finalTargetJob) {
      setErrorMsg('Please enter your target career.');
      return;
    }

    setIsLoading(true);
    setErrorMsg('');

    // Simulate authenticating loop
    setTimeout(() => {
      const userData = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        targetJob: finalTargetJob,
        joinedDate: new Date().toLocaleDateString(undefined, { month: 'short', year: 'numeric' })
      };
      
      localStorage.setItem('prepwise_user', JSON.stringify(userData));
      setIsLoading(false);
      onLoginSuccess(userData);
    }, 1200);
  };

  return (
    <div className="flex-grow w-full max-w-6xl mx-auto px-6 py-12 md:py-20 flex items-center justify-center">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
        
        {/* Left Side: Pitch and Start-Up Details (7 Columns) */}
        <div className="lg:col-span-7 flex flex-col gap-6 text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-wider w-fit">
            <Cpu size={12} className="animate-spin" />
            <span>Next-Gen Career Intelligence</span>
          </div>

          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight text-brand-text font-display">
            Supercharge Your Interview Performance with <span className="text-gradient-secondary">PrepWise</span>
          </h1>

          <p className="text-sm md:text-base text-brand-muted max-w-lg leading-relaxed">
            Get instant contextual transitions, dynamic AI coach commentaries, and detailed behavioral film reviews. Unlock accounts to persist history, customize coach preferences, and choose your SaaS dark theme.
          </p>

          {/* Value props list */}
          <div className="flex flex-col gap-4 mt-2">
            {[
              "5 Selectable Coach Personalities tailored to your pressure target.",
              "AdvancedSTAR storytelling detection and hesitation crutch tracking.",
              "Live typing signals panel diagnosing speech depth in real time.",
              "High-fidelity SVGs tracking question-by-question analytics."
            ].map((prop, idx) => (
              <div key={idx} className="flex items-center gap-3 text-xs font-semibold text-brand-muted">
                <div className="w-5 h-5 rounded-md bg-brand-secondary/15 flex items-center justify-center shrink-0">
                  <ShieldCheck size={12} className="text-brand-secondary" />
                </div>
                <span>{prop}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Authentication Glass Form (5 Columns) */}
        <div className="lg:col-span-5 w-full">
          <DashboardCard className="bg-brand-card border border-white/[0.06] p-8 flex flex-col gap-6 w-full shadow-2xl relative overflow-hidden">
            
            {/* Ambient inner glow */}
            <div className="absolute top-[-20%] right-[-20%] w-48 h-48 rounded-full bg-brand-primary/20 filter blur-3xl pointer-events-none" />

            <div className="flex flex-col gap-1.5 z-10">
              <div className="flex items-center gap-2">
                <Sparkles className="text-brand-primary" size={18} />
                <h2 className="text-lg font-bold text-brand-text font-display">Create SaaS Account</h2>
              </div>
              <p className="text-xs text-brand-muted">Configure your local session credentials to get started.</p>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/25 text-xs text-red-400 font-semibold z-10">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleRegister} className="flex flex-col gap-4 z-10">
              
              {/* Name Field */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted/40" size={14} />
                  <input
                    type="text"
                    disabled={isLoading}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
                    className="w-full pl-10 pr-4 py-3 text-xs bg-white/[0.01] border border-white/[0.06] rounded-xl text-brand-text placeholder-brand-muted/30 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted/40" size={14} />
                  <input
                    type="email"
                    disabled={isLoading}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 text-xs bg-white/[0.01] border border-white/[0.06] rounded-xl text-brand-text placeholder-brand-muted/30 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                  />
                </div>
              </div>

              {/* Target Job Title Field */}
              <div className="flex flex-col gap-2">
                <label className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">Target Career Track</label>
                <div className="relative">
                  <Briefcase className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-muted/40 pointer-events-none" size={14} />
                  <select
                    disabled={isLoading}
                    value={selectedTrack}
                    onChange={handleTrackChange}
                    className="w-full pl-10 pr-10 py-3 text-xs bg-brand-bg border border-white/[0.06] rounded-xl text-brand-text placeholder-brand-muted/30 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all appearance-none cursor-pointer"
                  >
                    <option value="Senior Frontend Engineer">Senior Frontend Engineer</option>
                    <option value="Senior Python Developer">Senior Python Developer</option>
                    <option value="Backend Systems Architect">Backend Systems Architect</option>
                    <option value="Algorithmic DSA Candidate">Algorithmic DSA Candidate</option>
                    <option value="Full-Stack Engineer">Full-Stack Engineer</option>
                    <option value="Other">Other</option>
                  </select>
                  <ChevronDown className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-muted/50 pointer-events-none" size={14} />
                </div>

                {/* Dynamic Custom Career Input when 'Other' is selected */}
                <AnimatePresence>
                  {selectedTrack === 'Other' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, y: -4 }}
                      animate={{ opacity: 1, height: 'auto', y: 0 }}
                      exit={{ opacity: 0, height: 0, y: -4 }}
                      transition={{ duration: 0.2 }}
                      className="flex flex-col gap-1.5 pt-1 overflow-hidden"
                    >
                      <div className="relative">
                        <Sparkles className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-primary/60 pointer-events-none" size={14} />
                        <input
                          type="text"
                          disabled={isLoading}
                          value={customCareer}
                          onChange={(e) => {
                            setCustomCareer(e.target.value);
                            if (errorMsg) setErrorMsg('');
                          }}
                          placeholder="Enter your target career"
                          className="w-full pl-10 pr-4 py-3 text-xs bg-white/[0.01] border border-white/[0.06] rounded-xl text-brand-text placeholder-brand-muted/30 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
                        />
                      </div>
                      <span className="text-[10px] text-brand-muted/70 pl-1">
                        e.g. AI Engineer, Data Scientist, Cloud Engineer, DevOps Engineer
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Submit Action */}
              <AnimatedButton
                disabled={isLoading}
                type="submit"
                variant="primary"
                glow
                className="w-full py-3 px-4 mt-2 text-xs font-semibold tracking-wide flex items-center justify-center gap-2 transition-all duration-300"
              >
                {isLoading ? (
                  <span>Creating account...</span>
                ) : (
                  <>
                    <span>Create Account</span>
                    <ArrowRight size={14} className="opacity-90 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </AnimatedButton>

            </form>

            <span className="text-[9px] text-brand-muted text-center leading-normal mt-2 z-10">
              * Fully local data sandbox. We protect your privacy; zero logs leave your browser cache.
            </span>

          </DashboardCard>
        </div>

      </div>
    </div>
  );
}
