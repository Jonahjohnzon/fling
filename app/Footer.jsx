import React from 'react'
import { FaArrowUp } from "react-icons/fa";
import { useRouter } from 'next-nprogress-bar';


const Footer = () => {
    const navigate = useRouter()
    const handleScrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      };
  return (
    <div className=' bg-[#212328] w-full text-xs sm:text-sm  py-5 px-2 text-gray  flex  justify-center items-center'>
        <div className=' w-[95%] xl:w-[80%] flex lg:flex-row flex-col justify-between lg:items-center'>
            <section className=' mb-4 lg:mb-0'>
                <p className=' '>Created by <span className=' text-red font-semibold'>Mid9it</span></p>
            </section>
            <section>
                <ul className=' flex lg:flex-row flex-col items-start lg:items-center'>
                    <li className=' mr-4 mb-4 lg:mb-0 cursor-pointer hover:underline hover:text-blue' onClick={()=>navigate.push('/terms')}>Terms and rules</li>
                    <li className=' mr-4 mb-4 lg:mb-0 cursor-pointer hover:underline hover:text-blue ' onClick={()=>navigate.push('/profile/66a2c6bdf2041e488d592651')}>Contact/Request Takedown</li>
                    <li className=' mr-4 mb-4 lg:mb-0 cursor-pointer hover:underline hover:text-blue' onClick={()=>navigate.push('/')}>Home</li>
                    <li  onClick={handleScrollToTop}  className='cursor-pointer'><FaArrowUp className=' text-xs' /></li>
                </ul>
            </section>
        </div>
    </div>
  )
}

export default Footer