'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { MdEmail, MdOutlinePerson } from 'react-icons/md';
import {
  FiLock,
  FiSmartphone,
  FiMapPin,
  FiArrowRight,
  FiChevronDown,
  FiEye,
  FiEyeOff,
  FiAlertCircle,
  FiLoader,
} from 'react-icons/fi';
import AuthShell from '@/components/Auth/AuthShell';
import Imageupload from '@/components/FormComponents/Imageupload';
import Inputfield from '@/components/FormComponents/Inputfield';
import {
  signupUser,
  loginUser,
  updateUserDetails,
  clearError,
  selectAuthError,
  selectAuthStatus,
} from '@/store/authSlice';

const CITIES = ['Mumbai', 'Delhi', 'Nagpur', 'Hyderabad', 'Bengaluru', 'Pune', 'Kolkata', 'Chennai'];
const GENDERS = ['Female', 'Male', 'Other'];

const Signupform = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const status = useSelector(selectAuthStatus);
  const error = useSelector(selectAuthError);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    dispatch(clearError());
    const signupResult = await dispatch(
      signupUser({ username: data.name, email: data.email, password: data.password })
    );
    if (!signupUser.fulfilled.match(signupResult)) return;

    const loginResult = await dispatch(loginUser({ email: data.email, password: data.password }));
    if (!loginUser.fulfilled.match(loginResult)) return;

    const userId = loginResult.payload?.user?.id;
    if (userId && data.city) {
      await dispatch(
        updateUserDetails({ id: userId, details: { city: data.city, about: 'New traveller' } })
      );
    }

    router.push('/PlansPage');
  };

  return (
    <AuthShell
      title="Begin your adventure"
      subtitle="Create your free account and start planning trips together."
    >
      <form method="POST" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600"
          >
            <FiAlertCircle /> {error}
          </motion.div>
        )}

        <Controller
          name="profile"
          control={control}
          defaultValue={null}
          rules={{ required: 'Upload a profile photo' }}
          render={({ field }) => <Imageupload field={field} />}
        />
        {errors.profile && (
          <p className="-mt-3 text-center text-xs font-medium text-rose-600">
            {errors.profile.message}
          </p>
        )}

        <div>
          <Controller
            name="name"
            control={control}
            defaultValue=""
            rules={{ required: 'Name is required', minLength: { value: 3, message: 'Min 3 characters' } }}
            render={({ field }) => <Inputfield icon={<MdOutlinePerson />} label="Full name" {...field} />}
          />
          {errors.name && <p className="mt-1 text-xs font-medium text-rose-600">{errors.name.message}</p>}
        </div>

        <div>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Enter a valid email' } }}
            render={({ field }) => <Inputfield icon={<MdEmail />} label="Email" type="email" {...field} />}
          />
          {errors.email && <p className="mt-1 text-xs font-medium text-rose-600">{errors.email.message}</p>}
        </div>

        <div>
          <Controller
            name="password"
            control={control}
            defaultValue=""
            rules={{ required: 'Password is required', minLength: { value: 6, message: 'Min 6 characters' } }}
            render={({ field }) => (
              <div className="relative">
                <Inputfield
                  icon={<FiLock />}
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  {...field}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            )}
          />
          {errors.password && <p className="mt-1 text-xs font-medium text-rose-600">{errors.password.message}</p>}
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <Controller
              name="mobile"
              control={control}
              defaultValue=""
              rules={{ required: 'Mobile is required', pattern: { value: /^[0-9]{10}$/, message: 'Enter a valid 10-digit number' } }}
              render={({ field }) => <Inputfield icon={<FiSmartphone />} label="Phone" type="tel" {...field} />}
            />
            {errors.mobile && <p className="mt-1 text-xs font-medium text-rose-600">{errors.mobile.message}</p>}
          </div>
          <div>
            <Controller
              name="city"
              control={control}
              defaultValue=""
              rules={{ required: 'City is required' }}
              render={({ field }) => (
                <div className="relative">
                  <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-4 py-3.5 transition-colors focus-within:border-brand-500">
                    <span className="text-lg text-slate-400">
                      <FiMapPin />
                    </span>
                    <select
                      value={field.value}
                      onChange={field.onChange}
                      className={`w-full bg-transparent text-sm outline-none ${field.value ? 'text-slate-800' : 'text-slate-400'}`}
                    >
                      <option value="" disabled>
                        City
                      </option>
                      {CITIES.map((c) => (
                        <option key={c} value={c}>
                          {c}
                        </option>
                      ))}
                    </select>
                    <FiChevronDown className="text-slate-400" />
                  </div>
                </div>
              )}
            />
            {errors.city && <p className="mt-1 text-xs font-medium text-rose-600">{errors.city.message}</p>}
          </div>
        </div>

        <div>
          <Controller
            name="gender"
            control={control}
            defaultValue=""
            rules={{ required: 'Gender is required' }}
            render={({ field }) => (
              <div className="grid grid-cols-3 gap-3">
                {GENDERS.map((g) => (
                  <button
                    key={g}
                    type="button"
                    onClick={() => field.onChange(g)}
                    className={`rounded-2xl border px-4 py-3 text-sm font-medium transition-all ${
                      field.value === g
                        ? 'border-brand-600 bg-brand-50 text-brand-700'
                        : 'border-slate-200 bg-white text-slate-500 hover:border-slate-300'
                    }`}
                  >
                    {g}
                  </button>
                ))}
              </div>
            )}
          />
          {errors.gender && <p className="mt-1 text-xs font-medium text-rose-600">{errors.gender.message}</p>}
        </div>

        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={status === 'loading'}
          className="group mt-2 flex items-center justify-center gap-2 rounded-2xl bg-brand-600 px-6 py-4 text-base font-semibold text-white shadow-glow transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === 'loading' ? (
            <>
              <FiLoader className="animate-spin" /> Creating account...
            </>
          ) : (
            <>
              Create account
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </>
          )}
        </motion.button>
        <AnimatePresence />

        <p className="text-center text-sm text-slate-500">
          Already have an account?{' '}
          <Link href="/Signinform" className="font-semibold text-brand-700 hover:underline">
            Sign in
          </Link>
        </p>
      </form>
    </AuthShell>
  );
};

export default Signupform;