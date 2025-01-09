import React, { useEffect, useState } from 'react'
import { BsPeopleFill } from "react-icons/bs";
import Imagesprofile from '../Tab/images';
import { FaCheck } from "react-icons/fa";
import { IoIosChatboxes } from "react-icons/io";
import { useRouter } from "next-nprogress-bar";
import TimeAgo from 'timeago-react';
import { Encode } from '../Tab/Encode';
import { loggeds } from '@/app/action';
import { useSnapshot } from 'valtio';

const Sidenav = ({forum}) => {
    const Api = process.env.NEXT_PUBLIC_DOMAIN
    const login =  useSnapshot(loggeds).login
    const navigate = useRouter()
    const [Admin, setAdmin] = useState([])
    const [Mod, setMod] = useState([]) 
    const [Latest, setLatest] = useState([])
    const [allow, setallow] = useState(false)
    const  getfile= async() =>{
        try{
        const logg = localStorage.getItem("profile");
        const user = JSON.parse(logg)
        if(!user)
        {setallow(false)}
        else{
        setallow(true)
        }
        const data = await fetch(`${Api}/getAdmin?cate=${forum}`,{
            method:'GET',
            headers:{'Content-Type': 'application/json'},
    })

    const info = await data.json()
    setAdmin(info.Admin)
    setMod(info.Mod)
    setLatest(info.Latestpost)
    loggeds.loading = false
}
catch(e)
{
    console.log(e)
}    
}

const getBgClass = (category) => {
    switch (category?.toLowerCase()) {
      case 'self promotion':
        return 'bg-red';
      case 'web development':
        return 'bg-green';
      case 'mobile development':
        return 'bg-midnight';
      case 'software development':
            return 'bg-tahiti';
      case 'game development':
            return 'bg-red';
      case 'cybersecurity':
            return 'bg-purple';
      case 'requests':
            return 'bg-purple';
      case 'computers':
            return 'bg-green';
      case 'it':
            return 'bg-red';
      case 'freelance support':
            return 'bg-tahiti';
      case 'beermoney':
            return 'bg-red';
      case 'site flipping & sales':
            return 'bg-purple';
      case 'tools sales':
            return 'bg-purple';
      case 'computers':
            return 'bg-green';
      case 'api sales':
            return 'bg-red';
      case 'others':
            return 'bg-green';
      case 'report issues':
            return 'bg-red';
      default:
        return 'bg-blue'; // Default background color if none match
    }
  };

useEffect(()=>{
    getfile()
},[])
  return (
    <div className=' w-full xl:w-[300px] lg:sticky lg:top-24  sm:text-base text-sm   h-fit' data-nosnippet>

    <div className=' w-full min-h-28 pt-2 px-2   mb-5 shadow-[0px_2px_2px_#000000] bg-textbg rounded-md overflow-hidden'>
        <div className=' text-white flex items-center pb-2 mb-3 border-b-[1px] border-b-gray border-opacity-40'><div className=' mr-2'><BsPeopleFill className=' text-gray' /></div><p>Admin</p></div>
        <div>
            {Admin?.map((e,i)=>{
                return(
                    <div className=' text-sm flex items-center mb-3  cursor-pointer' key={e?._id} onClick={()=>{
                        if(allow || login)
                        {
                        navigate.push(`/profile/${e._id}`)
                        }
                        else{
                            navigate.push('/login') 
                        }
                    }}>
                        <div className=' w-9 h-9 mr-3 overflow-hidden rounded-full border-gray border-[1px]'>
                            <Imagesprofile src={e?.profile_image}/>
                        </div>
                        <div>
                        <div className=' flex items-center'>
                        <p className=' text-red mr-1 font-semibold'>{e?.user_name}</p>
                        {e.top &&<p className=' w-4 h-4 rounded-full flex items-center justify-center bg-[#4449FA]'>
                        <FaCheck  className='  text-gray text-xs'/>
                        </p>}
                        </div>
                        <p className=' text-gray text-xs'>Lead Admin</p>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>

    {Mod.length != 0 &&<div className=' w-full min-h-32  p-2 pb-4  mb-5 shadow-[0px_2px_2px_#000000] bg-textbg rounded-md overflow-hidden'>
        <div className=' text-white flex items-center pb-2 mb-5 border-b-[1px] border-b-gray border-opacity-40'><div className=' mr-2'><BsPeopleFill className=' text-gray' /></div><p>Mods</p></div>
        <div>
            {Mod?.map((e,i)=>{
                return(
                    <div className=' text-sm flex items-center mb-4  cursor-pointer' key={e._id} onClick={()=>{
                        if(allow || login)
                        {
                        navigate.push(`/profile/${e._id}`)
                        }
                        else{
                            navigate.push('/login') 
                        }
                    }}>
                        <div className=' w-9 h-9 mr-3 overflow-hidden rounded-full border-gray border-[1px]'>
                            <Imagesprofile src={e.profile_image}/>
                        </div>
                        <div>
                        <div className=' flex items-center'>
                        <p className=' text-red mr-1 font-semibold'>{e.user_name}</p>
                        {e.top &&<p className=' w-4 h-4 rounded-full flex items-center justify-center bg-[#4449FA]'>
                        <FaCheck  className='  text-gray text-xs'/>
                        </p>}
                        </div>
                        <p className=' text-gray text-xs'>Mod</p>
                        </div>
                    </div>
                )
            })}
        </div>
    </div>}
    <div className=' w-full p-2 pb-1 min-h-[510px]  mb-10 shadow-[0px_2px_2px_#000000] bg-textbg rounded-md overflow-hidden'>
            <div className=' flex items-center  pb-1 mb-4 border-b-[1px] border-b-gray border-opacity-40'><div className=' mr-2 text-gray'><IoIosChatboxes/></div><p className=' text-white'>Latest Posts</p></div>
            <div>
                {
                    Latest?.map((data)=>{
                        const dat = data
                        const thread = Encode(dat?.postid?.category)
                        const forum = Encode(dat?.postid?.title)
                        const Page = Math.ceil(parseInt(dat?.sequence, 10) / 15) 
                        return(
                            <div key={data?._id} className=' flex mb-4' data-nosnippet>
                                <div className=' mr-2' data-nosnippet> 
                                    <div className=' w-10 h-10 overflow-hidden rounded-full  border-gray border-[1px] cursor-pointer'  onClick={()=>{
                                        if(allow || login)
                                        {
                                         navigate.push(`/profile/${dat?.author?._id}`)
                                        }
                                        else{
                                            navigate.push('/login') 
                                        }
                    }} data-nosnippet><Imagesprofile src={dat?.author?.profile_image}/></div>
                                </div>
                                <div className=' w-full'>
                                <div className=' flex flex-col items-start w-full '>
                                        <h6  className={`text-white whitespace-nowrap text-[11px] font-semibold cursor-pointer px-1 py-[1px] rounded-sm mr-2 ${getBgClass(dat?.postid?.category)}`} onClick={()=>{
                        navigate.push(`/thread/${thread}/1/latest`)
                    }} data-nosnippet>{dat?.postid?.category}</h6>
                                             <h6 className=' text-white text-xs sm:text-[14px]  mb-[1px] cursor-pointer hover:underline' onClick={()=>{
                        navigate.push(`/${thread}/${forum}/${dat.postid._id}/${Page}#post-${dat?.sequence}`)
                    }} data-nosnippet >{dat?.postid?.title}</h6>
                                </div>
                                <div>
                                    <div className=' flex items-center text-xs text-gray'><p data-nosnippet>{`Latest`}</p> <span className=' mr-1'>:</span><p className='cursor-pointer hover:underline'  onClick={()=>{
                                        if(allow || login)
                                        {
                        navigate.push(`/profile/${dat?.author?._id}`)
                                        }
                                        else{
                                            navigate.push('/login') 
                                        }
                    }} data-nosnippet>{dat?.author?.user_name}</p> <span className=' mr-1'>:</span> <TimeAgo datetime={dat?.createdAt} className=' text-white' live={false}/></div>
                                </div>
                                
                                </div>
                            </div>
                        )
                    })
                }
            </div>
    </div>
</div>
  )
}

export default Sidenav