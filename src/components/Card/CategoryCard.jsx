'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiArrowUpRight } from 'react-icons/fi';

const CategoryCard = ({ img, head, desc, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
      className="group relative h-[420px] overflow-hidden rounded-3xl shadow-card"
    >
      <Image
        src={img}
        alt={head}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/30 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-accent-400 px-4 py-2 font-serif text-lg font-bold text-slate-900 shadow-lg">
          {head}
        </span>
        <p className="mt-3 text-sm leading-relaxed text-slate-200">{desc}</p>
        <div className="mt-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-accent-300">
          Explore
          <FiArrowUpRight className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </div>
    </motion.div>
  );
};

export default CategoryCard;