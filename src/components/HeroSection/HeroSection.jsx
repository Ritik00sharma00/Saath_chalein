import React from 'react'

const
    HeroSection = () => {
        return (
            <>
                <div className="   flex flex-col gap-10 items-center translate-y-[20vw]  justify-center ">
                    <div className=" flex flex-col ">
                        <span className='font-bold text-[4vw] text-nowrap  font-[merriweather] text-center  text-white'>DISCOVER NEW WORLDS</span>
                        <span className='font-medium text-white md:text-[1vw] text-[4vw]  font-workSans text-center'>Your adventure awaits you</span>
                    </div>
                    <h1 className='text-black md:mt-0 mt-[-10vw] p-2 text-center md:px-12 px-4 rounded-[7px] text-[14px] bg-yellow font-medium font-workSans'>Start Journey</h1>



                </div>


            </>
        )
    }

export default HeroSection;
