'use client';

import React, { useState } from 'react';

const Inputfield = ({ label, value, onChange, type = 'text', icon: Icon, ...rest }) => {
  const [focused, setFocused] = useState(false);
  const hasValue = !!value;
  const active = focused || hasValue;

  return (
    <div className="relative">
      <div
        className={`flex items-center gap-3 rounded-2xl border bg-white px-4 py-3.5 transition-all duration-300 ${
          active
            ? 'border-brand-500 shadow-glow'
            : 'border-slate-200 hover:border-slate-300'
        }`}
      >
        <span className={`text-lg transition-colors ${active ? 'text-brand-600' : 'text-slate-400'}`}>
          {Icon}
        </span>
        <input
          type={type}
          id={label}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full bg-transparent text-sm text-slate-800 outline-none placeholder-transparent"
          placeholder={label}
          {...rest}
        />
      </div>
      <label
        htmlFor={label}
        className={`pointer-events-none absolute left-11 top-0 z-10 -translate-y-1/2 bg-white px-2 text-xs font-medium transition-all duration-300 ${
          active ? 'text-brand-600 opacity-100' : 'opacity-0'
        }`}
      >
        {label}
      </label>
    </div>
  );
};

export default Inputfield;