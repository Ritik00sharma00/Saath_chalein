"use client";
import React,{useState,useEffect} from 'react';
import Head from 'next/head';
import FeedCard from '@/components/FeedCard/FeedCard';
import Profile from '@/components/Profile/Profile';
import { FaTrash } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import Loader from '@/components/Loader/Loader';

const PlansPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an API call
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);


  const dummy_requests = [
    {
      name: "Meghna",
      plan: "Travel to Puri",
      status: "pending"
    },
    {
      name: "Srushti",
      plan: "Travel to Ladakh",
      status: "accepted"
    }
  ];
  
  const [requestDrop, setrequestDrop] = useState(false);
  const [inviteDrop, setinviteDrop] = useState(false);
  const [dltreq,setdltreq]=useState(false);
  const [dlticon,setdlticon]=useState(false);
  const [dltinvt,setdltinvt] = useState(false);

  return (
     <>
         {  
      
      <div className="container relative  overscroll-none mx-auto p-4 h-screen" style={{ overflow: "hidden" }}>
   
      <div className="bg-gray-50 p-6 rounded-lg shadow-lg h-full">
        <div className="grid grid-cols-1 md:grid-cols-10 gap-6 h-full">
          <div className="md:col-span-3  lg:block hidden  overscroll-none pr-4">
            <Profile />
          </div>
          <div className="md:col-span-4  w-full  grid gap-y-5 gap-x-0 overscroll-none overflow-y-auto">
            <FeedCard />
            <FeedCard />
            <FeedCard />
          </div>
          <div className="md:col-span-3 flex flex-col gap-y-4">
            <button onClick={()=>setrequestDrop(!requestDrop)} className="bg-purple-200 flex 
             hover:bg-purple-400 hover:text-white hover:font-semibold hover:transition-all hover:duration-500 justify-center text-center text-black py-2 px-4 rounded ">
              Requests<FaAngleDown className='text-[12px] m-2' />
            </button>
               {
                requestDrop &&    <div className='transform  transition-transform duration-1000'>
                <table className='border-2 w-full'>
                  <thead className='font-bold bg-slate-400'>
                    <tr>
                      <th className='border p-2'>Name</th>
                      <th className='border p-2'>Plan</th>
                      <th className='border p-2'>Status</th>
                      <th>{dltreq?<FaTrash className='m-auto'/>:''}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {dummy_requests.map((req, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                        <td className='border p-2'>{req.name}</td>
                        <td className='border p-2'>{req.plan}</td>
                        <td className='border p-2'>{req.status}</td>
                        <td className='border p-2'><button className='bg-blue-600 p-2 text-white rounded-[14px]'>Delete</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
               }
         

            <button onClick={()=>setinviteDrop(!inviteDrop)} className="bg-purple-200 flex justify-center items-center text-center text-black py-2 px-4 rounded hover:bg-purple-400 hover:text-white hover:font-semibold hover:transition-all hover:duration-500">Invitation<FaAngleDown className='m-2 text-[12px]' />
            </button>
            {
                inviteDrop &&    <div className='transform  transition-transform duration-1000'>
                <table className='border-2 w-full'>
                  <thead className='font-bold bg-slate-400'>
                    <tr>
                      <th className='border p-2'>Name</th>
                      <th className='border p-2'>Plan</th>
                      <th className='border p-2'>Status</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {dummy_requests.map((req, i) => (
                        <tr key={i} className={i % 2 === 0 ? "bg-gray-100" : "bg-white"}>
                        <td className='border p-2'>{req.name}</td>
                        <td className='border p-2'>{req.plan}</td>
                        <td className='border p-2'>{req.status}</td>
                        
                        <td className='border p-2'><button className='bg-blue-600 p-2 text-white rounded-[14px]'>Delete</button></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
               }
          </div>
        </div>
      </div>
    </div>
      
   }
     </>

  );
};

export default PlansPage;
