import React from 'react';

export default function DashboardCard({
  children,
  onClick,
  hoverable = false,
  className = '',
  title = '',
  subtitle = '',
  headerAction = null,
  ...props
}) {
  const isClickable = !!onClick;
  
  const baseCardStyles = 'relative rounded-2xl glass-card overflow-hidden transition-all duration-300';
  
  const hoverStyles = hoverable || isClickable
    ? 'hover:bg-white/[0.05] hover:border-white/[0.12] hover:shadow-[0_8px_32px_0_rgba(124,92,255,0.06)] hover:-translate-y-[2px] cursor-pointer'
    : '';

  return (
    <div
      onClick={onClick}
      className={`${baseCardStyles} ${hoverStyles} ${className}`}
      {...props}
    >
      {/* Decorative subtle ambient gradient border highlight */}
      {(hoverable || isClickable) && (
        <span className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent pointer-events-none" />
      )}

      {(title || subtitle || headerAction) && (
        <div className="flex justify-between items-start border-b border-white/[0.06] px-6 py-4">
          <div>
            {title && <h3 className="text-base font-semibold text-brand-text tracking-tight">{title}</h3>}
            {subtitle && <p className="text-xs text-brand-muted mt-0.5">{subtitle}</p>}
          </div>
          {headerAction && <div className="ml-4">{headerAction}</div>}
        </div>
      )}
      
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
