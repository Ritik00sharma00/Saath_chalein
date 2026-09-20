'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import { FiCalendar, FiUsers, FiMessageCircle, FiSend, FiCheck, FiLoader } from 'react-icons/fi';
import CommentCard from '@/components/CommentSection/CommentCard';
import Photos from '../../assets/Photos.png';
import { createJoinRequest } from '@/store/requestsSlice';
import { selectIsAuthenticated, selectUserId, selectUser } from '@/store/authSlice';

const FeedCard = ({ trip, index = 0 }) => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const user = useSelector(selectUser);
  const userId = useSelector(selectUserId);
  const [showComments, setShowComments] = useState(false);
  const [requested, setRequested] = useState(false);
  const [sending, setSending] = useState(false);
  const [comment, setComment] = useState('');
  const avatar = user?.avatar || Photos;
  const isOwner = String(trip.ownerId) === String(userId);

  const formatDate = (iso) => {
    if (!iso) return 'Flexible';
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  const handleRequest = async () => {
    if (!isAuthenticated || requested || sending || isOwner) return;
    setSending(true);
    const result = await dispatch(
      createJoinRequest({ userId, tripId: trip.id })
    );
    setSending(false);
    if (createJoinRequest.fulfilled.match(result)) setRequested(true);
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="rounded-3xl bg-white p-5 shadow-card sm:p-6"
    >
      <header className="flex items-center gap-3">
        <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-brand-100 text-sm font-bold text-brand-700">
          {avatar ? (
            <Image src={avatar} alt={trip.ownerName} fill className="object-cover" />
          ) : (
            trip.ownerName?.charAt(0)
          )}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-semibold text-slate-900">
            {trip.ownerName}
            {isOwner && (
              <span className="ml-2 rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-brand-700">
                You
              </span>
            )}
          </p>
          <p className="flex items-center gap-1 text-xs text-slate-400">
            <FiCalendar size={12} /> {formatDate(trip.tripPlanned)}
          </p>
        </div>
        <span className="rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700">
          {trip.members}
        </span>
      </header>

      <div className="mt-4 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-6 text-white">
        <h3 className="font-serif text-xl font-bold sm:text-2xl">{trip.tripName}</h3>
        <p className="mt-2 text-sm leading-relaxed text-brand-50">
          {trip.tripGroup ? `Group: ${trip.tripGroup}` : 'A fresh adventure, made for the community.'}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
            {isOwner ? '#Organized by you' : '#Community trip'}
          </span>
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-medium backdrop-blur">
            #Humsafar
          </span>
        </div>
      </div>

      <div className="mt-4 flex gap-3">
        <button
          onClick={() => setShowComments((v) => !v)}
          className={`flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
            showComments
              ? 'bg-brand-600 text-white'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <FiMessageCircle />
          {showComments ? 'Hide' : 'Comments'}
        </button>
        {!isOwner && (
          <button
            onClick={handleRequest}
            disabled={sending || requested || !isAuthenticated}
            className={`flex flex-1 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
              requested
                ? 'bg-emerald-500 text-white'
                : !isAuthenticated
                  ? 'cursor-not-allowed bg-slate-100 text-slate-400'
                  : 'bg-slate-900 text-white hover:bg-slate-700'
            }`}
          >
            {sending ? (
              <>
                <FiLoader className="animate-spin" /> Sending...
              </>
            ) : requested ? (
              <>
                <FiCheck /> Request sent
              </>
            ) : (
              <>
                <FiUsers /> Request to join
              </>
            )}
          </button>
        )}
      </div>

      {!isAuthenticated && (
        <p className="mt-2 text-center text-xs text-slate-400">
          Sign in to send join requests.
        </p>
      )}

      <AnimatePresence>
        {showComments && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-4 space-y-3 rounded-2xl bg-slate-50 p-4">
              {[
                { username: 'Priya', text: 'This sounds amazing, I\'m interested!' },
                { username: 'Aditya', text: 'Happy to share tips from my last trip.' },
              ].map((c) => (
                <CommentCard key={c.username} {...c} profilePic={Photos} />
              ))}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setComment('');
                }}
                className="flex items-center gap-2"
              >
                <input
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Add a comment..."
                  className="w-full rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm outline-none transition focus:border-brand-500"
                />
                <button
                  type="submit"
                  aria-label="Post comment"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white transition hover:bg-brand-700"
                >
                  <FiSend size={16} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
};

export default FeedCard;