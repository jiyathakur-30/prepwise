import React from 'react';
import { motion } from 'framer-motion';

export default function ScoreCircle({
  score,
  size = 140,
  strokeWidth = 10,
  label = 'Overall',
  className = ''
}) {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const scorePercentage = Math.min(Math.max(score, 0), 100);
  const strokeDashoffset = circumference - (scorePercentage / 100) * circumference;

  // Determine accent styling based on score ranges (premium gradient mapping)
  const getGradientIds = () => {
    if (scorePercentage >= 80) return { from: '#7C5CFF', to: '#00D4FF' };
    if (scorePercentage >= 50) return { from: '#EAB308', to: '#7C5CFF' };
    return { from: '#EF4444', to: '#F97316' };
  };

  const gradientColors = getGradientIds();

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          {/* Background track circle */}
          <circle
            className="text-white/[0.03]"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
          />
          
          {/* Active progress circle (Animated) */}
          <motion.circle
            stroke="url(#scoreCircleGradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            fill="transparent"
            r={radius}
            cx={size / 2}
            cy={size / 2}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{
              strokeDasharray: circumference,
            }}
          />

          {/* Define Gradient */}
          <defs>
            <linearGradient id="scoreCircleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={gradientColors.from} />
              <stop offset="100%" stopColor={gradientColors.to} />
            </linearGradient>
          </defs>
        </svg>

        {/* Text score centered inside circle */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-3xl font-extrabold text-brand-text tracking-tighter">
            {scorePercentage}
            <span className="text-sm font-normal text-brand-muted">%</span>
          </span>
          {label && (
            <span className="text-[10px] font-semibold text-brand-muted uppercase tracking-wider mt-0.5">
              {label}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
