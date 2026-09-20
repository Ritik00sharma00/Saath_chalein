'use client';

import { useState } from 'react';
import { FiUpload, FiUser } from 'react-icons/fi';

const Imageupload = ({ field, label = 'Upload profile photo' }) => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      field.onChange(file);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center gap-3">
      <div
        onClick={() => document.getElementById('profile-upload').click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && document.getElementById('profile-upload').click()}
        className="group relative flex h-28 w-28 cursor-pointer items-center justify-center overflow-hidden rounded-full border-2 border-dashed border-slate-300 bg-slate-50 transition hover:border-brand-500"
      >
        {preview ? (
          <img src={preview} alt="Profile preview" className="h-full w-full object-cover" />
        ) : (
          <span className="flex flex-col items-center gap-1 text-slate-400 transition group-hover:text-brand-600">
            <FiUser size={26} />
            <span className="text-[10px] font-medium">{label}</span>
          </span>
        )}
        <span className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg">
          <FiUpload size={14} />
        </span>
      </div>
      <input
        id="profile-upload"
        type="file"
        className="hidden"
        onChange={handleImageChange}
        accept="image/*"
      />
      <p className="text-xs text-slate-400">PNG or JPG · max 5MB</p>
    </div>
  );
};

export default Imageupload;