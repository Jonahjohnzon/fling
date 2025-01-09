"use client"
import React, { useEffect, useState } from 'react'
import { loggeds } from '@/app/action'
import { useRouter } from 'next-nprogress-bar'

const page = ({params}) => {
    const token = params.token
    const [load, setload] = useState(true)
    const [msg, setmsg] = useState("")
    const navigate = useRouter()
    const Api = process.env.NEXT_PUBLIC_DOMAIN
   
    const First =async()=>{
      try{
      const url = `${Api}/emailverify/${token}`
      const data = await fetch(url)
      const info = await data.json()
      setmsg(info.mgs)
      setload(false)
      loggeds.loading = false
      }
    catch(e){
      console.log(e)
    }}
    
  useEffect(()=>{
First()
  },[])  
  return (
    <div>{load?<div></div>:<div className=' h-[75vh] bg-bg w-full flex  flex-col justify-center items-center'>
     <div className='px-10 py-4 bg-chatbg flex flex-col items-center justify-center'>
      <div className=' mb-10 font-bold text-white '>{msg}</div>
      <div className=' text-white px-3 py-1 bg-blue cursor-pointer' onClick={()=>navigate.push('/')}><p>GO HOME AND LOGIN</p></div>
      </div>
      </div>}</div>
  )
}

export default page