'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { FiPlus, FiClock, FiMail, FiMapPin, FiCamera, FiUser } from 'react-icons/fi';
import { AnimatePresence } from 'framer-motion';
import { selectUser, selectUserId, selectIsAuthenticated } from '@/store/authSlice';
import { fetchUserTrips, createTrip } from '@/store/tripsSlice';
import HistoryModal from '@/components/Modal/HistoryModal';
import PublishPlanModal from '@/components/Plans/PublishPlanModal';
import selfie from '../../assets/selfie.png';

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const user = useSelector(selectUser);
  const userId = useSelector(selectUserId);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const myTrips = useSelector((state) => state.trips.userTrips);
  const [showHistory, setShowHistory] = useState(false);
  const [showPublish, setShowPublish] = useState(false);

  const openPublish = () => {
    if (!isAuthenticated) {
      router.push('/Signinform');
      return;
    }
    setShowPublish(true);
  };

  const openHistory = () => {
    if (!isAuthenticated) {
      router.push('/Signinform');
      return;
    }
    setShowHistory(true);
  };

  useEffect(() => {
    if (isAuthenticated && userId) dispatch(fetchUserTrips(userId));
  }, [isAuthenticated, userId, dispatch]);

  const name = user?.name || user?.username || 'Guest traveller';
  const email = user?.email || 'guest@saathchalein.in';
  const city = user?.city || 'Your city';
  const avatar = user?.avatar || selfie;

  const handlePublish = async (plan) => {
    if (!userId) return;
    const tripPlanned = plan.date ? `${plan.date}T09:00:00` : undefined;
    const result = await dispatch(
      createTrip({
        userId,
        payload: {
          tripName: plan.destination,
          tripGroup: plan.group || 'Community trip',
          maxMembers: Number(plan.members) || 1,
          tripPlanned,
        },
      })
    );
    if (createTrip.fulfilled.match(result)) setShowPublish(false);
  };

  return (
    <>
      <div className="rounded-3xl bg-white p-6 shadow-card">
        <div className="flex flex-col items-center text-center">
          <div className="relative">
            <span className="relative block h-24 w-24 overflow-hidden rounded-full ring-4 ring-brand-50">
              <Image src={avatar} alt={name} fill className="object-cover" />
            </span>
            <span className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg">
              {user?.avatar ? <FiCamera size={14} /> : <FiUser size={14} />}
            </span>
          </div>
          <h2 className="mt-4 font-serif text-xl font-bold text-slate-900">
            {name}
            {user?.role && (
              <span className="ml-2 rounded-full bg-accent-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-accent-600">
                {user.role}
              </span>
            )}
          </h2>
          <p className="text-sm text-slate-500">Adventure seeker</p>
          <div className="mt-4 flex w-full flex-col gap-2 text-sm text-slate-600">
            <span className="flex items-center justify-center gap-2">
              <FiMail className="text-brand-600" />
              <span className="truncate">{email}</span>
            </span>
            <span className="flex items-center justify-center gap-2">
              <FiMapPin className="text-brand-600" /> {city}
            </span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-2 border-t border-slate-100 pt-5 text-center">
          <div className="rounded-2xl bg-slate-50 py-3">
            <p className="font-serif text-lg font-bold text-slate-900">{myTrips.length}</p>
            <p className="text-[11px] uppercase tracking-wider text-slate-400">Trips</p>
          </div>
          <div className="rounded-2xl bg-slate-50 py-3">
            <p className="font-serif text-lg font-bold text-slate-900">1</p>
            <p className="text-[11px] uppercase tracking-wider text-slate-400">Profile</p>
          </div>
          <div className="rounded-2xl bg-slate-50 py-3">
            <p className="font-serif text-lg font-bold text-slate-900">New</p>
            <p className="text-[11px] uppercase tracking-wider text-slate-400">Status</p>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3">
          <button
            onClick={openPublish}
            className="flex items-center justify-center gap-2 rounded-2xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-glow transition hover:bg-brand-700"
          >
            <FiPlus /> {isAuthenticated ? 'Publish a plan' : 'Sign in to publish'}
          </button>
          <button
            onClick={openHistory}
            className={`flex items-center justify-center gap-2 rounded-2xl border px-6 py-3.5 text-sm font-semibold transition ${
              showHistory
                ? 'border-brand-600 bg-brand-50 text-brand-700'
                : 'border-slate-200 text-slate-700 hover:border-slate-300'
            }`}
          >
            <FiClock /> Trip history
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showPublish && (
          <PublishPlanModal
            onClose={() => setShowPublish(false)}
            onPublish={handlePublish}
          />
        )}
        {showHistory && <HistoryModal onClose={() => setShowHistory(false)} />}
      </AnimatePresence>
    </>
  );
};

export default Profile;