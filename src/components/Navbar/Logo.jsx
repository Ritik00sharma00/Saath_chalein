import React from 'react';
import { FaPaperPlane } from "react-icons/fa";


const Logo = () => {
  return (
    <>
    <div className="bg-black flex  gap-2 mx-2 text-white  items-center md:max-w-[30vw] w-auto py-1   rounded-[8px] px-2">
     
      <span className='text-muddy md:text-[20px] text-[10px]'><FaPaperPlane/></span>
      <span  className='md:text-[17px] text-[14px] font-workSans text-muddy'>SaathChalein</span>

    </div>
    </>
  )
}

export default Logo
