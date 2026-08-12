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

/* --- Voice waveform visualization for the Practice section --- */
function VoiceWaveform() {
  const bars = useRef(null);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !bars.current) return;

    const barsEl = bars.current;
    let raf;
    const start = performance.now();

    function tick(now) {
      const t = (now - start) / 1000;
      for (let i = 0; i < barsEl.children.length; i++) {
        const bar = barsEl.children[i];
        const phase = i * 0.5;
        const h = 0.3 + (Math.sin(t * 2 + phase) * 0.5 + 0.5) * 0.7;
        bar.style.transform = `scaleY(${h.toFixed(3)})`;
        bar.style.opacity = (0.25 + h * 0.6).toFixed(2);
      }
      raf = requestAnimationFrame(tick);
    }
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const barCount = 28;

  return (
    <div className="relative w-full max-w-[320px] mx-auto">
      {/* Faint orb behind waveform */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(124,92,255,0.08), transparent 70%)',
        }}
      />
      {/* Waveform */}
      <div
        ref={bars}
        className="relative flex items-center justify-center gap-[3px] h-24 md:h-28"
      >
        {Array.from({ length: barCount }).map((_, i) => (
          <div
            key={i}
            className="w-[2px] bg-brand-primary/60 origin-center rounded-full"
            style={{ height: '100%', transform: 'scaleY(0.3)' }}
          />
        ))}
      </div>
      {/* Label */}
      <div className="mt-6 flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-brand-primary/60 animate-pulse" />
        <span className="text-[10px] font-light text-white/25 tracking-[0.3em] uppercase">
          Listening
        </span>
      </div>
    </div>
  );
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

const loopSteps = [
  { num: '01', label: 'Simulate', desc: 'Practice realistic interview conversations.' },
  { num: '02', label: 'Analyze', desc: 'Understand how you answered.' },
  { num: '03', label: 'Improve', desc: 'See exactly where you need work.' },
  { num: '04', label: 'Repeat', desc: 'Practice again with better preparation.' },
];

const practiceFeatures = [
  'Role-based interview practice',
  'Voice input and live transcription',
  'Timed interview sessions',
  'Adaptive question flow',
];

export default function LandingPage() {
  const reveal = useReveal();

  return (
    <div className="relative w-full bg-black text-brand-text overflow-x-hidden">
      <LandingNav />

      {/* ====================================================================
          1. HERO — robust layout, no clipping
          ==================================================================== */}
      <section
        className="relative min-h-[100svh] flex items-center justify-center overflow-hidden"
        style={{ paddingTop: '4rem', paddingBottom: '5rem' }}
      >
        {/* Dimensional orb field — behind everything */}
        <OrbField className="absolute inset-0 w-full h-full" />

        {/* Vignette for depth and text legibility */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.35)_20%,rgba(0,0,0,0.8)_100%)] pointer-events-none" />

        {/* Centered content — flex with safe padding, never clips */}
        <div className="relative z-10 text-center px-6 max-w-5xl mx-auto w-full flex flex-col items-center justify-center">
          {/* Subtle system labels */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3 }}
            className="flex items-center justify-center gap-3 sm:gap-5 mb-10 md:mb-14"
          >
            <span className="text-[9px] md:text-[10px] font-light text-white/20 tracking-[0.3em] uppercase">
              Interview Intelligence / 01
            </span>
            <span className="hidden sm:inline-block w-6 h-px bg-white/8" />
            <span className="text-[9px] md:text-[10px] font-light text-white/15 tracking-[0.3em] uppercase">
              Adaptive Practice System
            </span>
          </motion.div>

          {/* PREPWISE. — small/medium, NOT dominant */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease }}
            className="font-sans font-light tracking-[0.02em] leading-none text-brand-text/70"
            style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}
          >
            PREPWISE<span className="text-brand-primary">.</span>
          </motion.h1>

          {/* Main statement — DOMINANT */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.55, ease }}
            className="mt-8 md:mt-10 font-sans font-light tracking-[-0.03em] leading-[0.98] text-brand-text"
            style={{ fontSize: 'clamp(2.5rem, 9vw, 6.5rem)' }}
          >
            Where practice<br />
            becomes instinct.
          </motion.p>

          {/* Supporting copy — small and muted */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.75, ease }}
            className="mt-10 md:mt-14 text-sm md:text-base font-light text-white/25 max-w-md mx-auto leading-relaxed"
          >
            AI-powered interview simulations that understand how you answer, adapt to how you think, and show you exactly where to improve.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.95, ease }}
            className="mt-10 md:mt-14"
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
          transition={{ duration: 1.2, delay: 1.2 }}
          className="absolute bottom-6 left-6 md:left-10 lg:left-16 right-6 md:right-10 lg:right-16 flex items-center justify-between z-10"
        >
          <span className="text-[9px] md:text-[10px] font-light text-white/15 tracking-[0.3em] uppercase">
            Session Status: Ready
          </span>
          <motion.span
            animate={{ opacity: [0.2, 0.6, 0.2] }}
            transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
            className="text-[9px] md:text-[10px] font-light text-brand-primary/40 tracking-[0.3em] uppercase"
          >
            ● Online
          </motion.span>
        </motion.div>
      </section>

      {/* ====================================================================
          2. PRODUCT LOOP — four separate editorial columns
          ==================================================================== */}
      <section className="relative px-6 md:px-10 lg:px-16 pt-40 pb-40 md:pt-56 md:pb-56">
        <div className="max-w-5xl mx-auto">
          <motion.span
            {...reveal}
            className="block text-[10px] font-light text-white/15 tracking-[0.3em] uppercase mb-20 md:mb-28 text-center"
          >
            The Loop
          </motion.span>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-12 lg:gap-20">
            {loopSteps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.8, delay: i * 0.15, ease }}
                className="flex flex-col"
              >
                <span className="text-[10px] font-light text-brand-primary/40 tracking-[0.25em] mb-5">
                  {step.num}
                </span>
                <span className="text-xl md:text-2xl lg:text-3xl font-light tracking-tight text-brand-text/70 mb-4">
                  {step.label}
                </span>
                <span className="text-sm font-light text-white/25 leading-relaxed max-w-[200px]">
                  {step.desc}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. PRACTICE SECTION — balanced with voice waveform
          ==================================================================== */}
      <section className="relative px-6 md:px-10 lg:px-16 pt-36 pb-36 md:pt-52 md:pb-52 overflow-hidden">
        <div className="relative max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          {/* Left: copy */}
          <div className="lg:col-span-7">
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
              {practiceFeatures.map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <span className="w-1 h-1 rounded-full bg-brand-primary/60" />
                  <span className="text-sm font-light text-brand-text/60">{item}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: voice waveform visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.2, ease }}
            className="lg:col-span-5 order-first lg:order-last"
          >
            <VoiceWaveform />
          </motion.div>
        </div>
      </section>

      {/* ====================================================================
          4. FEEDBACK / INTELLIGENCE
          ==================================================================== */}
      <section className="relative px-6 md:px-10 lg:px-16 pt-36 pb-36 md:pt-52 md:pb-52 overflow-hidden">
        <div className="relative max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          {/* Score ring */}
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
      <section className="relative px-6 md:px-10 lg:px-16 pt-36 pb-36 md:pt-52 md:pb-52">
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
      <section className="relative px-6 pt-48 pb-48 md:pt-64 md:pb-64 overflow-hidden">
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
