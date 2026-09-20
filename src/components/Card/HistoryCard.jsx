'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const STATUS_STYLES = {
  completed: 'bg-emerald-100 text-emerald-700',
  pending: 'bg-amber-100 text-amber-700',
  accepted: 'bg-brand-100 text-brand-700',
  rejected: 'bg-rose-100 text-rose-700',
  locked: 'bg-slate-200 text-slate-700',
};

const HistoryCard = ({ photo, desc, status, index = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.06 }}
      className="flex items-center gap-4 rounded-2xl bg-white p-3 shadow-sm transition hover:shadow-card"
    >
      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
        <Image src={photo} alt={desc} fill className="object-cover" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-slate-800">{desc}</p>
      </div>
      <span
        className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold capitalize ${
          STATUS_STYLES[status] || 'bg-slate-100 text-slate-600'
        }`}
      >
        {status}
      </span>
    </motion.div>
  );
};

export default HistoryCard;