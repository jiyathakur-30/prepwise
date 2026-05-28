import React from 'react';
import { motion } from 'framer-motion';

export default function ProgressBar({
  value,
  max = 100,
  label = '',
  subLabel = '',
  className = '',
  animate = true,
  color = 'primary' // 'primary' | 'secondary' | 'accent' | 'warning'
}) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  const colors = {
    primary: 'bg-gradient-to-r from-brand-primary to-brand-secondary',
    secondary: 'bg-[#00D4FF]',
    accent: 'bg-brand-primary',
    warning: 'bg-gradient-to-r from-yellow-500/80 to-red-500/80'
  };

  return (
    <div className={`w-full ${className}`}>
      {(label || subLabel) && (
        <div className="flex justify-between items-center mb-2">
          {label && <span className="text-sm font-medium text-brand-muted">{label}</span>}
          {subLabel && <span className="text-xs font-semibold text-brand-text/80">{subLabel}</span>}
        </div>
      )}
      
      <div className="w-full h-2 bg-white/[0.04] border border-white/[0.05] rounded-full overflow-hidden">
        {animate ? (
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`h-full rounded-full ${colors[color]}`}
          />
        ) : (
          <div
            className={`h-full rounded-full ${colors[color]}`}
            style={{ width: `${percentage}%` }}
          />
        )}
      </div>
    </div>
  );
}
