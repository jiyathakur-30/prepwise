import React, { useState, useEffect } from 'react';
import { Sparkles, Terminal } from 'lucide-react';

export default function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  difficulty = 'Medium',
  type = 'Technical'
}) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!question) return;

    let index = 0;
    setDisplayedText('');
    setIsTyping(true);
    
    // Smooth typing simulator
    const text = question;
    const intervalTime = text.length > 120 ? 15 : 22; // speed up for longer text
    
    const timer = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
      index++;
      if (index >= text.length) {
        clearInterval(timer);
        setIsTyping(false);
      }
    }, intervalTime);

    return () => {
      clearInterval(timer);
      setIsTyping(false);
    };
  }, [question]);

  const difficultyColors = {
    easy: 'text-[#00FF87] bg-[#00FF87]/5 border-[#00FF87]/15',
    medium: 'text-[#EAB308] bg-[#EAB308]/5 border-[#EAB308]/15',
    hard: 'text-red-400 bg-red-400/5 border-red-400/15'
  };

  return (
    <div className="relative p-6 rounded-2xl glass-card border border-white/[0.08] overflow-hidden shadow-2xl bg-white/[0.02]">
      {/* Absolute background accent glow */}
      <span className="absolute top-[-20%] right-[-10%] w-60 h-60 bg-brand-primary/5 rounded-full filter blur-3xl pointer-events-none" />

      <div className="flex justify-between items-center mb-5 pb-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-bold">
            Q{questionNumber}
          </span>
          <span className="text-xs text-brand-muted font-medium">
            of {totalQuestions} Questions
          </span>
        </div>

        <div className="flex gap-2">
          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${difficultyColors[difficulty.toLowerCase()] || difficultyColors.medium}`}>
            {difficulty}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-brand-muted">
            {type}
          </span>
        </div>
      </div>

      <div className="relative min-h-[100px] flex items-start">
        {/* Subtle decorative quote indicator */}
        <Terminal className="text-brand-primary/20 shrink-0 mt-1 mr-3" size={20} />

        <div>
          <p className="text-base text-brand-text leading-relaxed font-medium font-sans">
            {displayedText}
            {isTyping && (
              <span className="inline-block w-1.5 h-4 ml-1 bg-brand-primary rounded-full animate-pulse" />
            )}
          </p>
        </div>
      </div>

      {isTyping && (
        <div className="flex items-center gap-2 mt-4 text-[10px] font-medium text-brand-primary animate-pulse">
          <Sparkles size={10} />
          <span>PrepWise AI Coach is formulating question...</span>
        </div>
      )}
    </div>
  );
}
