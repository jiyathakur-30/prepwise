import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Compass, Sparkles, ArrowLeft, AlertOctagon, RefreshCw } from 'lucide-react';
import AnimatedButton from '../components/AnimatedButton';
import { playHoverTick, playHologramStart } from '../utils/audio';

export default function NotFoundPage() {
  const [coachQuote, setCoachQuote] = useState({
    name: 'Sophia',
    avatar: 'S',
    role: 'AI Senior Recruiter',
    gradient: 'from-purple-500 to-indigo-500',
    quote: "It looks like you've wandered off our calibrated interview tracks. The coordinates of this page don't match any active job profile, but don't panic! Let's get you back on track to your dream offer."
  });

  const quotes = [
    {
      name: 'Sophia',
      avatar: 'S',
      role: 'AI Senior Recruiter & Leadership Coach',
      gradient: 'from-purple-500 to-indigo-500',
      quote: "It looks like you've wandered off our calibrated interview tracks. The coordinates of this page don't match any active role pathway, but don't panic! Let's get you back on track to your dream offer."
    },
    {
      name: 'Marcus',
      avatar: 'M',
      role: 'AI Principal Engineer',
      gradient: 'from-emerald-500 to-teal-500',
      quote: "404: Node path not resolved in PrepWise routers. Your current navigation stack has overflowed. Let's garbage-collect this bad request and redirect your thread to the main command center."
    },
    {
      name: 'Vikram',
      avatar: 'V',
      role: 'AI Product Manager',
      gradient: 'from-amber-500 to-orange-500',
      quote: "This trajectory lacks a solid value proposition. We're tracking 0 active metrics for this page. Let's pivot back to your dashboard to optimize our performance index."
    },
    {
      name: 'Elon',
      avatar: 'E',
      role: 'AI Venture Capitalist',
      gradient: 'from-rose-500 to-red-500',
      quote: "Highly suboptimal trajectory detected. This route is a vacuum of productivity. Abort immediately and return to the main launching pad. Speed is key!"
    }
  ];

  useEffect(() => {
    // Play hologram start sound when the page loads to give a sci-fi activation sweep
    playHologramStart();

    // Randomize a coach to make the 404 page highly responsive and delightful
    const randomCoach = quotes[Math.floor(Math.random() * quotes.length)];
    setCoachQuote(randomCoach);
  }, []);

  const handleHover = () => {
    playHoverTick();
  };

  const handleCycleCoach = () => {
    playHoverTick();
    const currentIndex = quotes.findIndex(q => q.name === coachQuote.name);
    const nextIndex = (currentIndex + 1) % quotes.length;
    setCoachQuote(quotes[nextIndex]);
  };

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="flex-grow w-full max-w-4xl mx-auto px-6 py-16 md:py-24 flex flex-col items-center justify-center relative">
      {/* Decorative cyber grid backdrop */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--brand-glow),_transparent_65%)] pointer-events-none opacity-60" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full rounded-3xl glass-card p-8 md:p-12 relative overflow-hidden flex flex-col items-center text-center bg-[#0B0F19]/60 border border-white/[0.08]"
      >
        {/* Abstract 404 Cyber-Spark Neon Circle */}
        <motion.div 
          variants={itemVariants}
          className="relative w-24 h-24 md:w-32 md:h-32 mb-8 flex items-center justify-center"
        >
          {/* Pulsing glow rings */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-brand-primary/10 to-brand-secondary/10 animate-ping opacity-25" />
          <div className="absolute -inset-2 rounded-full border border-brand-primary/20 animate-pulse-subtle" />
          <div className="absolute -inset-4 rounded-full border border-brand-secondary/10" />

          {/* Central neon hexagon-like icon */}
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-tr from-brand-primary/20 to-brand-secondary/20 flex items-center justify-center border border-white/[0.12] shadow-xl text-brand-secondary">
            <AlertOctagon size={36} className="animate-pulse" />
          </div>
        </motion.div>

        {/* Heading Titles */}
        <motion.h1 
          variants={itemVariants}
          className="text-4xl md:text-5xl font-extrabold tracking-tight text-brand-text font-display mb-2"
        >
          404 <span className="text-gradient-secondary font-medium font-sans text-xl md:text-2xl ml-2 tracking-widest uppercase bg-brand-primary/10 border border-brand-primary/25 px-3 py-1 rounded-md">Trajectory Error</span>
        </motion.h1>
        
        <motion.p 
          variants={itemVariants}
          className="text-xs md:text-sm text-brand-muted max-w-md mb-8"
        >
          The resource you requested has dissolved into digital vacuum or has been recalibrated to another security index.
        </motion.p>

        {/* Premium coach commentary block */}
        <motion.div 
          variants={itemVariants}
          className="w-full max-w-xl p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] text-left mb-8 relative group hover:border-brand-primary/30 transition-all duration-300 shadow-lg"
        >
          <div className="flex items-start gap-4">
            {/* Coach avatar */}
            <div className={`w-10 h-10 rounded-full bg-gradient-to-tr ${coachQuote.gradient} flex items-center justify-center text-brand-bg font-black text-sm shadow-md`}>
              {coachQuote.avatar}
            </div>

            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xs font-extrabold text-brand-text flex items-center gap-1.5">
                    {coachQuote.name}
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-brand-primary/15 text-brand-primary border border-brand-primary/20 uppercase tracking-widest font-sans font-bold">
                      COACH
                    </span>
                  </h3>
                  <p className="text-[9px] text-brand-muted font-medium mt-0.5">{coachQuote.role}</p>
                </div>
                <button
                  onClick={handleCycleCoach}
                  onMouseEnter={handleHover}
                  title="Ask another coach"
                  className="p-1.5 rounded-lg bg-white/[0.04] border border-white/[0.08] hover:bg-brand-primary/10 hover:border-brand-primary/25 hover:text-brand-primary text-brand-muted transition-all cursor-pointer"
                >
                  <RefreshCw size={10} className="transition-transform group-hover:rotate-180 duration-500" />
                </button>
              </div>
              <p className="text-[11px] text-brand-text leading-relaxed font-medium mt-3 italic border-l-2 border-brand-primary/40 pl-3">
                "{coachQuote.quote}"
              </p>
            </div>
          </div>
        </motion.div>

        {/* Back links */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap gap-4 justify-center"
        >
          <Link to="/" onMouseEnter={handleHover}>
            <AnimatedButton 
              variant="secondary" 
              className="px-6 py-3.5 text-[10px] font-extrabold uppercase tracking-widest gap-2"
            >
              <ArrowLeft size={12} />
              <span>Back To Landing</span>
            </AnimatedButton>
          </Link>
          <Link to="/dashboard" onMouseEnter={handleHover}>
            <AnimatedButton 
              variant="primary" 
              glow
              className="px-8 py-3.5 text-[10px] font-extrabold uppercase tracking-widest gap-2"
            >
              <Compass size={12} />
              <span>Enter Portal</span>
            </AnimatedButton>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
