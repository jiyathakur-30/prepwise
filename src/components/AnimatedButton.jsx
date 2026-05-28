import React from 'react';
import { motion } from 'framer-motion';

export default function AnimatedButton({
  children,
  onClick,
  type = 'button',
  variant = 'primary', // 'primary' | 'secondary' | 'danger' | 'ghost'
  glow = false,
  className = '',
  disabled = false,
  ...props
}) {
  const baseStyles = 'relative inline-flex items-center justify-center font-medium rounded-xl transition-colors duration-200 outline-none focus:ring-2 focus:ring-brand-primary/50 focus:ring-offset-2 focus:ring-offset-brand-bg px-6 py-3 text-sm';
  
  const variants = {
    primary: 'bg-gradient-to-r from-brand-primary to-brand-secondary text-brand-bg font-semibold hover:opacity-90 shadow-lg shadow-brand-primary/10',
    secondary: 'bg-white/[0.03] text-brand-text border border-white/[0.08] hover:bg-white/[0.06] hover:border-white/[0.15] backdrop-blur-md',
    danger: 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/35',
    ghost: 'bg-transparent text-brand-muted hover:text-brand-text hover:bg-white/[0.03]'
  };

  const glowStyle = glow && variant === 'primary' 
    ? 'shadow-[0_0_20px_rgba(124,92,255,0.4)] border border-brand-primary/20' 
    : '';

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={disabled ? {} : { scale: 1.02, y: -1 }}
      whileTap={disabled ? {} : { scale: 0.98, y: 0 }}
      transition={{ type: 'spring', stiffness: 400, damping: 15 }}
      className={`${baseStyles} ${variants[variant]} ${glowStyle} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
      {...props}
    >
      {/* Subtle overlay glow for premium hover */}
      {variant === 'primary' && !disabled && (
        <span className="absolute inset-0 w-full h-full rounded-xl bg-gradient-to-r from-white/0 via-white/10 to-white/0 transform translate-x-[-100%] hover:animate-[shimmer_1.5s_infinite] pointer-events-none" />
      )}
      {children}
    </motion.button>
  );
}
