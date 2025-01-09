"use client"
import React from 'react'
import TopNavbar from './TopNavbar'
import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';
import NextTopLoader from 'nextjs-toploader';
import Footer from './Footer';
import { useSnapshot } from 'valtio';
import { loggeds } from './action';
import { IoReloadCircle } from "react-icons/io5";
import { useState } from 'react';
import Loadelement from './Loadelement';



const Body = ({children, inter}) => {
  const logged = useSnapshot(loggeds).loading
  const [isSpinning, setIsSpinning] = useState(false);

  return (
    <body className={inter} style={{backgroundColor:"#1A1A1A"}} >
      <link rel="icon" href="/logo.png" sizes="any" />
        <TopNavbar/>
        <NextTopLoader 
       color="#3B81F8"
       initialPosition={0.08}
       crawlSpeed={200}
       height={3}
       crawl={true}
       showSpinner={false}
       easing="ease"
       speed={200}
       shadow="0 0 10px #3B81F8,0 0 5px #3B81F8"
       className=" z-50"
      />
    <div className=' w-full'>
      {logged&&<div className=' h-[100vh] fixed z-50 top-0 left-0 w-full bg-bg flex justify-center items-center'><Loadelement type={"bubbles"}/></div>}
      <div className=''>{children}</div>
      </div>
        <ProgressBar
        height="3px"
        color="#3B81F8"
        options={{ showSpinner: false }}
        shallowRouting
      />
      <div className=' fixed z-50 bottom-5 right-5 cursor-pointer'>
      <IoReloadCircle  className={`text-green text-4xl transition-transform duration-500 ${isSpinning ? 'animate-spin' : ''}`} onClick={()=>{
        setIsSpinning(true);
        window.location.reload()
      }}/>
      </div>
      <Footer/>
      </body>
  )
}

export default Body