'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import HistoryCard from '../Card/HistoryCard';
import selfie from '../../assets/selfie.png';

const HistoryModal = ({ onClose }) => {
  const trips = useSelector((state) => state.trips.userTrips);

  const tripsWithStatus = trips.map((t) => ({
    id: t.id,
    photo: selfie,
    desc: t.tripName,
    status: t.tripLock ? 'locked' : t.isActive === false ? 'rejected' : 'completed',
  }));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 24 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.92, y: 24 }}
        transition={{ type: 'spring', damping: 24, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-3xl bg-white p-6 shadow-lift sm:p-8"
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-slate-900">Trip history</h2>
            <p className="mt-1 text-sm text-slate-500">Trips you have recently planned.</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
          >
            <FiX />
          </button>
        </div>

        <div className="max-h-[55vh] space-y-3 overflow-y-auto pr-1">
          {tripsWithStatus.length === 0 && (
            <p className="rounded-2xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-400">
              No trips yet. Publish your first plan to see it here.
            </p>
          )}
          <AnimatePresence>
            {tripsWithStatus.map((item, i) => (
              <HistoryCard key={item.id} {...item} index={i} />
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default HistoryModal;