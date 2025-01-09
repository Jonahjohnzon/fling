import React, { useState } from 'react'

const Following = ({url,pid, title, category, postid, f, sf}) => {
  const [load, setload] = useState(false)
  const Api = process.env.NEXT_PUBLIC_DOMAIN
  const Post = async()=>{
    const datas ={
      url,
      title,
      category,
      postid
    }
    setload(true)
    const logg = localStorage.getItem("data");
    const logged = JSON.parse(logg);
    if(!logged){
      return;
  }
  const token = logged.token;
  try{
    const datainfo = await fetch(
      `${Api}/PushFollow/${pid}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json",  "auth-token": token, },
        body: JSON.stringify(datas),
      }
    );
    const info = await datainfo.json();
    if(info.auth)
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
    <div>{load?<div className='rounded-md hover:shadow-none whitespace-nowrap cursor-pointer  bg-green shadow-sm px-8 py-2 '><div className=" w-5 h-5 rounded-full border-[1px] border-blacke border-b-0 animate-spin"></div></div>:<button className={` ${f?"bg-blue":"bg-green"}  px-3 py-2 mr-2 text-xs sm:text-base whitespace-nowrap rounded-sm text-blacke shadow-lg`} onClick={()=>{
      Post()
    }}>{f?"Following":"Follow"}</button>}</div>
  )
}

export default Following