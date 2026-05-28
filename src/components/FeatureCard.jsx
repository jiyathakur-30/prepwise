import React from 'react';
import * as Icons from 'lucide-react';

export default function FeatureCard({
  title,
  description,
  icon,
  className = ''
}) {
  const IconComponent = Icons[icon] || Icons.HelpCircle;

  return (
    <div className={`group relative p-6 rounded-2xl glass-card transition-all duration-300 hover:bg-white/[0.05] hover:border-white/[0.12] hover:shadow-[0_8px_32px_0_rgba(124,92,255,0.06)] hover:-translate-y-1 ${className}`}>
      {/* Dynamic top highlight line on card hover */}
      <span className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-primary/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/[0.06] text-brand-primary flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-105 group-hover:border-brand-primary/20">
        <IconComponent size={20} strokeWidth={2} />
      </div>

      <h3 className="text-base font-bold text-brand-text mb-2 tracking-tight group-hover:text-gradient-primary">
        {title}
      </h3>
      
      <p className="text-xs text-brand-muted leading-relaxed">
        {description}
      </p>
    </div>
  );
}
