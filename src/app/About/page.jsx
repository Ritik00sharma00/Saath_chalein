'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  FiGlobe,
  FiHeart,
  FiShield,
  FiUsers,
  FiMessageCircle,
  FiZap,
} from 'react-icons/fi';

const VALUES = [
  {
    icon: FiGlobe,
    title: 'Explore endlessly',
    desc: 'From weekend getaways to cross-continental adventures — there is always a next horizon.',
  },
  {
    icon: FiHeart,
    title: 'Travel with trust',
    desc: 'Every Humsafar is a real traveller with shared plans, transparent profiles and community verification.',
  },
  {
    icon: FiShield,
    title: 'Stay safe',
    desc: 'Safety guides, public plans and a respectful community keep every trip comfortable.',
  },
  {
    icon: FiUsers,
    title: 'Build community',
    desc: 'We are a family of travellers who happen to meet strangers that quickly become friends.',
  },
  {
    icon: FiMessageCircle,
    title: 'Talk openly',
    desc: 'Clear conversations before and during trips make every journey smoother.',
  },
  {
    icon: FiZap,
    title: 'Plan simply',
    desc: 'Publish a plan in minutes and let matching do the rest.',
  },
];

const MILESTONES = [
  ['2019', 'Founded in Nagpur'],
  ['2021', '10,000 travellers joined'],
  ['2023', '120+ destinations covered'],
  ['2026', 'India\'s favourite trip-matching platform'],
];

export default function About() {
  return (
    <>
      <section className="hero-bg relative flex min-h-[60vh] items-center">
        <div className="container-page py-28 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white backdrop-blur"
          >
            About SaathChalein
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-6 max-w-3xl font-serif text-4xl font-bold text-white sm:text-5xl lg:text-6xl"
          >
            We exist so no one travels alone.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-200"
          >
            SaathChalein — literally &ldquo;walk together&rdquo; — connects like-minded
            travellers planning trips and adventures with new friends.
          </motion.p>
        </div>
      </section>

      <section className="container-page py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="section-title">Our mission</p>
            <h2 className="heading-display mt-3">
              Connecting wanderers who share the same dreams.
            </h2>
            <p className="mt-6 leading-relaxed text-slate-600">
              Whether you are looking for a travel buddy for a weekend getaway or planning a
              grand adventure across continents, SaathChalein makes it effortless to find and
              connect with people who share your travel interests and goals.
            </p>
            <p className="mt-4 leading-relaxed text-slate-600">
              Browse verified traveller profiles, send trip requests, invite others to your
              plans, and build a profile that showcases your wanderlust.
            </p>
            <ul className="mt-8 space-y-4">
              {[
                'Browse profiles of fellow travellers',
                'Send and receive trip requests',
                'Invite others or accept invitations',
                'Tell your story through your profile',
              ].map((item) => (
                <li key={item} className="flex items-center gap-3 text-slate-700">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>

          <div className="grid grid-cols-2 gap-6">
            {MILESTONES.map(([value, label], i) => (
              <motion.div
                key={value}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`rounded-3xl p-8 shadow-card ${
                  i % 2 === 0 ? 'bg-brand-600 text-white' : 'bg-white'
                }`}
              >
                <p
                  className={`font-serif text-4xl font-bold ${
                    i % 2 === 0 ? 'text-white' : 'text-brand-700'
                  }`}
                >
                  {value}
                </p>
                <p
                  className={`mt-2 text-sm ${
                    i % 2 === 0 ? 'text-brand-100' : 'text-slate-500'
                  }`}
                >
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-page">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="section-title">What we stand for</p>
            <h2 className="heading-display mt-3">Values that guide every journey</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -6 }}
                className="rounded-3xl border border-slate-100 bg-white p-8 shadow-card"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                  <v.icon size={22} />
                </span>
                <h3 className="mt-5 font-serif text-lg font-bold text-slate-900">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-500">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-4xl bg-brand-700 px-8 py-16 text-center shadow-lift"
        >
          <h2 className="mx-auto max-w-2xl font-serif text-3xl font-bold text-white sm:text-4xl">
            Join our community and start your journey with new friends.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-brand-100">
            Adventure awaits — and so do the people to share it with.
          </p>
          <a
            href="/Signupform"
            className="mt-8 inline-block rounded-full bg-white px-8 py-4 text-base font-semibold text-brand-700 shadow-lg transition hover:bg-brand-50"
          >
            Get started free
          </a>
        </motion.div>
      </section>
    </>
  );
}