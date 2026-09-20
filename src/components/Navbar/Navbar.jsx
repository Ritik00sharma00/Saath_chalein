'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { FiMenu, FiX, FiCompass, FiLogOut } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectIsAuthenticated, selectUser } from '@/store/authSlice';

const LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/About' },
  { label: 'Humsafar', href: '/PlansPage' },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const handleAuth = () => {
    if (isAuthenticated) {
      dispatch(logout());
      router.push('/');
    } else {
      router.push('/Signupform');
    }
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`transition-all duration-300 ${
          scrolled ? 'glass shadow-card' : 'bg-transparent'
        }`}
      >
        <div className="container-page flex h-16 items-center justify-between lg:h-20">
          <Link href="/" className="flex items-center gap-2" aria-label="SaathChalein home">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white shadow-glow lg:h-10 lg:w-10">
              <FiCompass size={20} />
            </span>
            <span
              className={`font-serif text-lg font-bold tracking-tight lg:text-xl ${
                scrolled ? 'text-slate-900' : 'text-white'
              }`}
            >
              Saath<span className="text-brand-500">Chalein</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            {LINKS.map((link) => {
              const active =
                link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`relative text-sm font-medium transition-colors ${
                    scrolled
                      ? active
                        ? 'text-brand-700'
                        : 'text-slate-600 hover:text-slate-900'
                      : active
                        ? 'text-white'
                        : 'text-white/75 hover:text-white'
                  }`}
                >
                  {link.label}
                  {active && (
                    <motion.span
                      layoutId="nav-underline"
                      className={`absolute -bottom-1.5 left-0 right-0 h-0.5 rounded-full ${
                        scrolled ? 'bg-brand-600' : 'bg-accent-400'
                      }`}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            {isAuthenticated ? (
              <>
                <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-xs font-bold uppercase text-brand-700">
                    {(user?.name || user?.username)?.charAt(0) || 'U'}
                  </span>
                  Hey, {(user?.name || user?.username || '').split(' ')[0]}
                </span>
                <button
                  onClick={handleAuth}
                  className="flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-700"
                >
                  <FiLogOut /> Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/Signinform"
                  className={`text-sm font-semibold ${
                    scrolled ? 'text-slate-700 hover:text-brand-700' : 'text-white hover:text-accent-300'
                  }`}
                >
                  Sign in
                </Link>
                <button
                  onClick={() => router.push('/Signupform')}
                  className="rounded-full bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-700"
                >
                  Join Free
                </button>
              </>
            )}
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            className={`flex h-10 w-10 items-center justify-center rounded-lg lg:hidden ${
              scrolled ? 'text-slate-900' : 'text-white'
            }`}
            aria-label="Toggle menu"
          >
            {open ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="glass mx-3 mt-2 overflow-hidden rounded-2xl shadow-lift lg:hidden"
          >
            <div className="flex flex-col gap-1 p-4">
              {LINKS.map((link, i) => {
                const active =
                  link.href === '/' ? pathname === '/' : pathname.startsWith(link.href);
                return (
                  <motion.div
                    key={link.label}
                    initial={{ x: -16, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.05 * i }}
                  >
                    <Link
                      href={link.href}
                      className={`block rounded-xl px-4 py-3 text-base font-medium ${
                        active
                          ? 'bg-brand-50 text-brand-700'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                );
              })}
              <div className="mt-2 border-t border-slate-100 pt-3">
                {isAuthenticated ? (
                  <div className="flex items-center justify-between px-4 pb-3">
                    <span className="text-sm font-medium text-slate-700">
                      Signed in as {user?.name || user?.username}
                    </span>
                  </div>
                ) : (
                  <Link
                    href="/Signinform"
                    className="block rounded-xl px-4 py-3 text-base font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Sign in
                  </Link>
                )}
                <button
                  onClick={handleAuth}
                  className="w-full rounded-xl bg-brand-600 px-4 py-3 text-base font-semibold text-white transition hover:bg-brand-700"
                >
                  {isAuthenticated ? 'Logout' : 'Join Free'}
                </button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;