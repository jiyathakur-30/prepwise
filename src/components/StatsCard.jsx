import React from 'react';
import * as Icons from 'lucide-react';

export default function StatsCard({
  title,
  value,
  description,
  icon,
  trend = '',
  trendType = 'positive', // 'positive' | 'negative' | 'neutral'
  className = ''
}) {
  const IconComponent = Icons[icon] || Icons.Activity;

  const trendColors = {
    positive: 'text-[#00FF87] bg-[#00FF87]/10 border-[#00FF87]/20',
    negative: 'text-red-400 bg-red-400/10 border-red-400/20',
    neutral: 'text-brand-muted bg-white/[0.04] border-white/[0.08]'
  };

  return (
    <div className={`relative p-6 rounded-2xl glass-card overflow-hidden transition-all duration-300 hover:bg-white/[0.05] border border-white/[0.06] ${className}`}>
      {/* Decorative vertical gradient edge */}
      <span className="absolute top-0 bottom-0 left-0 w-[2px] bg-gradient-to-b from-brand-primary to-transparent pointer-events-none" />

      <div className="flex justify-between items-start mb-4">
        <span className="text-xs font-semibold text-brand-muted uppercase tracking-wider">
          {title}
        </span>
        <div className="p-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-brand-primary">
          <IconComponent size={18} strokeWidth={2} />
        </div>
      </div>

      <div className="flex items-baseline gap-2.5">
        <span className="text-3xl font-extrabold tracking-tight text-brand-text">
          {value}
        </span>
        {trend && (
          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${trendColors[trendType]}`}>
            {trend}
          </span>
        )}
      </div>

      {description && (
        <p className="text-xs text-brand-muted mt-2 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
