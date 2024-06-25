"use client"
import React, { useEffect, useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import Inputfield from '../../components/FormComponents/Inputfield';
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import Travelling from '../../assets/Travelling.png';
import Image from 'next/image';
import Loader from '@/components/Loader/Loader';
import Link from 'next/link';

const SigninForm = () => {
  const [loading, setloading] = useState(false);
  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      setloading(false);
    }, 2000);
  }, []);

  const { handleSubmit, control, formState: { errors } } = useForm();
  const [inputValue, setInputValue] = useState('');

  const onSubmit = data => {
    console.log(data);
  };

  return (
    <>
    {
      loading ? <Loader/> :
      
      <div className="w-full flex justify-center items-center">
        <div className="w-[60%]">
          <Image src={Travelling}/>
        </div>
        <div className="w-[30%] h-100 flex flex-col gap-[24px]">
          <h1 className='w-[20vw] text-blue-950 font-bold text-[2vw] font-[workSans] text-center py-2 rounded-[6px]'>Join us</h1>
          <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-[17px]'>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: 'This field is required' }}
              render={({ field }) => (
                <Inputfield
                  icon={<MdEmail />}
                  label="Email"
                  type="email"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                    setInputValue(e.target.value);
                  }}
                />
              )}
            />
            {errors.email && <p className='text-red-500 text-[14px] font-medium font-[workSans]'>{errors.email.message}</p>}

            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: 'This field is required' }}
              render={({ field }) => (
                <Inputfield
                  icon={<FaLock />}
                  label="Password"
                  type="password"
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(e);
                    setInputValue(e.target.value);
                  }}
                />
              )}
            />
            {errors.password && <p className='text-red-500 text-[14px] font-medium font-[workSans]'>{errors.password.message}</p>}
           
        <Link href="/Signupform">  Don't have an account?     </Link>
            <button type="submit" className='w-[21vw] bg-blue-950 text-white py-2 rounded-[14px]'>Login</button>
          </form>
        </div>
      </div>
    }
    </>
  );
};

export default SigninForm;
