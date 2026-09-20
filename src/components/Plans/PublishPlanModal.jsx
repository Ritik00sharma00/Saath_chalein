'use client';

import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { motion } from 'framer-motion';
import { FiX, FiUpload, FiImage } from 'react-icons/fi';

const PlanImageUpload = ({ field }) => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
      field.onChange(file);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => document.getElementById('plan-image-input').click()}
      onKeyDown={(e) => e.key === 'Enter' && document.getElementById('plan-image-input').click()}
      className="flex h-40 cursor-pointer items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-brand-500"
    >
      {preview ? (
        <img src={preview} alt="Plan preview" className="h-full w-full object-cover" />
      ) : (
        <span className="flex flex-col items-center gap-2 text-slate-400">
          <FiImage size={28} />
          <span className="text-sm font-medium">Add a cover photo</span>
        </span>
      )}
      <input
        id="plan-image-input"
        type="file"
        className="hidden"
        onChange={handleImageChange}
        accept="image/*"
      />
    </div>
  );
};

const inputClass =
  'mt-1.5 w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-800 outline-none transition focus:border-brand-500 focus:shadow-glow placeholder:text-slate-400';

const labelClass = 'block text-sm font-semibold text-slate-700';

const PublishPlanModal = ({ onClose, onPublish }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    onPublish({
      destination: data.destination,
      group: data.group,
      description: data.description,
      date: data.date,
      members: data.members,
    });
  };

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
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white p-6 shadow-lift sm:p-8"
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="font-serif text-2xl font-bold text-slate-900">Create a new plan</h2>
            <p className="mt-1 text-sm text-slate-500">
              Share your trip and let Humsafars join you.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition hover:bg-slate-200"
          >
            <FiX />
          </button>
        </div>

        <form method="POST" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
          <div>
            <Controller
              name="image"
              control={control}
              defaultValue={null}
              render={({ field }) => <PlanImageUpload field={field} />}
            />
          </div>

          <div>
            <label htmlFor="destination" className={labelClass}>
              Destination
            </label>
            <Controller
              name="destination"
              control={control}
              rules={{ required: 'Destination is required' }}
              render={({ field }) => (
                <input id="destination" {...field} placeholder="e.g. Goa Beach Weekend" className={inputClass} />
              )}
            />
            {errors.destination && (
              <p className="mt-1 text-xs font-medium text-rose-600">{errors.destination.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="plan-group" className={labelClass}>
              Group name
            </label>
            <Controller
              name="group"
              control={control}
              rules={{ required: 'Group name is required' }}
              render={({ field }) => (
                <input
                  id="plan-group"
                  {...field}
                  placeholder="e.g. College friends"
                  className={inputClass}
                />
              )}
            />
            {errors.group && (
              <p className="mt-1 text-xs font-medium text-rose-600">{errors.group.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="plan-description" className={labelClass}>
              Plan description
            </label>
            <Controller
              name="description"
              control={control}
              rules={{ required: 'Add a short description' }}
              render={({ field }) => (
                <textarea
                  id="plan-description"
                  {...field}
                  className={`${inputClass} resize-none`}
                  rows="3"
                  placeholder="Describe your trip, budget and expectations..."
                />
              )}
            />
            {errors.description && (
              <p className="mt-1 text-xs font-medium text-rose-600">{errors.description.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="plan-date" className={labelClass}>
                Date
              </label>
              <Controller
                name="date"
                control={control}
                rules={{ required: 'Pick a date' }}
                render={({ field }) => <input id="plan-date" type="date" {...field} className={inputClass} />}
              />
              {errors.date && (
                <p className="mt-1 text-xs font-medium text-rose-600">{errors.date.message}</p>
              )}
            </div>
            <div>
              <label htmlFor="members" className={labelClass}>
                Members needed
              </label>
              <Controller
                name="members"
                control={control}
                rules={{ required: 'Required', min: { value: 1, message: 'At least 1' } }}
                render={({ field }) => (
                  <input id="members" type="number" min="1" {...field} className={inputClass} />
                )}
              />
              {errors.members && (
                <p className="mt-1 text-xs font-medium text-rose-600">{errors.members.message}</p>
              )}
            </div>
          </div>

          <div className="mt-2 flex items-center gap-2 rounded-2xl bg-brand-50 px-4 py-3 text-sm text-brand-800">
            <FiUpload className="shrink-0" />
            Your plan will be visible to the whole community immediately.
          </div>

          <button
            type="submit"
            className="mt-2 flex items-center justify-center gap-2 rounded-2xl bg-brand-600 px-6 py-4 text-base font-semibold text-white shadow-glow transition hover:bg-brand-700"
          >
            Publish plan
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default PublishPlanModal;