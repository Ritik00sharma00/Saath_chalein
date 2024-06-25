"use client"
import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import Navlink from './Navlink';
import HeroSection from '../HeroSection/HeroSection';
import { FaBars } from "react-icons/fa6";
import { useRouter } from 'next/navigation';


const Navbar = () => {
  const [Navbtn, setNavbtn] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleNavbtn = () => {
    setNavbtn(!Navbtn);
  };
  const routing= useRouter();

  const handleClick = () => {
    routing.push('/Signupform'); // Navigate to '/signup' route
  };

  return (
      <>
      <div className={router.pathname == ''  ? "hero" : ''}>

        <div className="header relative bg-slate-300 w-full rounded-t-[14px] flex justify-between items-center bg-cyan h-[75px]">
          <Logo />
          <div className="w-2/3 lg:flex hidden gap-10 items-center justify-around">
            <Navlink text="Home" link="/" />
            <Navlink text="About" link="/About" />
            <Navlink text="Humsafar" link="/PlansPage" />
            <button   onClick={handleClick} className="text-nowrap bg-yellow rounded-[8px] font-semibold text-[20px] font-workSans text-black px-[24px] py-[12px]">
              Join Free
            </button>
          </div>

          <FaBars onClick={handleNavbtn} className='lg:hidden block m-2' />

          {Navbtn && (
            <div className="w-1/3 mt-40 pt-10  border-l-2 border-b-4 transition-all duration-4000 bg-slate-950 z-10 right-0 lg:hidden block absolute gap-10 items-center justify-around">
              <Navlink text="Home" link="/" />
              <Navlink text="About" link="/About" />
              <Navlink text="Humsafar" link="/PlansPage"  />
              <button   onClick={handleClick} className="lg:hidden text-center border-1 bg-transparent text-white  text-[12px] md:text-[10px] text-nowrap md:bg-yellow rounded-[8px] font-semibold font-workSans md:text-black">
                Join Free
              </button>
            </div>
          )}
        </div>
        {isMounted && router.pathname == '/' && <HeroSection />}
      </div>
    </>
  );
}

export default Navbar;
