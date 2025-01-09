import React, { useState } from 'react'

const Allowmgs = ({f,sf}) => {
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
    const datainfo = await fetch(
      `${Api}/updatemgs/${logged._id}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json",  "auth-token": token, },
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
    <div>{load?<div className='rounded-sm hover:shadow-none whitespace-nowrap cursor-pointer font-semibold bg-green shadow-md px-8 py-2 '><div className=" w-5 h-5 rounded-full border-2 border-white border-b-0 animate-spin"></div></div>:<button className={` ${f?"bg-red":"bg-green"}   px-6 py-1 mr-2 text-xs sm:text-base whitespace-nowrap rounded-sm shadow-sm`} onClick={()=>{
      Post()
    }}>{f?"Allow Messages":"Stop Messages"}</button>}</div>
  )
}

export default Allowmgs