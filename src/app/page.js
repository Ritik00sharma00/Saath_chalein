"use client"
import { useState,useEffect } from "react";
import CategoryCard from "@/components/Card/CategoryCard";
import HeroSection from "@/components/HeroSection/HeroSection";

import category1 from "../assets/category1.png";
import DestinationCard from "@/components/Card/DestinationCard";
import FeedbackCard from "@/components/Card/Feedbackcard";
import Photos from "../assets/Photos.png";
import Logo from "@/components/Navbar/Logo";
export default function Home() {
  const [loading, setloading] = useState(false);
  
  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 2000);
  }, []);
  return (
    <>
    {loading ? <Loader /> :<> <div className="hero "><HeroSection/></div> <div className="flex flex-col  mt-5 bg-gradient-to-r from-[#53B0A7] to-[#C0DEDB] md:gap-[15vw] gap-4">
      
        <div className="w-full  m-5 ">
          
          <h1 className=" font-workSans   md:text-[45px] text-[20px] text-black">
            Tour Category
          </h1>
          <h1 className="font-bold md:text-[55px] text-[25px]  font-merriweather">
            Select your Tour type
          </h1>
        </div>




        <div className=" lg:flex-row flex mx-auto flex-col  md:justify-center md:gap-4 gap-[10vw] lg:gap-0 xl:gap-14 items-center ">
          
          <CategoryCard
            img={category1}
            head="Luxury Getways"
            desc="Wonderful beach for spending your weekend with your family freinds or stranger,explore the world."
          />

          <CategoryCard
            margin="lg:-mt-[28vw] -mt-0"
            img={category1}
            head="Family Adventures"
            desc="Wonderful beach for spending your weekend with your family freinds or stranger,explore the world."
          />

          <CategoryCard
            img={category1}
            
            head="Solo travel"
            desc="Wonderful beach for spending your weekend with your family freinds or stranger,explore the world."
          />
        </div>




        <div className="w-full  flex flex-col gap-10">
          <h2 className="text-center font-bold text-nowrap  font-workSans md:text-[32px] text-[8vw] ">
            Popular Destinations
          </h2>
          <div className=" flex lg:flex-row flex-col lg:mx-0 mx-10 lg:gap-0 gap-3 lg:m-0 m-4 lg:justify-around">
            <DestinationCard heading={"Nagpur"}  desc="It is nice place to spend holidays" />

            <DestinationCard heading={"Shrinagar"}  desc="It is nice place to fo partys" />

            <DestinationCard heading={"Lucknow"}  desc="It is nice place to fo partys" />
          </div>
        </div>


        <div className="xl:w-full w-[80%]  lg:mx-32 mx-0 flex lg:flex-row flex-col   gap-10  justify-between items-center from-[#2a4d4a] to-[#adf6ef]">
          <div className="  flex flex-col gap-10">
            <h1 className="text-black  font-bold text-[32px] font-merriweather">
              Feedbacks
            </h1>

            <Logo />
          </div>

          <FeedbackCard
            imageSrc={Photos}
            name="Pallavi"
            review="This site is good to find strangers and travel with them."
          />
        </div>


      </div> </> }
      
    </>
  );
}
