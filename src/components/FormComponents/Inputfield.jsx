import React,{useState} from 'react'

const Inputfield = ({ label, value, onChange,type,icon }) => {
  
  //  let info=  { label, value, onChange}
   
    const [isFocused, setIsFocused] = useState(false);

    


  return (
    <>
     <div className="relative lg:w-[24vw] w-full flex  justify-start items-center">
     <span className='text-[18px] ml-2 text-blue-950 mt-1 '>{icon}</span>
      <label htmlFor={label}
        className={`absolute ml-5 px-3  pb-1text-[14px] text-blue-950 font-merriweather left-0 bottom-0 transform transition-all duration-500 ${
          isFocused || value ? 'translate-x-[18.6vw] bg-black text-white px-2 rounded-md' : 'translate-x-0'
        }`}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        id={label}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() =>   setIsFocused(false)}
        className="w-full pl-2 border-b-2 border-gray-300 focus:outline-none focus:border-b-cyan"
      />
    </div>
    
    
    </>
  )
}

export default Inputfield;
