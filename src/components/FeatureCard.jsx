import React from 'react';
import { motion } from 'framer-motion';

export default function FeatureCard({ index, title, description }) {
  const num = String(index).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="flex items-baseline gap-4 mb-2.5">
        <span className="text-[10px] font-medium text-brand-primary tracking-[0.2em]">
          {num}
        </span>
        <h3 className="text-lg md:text-xl font-light text-brand-text tracking-tight">
          {title}
        </h3>
      </div>
      <p className="text-sm text-zinc-400 leading-relaxed font-light pl-9 max-w-sm">
        {description}
      </p>
    </motion.div>
  );
}
