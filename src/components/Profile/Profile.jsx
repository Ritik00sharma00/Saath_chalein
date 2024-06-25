import React,{useState} from 'react';
import selfie from "../../assets/selfie.png"
import Image from 'next/image';
import HistoryModal from '../Modal/HistoryModal';
import PublishPlanModal from '../Plans/PublishPlanModal';
const Profile = () => {

  const [showHistory, setshowHistory] = useState(false);
  
  const [showPublish, setshowPublish] = useState(false);
  const closePlan=()=>{()=>{setshowPublish(false);}}
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
    },
    {
      name: "Meghna",
      plan: "Travel to Puri",
      status: "pending"
    },
    {
      name: "Srushti",
      plan: "Travel to Ladakh",
      status: "accepted"
    },
    {
      name: "Meghna",
      plan: "Travel to Puri",
      status: "pending" 
    },
    {
      name: "Srushti",
      plan: "Travel to Ladakh",
      status: "accepted"
    }, 
  ];
  return (
    <>
    <div className="bg-white w-full ">
      
      <div className="flex-col w-full lg:flex-nowrap  text-nowrap flex  items-center gap-5    mb-4 sm:mb-0">
        <Image 
          src={selfie} 
          width={600}
          height={600}
          alt="Profile" 
          className="w-full h-full rounded-full object-cover"
        />
        <h2 className="text-xl  sm:text-2xl font-semibold mb-2">John Doe</h2>
      </div>

      
    </div>
    
    <div className="flex flex-col mt-3 space-y-2">
      <button  onClick={()=>{setshowPublish(true)}} className="bg-purple-200 text-black py-2 px-4 rounded hover:bg-purple-400 hover:text-white hover:font-semibold hover:transition-all hover:duration-500 ">Publish Plan</button>
      {showPublish && <PublishPlanModal closePlan={closePlan} />} 
   
    <button onClick={()=>{setshowHistory(!showHistory)}} className="bg-purple-200 text-black py-2 px-4 rounded hover:bg-purple-600 hover:transition-all hover:duration-500">History</button>
   {showHistory && <HistoryModal closeHistory={()=>{setshowPublish(false)}}/>} 

    {/* <button className="bg-purple-200 text-black py-2 px-4 rounded hover:bg-purple-600">Personal Details</button> */}
  </div>
  </>
  );
};

export default Profile;
