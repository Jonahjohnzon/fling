import Welcome from '@/app/Welcome'
import React from 'react'
import { FaExclamationCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const TopNotice = () => {
  return (
    <div className=' w-full bg-bg    flex justify-center'>
   <div className='xl:w-[80%] w-[95%]  select-none text-[15px]'>
     <div className="  relative text-white border-2 overflow-y-hidden mb-5 rounded-sm border-blue bg-textbg flex items-center">
      <div className=" w-[3%]  absolute left-0 h-full  flex items-center justify-center bg-blue">
      <FaExclamationCircle />
      </div>
      <div className="  pl-[4%] py-3 sm:text-base text-[13px]">
        <p>Copyrighted contents are not allowed </p>
      </div>
    </div>
    <div className="  mb-5 relative text-white border-2 overflow-y-hidden rounded-sm border-blue bg-textbg flex items-center">
      <div className=" w-[3%]  absolute left-0 h-full  flex items-center justify-center bg-blue">
      <FaExclamationCircle />
      </div>
      <Welcome/>
    </div>

    <div className="  relative text-white border-2 overflow-y-hidden mb-5 rounded-sm border-blue bg-textbg flex items-center">
      <div className=" w-[3%]  absolute left-0 h-full  flex items-center justify-center bg-blue">
      <FaExclamationCircle />
      </div>
      <div className=" pl-[4%] py-3 sm:text-base text-[13px]">
      <p>Spamming or posting Ads will get your account ban </p>
      </div>
    </div>
   </div>
  
   </div>
  )
}

export default TopNotice