import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import OrbField from '../components/landing/OrbField';
import FeatureCard from '../components/FeatureCard';

const ease = [0.16, 1, 0.3, 1];

function useReveal() {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.8, ease },
  };
}

const capabilities = [
  {
    title: 'Adaptive question flow',
    description: 'Questions select themselves based on how you answer. Strong responses advance depth; weak ones probe foundations.',
  },
  {
    title: 'Voice-based practice',
    description: 'Speak your answers aloud. The session listens, transcribes, and evaluates delivery alongside content.',
  },
  {
    title: 'Role-specific preparation',
    description: 'Practice against role tracks calibrated for frontend, backend, systems, and behavioral interview loops.',
  },
  {
    title: 'Detailed performance feedback',
    description: 'Every answer receives a score with strengths, gaps, and concrete restructuring guidance mapped to the ideal response.',
  },
  {
    title: 'Real-time interview simulation',
    description: 'A timed split environment with active interviewer presence, status signals, and pacing that mirrors a real loop.',
  },
  {
    title: 'Session history',
    description: 'Each practice run is preserved. Return to review past answers, track improvement, and compare runs over time.',
  },
];

export default function LandingPage() {
  const reveal = useReveal();
  const heroRef = useRef(null);

  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    let raf;
    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      if (raf) cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--px', `${x * 14}px`);
        el.style.setProperty('--py', `${y * 10}px`);
      });
    };
    const onLeave = () => {
      el.style.setProperty('--px', '0px');
      el.style.setProperty('--py', '0px');
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="relative w-full bg-black text-brand-text overflow-hidden">
      {/* ====================================================================
          1. HERO
          ==================================================================== */}
      <section
        ref={heroRef}
        className="relative min-h-[100svh] flex flex-col justify-center px-6 md:px-10 lg:px-16 overflow-hidden"
        style={{ '--px': '0px', '--py': '0px' }}
      >
        {/* Deep base wash */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_60%_45%,rgba(124,92,255,0.10),transparent_60%)] pointer-events-none" />

        {/* Dimensional orb field */}
        <OrbField className="absolute inset-0 w-full h-full" />

        {/* Fine grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)',
            backgroundSize: '72px 72px',
          }}
        />

        {/* Vignette for depth */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.55)_100%)] pointer-events-none" />

        {/* Content layer */}
        <div
          className="relative z-10 max-w-5xl mx-auto w-full"
          style={{
            transform: 'translate(calc(var(--px) * -1), calc(var(--py) * -1))',
            transition: 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {/* System labels */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-10 md:mb-14"
          >
            <span className="text-[10px] md:text-[11px] font-light text-brand-primary/80 tracking-[0.3em] uppercase">
              Interview Intelligence / 01
            </span>
            <span className="hidden sm:inline-block w-8 h-px bg-white/10" />
            <span className="text-[10px] md:text-[11px] font-light text-brand-muted tracking-[0.3em] uppercase">
              Adaptive Practice System
            </span>
          </motion.div>

          {/* Hero headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease }}
            className="font-light tracking-[-0.02em] leading-[0.95] text-[15vw] sm:text-[12vw] md:text-[9vw] lg:text-[8rem] xl:text-[9rem]"
          >
            PREPWISE<span className="text-brand-primary">.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55, ease }}
            className="mt-6 md:mt-8 text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light text-brand-text/90 tracking-tight max-w-2xl leading-[1.15]"
          >
            Where practice becomes instinct.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.75, ease }}
            className="mt-8 md:mt-10 text-sm md:text-base font-light text-brand-muted max-w-xl leading-relaxed"
          >
            AI-powered interview simulations that understand how you answer, adapt to how you think, and show you exactly where to improve.
          </motion.p>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.95, ease }}
            className="mt-10 md:mt-14"
          >
            <Link to="/select" className="group inline-flex items-center gap-3 text-base md:text-lg font-light text-brand-text tracking-tight">
              <span className="relative">
                Start an Interview
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-primary transition-all duration-500 group-hover:w-full" />
              </span>
              <ArrowRight
                size={20}
                className="text-brand-primary transition-transform duration-500 group-hover:translate-x-2"
              />
            </Link>
          </motion.div>
        </div>

        {/* Bottom system status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-6 md:left-10 lg:left-16 right-6 md:right-10 lg:right-16 flex items-center justify-between z-10"
        >
          <span className="text-[10px] font-light text-brand-muted tracking-[0.3em] uppercase">
            Session Status: Ready
          </span>
          <motion.span
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            className="text-[10px] font-light text-brand-primary tracking-[0.3em] uppercase"
          >
            ● Online
          </motion.span>
        </motion.div>
      </section>

      {/* ====================================================================
          2. PRODUCT SIGNAL STRIP
          ==================================================================== */}
      <section className="relative px-6 md:px-10 lg:px-16 py-20 md:py-28 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto">
          <motion.span
            {...reveal}
            className="block text-[11px] font-light text-brand-primary/70 tracking-[0.3em] uppercase mb-10 md:mb-14"
          >
            The Loop
          </motion.span>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-10 md:gap-y-0">
            {['Simulate', 'Analyze', 'Improve', 'Repeat'].map((label, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.1, ease }}
                className="flex flex-col"
              >
                <span className="text-[10px] font-light text-brand-muted tracking-[0.25em] mb-3">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-2xl md:text-3xl lg:text-4xl font-light tracking-tight text-brand-text">
                  {label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. ADAPTIVE INTERVIEW SECTION
          ==================================================================== */}
      <section className="relative px-6 md:px-10 lg:px-16 py-28 md:py-40 overflow-hidden">
        {/* Subtle ambient orb */}
        <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-brand-primary/8 blur-[120px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          <div className="lg:col-span-7">
            <motion.span
              {...reveal}
              className="block text-[11px] font-light text-brand-primary/70 tracking-[0.3em] uppercase mb-6"
            >
              Practice / 02
            </motion.span>

            <motion.h2
              {...reveal}
              transition={{ duration: 0.9, ease }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.02em] leading-[1.05] text-brand-text"
            >
              Practice conversations that respond to you.
            </motion.h2>

            <motion.p
              {...reveal}
              transition={{ duration: 0.9, delay: 0.1, ease }}
              className="mt-8 text-base md:text-lg font-light text-brand-muted leading-relaxed max-w-xl"
            >
              Choose a role. Start a session. Questions adapt to your answers in real time, delivered through a timed simulation with voice input and an active interviewer presence.
            </motion.p>

            <motion.div
              {...reveal}
              transition={{ duration: 0.9, delay: 0.2, ease }}
              className="mt-10 flex flex-col gap-3 max-w-md"
            >
              {[
                'Role-based interview practice',
                'Voice input and live transcription',
                'Timed, adaptive question flow',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-1 h-1 rounded-full bg-brand-primary" />
                  <span className="text-sm font-light text-brand-text/80">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Minimal visual: orbiting nodes */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease }}
            className="lg:col-span-5 relative aspect-square max-w-sm mx-auto w-full"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-[80%] h-[80%]">
                {/* Rings */}
                {[1, 0.72, 0.45].map((s, i) => (
                  <div
                    key={i}
                    className="absolute inset-0 rounded-full border border-white/[0.06]"
                    style={{ transform: `scale(${s})` }}
                  />
                ))}
                {/* Center node */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-brand-primary animate-pulse" />
                </div>
                {/* Orbiting dots */}
                {[0, 1, 2].map((i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 left-1/2 w-1.5 h-1.5 rounded-full bg-brand-primary/60"
                    style={{
                      transform: `rotate(${i * 120}deg) translateX(38%)`,
                      transformOrigin: '0 0',
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====================================================================
          4. INTELLIGENCE / FEEDBACK SECTION
          ==================================================================== */}
      <section className="relative px-6 md:px-10 lg:px-16 py-28 md:py-40 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          {/* Animated score visualization */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, ease }}
            className="lg:col-span-5 order-2 lg:order-1"
          >
            <div className="relative w-full max-w-xs mx-auto">
              <div className="relative aspect-square">
                {/* Score rings */}
                <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                  <circle cx="100" cy="100" r="88" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1.5" />
                  <motion.circle
                    cx="100"
                    cy="100"
                    r="88"
                    fill="none"
                    stroke="url(#scoreGrad)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeDasharray="553"
                    initial={{ strokeDashoffset: 553 }}
                    whileInView={{ strokeDashoffset: 553 - (553 * 0.82) }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, ease, delay: 0.3 }}
                  />
                  <defs>
                    <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#7C5CFF" stopOpacity="0.3" />
                      <stop offset="100%" stopColor="#7C5CFF" stopOpacity="1" />
                    </linearGradient>
                  </defs>
                </svg>
                {/* Center */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[10px] font-light text-brand-muted tracking-[0.3em] uppercase mb-2">
                    Session Score
                  </span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 1.4 }}
                    className="text-5xl md:text-6xl font-light tracking-tight text-brand-text"
                  >
                    82
                  </motion.span>
                  <span className="text-[10px] font-light text-brand-primary tracking-[0.2em] uppercase mt-2">
                    +14 vs last
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Copy */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <motion.span
              {...reveal}
              className="block text-[11px] font-light text-brand-primary/70 tracking-[0.3em] uppercase mb-6"
            >
              Feedback / 03
            </motion.span>

            <motion.h2
              {...reveal}
              transition={{ duration: 0.9, ease }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.02em] leading-[1.05] text-brand-text"
            >
              Know what changed between one answer and the next.
            </motion.h2>

            <motion.p
              {...reveal}
              transition={{ duration: 0.9, delay: 0.1, ease }}
              className="mt-8 text-base md:text-lg font-light text-brand-muted leading-relaxed max-w-xl"
            >
              After every session, a dashboard breaks down your performance: overall score, strengths, improvement areas, and specific restructuring guidance mapped to ideal answers.
            </motion.p>

            <motion.div
              {...reveal}
              transition={{ duration: 0.9, delay: 0.2, ease }}
              className="mt-10 grid grid-cols-2 gap-x-8 gap-y-4 max-w-md"
            >
              {[
                'Overall score',
                'Strengths',
                'Improvement areas',
                'Actionable feedback',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-1 h-1 rounded-full bg-brand-primary" />
                  <span className="text-sm font-light text-brand-text/80">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. PRODUCT CAPABILITIES
          ==================================================================== */}
      <section className="relative px-6 md:px-10 lg:px-16 py-28 md:py-40 border-t border-white/[0.04]">
        <div className="max-w-5xl mx-auto">
          <motion.span
            {...reveal}
            className="block text-[11px] font-light text-brand-primary/70 tracking-[0.3em] uppercase mb-6"
          >
            Capabilities / 04
          </motion.span>

          <motion.h2
            {...reveal}
            transition={{ duration: 0.9, ease }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-[-0.02em] leading-[1.05] text-brand-text max-w-3xl mb-16 md:mb-20"
          >
            Everything the simulation measures.
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-12">
            {capabilities.map((cap, i) => (
              <FeatureCard
                key={cap.title}
                index={i + 1}
                title={cap.title}
                description={cap.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          6. FINAL CONVERSION
          ==================================================================== */}
      <section className="relative px-6 md:px-10 lg:px-16 py-40 md:py-56 border-t border-white/[0.04] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,92,255,0.08),transparent_65%)] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.span
            {...reveal}
            className="block text-[11px] font-light text-brand-primary/70 tracking-[0.3em] uppercase mb-8"
          >
            Begin
          </motion.span>

          <motion.h2
            {...reveal}
            transition={{ duration: 1, ease }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-[-0.02em] leading-[1.02] text-brand-text"
          >
            Your next interview
            <br />
            starts before the interview.
          </motion.h2>

          <motion.p
            {...reveal}
            transition={{ duration: 1, delay: 0.1, ease }}
            className="mt-8 text-base md:text-lg font-light text-brand-muted max-w-lg mx-auto leading-relaxed"
          >
            One session is enough to see where you stand and what to refine. The first one is ready whenever you are.
          </motion.p>

          <motion.div
            {...reveal}
            transition={{ duration: 1, delay: 0.2, ease }}
            className="mt-12"
          >
            <Link to="/select" className="group inline-flex items-center gap-3 text-lg md:text-xl font-light text-brand-text tracking-tight">
              <span className="relative">
                Begin your practice
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-primary transition-all duration-500 group-hover:w-full" />
              </span>
              <ArrowRight
                size={22}
                className="text-brand-primary transition-transform duration-500 group-hover:translate-x-2"
              />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
