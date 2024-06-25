import Image from 'next/image';
import category1 from '../../assets/Destined.png';

const DestinationCard = ({heading,desc}) => {
  return (
    <div className="max-w-500 rounded-14px  rounded-[14px] overflow-hidden shadow-lg">
      <Image 
        src={category1} 
        alt="Category Image" 
    
        width={396} 
        height={396} 
        className="w-full"
      />
      <div className="px-6 py-4  ">
        <div className="font-bold text-xl mb-2">{heading}</div>
        <p className=" text-black">
          {desc}
        </p>
      </div>

      <div className="">

      </div>
    </div>

  );
};

export default DestinationCard;
