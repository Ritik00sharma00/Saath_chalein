import React from 'react';
import Image from 'next/image';

const  CommentCard= ({ username, text, profilePic }) => {

  return (
    <div className=" ">
      <div className="w-8 flex items-center gap-2 h-8">
        <Image
          src={profilePic}
          alt={`${username}'s profile picture`}
          width={32}
          height={32}
          className="rounded-full object-cover"
        />
        
        <strong className='font-[merriweather'>{username}</strong>
      </div>
      <div>
        <div className="">
          
        <p className="text-sm ml-10 font-[workSans] font-medium"> {text}</p>

        </div>
      </div>
    </div>
  );
};

export default CommentCard;
