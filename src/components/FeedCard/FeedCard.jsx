"use client"
import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import selfie from '../../assets/selfie.png';
import  Photos from '../../assets/Photos.png';
import CommentCard from '../CommentSection/CommentCard';
import { FiMessageCircle } from "react-icons/fi";
import { AiOutlineMessage } from "react-icons/ai";
import { PiHandSwipeRightFill } from "react-icons/pi";
import { MdOutlineHandshake } from "react-icons/md";

const   FeedCard = () => {


  const [showComments, setShowComments] = useState(false);
  
  const [showRequest, setShowRequest] = useState(false);

  const comments = [
    { id: 1, username: 'user1', 
      text: 'This is a comment.', 
      profilePic: 'https://via.placeholder.com/150'
    },
    { id: 2,
      username: 'user2',
      text: 'This is another comment.', 
      profilePic: 'https://via.placeholder.com/150' },
  ];

  return (
    
    <div className="bg-slate-200 rounded-md xl:w-4/5 w-full p-4">
      <div className=" ">
        <div className="w-12">
          <Image
            src={Photos}
            alt="Profile"
            width={400}
            height={400}
            className="rounded-full"
        
          />
        </div>
        <div className="xl:ml-4 ml-0">
          <h2 className=" font-workSans font-semibold  text-black ">John Doe</h2>
        </div>
        
      </div>
      <div className="">

        <Image
          src={selfie}
          alt="News Image" 
          width={300}
          height={200}
          className="rounded-lg"
          priority
        />
      </div>
      
      <p className=" mb-4">
        This is a short description of the news feed. It provides an overview of the content in the feed.
      </p>
      <div className=" flex lg:flex-row flex-col gap-2  ">
         <button
        className="text-white w-full text-24 font-workSans font-medium justify-center p-2 flex items-center gap-4 rounded-[14px] bg-blue-700"
        onClick={() => setShowComments(!showComments)}
      >
        
        {showComments ? <AiOutlineMessage />: <FiMessageCircle/>}
        <span className=' '>Comments</span>
      </button>

      <button
      className={`text-white w-full text-24 font-workSans font-medium justify-center p-2 xl:p-3 flex items-center gap-4 rounded-[14px] ${showRequest ? 'bg-gray-700 transition-all duration-2000 text-black font-bold' : 'bg-blue-700'}`}
      onClick={() => setShowRequest(!showRequest)}
    >
      {showRequest ? <MdOutlineHandshake /> : <PiHandSwipeRightFill />}
      <span className=' '>Request</span>
    </button>

      </div>

      <div className="">
      {showComments && (
        <>
        
        <div className=" bg-gray-100 p-4 rounded">
          {/* {comments.map(comment => (
            <CommentCard
              key={comment.id}
              username="comment.username"
              text="comment.text"
              profilePic={comment.profilePic}
            />
          ))}  */}

          <CommentCard username="John " text="jwefhcewjs" profilePic={Photos} />
          
          <CommentCard username="John " text="jwefhcewjs" profilePic={Photos} />
        </div>
        
        
        
        </>
      )} 
      </div>

      
      <div className="">
      {showComments && (
        <>
        
        <div className=" md:fixed  transition transform duration-2000 ease-linear absolute bg-gray-100 p-4 rounded">
          {/* {comments.map(comment => (
            <CommentCard
              key={comment.id}
              username="comment.username"
              text="comment.text"
              profilePic={comment.profilePic}
            />
          ))}  */}

          <CommentCard username="John " text="jwefhcewjs" profilePic={Photos} />
          
          <CommentCard username="John " text="jwefhcewjs" profilePic={Photos} />
        </div>
        
        
        
        </>
      )} 
      </div>
     
    </div>
  );
};

export default FeedCard;

