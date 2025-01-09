"use client"
import React, { useEffect, useState } from 'react'
import { loggeds } from '../../action'
import { useRouter } from 'next-nprogress-bar'
import Pager from '@/app/thread/[title]/[pageindex]/[type]/Component/pager'
import { FaHome, FaAngleRight,FaExclamationCircle, } from "react-icons/fa";
import Sidenav from '@/app/Component/Category/Sidenav'
import ForumTab from '@/app/thread/[title]/[pageindex]/[type]/Component/forumTab'
import Loadelement from '@/app/Loadelement'

const page = ({params}) => {
    const [Data,setData] = useState([])
    const [load, setload] = useState(false)
    const [load2, setload2] = useState(false)
    const navigate = useRouter()
    const index = params?.index
    const [size, setSize] = useState(1)
    const Api = process.env.NEXT_PUBLIC_DOMAIN

    const Post = async(e)=>{

      setload2(true)
      const logg = localStorage.getItem("data");
      const logged = JSON.parse(logg);
      if(!logged){
        return;
    }
    const token = logged.token;
    try{
      const datainfo = await fetch(
        `${Api}/RemoveFollow/${logged._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json",  "auth-token": token, },
          body: JSON.stringify({ postid:e}),
        }
      );
      const info = await datainfo.json();
      if(info.auth)
      {
        loggeds.loading = true
        window.location.reload()

      }
    else{
      loggeds.loading = true
      window.location.reload()
    }
    
    }
      catch(e)
      {
        console.log(e)
      }
    }
    const Get =async()=>{
      try{
        const logg = localStorage.getItem("data");
        const logged = await JSON.parse(logg);
        if(!logged){
            loggeds.loading = false 
            navigate.push('/')
            return;
        }
        const token = logged.token;
        const info = await fetch(
            `${Api}/Getfollowed/${logged._id}/${params?.index}`,
            {
              method: "GET",
              headers: {
                "auth-token": token,
              },
            }
          );
        const data = await info.json()
        if(data?.login)
        {
        loggeds.loading = false 
        navigate.push('/')
        return;
        }
        else if(data?.auth)
        {

        }
        setSize(data.totalSize || 1)
        setData(data.data || [])
        
        loggeds.loading = false
        setload(true)
        
      }catch(e)
      {
        console.log(e)
      }
    } 
    const Left =()=>{
            const postInt = parseInt(index, 10); 
            const route =`/following/${postInt - 1}`
             navigate.push(route)
    }
    const Right =()=>{
            const postInt = parseInt(index, 10); 
            const route =`/following/${postInt + 1}`
             navigate.push(route)
    }
  
    const Move =(e)=>{
            const route =`/following/${e}`
             navigate.push(route)
    }
    const Arrayp =()=>{
        const array = [];
        for (let i = 1; i <= size; i++) {
          array.push(i);
        }
      
        return array;
    }
useEffect(()=>{
  window.scrollTo({
    top: 0,
    behavior: 'auto'
  });
   Get()

},[])
  return (
    <div className=' min-h-[100vh] flex flex-col items-center'>
        <div className='w-[95%] xl:w-[80%]'>
        <div className='  flex justify-start pt-5 pb-5 '>
            <h1 className=' sm:text-xl text-white sm:font-semibold'>Followed Thread</h1>
        </div>
        <div className="  relative text-white border-2 overflow-y-hidden mb-5 rounded-sm border-blue bg-textbg flex items-center">
              <div className=" w-[3%]  absolute left-0 h-full  flex items-center justify-center bg-blue">
                <FaExclamationCircle />
              </div>
              <div className=" pl-[5%] py-3 text-[12px] sm:text-base ">
                <p>List of all threads you follow </p>
              </div>
            </div>
        <div className=' flex items-center text-gray mb-2'>
            <FaHome className=' mr-3 text-xs lg:text-sm cursor-pointer hover:text-white' onClick={()=>navigate.push('/')}/>
            <FaAngleRight className=' mr-3 text-xs'/>
            <p  className=' text-xs lg:text-sm font-medium hover:underline cursor-pointer text-white'>Following</p>
          </div>

        <div className=' flex xl:flex-row flex-col items-center xl:items-start justify-between w-full'>
          <div className=' w-full  xl:w-[70%] mb-5 sm:mb-0  3xl:w-[79%] text-white text-sm'>
          <div className=' text-white mb-2'>
        <Pager  number={index} array={Arrayp()} Right={Right} Move={Move} Left={Left} page={size}/>
        </div>
        <div className='min-h-[70vh]   w-full'>
        {load?<div className=' min-h-[70vh] w-full flex flex-col  items-center pt-4 scrollbar-thumb-metal scrollbar-track-transparent scrollbar-thin'>
            {Data.map((e)=>{
                return(
                    <div key={e._id}  className=' w-full' >
                        <ForumTab  data={e} keys={e._id}    name={e.category}   hide follow Post={Post} load2={load2}/>
                    </div>
                )
            })}
        </div>:<div className=' w-full h-full flex justify-center items-center '>
                    <Loadelement type={"bubbles"}/>
                </div>}
        </div>
        <div className=' text-white my-2'>
        <Pager  number={index} array={Arrayp()} Right={Right} Move={Move} Left={Left} page={size}/>
        </div>
        </div>
        <Sidenav/>
        </div>

        </div>
    </div>
  )
}

export default page