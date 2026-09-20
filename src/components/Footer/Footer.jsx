'use client';

import React from 'react';
import Link from 'next/link';
import { FiCompass, FiInstagram, FiTwitter, FiFacebook, FiLinkedin } from 'react-icons/fi';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 text-slate-300">
      <div className="container-page grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
              <FiCompass size={20} />
            </span>
            <span className="font-serif text-lg font-bold text-white">
              Saath<span className="text-brand-400">Chalein</span>
            </span>
          </Link>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-slate-400">
            We help travellers find companions for life&apos;s greatest journeys. Plan. Travel.
            Connect. Repeat.
          </p>
          <div className="mt-6 flex gap-3">
            {[FiInstagram, FiTwitter, FiFacebook, FiLinkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                aria-label="Social link"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-slate-300 transition hover:bg-brand-600 hover:text-white"
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white">
            Explore
          </h3>
          <ul className="space-y-3 text-sm">
            {[
              ['Home', '/'],
              ['About us', '/About'],
              ['Find a Humsafar', '/PlansPage'],
              ['Join free', '/Signupform'],
            ].map(([label, href]) => (
              <li key={label}>
                <Link href={href} className="text-slate-400 transition hover:text-brand-400">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white">
            Top destinations
          </h3>
          <ul className="space-y-3 text-sm text-slate-400">
            {['Ladakh', 'Goa', 'Rishikesh', 'Kerala', 'Manali'].map((d) => (
              <li key={d}>{d}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-white">
            Stay in the loop
          </h3>
          <p className="mb-4 text-sm text-slate-400">
            Get travel stories and trip ideas in your inbox.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 p-1.5"
          >
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-transparent px-3 text-sm text-white placeholder-slate-500 outline-none"
            />
            <button
              type="submit"
              className="rounded-full bg-brand-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-center justify-between gap-3 py-6 text-xs text-slate-500 sm:flex-row">
          <p>&copy; {year} SaathChalein. All rights reserved.</p>
          <p>Made for travellers, by travellers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;