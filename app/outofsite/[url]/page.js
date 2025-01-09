"use client"
import React from 'react'
import { useRouter } from "next-nprogress-bar";
import Link from "next/link"


const Pagess = ({params}) => {
  const navigate = useRouter()
    const url = params.url
    const decodedUrl = decodeURIComponent(url);
  return (
    <div className=' w-full flex justify-center h-[70vh]'>
      <div className=' text-white pt-20 w-[80%]'>
        <p className=' text-white font-semibold sm:text-2xl mb-5'>Leaving site to external link</p>
        <div className=' bg-textbg w-full  pb-20 flex flex-col items-center  pt-10'>
          <p className=' mb-3 sm:text-base text-xs'>Are you sure you want to leave page?</p>
          <Link onClick={()=>window.open("//greewepi.net/4/6809571")} href={{pathname:decodedUrl}} className=' bg-green px-2 text-sm sm:text-base sm:px-5 py-2 font-semibold rounded-md cursor-pointer'>
            Yes, Let's Go
          </Link>
        </div>
        <div></div>
      </div>
    </div>
  )
}

export default Pagess