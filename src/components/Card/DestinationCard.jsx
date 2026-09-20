'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FiMapPin } from 'react-icons/fi';
import category1 from '../../assets/Destined.png';

const DestinationCard = ({ heading, desc, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: 'easeOut' }}
      whileHover={{ y: -8 }}
      className="group overflow-hidden rounded-3xl bg-white shadow-card"
    >
      <div className="relative h-56 overflow-hidden">
        <Image
          src={category1}
          alt={heading}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-800 backdrop-blur">
          Trending
        </span>
      </div>
      <div className="p-6">
        <h3 className="flex items-center gap-2 font-serif text-xl font-bold text-slate-900">
          <FiMapPin className="text-brand-600" />
          {heading}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">{desc}</p>
        <button className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-700 transition group-hover:gap-3">
          View trips
          <span className="text-brand-600">→</span>
        </button>
      </div>
    </motion.div>
  );
};

export default DestinationCard;