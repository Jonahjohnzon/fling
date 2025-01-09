"use client"
import React,{useEffect, useState} from 'react'
import Forumbody from './Component.jsx/ForumBody';
import { loggeds } from '@/app/action';



const page = ({params}) => {
  const [thread, setthread]= useState([])
  let index = params.pageindex
  const [size, setsize] = useState(0)
  const [load, setload] = useState(true)
  const Api = process.env.NEXT_PUBLIC_DOMAIN

  const Get =async()=>{
    try{
    const data =await fetch(`${Api}/LatestThreads/${index}`)
    const info = await data.json()
    if(info?.auth)
    {
      setthread(info.data || [])
      setsize(info.size)
      loggeds.loading = false
      setload(false)
    }
    loggeds.loading = false
  }catch(e)
  {
    console.log(e)
  }

  }
  useEffect(()=>{
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
    Get()
  },[])
  return (
    <div className=' w-full flex justify-center min-h-[100vh] pb-20 pt-2 select-none'>
      <div className=' w-[95%] lg:w-[80%]'>
        <div className=' text-white sm:text-2xl '>
          <p>Latest threads</p>
        </div>
        <section className=' flex justify-between mt-5'>
          <Forumbody thread={thread} load={load} size={size} index={index}/>
        </section>

      </div>
    </div>
  )
}

export default page