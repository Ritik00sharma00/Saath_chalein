'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FiArrowRight, FiChevronDown, FiMapPin } from 'react-icons/fi';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.15 * i, duration: 0.7, ease: 'easeOut' },
  }),
};

const HeroSection = () => {
  const router = useRouter();

  return (
    <section className="hero-bg relative flex min-h-[92vh] items-center justify-center overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(ellipse at 20% 80%, rgba(245,158,11,0.18), transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(16,185,129,0.22), transparent 50%)',
        }}
      />

      <div className="container-page relative z-10 py-28 text-center lg:py-36">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur-sm sm:text-sm"
        >
          <FiMapPin className="text-accent-300" />
          India&apos;s travel companion community
        </motion.div>

        <motion.h1
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={1}
          className="mx-auto max-w-4xl font-serif text-4xl font-bold leading-tight text-white sm:text-6xl lg:text-7xl"
        >
          Travel farther with <span className="text-accent-300">strangers</span> who become
          friends.
        </motion.h1>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={2}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg"
        >
          Plan adventures, find like-minded travellers and turn every journey into a story
          worth sharing. Your next trip starts with a single hello.
        </motion.p>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          custom={3}
          className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <button
            onClick={() => router.push('/PlansPage')}
            className="group inline-flex items-center gap-2 rounded-full bg-brand-600 px-8 py-4 text-base font-semibold text-white shadow-glow transition hover:bg-brand-700"
          >
            Explore Humsafars
            <FiArrowRight className="transition-transform group-hover:translate-x-1" />
          </button>
          <button
            onClick={() => router.push('/Signupform')}
            className="inline-flex items-center gap-2 rounded-full bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
          >
            Start a journey
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 1 }}
          className="mt-16 flex items-center justify-center gap-8 text-white/80"
        >
          {[
            ['10k+', 'Travellers'],
            ['120+', 'Destinations'],
            ['4.9', 'Avg rating'],
          ].map(([value, label]) => (
            <div key={label} className="text-center">
              <p className="font-serif text-2xl font-bold text-white sm:text-3xl">{value}</p>
              <p className="mt-1 text-xs uppercase tracking-widest text-white/70">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70"
      >
        <FiChevronDown size={26} />
      </motion.div>
    </section>
  );
};

export default HeroSection;