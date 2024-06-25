// src/components/FeedbackCard.js
import Image from 'next/image';
import { FaStar } from "react-icons/fa6";

const FeedbackCard = ({ imageSrc, name, review }) => {
  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <Image width={200} height={200} lazyLoad={true}  className="h-48 w-full object-cover md:w-48" src={imageSrc} alt="Profile" />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide  text-black font-workSans font-semibold">{name}</div>
          
          <div className="stars  flex"><FaStar className='text-yellow' size={32}/>
          <FaStar className='text-yellow' size={32}/>
          <FaStar className='text-yellow' size={32}/>
          
          <FaStar className='text-yellow' size={32}/>

          </div>
          <p className="mt-2 text-gray-500">{review}</p>
        </div>
      </div>
    </div>
  );
};

export default FeedbackCard;
