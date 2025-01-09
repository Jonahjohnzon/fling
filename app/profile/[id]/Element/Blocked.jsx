import React, { useState } from 'react'

const Blocked = ({pid,f,sf}) => {
  const Api = process.env.NEXT_PUBLIC_DOMAIN
  const [load, setload] = useState(false)
  const Post = async()=>{
    
    setload(true)
    const logg = localStorage.getItem("data");
    const logged = JSON.parse(logg);
    if(!logged){
      return;
  }
  const token = logged.token;
  try{
    if(pid == logged._id)
    {
        return
    }
    const datainfo = await fetch(
      `${Api}/PushBlock/${logged._id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json",  "auth-token": token, },
        body: JSON.stringify({blockid:pid}),
      }
    );
    const info = await datainfo.json();
    if(info?.auth)
    {
      sf(!f)
      setload(false)
    }}
    catch(e)
    {
      console.log(e)
    }
  }
  return (
    <div>{load?<div className='rounded-md hover:shadow-none whitespace-nowrap cursor-pointer font-semibold bg-green shadow-md px-8 py-2 '><div className=" w-5 h-5 rounded-full border-[1px] border-blacke border-b-0 animate-spin"></div></div>:<button className={` ${f?"bg-red":"bg-green"}   px-6 py-1 mr-2 text-xs sm:text-base whitespace-nowrap text-blacke rounded-sm shadow-sm`} onClick={()=>{
      Post()
    }}>{f?"Blocked":"Block"}</button>}</div>
  )
}

export default Blocked