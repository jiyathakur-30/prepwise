import React from 'react';
import { motion } from 'framer-motion';

export default function FeatureCard({ index, title, description }) {
  const num = String(index).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group relative pt-8 border-t border-white/[0.06] hover:border-brand-primary/30 transition-colors duration-500"
    >
      <span className="absolute top-0 left-0 h-[1px] w-0 bg-brand-primary/50 transition-all duration-700 group-hover:w-full" />

      <div className="flex items-baseline gap-4 mb-3">
        <span className="text-[11px] font-light text-brand-primary tracking-[0.2em]">
          {num}
        </span>
        <h3 className="text-lg md:text-xl font-light text-brand-text tracking-tight">
          {title}
        </h3>
      </div>

      <p className="text-sm text-brand-muted leading-relaxed font-light pl-10 max-w-sm">
        {description}
      </p>
    </motion.div>
  );
}
