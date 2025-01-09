"use client"
import React,{useEffect, useState} from 'react'
import { FaPen } from "react-icons/fa";
import { Main } from '@/app/Data';
import { FaHome, FaAngleRight,FaExclamationCircle, } from "react-icons/fa";
import Forumbody from './Component/Forumbody';
import Sidenav from '@/app/Component/Category/Sidenav';
import { useRouter } from 'next-nprogress-bar';
import { loggeds } from '@/app/action';
import { Decode } from '@/app/Component/Tab/Encode';
import Loadelement from '@/app/Loadelement';

const Body = ({params}) => {
  const [profi, setProfi] = useState()
  const navigate = useRouter()
  const [mod, setmod] = useState(false)
  const [thread, setthread]= useState([])
  let str = params.title
  let index = params.pageindex
  let type = params.type
  const [size, setsize] = useState(0)
  const [id, setid] = useState()
  let space = Decode(str)
  let Url = Decode(space);
  const [load, setload] = useState(false)
  const Api = process.env.NEXT_PUBLIC_DOMAIN

  let about = Main.flatMap(item =>
    item.categories.filter(cat => cat.direction === Url).map(cat => cat.about)
  );

  const Get =async()=>{
    try{
    const storedProfile = localStorage.getItem('profile');
    const prof = JSON.parse(storedProfile);
    if(prof)
      {
        setProfi(prof)
      }
    const data =await fetch(`${Api}/getthreads/${Url}/${index}/${type}`)
    const info = await data.json()
    if(info?.auth)
    {
      setthread(info.data)
      setsize(info.size)
      loggeds.loading = false
    }
    if (prof?.mod?.category == space ) {
      setmod(true)
    } else if (prof?.supermod) {
      setmod(true)
    } else if (prof?.admin) {
      setmod(true)
    } else {
      setmod(false)
    }
    setload(true)
  }
  catch(e){
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
    <div className=' min-h-[100vh]'>
    {load ?<div className=' overflow-x-hidden   flex justify-center pb-20 pt-2 select-none'>
      <div className=' w-[95%] 2xl:w-[93%] 3xl:w-[80%]'>
        <section className=' flex sm:flex-row flex-col mb-7 justify-between items-start sm:items-center' >
          <div className=' flex flex-col justify-between mb-2 sm:mb-0'>
            <h1  className=' text-white mb-1 sm:font-semibold lg:text-2xl'>{Url}</h1>
            <p className=' text-gray text-xs lg:text-sm '>{about[0]}</p>
            </div>
           { (profi && (space != "Forum Guides & Updates" || mod)) &&<div>
              <div className=' bg-[#67d12a] px-3 py-2 text-sm whitespace-nowrap lg:text-base  text-blacke flex items-center font-semibold rounded-sm cursor-pointer' onClick={()=>{navigate.push(`/post/${str}`)}}><div className=' mr-2'><FaPen/></div><p>Create thread</p></div>
            </div>}
        </section>
        <div className="  relative text-white border-2 overflow-y-hidden mb-5 rounded-sm border-blue bg-textbg flex items-center">
              <div className=" w-[3%]  absolute left-0 h-full  flex items-center justify-center bg-blue">
                <FaExclamationCircle />
              </div>
              <div className=" pl-[5%] py-3 text-[12px] sm:text-base ">
                <p>Forum Rules are usually found on the sticky thread </p>
              </div>
            </div>
        <section>
          <div className=' flex items-center text-gray'>
            <FaHome className=' mr-3 text-xs lg:text-sm cursor-pointer hover:text-white' onClick={()=>navigate.push('/')}/>
            <FaAngleRight className=' mr-3 text-xs'/>
            <p  className=' text-xs lg:text-sm font-medium hover:underline cursor-pointer text-white'>{Url}</p>
          </div>
        </section>
        <section className=' flex xl:flex-row flex-col items-center xl:items-start justify-between mt-5'>
          <Forumbody Url={Url}  thread={thread}  setid={setid} size={size} str={str} index={index} profi={profi} mod={mod}  type={type}/>
          <Sidenav forum={space}/>
        </section>
        <section>
          <div className=' flex items-center text-gray'>
            <FaHome className=' mr-3 text-xs lg:text-sm  cursor-pointer hover:text-white'/>
            <FaAngleRight className=' mr-3 text-xs'/>
            <p  className=' text-xs lg:text-sm sm:font-medium hover:underline cursor-pointer text-gray'>{Url}</p>
          </div>
        </section>
      </div>
    </div>
    :
    <div className=' w-full h-full flex justify-center items-center '>
      <Loadelement type={"bubbles"}/>
    </div>}</div>
  )
}

export default Body