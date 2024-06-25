import React from 'react'
import Photos from '@/assets/Photos.png';
import HistoryCard from '../Card/HistoryCard';

const HistoryModal = () => {
    const dummy=
    [
        {
            photo:Photos,
            desc:"Trip to Rishikesh",
            status:"pending"
        },
        
        {
            photo:Photos,
            desc:"Trip to Haridwar",
            status:"pending"
        },
        
        {
            photo:Photos,
            desc:"Trip to Rishikesh",
            status:"accepted"
        },
        
        {
            photo:Photos,
            desc:"Trip to Haridwar",
            status:"rejected"
        }
    ]
  return (
   <>   
   <div className="w-2/5 h-3/5 overflow-auto bg-[rgba(255,255,255,0.9)] rounded-lg border-2 border-cyan absolute z-10 top-20 left-[30%] p-4">
     {dummy.map((data, index) => (
       <HistoryCard key={index} photo={data.photo} desc={data.desc} status={data.status} />
     ))}
   </div>
 
   </>
  )
}

export default HistoryModal;
