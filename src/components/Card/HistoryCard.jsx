import React from 'react'
import Image from 'next/image'

const HistoryCard = ({photo,desc,status}) => {
  return (
    <>
    <div className="w-full  py-1 my-2  flex items-center justify-around bg-zinc-300 ">
        <Image src={photo} width={100} className='rounded-[14px]' height={100}/>
         <h1 className='text-[16px] font-[merriweather]'>{desc}</h1>
          <h3 className='text-[16px] text-black bg-white p-2  rounded-[12px] font-[workSans] '>{status}</h3>
    </div>
    
    </>
  )
}

export default HistoryCard;
