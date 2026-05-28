import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Play, Sparkles, Terminal, ShieldAlert, Cpu, 
  TrendingUp, Compass, FileText, CheckCircle2, User, Mic
} from 'lucide-react';
import AnimatedButton from '../components/AnimatedButton';
import FeatureCard from '../components/FeatureCard';

export default function LandingPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const features = [
    {
      icon: 'Cpu',
      title: 'AI-Powered Interview Questions',
      description: 'Dynamic, adaptive, and highly customized technical or behavioral questions aligned to your experience level and target role.'
    },
    {
      icon: 'ShieldAlert',
      title: 'Intelligent Answer Evaluation',
      description: 'Instant structural and conceptual analysis that scores correctness, grammar, depth, and communication delivery.'
    },
    {
      icon: 'Terminal',
      title: 'Real-Time Interview Simulation',
      description: 'Immersive split-screen practice environment featuring active timers, active AI status messages, and realistic interviewer presence.'
    },
    {
      icon: 'TrendingUp',
      title: 'Performance Analytics',
      description: 'Understand your growth through granular metrics measuring technical depth, confidence indicators, and structural clarity.'
    },
    {
      icon: 'Compass',
      title: 'Personalized Improvement Suggestions',
      description: 'Clear, actionable roadmap pointers highlighting precisely how to restructure answers and target gaps in your knowledge.'
    },
    {
      icon: 'FileText',
      title: 'Resume-Based Questions',
      description: 'Upload your background profile to experience custom inquiries targeting your specific project descriptions and technologies.'
    }
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex flex-col w-full max-w-7xl mx-auto px-6 py-12 md:py-20 gap-24 md:gap-36"
    >
      
      {/* 1. HERO SECTION */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        
        {/* Left Side: Copy */}
        <div className="lg:col-span-7 flex flex-col items-start gap-6 text-left">
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold uppercase tracking-wider"
          >
            <Sparkles size={12} className="animate-pulse" />
            <span>Next-Gen Career Acceleration</span>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.08] text-brand-text font-display"
          >
            Master Interviews <br />
            <span className="text-gradient-primary">with AI Coach</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-base sm:text-lg text-brand-muted max-w-xl leading-relaxed"
          >
            Practice technical and HR interviews with an intelligent AI coach that evaluates your answers, tracks performance, and helps you improve faster.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap gap-4 mt-2"
          >
            <Link to="/select">
              <AnimatedButton variant="primary" glow className="px-8 py-4 text-xs font-bold uppercase tracking-wider">
                Start Interview
              </AnimatedButton>
            </Link>
            <a href="#demo">
              <AnimatedButton variant="secondary" className="px-6 py-4 text-xs font-bold uppercase tracking-wider gap-2">
                <Play size={12} className="fill-current" />
                <span>Watch Demo</span>
              </AnimatedButton>
            </a>
          </motion.div>
        </div>

        {/* Right Side: High Fidelity SaaS Mockup Dashboard Card */}
        <motion.div 
          variants={itemVariants}
          className="lg:col-span-5 relative"
        >
          {/* Decorative backdrop light behind the preview */}
          <div className="absolute inset-0 bg-gradient-to-tr from-brand-primary/10 to-brand-secondary/10 rounded-3xl filter blur-xl transform translate-x-2 translate-y-2 pointer-events-none" />

          {/* SaaS Preview Card */}
          <div className="relative rounded-2xl glass-card border border-white/[0.08] shadow-2xl p-6 bg-[#0B0F19]/90">
            {/* Header toolbar */}
            <div className="flex items-center justify-between pb-4 border-b border-white/[0.06] mb-5">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/40" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/40" />
                <span className="w-3 h-3 rounded-full bg-green-500/40" />
              </div>
              <span className="text-[10px] font-bold text-brand-secondary tracking-widest uppercase bg-brand-secondary/5 px-2 py-0.5 rounded border border-brand-secondary/15">
                Session Active
              </span>
            </div>

            {/* AI Avatar block */}
            <div className="flex items-center gap-4 mb-5 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04]">
              <div className="relative">
                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-brand-primary to-brand-secondary flex items-center justify-center text-brand-bg font-extrabold shadow-md shadow-brand-primary/20">
                  AI
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-[#00FF87] border-2 border-brand-bg rounded-full" />
              </div>
              <div>
                <div className="text-xs font-bold text-brand-text">PrepWise Coach</div>
                <div className="text-[9px] text-[#00FF87] flex items-center gap-1.5 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#00FF87] animate-ping" />
                  Analyzing response depth...
                </div>
              </div>
            </div>

            {/* Simulated Question */}
            <div className="p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] mb-4">
              <div className="text-[10px] text-brand-primary font-bold uppercase tracking-wider mb-1">
                Question 03 (Frontend Developer)
              </div>
              <p className="text-xs text-brand-text font-medium leading-relaxed">
                "How do you optimize a large-scale React application's rendering performance? Explain strategies like code-splitting and memoization."
              </p>
            </div>

            {/* Audio waveform mock */}
            <div className="flex items-center justify-between gap-1.5 py-4 px-3 rounded-xl bg-brand-primary/5 border border-brand-primary/10">
              <div className="flex items-center gap-2">
                <Mic size={14} className="text-brand-primary" />
                <span className="text-[10px] text-brand-muted font-medium">Listening to spoken pitch...</span>
              </div>
              <div className="flex items-end gap-[2px] h-4">
                <span className="w-[3px] h-1.5 bg-brand-primary rounded-full animate-[pulse_0.6s_infinite_alternate]" />
                <span className="w-[3px] h-3 bg-brand-primary rounded-full animate-[pulse_0.4s_infinite_alternate]" />
                <span className="w-[3px] h-4 bg-brand-primary rounded-full animate-[pulse_0.8s_infinite_alternate]" />
                <span className="w-[3px] h-2 bg-brand-primary rounded-full animate-[pulse_0.5s_infinite_alternate]" />
                <span className="w-[3px] h-1 bg-brand-primary rounded-full animate-[pulse_0.3s_infinite_alternate]" />
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* 2. STATISTICS SECTION */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-6 py-8 border-y border-white/[0.06]">
        {[
          { value: '94%', label: 'Offer Conversion Rate' },
          { value: '50k+', label: 'Mock Sessions Run' },
          { value: '15+', label: 'Engineering Tracks' },
          { value: '3.5x', label: 'Faster Interview Prep' }
        ].map((stat, idx) => (
          <div key={idx} className="flex flex-col items-center justify-center text-center p-4">
            <span className="text-3xl md:text-4xl font-extrabold tracking-tighter text-gradient-primary">
              {stat.value}
            </span>
            <span className="text-[10px] md:text-xs font-bold text-brand-muted uppercase tracking-wider mt-1.5">
              {stat.label}
            </span>
          </div>
        ))}
      </section>

      {/* 3. FEATURE CARDS GRID */}
      <section className="flex flex-col gap-12 text-center">
        <div className="flex flex-col items-center gap-3">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-text font-display">
            Built for Elite Performance
          </h2>
          <p className="text-xs md:text-sm text-brand-muted max-w-lg leading-relaxed">
            PrepWise replicates top tier technology interview loops using standard behavioral matrices and core engineering concepts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <FeatureCard
              key={idx}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </section>

      {/* 4. TESTIMONIALS SECTION */}
      <section id="demo" className="flex flex-col gap-12">
        <div className="text-center flex flex-col items-center gap-3">
          <h2 className="text-3xl font-extrabold tracking-tight text-brand-text font-display">
            Success from Top Engineers
          </h2>
          <p className="text-xs md:text-sm text-brand-muted max-w-lg">
            See how candidates landed offers at funded startups and tech companies using PrepWise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              quote: "The Python GIL and memory profiling questions on PrepWise were exactly what I faced in my high-frequency trading firm interview. The feedback helped me explain it perfectly.",
              author: "Sarah Lin",
              role: "Backend Engineer at Stripe",
              avatarInitials: "SL"
            },
            {
              quote: "The STAR behavioral scorecard was key for me. It pointed out that I spent 80% of my time talking about the problem and only 10% on the actual impact. Fixing that got me my offer.",
              author: "Marcus Chen",
              role: "Frontend Tech Lead at Vercel",
              avatarInitials: "MC"
            },
            {
              quote: "Dynamic difficulty scaling really pushed me. When I got the basic DP questions correct, the coach immediately scaled up to topological graph sorts. Incredible practice.",
              author: "Elena Rostov",
              role: "Software Engineer at Linear",
              avatarInitials: "ER"
            }
          ].map((t, idx) => (
            <div key={idx} className="p-6 rounded-2xl glass-card border border-white/[0.06] bg-white/[0.01] flex flex-col justify-between hover:bg-white/[0.03] transition-all duration-300">
              <p className="text-xs text-brand-muted leading-relaxed italic mb-6">
                "{t.quote}"
              </p>
              
              <div className="flex items-center gap-3 pt-4 border-t border-white/[0.04]">
                <div className="w-9 h-9 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold flex items-center justify-center">
                  {t.avatarInitials}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-brand-text">{t.author}</h4>
                  <p className="text-[10px] text-brand-muted mt-0.5">{t.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="relative p-8 md:p-12 rounded-3xl glass-card overflow-hidden text-center flex flex-col items-center gap-6 bg-gradient-to-b from-brand-primary/5 to-transparent border border-white/[0.08]">
        {/* Background glow spot */}
        <div className="absolute inset-0 bg-brand-primary/5 rounded-3xl filter blur-3xl opacity-50 pointer-events-none" />

        <Sparkles className="text-brand-secondary animate-pulse" size={24} />
        
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-brand-text font-display">
          Land Your Next Dream Offer
        </h2>
        
        <p className="text-xs md:text-sm text-brand-muted max-w-md leading-relaxed mt-[-4px]">
          Join candidates practicing in a realistic sandbox environment. Your dedicated AI coach is waiting.
        </p>

        <Link to="/select" className="mt-2">
          <AnimatedButton variant="primary" glow className="px-10 py-4 text-xs font-bold uppercase tracking-wider">
            Start Free Session
          </AnimatedButton>
        </Link>
      </section>

    </motion.div>
  );
}
