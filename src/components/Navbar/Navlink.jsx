import React from 'react'
import Link from 'next/link';

const Navlink = (props) => {
  return (

    <>
    <Link href={props.link} >
    
    <h1  className='font-workSans text-gray-600  hover:text-black md:text-[18px] text-[14px] md:text-auto text-center font-medium'>{props.text}</h1>
     <hr  className='w-full '/>
    
    </Link>


    
    </>
  )
}

export default Navlink;
