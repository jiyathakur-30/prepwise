import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import OrbField from '../components/landing/OrbField';
import LandingNav from '../components/landing/LandingNav';
import FeatureCard from '../components/FeatureCard';

const ease = [0.16, 1, 0.3, 1];

function useReveal() {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { duration: 0.9, ease },
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
        el.style.setProperty('--px', `${x * 8}px`);
        el.style.setProperty('--py', `${y * 6}px`);
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
      <LandingNav />

      {/* ====================================================================
          1. HERO
          ==================================================================== */}
      <section
        ref={heroRef}
        className="relative min-h-[100svh] flex items-center justify-center overflow-hidden -mt-16"
        style={{ '--px': '0px', '--py': '0px' }}
      >
        {/* Dimensional orb field */}
        <OrbField className="absolute inset-0 w-full h-full" />

        {/* Vignette for depth — darkens edges, keeps center readable */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.25)_25%,rgba(0,0,0,0.75)_100%)] pointer-events-none" />

        {/* Centered content */}
        <div
          className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full"
          style={{
            transform: 'translate(calc(var(--px) * -1), calc(var(--py) * -1))',
            transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          {/* Subtle system labels */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="flex items-center justify-center gap-3 sm:gap-5 mb-14 md:mb-20"
          >
            <span className="text-[9px] md:text-[10px] font-light text-white/20 tracking-[0.3em] uppercase">
              Interview Intelligence / 01
            </span>
            <span className="hidden sm:inline-block w-6 h-px bg-white/8" />
            <span className="text-[9px] md:text-[10px] font-light text-white/15 tracking-[0.3em] uppercase">
              Adaptive Practice System
            </span>
          </motion.div>

          {/* Hero headline — reduced, now secondary to the statement */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease }}
            className="font-sans font-light tracking-[-0.04em] leading-[0.88] text-brand-text"
            style={{ fontSize: 'clamp(2.25rem, 9vw, 8rem)' }}
          >
            PREPWISE<span className="text-brand-primary">.</span>
          </motion.h1>

          {/* Two-line sub-headline — now the dominant hero statement */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.6, ease }}
            className="mt-6 md:mt-8 font-sans font-light tracking-[-0.02em] leading-[1.0] text-brand-text/85"
            style={{ fontSize: 'clamp(2.5rem, 10.5vw, 9rem)' }}
          >
            Where practice<br />
            becomes instinct.
          </motion.p>

          {/* Supporting copy — small and muted */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8, ease }}
            className="mt-10 md:mt-14 text-sm md:text-base font-light text-white/25 max-w-md mx-auto leading-relaxed"
          >
            AI-powered interview simulations that understand how you answer, adapt to how you think, and show you exactly where to improve.
          </motion.p>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 1.0, ease }}
            className="mt-12 md:mt-16"
          >
            <Link
              to="/select"
              className="group inline-flex items-center gap-3 text-base md:text-lg font-light text-brand-text tracking-tight"
            >
              <span className="relative">
                Start an Interview
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-primary transition-all duration-500 group-hover:w-full" />
              </span>
              <ArrowRight
                size={18}
                className="text-brand-primary transition-transform duration-500 group-hover:translate-x-2"
              />
            </Link>
          </motion.div>
        </div>

        {/* Bottom system status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.3 }}
          className="absolute bottom-8 left-6 md:left-10 lg:left-16 right-6 md:right-10 lg:right-16 flex items-center justify-between z-10"
        >
          <span className="text-[9px] md:text-[10px] font-light text-white/15 tracking-[0.3em] uppercase">
            Session Status: Ready
          </span>
          <motion.span
            animate={{ opacity: [0.25, 0.7, 0.25] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            className="text-[9px] md:text-[10px] font-light text-brand-primary/40 tracking-[0.3em] uppercase"
          >
            ● Online
          </motion.span>
        </motion.div>
      </section>

      {/* ====================================================================
          2. PRODUCT LOOP — minimal editorial transition
          ==================================================================== */}
      <section className="relative px-6 py-36 md:py-52">
        <div className="max-w-3xl mx-auto text-center">
          <motion.span
            {...reveal}
            className="block text-[10px] font-light text-white/15 tracking-[0.3em] uppercase mb-14 md:mb-20"
          >
            The Loop
          </motion.span>

          <div className="flex flex-wrap items-start justify-center gap-x-8 gap-y-10 md:gap-x-14 lg:gap-x-20">
            {[
              { idx: '01', label: 'Simulate', desc: 'Practice realistic interviews.' },
              { idx: '02', label: 'Analyze', desc: 'Understand your answers.' },
              { idx: '03', label: 'Improve', desc: 'See where you need work.' },
              { idx: '04', label: 'Repeat', desc: 'Practice with better preparation.' },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: i * 0.12, ease }}
                className="flex flex-col items-center text-center"
              >
                <span className="text-[10px] md:text-[11px] font-light text-white/20 tracking-[0.3em] mb-3">
                  {item.idx}
                </span>
                <span className="text-xl md:text-2xl lg:text-3xl font-light tracking-tight text-brand-text/60">
                  {item.label}
                </span>
                <span className="mt-3 text-xs md:text-sm font-light text-white/20 leading-relaxed max-w-[14rem]">
                  {item.desc}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. ADAPTIVE INTERVIEW
          ==================================================================== */}
      <section className="relative px-6 md:px-10 lg:px-16 py-36 md:py-52 overflow-hidden">
        <div className="relative max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left-side content — unchanged */}
          <div>
            <motion.span
              {...reveal}
              className="block text-[10px] font-light text-white/15 tracking-[0.3em] uppercase mb-8"
            >
              Practice / 02
            </motion.span>

            <motion.h2
              {...reveal}
              transition={{ duration: 1, ease }}
              className="font-sans font-light tracking-[-0.02em] leading-[1.02] text-brand-text max-w-3xl"
              style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}
            >
              Practice conversations that respond to you.
            </motion.h2>

            <motion.p
              {...reveal}
              transition={{ duration: 1, delay: 0.1, ease }}
              className="mt-10 text-base md:text-lg font-light text-white/30 leading-relaxed max-w-xl"
            >
              Choose a role. Start a session. Questions adapt to your answers in real time, delivered through a timed simulation with voice input and an active interviewer presence.
            </motion.p>

            <motion.div
              {...reveal}
              transition={{ duration: 1, delay: 0.2, ease }}
              className="mt-12 flex flex-col gap-3 max-w-md"
            >
              {[
                'Role-based interview practice',
                'Voice input and live transcription',
                'Timed, adaptive question flow',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-1 h-1 rounded-full bg-brand-primary/60" />
                  <span className="text-sm font-light text-brand-text/60">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right-side voice waveform — subtle AI listening visual */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 1.4, ease }}
            className="hidden lg:flex items-center justify-center"
          >
            <div className="flex items-end justify-center gap-[3px] h-24">
              {Array.from({ length: 28 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="w-[2px] rounded-full"
                  style={{
                    background:
                      i % 4 === 0
                        ? 'rgba(124,92,255,0.45)'
                        : 'rgba(255,255,255,0.10)',
                  }}
                  animate={{
                    height: [
                      `${8 + (i % 5) * 4}px`,
                      `${28 + ((i * 7) % 50)}px`,
                      `${8 + (i % 5) * 4}px`,
                    ],
                  }}
                  transition={{
                    duration: 1.2 + (i % 6) * 0.15,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: i * 0.04,
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ====================================================================
          4. FEEDBACK / INTELLIGENCE
          ==================================================================== */}
      <section className="relative px-6 md:px-10 lg:px-16 py-36 md:py-52 overflow-hidden">
        <div className="relative max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          {/* Score ring — minimal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.2, ease }}
            className="lg:col-span-5 order-2 lg:order-1"
          >
            <div className="relative w-full max-w-[240px] mx-auto aspect-square">
              <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
                <motion.circle
                  cx="100"
                  cy="100"
                  r="90"
                  fill="none"
                  stroke="url(#scoreGrad)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeDasharray="565"
                  initial={{ strokeDashoffset: 565 }}
                  whileInView={{ strokeDashoffset: 565 - (565 * 0.82) }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.8, ease, delay: 0.4 }}
                />
                <defs>
                  <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7C5CFF" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#7C5CFF" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-[9px] font-light text-white/20 tracking-[0.3em] uppercase mb-2">
                  Session Score
                </span>
                <motion.span
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                  className="text-4xl md:text-5xl font-light tracking-tight text-brand-text"
                >
                  82
                </motion.span>
              </div>
            </div>
          </motion.div>

          {/* Copy */}
          <div className="lg:col-span-7 order-1 lg:order-2">
            <motion.span
              {...reveal}
              className="block text-[10px] font-light text-white/15 tracking-[0.3em] uppercase mb-8"
            >
              Feedback / 03
            </motion.span>

            <motion.h2
              {...reveal}
              transition={{ duration: 1, ease }}
              className="font-sans font-light tracking-[-0.02em] leading-[1.02] text-brand-text"
              style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}
            >
              Know what changed between one answer and the next.
            </motion.h2>

            <motion.p
              {...reveal}
              transition={{ duration: 1, delay: 0.1, ease }}
              className="mt-10 text-base md:text-lg font-light text-white/30 leading-relaxed max-w-xl"
            >
              After every session, a dashboard breaks down your performance: overall score, strengths, improvement areas, and specific restructuring guidance mapped to ideal answers.
            </motion.p>

            <motion.div
              {...reveal}
              transition={{ duration: 1, delay: 0.2, ease }}
              className="mt-12 grid grid-cols-2 gap-x-8 gap-y-4 max-w-md"
            >
              {['Overall score', 'Strengths', 'Improvement areas', 'Actionable feedback'].map(
                (item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="w-1 h-1 rounded-full bg-brand-primary/60" />
                    <span className="text-sm font-light text-brand-text/60">{item}</span>
                  </div>
                )
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          5. CAPABILITIES
          ==================================================================== */}
      <section className="relative px-6 md:px-10 lg:px-16 py-36 md:py-52">
        <div className="max-w-5xl mx-auto">
          <motion.span
            {...reveal}
            className="block text-[10px] font-light text-white/15 tracking-[0.3em] uppercase mb-8"
          >
            Capabilities / 04
          </motion.span>

          <motion.h2
            {...reveal}
            transition={{ duration: 1, ease }}
            className="font-sans font-light tracking-[-0.02em] leading-[1.02] text-brand-text max-w-3xl mb-20 md:mb-28"
            style={{ fontSize: 'clamp(2rem, 6vw, 4.5rem)' }}
          >
            Everything the simulation measures.
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-24 gap-y-14">
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
      <section className="relative px-6 py-48 md:py-64 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,92,255,0.05),transparent_60%)] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.span
            {...reveal}
            className="block text-[10px] font-light text-white/15 tracking-[0.3em] uppercase mb-10"
          >
            Begin
          </motion.span>

          <motion.h2
            {...reveal}
            transition={{ duration: 1.1, ease }}
            className="font-sans font-light tracking-[-0.02em] leading-[1.0] text-brand-text"
            style={{ fontSize: 'clamp(2.25rem, 7vw, 5.5rem)' }}
          >
            Your next interview
            <br />
            starts before the interview.
          </motion.h2>

          <motion.p
            {...reveal}
            transition={{ duration: 1.1, delay: 0.1, ease }}
            className="mt-10 text-base md:text-lg font-light text-white/25 max-w-lg mx-auto leading-relaxed"
          >
            One session is enough to see where you stand and what to refine. The first one is ready whenever you are.
          </motion.p>

          <motion.div
            {...reveal}
            transition={{ duration: 1.1, delay: 0.2, ease }}
            className="mt-14"
          >
            <Link
              to="/select"
              className="group inline-flex items-center gap-3 text-lg md:text-xl font-light text-brand-text tracking-tight"
            >
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
