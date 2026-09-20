'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiSearch, FiUsers } from 'react-icons/fi';
import CategoryCard from '@/components/Card/CategoryCard';
import DestinationCard from '@/components/Card/DestinationCard';
import FeedbackCard from '@/components/Card/Feedbackcard';
import HeroSection from '@/components/HeroSection/HeroSection';
import category1 from '../assets/category1.png';
import Photos from '../assets/Photos.png';
import selfie from '../assets/selfie.png';

const CATEGORIES = [
  {
    img: category1,
    head: 'Luxury Getaways',
    desc: 'Pristine beaches and indulgent escapes for weekends with family, friends or even strangers turned companions.',
  },
  {
    img: category1,
    head: 'Family Adventures',
    desc: 'Handcrafted itineraries full of wonder for every generation — museums, mountain trails and quiet lakeside evenings.',
  },
  {
    img: category1,
    head: 'Solo Travel',
    desc: 'For the free spirits. Meet like-minded explorers and discover the world on your own terms.',
  },
];

const DESTINATIONS = [
  { heading: 'Nagpur', desc: 'The orange city — serene lakes, ancient forts and the gateway to central India.' },
  { heading: 'Shrinagar', desc: 'Dal lake shikaras, saffron sunsets and the ethereal beauty of the Kashmir valley.' },
  { heading: 'Lucknow', desc: 'Nawabi heritage, exquisite cuisine and grand architecture waiting to be explored.' },
];

const STEPS = [
  {
    icon: FiUsers,
    title: 'Create your profile',
    desc: 'Tell travellers who you are, where you love to go and what kind of trips you enjoy.',
  },
  {
    icon: FiSearch,
    title: 'Find your Humsafar',
    desc: 'Browse plans posted by the community and send a request to join any trip.',
  },
  {
    icon: FiCheck,
    title: 'Travel together',
    desc: 'Match, meet and make memories. Every journey starts with a shared plan.',
  },
];

const TESTIMONIALS = [
  {
    imageSrc: Photos,
    name: 'Pallavi',
    review: 'This site is brilliant for finding travel companions. I found the perfect group for my Goa trip within a week.',
  },
  {
    imageSrc: selfie,
    name: 'Rahul',
    review: 'Road-tripping to Ladakh with complete strangers turned into my best experience ever. Highly recommended.',
  },
  {
    imageSrc: Photos,
    name: 'Sneha',
    review: 'A minimalist, easy-to-use platform. I love how simple it is to publish a plan and start getting requests.',
  },
];

export default function Home() {
  return (
    <>
      <HeroSection />

      <section className="container-page -mt-24 pb-10">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl bg-white p-8 shadow-lift sm:col-span-2 lg:col-span-2">
            <p className="section-title">Why SaathChalein</p>
            <h2 className="heading-display mt-3">Never travel alone again.</h2>
            <p className="mt-4 max-w-lg text-slate-600">
              We match you with verified travellers who share your route, budget and spirit of adventure.
            </p>
          </div>
          {STEPS.map((step, i) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-3xl bg-white p-8 shadow-card transition hover:shadow-lift"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                <step.icon size={22} />
              </span>
              <h3 className="mt-5 font-serif text-lg font-bold text-slate-900">
                <span className="mr-2 text-brand-500">0{i + 1}.</span>
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container-page py-20">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <p className="section-title">Tour categories</p>
          <h2 className="heading-display mt-3">Choose your travel style</h2>
          <p className="mt-4 text-slate-600">
            However you love to roam, there is a group of people ready to roam with you.
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {CATEGORIES.map((cat, i) => (
            <CategoryCard key={cat.head} {...cat} index={i} />
          ))}
        </div>
      </section>

      <section className="bg-white py-20">
        <div className="container-page">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="section-title">Popular destinations</p>
            <h2 className="heading-display mt-3">Where is everyone going?</h2>
            <p className="mt-4 text-slate-600">
              The most loved routes in our community right now.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {DESTINATIONS.map((d, i) => (
              <DestinationCard key={d.heading} {...d} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-b from-brand-50 to-white py-20">
        <div className="container-page">
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <p className="section-title">Testimonials</p>
            <h2 className="heading-display mt-3">Stories from the road</h2>
            <p className="mt-4 text-slate-600">
              Thousands of friendships have started with a single travel plan.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <FeedbackCard key={t.name} {...t} index={i} />
            ))}
          </div>
        </div>
      </section>

      <section className="container-page pb-24 pt-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-4xl bg-slate-950 px-8 py-16 text-center shadow-lift lg:px-16"
        >
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                'radial-gradient(ellipse at center, rgba(13,148,136,0.4), transparent 60%)',
            }}
          />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
              Your next adventure is one request away.
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-300">
              Join thousands of travellers planning trips together every day.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
              <a
                href="/Signupform"
                className="rounded-full bg-brand-600 px-8 py-4 text-base font-semibold text-white shadow-glow transition hover:bg-brand-700"
              >
                Get started free
              </a>
              <a
                href="/PlansPage"
                className="rounded-full bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur transition hover:bg-white/20"
              >
                Browse Humsafars
              </a>
            </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}