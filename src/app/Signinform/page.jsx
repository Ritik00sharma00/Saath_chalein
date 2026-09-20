'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { MdEmail } from 'react-icons/md';
import { FiLock, FiEye, FiEyeOff, FiArrowRight, FiAlertCircle, FiLoader } from 'react-icons/fi';
import AuthShell from '@/components/Auth/AuthShell';
import Inputfield from '@/components/FormComponents/Inputfield';
import { loginUser, clearError, selectAuthError, selectAuthStatus } from '@/store/authSlice';

const SigninForm = () => {
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
    const result = await dispatch(loginUser({ email: data.email, password: data.password }));
    if (loginUser.fulfilled.match(result)) {
      router.push('/PlansPage');
    }
  };

  return (
    <AuthShell
      title="Welcome back, traveller"
      subtitle="Sign in to find new trips and companions."
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 rounded-2xl bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600"
          >
            <FiAlertCircle /> {error}
          </motion.div>
        )}

        <div>
          <Controller
            name="email"
            control={control}
            defaultValue=""
            rules={{ required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Enter a valid email' } }}
            render={({ field }) => <Inputfield icon={<MdEmail />} label="Email" type="email" {...field} />}
          />
          {errors.email && (
            <p className="mt-1 text-xs font-medium text-rose-600">{errors.email.message}</p>
          )}
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
          {errors.password && (
            <p className="mt-1 text-xs font-medium text-rose-600">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center gap-2 text-slate-600">
            <input type="checkbox" className="h-4 w-4 rounded border-slate-300 accent-brand-600" />
            Remember me
          </label>
          <button type="button" className="font-medium text-brand-700 hover:text-brand-800">
            Forgot password?
          </button>
        </div>

        <motion.button
          whileTap={{ scale: 0.98 }}
          type="submit"
          disabled={status === 'loading'}
          className="group mt-2 flex items-center justify-center gap-2 rounded-2xl bg-brand-600 px-6 py-4 text-base font-semibold text-white shadow-glow transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === 'loading' ? (
            <>
              <FiLoader className="animate-spin" /> Signing in...
            </>
          ) : (
            <>
              Sign in
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </>
          )}
        </motion.button>

        <p className="text-center text-sm text-slate-500">
          New to SaathChalein?{' '}
          <Link href="/Signupform" className="font-semibold text-brand-700 hover:underline">
            Create an account
          </Link>
        </p>
      </form>
    </AuthShell>
  );
};

export default SigninForm;