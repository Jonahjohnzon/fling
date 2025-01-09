import React, { useEffect, useState } from 'react'
import TimeAgo from 'timeago-react'
import { Encode } from '@/app/Component/Tab/Encode'
import { useRouter } from "next-nprogress-bar";
import Loadelement from '@/app/Loadelement';
import ProfileImage from '@/app/thread/[title]/[pageindex]/[type]/Component/Profileimmg';

const Post = ({log}) => {
  const [Data, setData] = useState("")
  const [load, setload] = useState(false)
  const navigate = useRouter()
  const Api = process.env.NEXT_PUBLIC_DOMAIN

    const Get =async()=>{
      try{
      const logg = localStorage.getItem("data");
      const logged = JSON.parse(logg);
      if(!logged)
      {
        navigate.push('/')
      }
      const token = logged.token;
        const data = await fetch(`${Api}/getPost/${log}`,{
            method: 'GET',
            headers: {
              "auth-token": token,
            },
          })
          const post = await data.json()
        setData(post.post)
        setload(true)}
        catch(e)
        {
          console.log(e)
        }
    }
    useEffect(()=>{
      Get()
    },[])
  return (
   <>
   {
   load?<div className=' w-full h-full'>
      {Data.map((data)=>{
        const urlname = Encode(data.category)
        const urltitle = Encode(data.title)
        return(
          <div className={`border-b-[1px] w-full border-b-white cursor-pointer border-opacity-35  px-3  flex  text-sm `} onClick={()=>navigate.push(`/${urlname}/${urltitle}/${data._id}/1#post-1`)} key={data._id}>
          <div className=' flex items-start py-3 sm:w-[70%]'>
              <section className=' mr-2'>
                <ProfileImage imageUrl={data.image} altText={"img"} defaultImageUrl={"https://cdn.pixabay.com/photo/2014/05/27/23/32/matrix-356024_640.jpg"}/>
              </section>
              <section>
                <div className=' flex text-xs w-full flex-col sm:flex-row sm:font-semibold items-start sm:items-center mb-2 pr-3 text-white'><div className='py-1 px-2 mr-2 bg-blue text-xs font-semibold h-fit whitespace-nowrap rounded-sm sm:rounded-md'>{data.category}</div><p className=' w-full'>{data.title}</p></div>
                <div className=' text-gray flex  items-center text-xs'><div className=' mr-2 '>{data?.author?.user_name}</div>-<p className=' ml-2 text-gray'><TimeAgo datetime={data.createdAt} live={false}/></p></div>
              </section>
          </div>
        </div>
        )
      })}
    </div>:<div className=' w-full h-full flex justify-center items-center '>
                    <Loadelement type={"bubbles"}/>
                </div>}
    </> 
  )
}

export default Post