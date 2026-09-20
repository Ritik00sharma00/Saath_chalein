'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FiCompass } from 'react-icons/fi';
import Travelling from '../../assets/Travelling.png';

const AuthShell = ({ title, subtitle, children }) => {
  return (
    <section className="min-h-screen bg-slate-50 pt-24 lg:pt-0">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col lg:flex-row lg:items-stretch">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          className="relative hidden overflow-hidden lg:flex lg:w-1/2"
        >
          <Image src={Travelling} alt="Travellers" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
          <div className="relative z-10 mt-auto p-12">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15 text-white backdrop-blur">
                <FiCompass size={20} />
              </span>
              <span className="font-serif text-lg font-bold text-white">
                Saath<span className="text-accent-300">Chalein</span>
              </span>
            </div>
            <blockquote className="mt-6 max-w-md font-serif text-2xl font-bold leading-snug text-white">
              &ldquo;The journey of a thousand miles begins with a single hello.&rdquo;
            </blockquote>
            <p className="mt-3 text-sm text-slate-200">
              Join SaathChalein to find travellers who share your route.
            </p>
          </div>
        </motion.div>

        <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="w-full max-w-md"
          >
            <div className="mb-8 lg:hidden">
              <Link href="/" className="inline-flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
                  <FiCompass size={20} />
                </span>
                <span className="font-serif text-lg font-bold text-slate-900">
                  Saath<span className="text-brand-600">Chalein</span>
                </span>
              </Link>
            </div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="font-serif text-3xl font-bold text-slate-900 sm:text-4xl"
            >
              {title}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.32 }}
              className="mt-3 text-slate-500"
            >
              {subtitle}
            </motion.p>
            <div className="mt-8">{children}</div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AuthShell;