'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaStar } from 'react-icons/fa6';

const FeedbackCard = ({ imageSrc, name, review, location = 'Nagpur', index = 0 }) => {
  return (
    <motion.blockquote
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.12 }}
      className="rounded-3xl bg-white p-8 shadow-card"
    >
      <div className="flex gap-1 text-accent-400">
        {Array.from({ length: 5 }).map((_, i) => (
          <FaStar key={i} />
        ))}
      </div>
      <p className="mt-4 font-serif text-lg leading-relaxed text-slate-800">
        &ldquo;{review}&rdquo;
      </p>
      <footer className="mt-6 flex items-center gap-4">
        <div className="relative h-12 w-12 overflow-hidden rounded-full">
          <Image src={imageSrc} alt={name} fill className="object-cover" />
        </div>
        <div>
          <cite className="block not-italic font-semibold text-slate-900">{name}</cite>
          <span className="block text-sm text-slate-500">Traveller · {location}</span>
        </div>
      </footer>
    </motion.blockquote>
  );
};

export default FeedbackCard;