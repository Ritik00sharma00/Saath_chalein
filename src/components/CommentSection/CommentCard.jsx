import React from 'react';
import Image from 'next/image';

const CommentCard = ({ username, text, profilePic }) => {
  return (
    <div className="flex items-start gap-3">
      <span className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full">
        <Image src={profilePic} alt={`${username}'s profile`} fill className="object-cover" />
      </span>
      <div className="min-w-0 rounded-2xl rounded-tl-sm bg-white px-4 py-2.5 shadow-sm">
        <p className="text-xs font-semibold text-slate-700">{username}</p>
        <p className="mt-0.5 text-sm text-slate-500">{text}</p>
      </div>
    </div>
  );
};

export default CommentCard;