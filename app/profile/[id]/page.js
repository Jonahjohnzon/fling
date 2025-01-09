"use client"
import Imagesprofile from '@/app/Component/Tab/images'
import Stars from '@/app/stars'
import React, { useEffect, useState } from 'react'
import Type from './type'
import { loggeds } from '@/app/action'
import Post from './Element/Post'
import Edit from './edit'
import Mgs from './Mgs'
import { useRouter } from 'next-nprogress-bar'
import Search from '@/app/search'
import Allowmgs from './Element/Allowmgs'
import Loadelement from '@/app/Loadelement'

const page = ({params}) => {
    const navigate = useRouter()
    const Api = process.env.NEXT_PUBLIC_DOMAIN
    const log = params?.id
    const [load,setload] = useState(true)
    const [datalist, setdatelist] = useState()
    const [selected, setSelected] = useState()
    const [suspend, setSuspend] = useState(false);
    const [ban, setBan] = useState(false);
    const ranking = [1,2,3,4,5,6,7]
    const [id, setid] = useState()
    const [allow, setallow] = useState(false)
    const [f, sf] = useState(false)
    const [f2, sf2] = useState(true)

const Gets = async()=>{
  try{
  const logg = localStorage.getItem("profile");
  if(!logg)
    {
      navigate.push('/')
      return
    }
  const user = JSON.parse(logg)
  const loggs = localStorage.getItem("data");
  if(!loggs)
    {
      navigate.push('/')
      return
    }
  const logged = JSON.parse(loggs);
  const token = logged.token;
if(user?.ban){
localStorage.clear()
navigate.push('/login')
return
  }

  const ids =  user?._id;
  setid(ids)
          const data = await fetch(`${Api}/getUser/${log}/${user._id}`,{
            method: 'GET',
            headers: {
              "auth-token": token,
            },
          })
        const result = await data.json()

        if(result.auth)
      {
        sf2(!result?.data?.allowmgs)
        if(result?.data?.blocked)
          {
            const isIncluded =  result?.data?.blocked?.some(f => f?.userid.includes(log));
            sf(isIncluded)
          }
       setdatelist(result.data)
       setSelected(result.data.profile_image)
       setSuspend(result.data.suspend);
       setBan(result.data.ban);
       if((user.admin || user.supermod) && ids != log)
       {
        setallow(true)
       }
       setload(false)
       loggeds.loading = false

      }
    else{
      navigate.push('/')
       return
    }
    }
        catch(e){
          console.log(e)
          return 
        }
    }

const handleUserAction = async (action, checked) => {
  try {
      loggeds.loading = true
      const logg = localStorage.getItem("data");
      const logged = await JSON.parse(logg);
      if(!logged){
          return;
      }
      if(log == logged._id)
      {
        return
      }
      const token = logged.token;
      
        const response = await fetch(`${Api}/userallow/${log}/${logged._id}`, {
          method: 'POST', // Assuming a POST request for actions like ban/suspend
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token,
          },
          body: JSON.stringify({ action, checked }),
        });
        const result = await response.json();
    
        if (result.auth) {
          window.location.reload()
          // Handle successful action (e.g., update UI, show notification, etc.)
        } else {
       
          // Handle action failure (e.g., show error message)
        }
      } catch (e) {
        console.error(e);
        // Handle error (e.g., show error message)
      }
    };
useEffect(()=>{
  window.scrollTo({
    top: 0,
    behavior: 'auto'
  });
Gets()
},[])
  return (
    <div className='w-full'>
      {
        load?<div className=' h-[95vh] w-full'>
          <div className=' w-full h-full flex justify-center items-start '>
                    <Loadelement type={"bubbles"}/>
                </div>
        </div>:
        <div className=''>
          <div className=' relative z-30 w-full flex justify-center pt-10'>
          <div className=' w-[95%] lg:w-[70%]'>
            <div className='w-full flex  justify-center items-center pb-10'><div className=' w-20 h-20 sm:w-28  sm:h-28 overflow-hidden rounded-full  border-black border-[1px]'><Imagesprofile src={datalist.profile_image}/></div><div className=' flex  flex-col items-center ml-5'><p className=' text-white text-center font-bold text-xl'>{datalist.user_name}</p><div className=' flex justify-between text-xs sm:text-base '><Stars no={datalist.rank}/><Stars no={datalist.rank}/><Stars no={datalist.rank}/><Stars no={datalist.rank}/></div><div className='mt-2 '><Type no={datalist.rank}/></div></div></div>
            {allow&&<div className=' flex items-center mb-5'>
              <label className='cursor-pointer text-sm sm:text-base  text-white flex items-center'>
                <input
                  type='checkbox'
                  className=' mr-1'
                  checked={suspend}
                  onChange={(e) => {
                    setSuspend(e.target.checked);
                    handleUserAction('suspend', e.target.checked);
                  }}
                />
                Suspend
              </label>
              <label className='cursor-pointer text-sm sm:text-base ml-4 text-white flex items-center'>
                <input
                  type='checkbox'
                  className=' mr-1'
                  checked={ban}
                  onChange={(e) => {
                    setBan(e.target.checked);
                    handleUserAction('ban', e.target.checked);
                  }}
                />
                Ban
              </label>
            </div>}
            <section className=' w-full mb-2 flex sm:flex-row flex-col justify-between sm:items-center'>
                <div className=' flex items-center mb-3 sm:mb-0 w-full text-sm sm:text-base  sm:font-semibold  text-white'>
                  <h1 className=' pb-3 mr-10 cursor-pointer border-b-2 border-b-green text-green '>Profile posts</h1>
                  <h1 className='pb-3 cursor-pointer'>Medals</h1>
                </div>
                <div>
                  <Search id={log}/>
                </div>
              </section>
              <section className=' w-full h-80 bg-topbg rounded-md shadow-md mb-5 overflow-y-scroll scrollbar-thumb-metal scrollbar-track-transparent scrollbar-thin'>
                    <div className=' w-full h-full flex justify-center items-center'>
                      <Post log={log}/>
                    </div>
              </section>
             {id == log ? <section className=' w-full  bg-topbg rounded-md p-5 shadow-md mb-5'>
                <div>
                  <div>
                  <div className=' mb-10 flex flex-col items-start'>
                    <p className=' text-white mb-3 text-sm sm:text-base font-semibold'>Stop all incoming messages</p>
                    <Allowmgs f={f2} sf={sf2} pid={log}/>
                 </div>
                    <Edit datalist={datalist} selected={selected} setSelected={setSelected} params={params} setload={setload}/>
                  </div>
                </div>
              </section>:
              <section className='w-full  bg-topbg rounded-md p-5 shadow-md mb-5'>
                <Mgs log={log}  sender={id} f={f} sf={sf}  f2={f2} sf2={sf2}/>
                </section>}
            <div className=' border-gray mb-20 bg-topbg rounded-md shadow-md  border-[1px] p-5 border-opacity-10'>         
              <section>
              <h1 className=' font-semibold  mb-10 text-white'>Rating:</h1>
              <div className=' flex flex-wrap  justify-between sm:justify-center '>{
                  ranking.map((e,w)=>{
                    return(<div key={w}>
                      <div className=' sm:mr-14  mb-10 cursor-pointer  group '><Type no={e}/></div>
                    </div>)
                  })}</div>
              </section>
            </div>
            </div>
          </div>
        </div>
      }
    </div>
  )
}

export default page