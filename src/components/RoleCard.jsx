import React from 'react';
import * as Icons from 'lucide-react';

export default function RoleCard({
  role,
  selected = false,
  onClick
}) {
  // Dynamically resolve the Lucide icon from the string identifier
  const IconComponent = Icons[role.icon] || Icons.Terminal;

  return (
    <div
      onClick={onClick}
      className={`relative flex flex-col justify-between p-6 rounded-2xl glass-card transition-all duration-300 cursor-pointer ${
        selected
          ? 'bg-brand-primary/10 border-brand-primary shadow-[0_0_25px_rgba(124,92,255,0.15)] ring-2 ring-brand-primary/40'
          : 'hover:bg-white/[0.05] hover:border-white/[0.12] hover:-translate-y-1'
      }`}
    >
      {/* Decorative Selected Spot Highlight */}
      {selected && (
        <span className="absolute top-2 right-2 w-2.5 h-2.5 bg-brand-secondary rounded-full animate-ping" />
      )}
      
      <div>
        {/* Dynamic Accent colored Icon Container */}
        <div 
          className="w-10 h-10 rounded-xl flex items-center justify-center mb-4 transition-colors border"
          style={{ 
            borderColor: `${role.accentColor}33`,
            backgroundColor: `${role.accentColor}11`,
            color: role.accentColor 
          }}
        >
          <IconComponent size={20} strokeWidth={2} />
        </div>

        <h3 className="text-lg font-bold text-brand-text mb-2 tracking-tight">
          {role.title}
        </h3>
        
        <p className="text-xs text-brand-muted leading-relaxed mb-4">
          {role.description}
        </p>
      </div>

      <div>
        <div className="flex flex-wrap gap-1.5 pt-2 border-t border-white/[0.04]">
          {role.focusAreas.map((area, idx) => (
            <span
              key={idx}
              className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/[0.04] text-brand-muted border border-white/[0.03]"
            >
              {area}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
