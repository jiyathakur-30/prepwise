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
        className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden pt-16 pb-12"
        style={{ '--px': '0px', '--py': '0px' }}
      >
        {/* Dimensional orb field */}
        <OrbField className="absolute inset-0 w-full h-full z-0 pointer-events-auto" />

        {/* Vignette for depth — darkens edges, keeps center readable */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.25)_25%,rgba(0,0,0,0.75)_100%)] pointer-events-none z-[1]" />

        {/* Hero content container: Left-center balanced composition (~18–22% from left on desktop) */}
        <div
          className="relative z-10 w-full max-w-5xl mx-auto px-6 sm:px-10 lg:pl-16 lg:pr-8 my-auto pointer-events-none"
          style={{
            transform: 'translate(calc(var(--px) * -1), calc(var(--py) * -1))',
            transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
          }}
        >
          <div className="max-w-[540px] flex flex-col items-center sm:items-start text-center sm:text-left">
            {/* 1. Metadata: INTERVIEW INTELLIGENCE / 01 — ADAPTIVE PRACTICE SYSTEM */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.25, ease }}
              className="flex items-center justify-center sm:justify-start gap-2.5 sm:gap-3 mb-5 md:mb-6 pointer-events-auto select-none"
            >
              <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.20em] uppercase text-zinc-400">
                INTERVIEW INTELLIGENCE / 01
              </span>
              <span className="w-4 h-px bg-white/20" />
              <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.20em] uppercase text-zinc-400">
                ADAPTIVE PRACTICE SYSTEM
              </span>
            </motion.div>

            {/* 2. Main Headline: Exactly 2 lines on desktop, ~60-68px, light/300 font */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.35, ease }}
              className="font-sans font-light tracking-[-0.035em] text-white pointer-events-auto select-none"
              style={{
                fontSize: 'clamp(2.25rem, 4.2vw, 4rem)',
                lineHeight: 1.08,
              }}
            >
              Where practice<br className="hidden sm:inline" /> becomes instinct.
            </motion.h1>

            {/* 3. Supporting Text: Left-aligned, max-w ~520px, #A1A1AA, line-height 1.6 */}
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.5, ease }}
              className="mt-5 md:mt-6 text-[15px] sm:text-[16px] font-light text-[#A1A1AA] max-w-[520px] leading-[1.6] pointer-events-auto"
            >
              AI-powered interview simulations that understand how you answer, adapt to how you think, and show you exactly where to improve.
            </motion.p>

            {/* 4. Editorial Text CTA: Clean text link with purple arrow */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.1, delay: 0.65, ease }}
              className="mt-7 md:mt-9 pointer-events-auto"
            >
              <Link
                to="/select"
                className="group inline-flex items-center gap-2.5 text-[16px] sm:text-[17px] font-normal text-white tracking-tight cursor-pointer select-none"
              >
                <span className="relative">
                  Start an Interview
                  <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand-primary transition-all duration-300 group-hover:w-full" />
                </span>
                <ArrowRight
                  size={18}
                  className="text-brand-primary transition-transform duration-300 group-hover:translate-x-1.5"
                />
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Bottom system status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.3 }}
          className="absolute bottom-6 md:bottom-8 left-6 md:left-10 lg:left-16 right-6 md:right-10 lg:right-16 flex items-center justify-between z-10 pointer-events-none"
        >
          <span className="text-[10px] md:text-[11px] font-medium text-zinc-400 tracking-[0.25em] uppercase">
            Session Status: Ready
          </span>
          <motion.span
            animate={{ opacity: [0.35, 1, 0.35] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            className="text-[10px] md:text-[11px] font-medium text-brand-primary tracking-[0.25em] uppercase"
          >
            ● Online
          </motion.span>
        </motion.div>
      </section>

      {/* ====================================================================
          2. PRODUCT LOOP — minimal editorial transition
          ==================================================================== */}
      <section className="relative px-6 py-20 md:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <motion.span
            {...reveal}
            className="block text-[10px] md:text-[11px] font-medium text-zinc-400 tracking-[0.25em] uppercase mb-8 md:mb-12"
          >
            The Loop
          </motion.span>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-8 md:gap-x-8 lg:gap-x-10 max-w-4xl mx-auto">
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
                className="flex flex-col items-center text-center px-2"
              >
                <span className="text-[10px] md:text-[11px] font-medium text-brand-primary/90 tracking-[0.25em] mb-2 md:mb-3">
                  {item.idx}
                </span>
                <span className="text-xl md:text-2xl font-light tracking-tight text-brand-text">
                  {item.label}
                </span>
                <span className="mt-2 md:mt-3 text-xs md:text-sm font-light text-zinc-400 leading-relaxed max-w-[13rem]">
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
      <section className="relative px-6 md:px-10 lg:px-16 py-20 md:py-28 overflow-hidden">
        <div className="relative max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left-side content */}
          <div>
            <motion.span
              {...reveal}
              className="block text-[10px] md:text-[11px] font-medium text-zinc-400 tracking-[0.25em] uppercase mb-4 md:mb-6"
            >
              Practice / 02
            </motion.span>

            <motion.h2
              {...reveal}
              transition={{ duration: 1, ease }}
              className="font-sans font-light tracking-[-0.02em] leading-[1.05] text-brand-text max-w-3xl"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}
            >
              Practice conversations that respond to you.
            </motion.h2>

            <motion.p
              {...reveal}
              transition={{ duration: 1, delay: 0.1, ease }}
              className="mt-6 md:mt-8 text-base md:text-lg font-light text-zinc-400 leading-relaxed max-w-xl"
            >
              Choose a role. Start a session. Questions adapt to your answers in real time, delivered through a timed simulation with voice input and an active interviewer presence.
            </motion.p>

            <motion.div
              {...reveal}
              transition={{ duration: 1, delay: 0.2, ease }}
              className="mt-8 md:mt-10 flex flex-col gap-3 max-w-md"
            >
              {[
                'Role-based interview practice',
                'Voice input and live transcription',
                'Timed, adaptive question flow',
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                  <span className="text-sm font-light text-zinc-300">{item}</span>
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
                        : 'rgba(255,255,255,0.15)',
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
      <section className="relative px-6 md:px-10 lg:px-16 py-20 md:py-28 overflow-hidden">
        <div className="relative max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Score ring — minimal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.2, ease }}
            className="lg:col-span-5 order-2 lg:order-1"
          >
            <div className="relative w-full max-w-[220px] mx-auto aspect-square">
              <svg viewBox="0 0 200 200" className="w-full h-full -rotate-90">
                <circle cx="100" cy="100" r="90" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
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
                <span className="text-[9px] font-medium text-zinc-400 tracking-[0.25em] uppercase mb-1">
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
              className="block text-[10px] md:text-[11px] font-medium text-zinc-400 tracking-[0.25em] uppercase mb-4 md:mb-6"
            >
              Feedback / 03
            </motion.span>

            <motion.h2
              {...reveal}
              transition={{ duration: 1, ease }}
              className="font-sans font-light tracking-[-0.02em] leading-[1.05] text-brand-text"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}
            >
              Know what changed between one answer and the next.
            </motion.h2>

            <motion.p
              {...reveal}
              transition={{ duration: 1, delay: 0.1, ease }}
              className="mt-6 md:mt-8 text-base md:text-lg font-light text-zinc-400 leading-relaxed max-w-xl"
            >
              After every session, a dashboard breaks down your performance: overall score, strengths, improvement areas, and specific restructuring guidance mapped to ideal answers.
            </motion.p>

            <motion.div
              {...reveal}
              transition={{ duration: 1, delay: 0.2, ease }}
              className="mt-8 md:mt-10 grid grid-cols-2 gap-x-8 gap-y-3.5 max-w-md"
            >
              {['Overall score', 'Strengths', 'Improvement areas', 'Actionable feedback'].map(
                (item) => (
                  <div key={item} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary" />
                    <span className="text-sm font-light text-zinc-300">{item}</span>
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
      <section className="relative px-6 md:px-10 lg:px-16 py-20 md:py-28">
        <div className="max-w-5xl mx-auto">
          <motion.span
            {...reveal}
            className="block text-[10px] md:text-[11px] font-medium text-zinc-400 tracking-[0.25em] uppercase mb-4 md:mb-6"
          >
            Capabilities / 04
          </motion.span>

          <motion.h2
            {...reveal}
            transition={{ duration: 1, ease }}
            className="font-sans font-light tracking-[-0.02em] leading-[1.05] text-brand-text max-w-3xl mb-12 md:mb-16"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.75rem)' }}
          >
            Everything the simulation measures.
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-10 md:gap-y-12">
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
      <section className="relative px-6 py-24 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(124,92,255,0.05),transparent_60%)] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.span
            {...reveal}
            className="block text-[10px] md:text-[11px] font-medium text-zinc-400 tracking-[0.25em] uppercase mb-6 md:mb-8"
          >
            Begin
          </motion.span>

          <motion.h2
            {...reveal}
            transition={{ duration: 1.1, ease }}
            className="font-sans font-light tracking-[-0.02em] leading-[1.05] text-brand-text"
            style={{ fontSize: 'clamp(2.25rem, 6vw, 4.5rem)' }}
          >
            Your next interview
            <br />
            starts before the interview.
          </motion.h2>

          <motion.p
            {...reveal}
            transition={{ duration: 1.1, delay: 0.1, ease }}
            className="mt-6 md:mt-8 text-base md:text-lg font-light text-zinc-400 max-w-lg mx-auto leading-relaxed"
          >
            One session is enough to see where you stand and what to refine. The first one is ready whenever you are.
          </motion.p>

          <motion.div
            {...reveal}
            transition={{ duration: 1.1, delay: 0.2, ease }}
            className="mt-10 md:mt-12"
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
