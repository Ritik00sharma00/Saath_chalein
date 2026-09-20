'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiCompass } from 'react-icons/fi';

const Loader = () => {
  return (
    <div className="fixed inset-0 z-[80] flex flex-col items-center justify-center bg-slate-50">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.6, ease: 'linear' }}
        className="flex h-16 w-16 items-center justify-center rounded-3xl bg-brand-600 text-white shadow-glow"
      >
        <FiCompass size={28} />
      </motion.div>
      <motion.p
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ repeat: Infinity, duration: 1.6 }}
        className="mt-6 font-serif text-lg font-semibold text-slate-800"
      >
        SaathChalein
      </motion.p>
      <p className="mt-1 text-xs uppercase tracking-[0.3em] text-slate-400">
        Finding your Humsafar
      </p>
    </div>
  );
};

export default Loader;