"use client";

import React, { useState,useEffect} from 'react';
// import { CountryField, StateField, VisitorAPIComponents } from 'react-country-state-fields';
import { useForm, Controller } from "react-hook-form";
import Inputfield from '../../components/FormComponents/Inputfield';
import { MdEmail } from "react-icons/md";
import { FaLock, FaMobile } from "react-icons/fa";
import Travelling from '../../assets/Travelling.png';
import Image from 'next/image';
import Imageupload from '../../components/FormComponents/Imageupload'; 
import { FaCity } from "react-icons/fa";
import Loader from '@/components/Loader/Loader';
import Link from 'next/link'
import Router from 'next/router';
import { useRouter } from 'next/navigation';

const Signupform = () => {

  const router =useRouter();
  const [loading, setloading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 2000);
  }, []);
  const { handleSubmit, control, formState: { errors } } = useForm();
  const [isFocused, setIsFocused] = useState(false);
  const [cityList, setCityList] = useState([]);

  const [country, setCountry] = useState({}); // the selected country
  const [state, setState] = useState({}); // the selected state
  const visitorApiPrjectId = ""

  const onSubmit = (data) => {

  
    console.log(data);

    router.push('/Signinform');
  };

  return (
    <>
    {
    loading ?<Loader/> :   <div className="flex justify-center items-center w-full">
    <div className="w-3/5   lg:block hidden">
      <Image src={Travelling} alt="Travelling" priority />
    </div>
    <div className="flex flex-col gap-6 lg:w-2/5 w-full">
      <h1 className="text-3xl text-blue-900 font-bold text-center py-2 rounded-md">Join us</h1>

      <form onSubmit={handleSubmit(onSubmit)}  enctype="multipart/form-data"   className="flex mb-3 lg:ml-0 ml-5 flex-col gap-4">
        <Controller
          name="profile"
          control={control}
          defaultValue={null}
          render={({ field }) => <Imageupload field={field} />}
        />
        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{ required: 'Email is required' }}
          render={({ field }) => (
            <Inputfield
              icon={<MdEmail />}
              label="Email"
              type="email"
              value={field.value}
              onChange={(e) => field.onChange(e)}
            />
          )}
        />
        {errors.email && <p className="text-red-500 text-sm font-medium">{errors.email.message}</p>}

        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{ required: 'Password is required' }}
          render={({ field }) => (
            <Inputfield
              icon={<FaLock />}
              label="Password"
              type="password"
              value={field.value}
              onChange={(e) => field.onChange(e)}
            />
          )}
        />
        {errors.password && <p className="text-red-500 text-sm font-medium">{errors.password.message}</p>}

        <Controller
          name="mobile"
          control={control}
          rules={{ required: 'Mobile is required', pattern: { value: /^[0-9]{10}$/, message: 'Enter a valid phone number' } }}
          render={({ field }) => (
            <Inputfield
              icon={<FaMobile />}
              label="Phone number"
              type="text"
              value={field.value}
              onChange={(e) => field.onChange(e)}
            />
          )}
        />
        {errors.mobile && <p className="text-red-500 text-sm font-medium">{errors.mobile.message}</p>}

        <Controller
          name="gender"
          control={control}
          defaultValue=""
          rules={{ required: 'Gender is required' }}
          render={({ field }) => (
            <Inputfield
              icon={<MdEmail />}
              label="Gender"
              type="text"
              value={field.value}
              onChange={(e) => field.onChange(e)}
            />
          )}
        />
        {errors.gender && <p className="text-red-500 text-sm font-medium">{errors.gender.message}</p>}

        <Controller
          name="city"
          control={control}
          defaultValue=""
          rules={{ required: 'City is required' }}
          render={({ field }) => (
            <div className="relative flex w-[24vw] mt-1">
    <span className='text-[18px] ml-2 text-blue-950'><FaCity/></span>
    <label
      htmlFor="city"
      className={`absolute text-center flex ml-4 pl-5  font-merriweather text-sm text-blue-900 font-medium transition-transform duration-500 ${
        isFocused || field.value ? 'transform translate-x-40 bg-black text-white px-2 rounded-md' : 'translate-x-0'
      }`}
    >
      City
    </label>
    <select
      id="city"
      name="city"
      className="w-full border-b-2 border-gray-300 focus:outline-none focus:border-b-cyan-400"
      onChange={(e) => field.onChange(e)}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      aria-label="Select City"
    >
      <option value=""  selected></option>
      <option value="Hyderabad">Hyderabad</option>
    </select>
  </div>          )}
        />
        {errors.city && <p className="text-red-500 text-sm font-medium">{errors.city.message}</p>}


        <Link href="/Signinform">  Already have an account?     </Link>
        <button type="submit" className="lg:w-[24.5vw] w-full bg-blue-900 text-white py-2 rounded-lg">Sign up</button>
      </form>
    </div>
  </div> }</>
  
  );
};

export default Signupform;
