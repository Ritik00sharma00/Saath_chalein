'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { FiUserPlus, FiChevronDown, FiTrash2, FiCheck, FiLogIn } from 'react-icons/fi';
import { AnimatePresence } from 'framer-motion';
import FeedCard from '@/components/FeedCard/FeedCard';
import Profile from '@/components/Profile/Profile';
import { selectIsAuthenticated, selectUserId, selectAuthStatus } from '@/store/authSlice';
import {
  fetchCommunity,
  fetchUserTrips,
  selectTripsWithOwners,
  selectTripError,
} from '@/store/tripsSlice';
import {
  fetchIncomingRequests,
  fetchMyRequests,
  updateRequestStatus,
  selectIncomingRequests,
  selectMyRequests,
  reqStatusClass,
} from '@/store/requestsSlice';

const StatusBadge = ({ status }) => {
  const cls = reqStatusClass(status) || 'bg-slate-100 text-slate-600';
  return (
    <span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold capitalize ${cls}`}>
      {status}
    </span>
  );
};

const IncomingPanel = ({ myTripIds }) => {
  const dispatch = useDispatch();
  const requests = useSelector(selectIncomingRequests);
  const [open, setOpen] = React.useState(true);
  const tripKey = myTripIds.join(',');

  useEffect(() => {
    if (tripKey) dispatch(fetchIncomingRequests(myTripIds));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tripKey, dispatch]);

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-card">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-slate-800">
          <FiUserPlus className="text-brand-600" /> Requests
          <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-700">
            {requests.length}
          </span>
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} className="text-slate-400">
          <FiChevronDown />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-2 px-4 pb-4">
              {requests.length === 0 && (
                <p className="rounded-2xl bg-slate-50 px-4 py-6 text-center text-sm text-slate-400">
                  No one has requested to join your trips yet.
                </p>
              )}
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="flex items-center justify-between gap-2 rounded-2xl border border-slate-100 px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">{req.userName}</p>
                    <p className="truncate text-xs text-slate-400">{req.tripName}</p>
                  </div>
                  {req.status === 'pending' ? (
                    <div className="flex shrink-0 items-center gap-1.5">
                      <button
                        onClick={() =>
                          dispatch(updateRequestStatus({ requestId: req.id, status: 'ACCEPTED' }))
                        }
                        aria-label="Accept request"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 transition hover:bg-emerald-200"
                      >
                        <FiCheck size={14} />
                      </button>
                      <button
                        onClick={() =>
                          dispatch(updateRequestStatus({ requestId: req.id, status: 'REJECTED' }))
                        }
                        aria-label="Reject request"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-rose-500 transition hover:bg-rose-200"
                      >
                        <FiTrash2 size={13} />
                      </button>
                    </div>
                  ) : (
                    <StatusBadge status={req.status} />
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const MyRequestsPanel = () => {
  const dispatch = useDispatch();
  const requests = useSelector(selectMyRequests);
  const [open, setOpen] = React.useState(true);

  return (
    <div className="overflow-hidden rounded-3xl bg-white shadow-card">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <span className="flex items-center gap-2 text-sm font-semibold text-slate-800">
          <FiUserPlus className="text-brand-600" /> My requests
          <span className="rounded-full bg-brand-50 px-2 py-0.5 text-xs font-bold text-brand-700">
            {requests.length}
          </span>
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} className="text-slate-400">
          <FiChevronDown />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="space-y-2 px-4 pb-4">
              {requests.length === 0 && (
                <p className="rounded-2xl bg-slate-50 px-4 py-6 text-center text-sm text-slate-400">
                  Tap &ldquo;Request to join&rdquo; on any trip to see it here.
                </p>
              )}
              {requests.map((req) => (
                <div
                  key={req.id}
                  className="flex items-center justify-between gap-2 rounded-2xl border border-slate-100 px-4 py-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">{req.tripName}</p>
                    <p className="truncate text-xs text-slate-400">Request by you</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-3">
                    <StatusBadge status={req.status} />
                    {req.status === 'pending' && (
                      <button
                        onClick={() =>
                          dispatch(updateRequestStatus({ requestId: req.id, status: 'REJECTED' }))
                        }
                        aria-label="Cancel request"
                        className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-100 text-rose-500 transition hover:bg-rose-200"
                      >
                        <FiTrash2 size={13} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const PlansPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const authStatus = useSelector(selectAuthStatus);
  const userId = useSelector(selectUserId);
  const trips = useSelector(selectTripsWithOwners);
  const tripError = useSelector(selectTripError);
  const myTrips = useSelector((state) => state.trips.userTrips);

  useEffect(() => {
    dispatch(fetchCommunity());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && userId) {
      dispatch(fetchMyRequests(userId));
      dispatch(fetchUserTrips(userId));
    }
  }, [isAuthenticated, userId, dispatch]);

  const myTripIds = myTrips.map((t) => t.id);

  if (authStatus === 'loading' && !isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 pt-24">
        <div className="flex flex-col items-center gap-3 text-slate-400">
          <div className="h-10 w-10 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
          <p className="text-sm font-medium">Connecting to the server...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 pt-24 lg:pt-28">
      <div className="container-page pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <p className="section-title">Humsafar feed</p>
          <h1 className="heading-display mt-2">
            Plans happening<br className="hidden sm:block" /> across the country
          </h1>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-10">
          <motion.aside
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <div className="sticky top-24">
              <Profile />
            </div>
          </motion.aside>

          <div className="order-first lg:col-span-4 lg:order-none">
            <div className="flex flex-col gap-6">
              {tripError && trips.length === 0 && (
                <div className="rounded-3xl border border-amber-200 bg-amber-50 p-6 text-center shadow-card">
                  <h3 className="font-serif text-lg font-bold text-amber-800">
                    Couldn&apos;t reach the server
                  </h3>
                  <p className="mt-1 text-sm text-amber-700">
                    {tripError} Check that the backend is running at{' '}
                    <code className="rounded bg-white px-1.5 py-0.5 text-xs">{process.env.NEXT_PUBLIC_API_URL}</code>{' '}
                    and refresh.
                  </p>
                </div>
              )}
              {trips.length === 0 && !isAuthenticated && (
                <div className="rounded-3xl bg-white p-10 text-center shadow-card">
                  <FiLogIn className="mx-auto text-3xl text-brand-500" />
                  <h3 className="mt-4 font-serif text-xl font-bold text-slate-900">
                    Sign in to see & join trips
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Create a free account to view the Humsafar feed and send join requests.
                  </p>
                  <button
                    onClick={() => router.push('/Signinform')}
                    className="mt-6 rounded-full bg-brand-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-700"
                  >
                    Sign in now
                  </button>
                </div>
              )}
              {trips.map((trip, i) => (
                <FeedCard key={trip.id} trip={trip} index={i} />
              ))}
            </div>
          </div>

          <motion.aside
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            <div className="flex flex-col gap-4 lg:sticky lg:top-24">
              {isAuthenticated ? (
                <>
                  <IncomingPanel myTripIds={myTripIds} />
                  <MyRequestsPanel />
                  <div className="rounded-3xl bg-gradient-to-br from-brand-700 to-brand-900 p-6 text-white">
                    <h3 className="font-serif text-lg font-bold">Tip of the day</h3>
                    <p className="mt-2 text-sm leading-relaxed text-brand-100">
                      Accept requests early to lock in your travel group and finalise shared
                      budgets before departure.
                    </p>
                  </div>
                </>
              ) : (
                <div className="rounded-3xl bg-white p-6 text-center shadow-card">
                  <h3 className="font-serif text-lg font-bold text-slate-900">
                    {trips.length} trips live
                  </h3>
                  <p className="mt-2 text-sm text-slate-500">
                    Requests and invitations unlock once you sign in.
                  </p>
                </div>
              )}
            </div>
          </motion.aside>
        </div>
      </div>
    </div>
  );
};

export default PlansPage;