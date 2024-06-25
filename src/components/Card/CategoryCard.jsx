import React from 'react'
import Image from 'next/image';
const CategoryCard = ({img,head,desc,margin}) => {
  return (
    <>
    <div className={`relative xl:w-[396px] lg:w-auto md:w-[396px] w-auto ${margin ? margin :''}`}>
    <Image 
        src={img}
        className='xl:w-[396px] lg:mx-0 mx-auto lg:w-[30vw] w-[55vw]'
        alt='category 1' 
      />
        <div className="lg:absolute static lg:top-16 lg:translate-x-50 translate-x-0 lg:mt-0 mt-2 flex flex-col gap-3 lg:left-16 left-0 ">
            <h1 className='bg-yellow md:text-auto   font-bold  
             rounded-[14px]  font-workSans text-nowrap text-center px-2 md:text-[2vw] text-[6vw] py-1'>{head}</h1>
            <h1 className='font-medium  lg:max-w-[18vw]  font-workSans text-white'>
                {desc}
            </h1>
        </div>
    </div>
    
    </>
  )
}

export default CategoryCard;
