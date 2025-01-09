"use client"
import React, { useEffect, useState,useRef } from 'react'
import { FaEnvelope } from "react-icons/fa6";
import { IoMdNotifications } from "react-icons/io";
import { MdOutlineKey } from "react-icons/md";
import { PiNotepadFill } from "react-icons/pi";
import { useRouter } from "next-nprogress-bar";
import { useSnapshot } from 'valtio';
import { loggeds } from './action';
import Imagesprofile from './Component/Tab/images';
import Notify from './Notify';
import Message from './Message';
import SearchBar from './Search';
import { Encode } from './Component/Tab/Encode';
import { IoMenu } from "react-icons/io5";




const TopNavbar = () => {
    const logged = useSnapshot(loggeds).value
    const profile = useSnapshot(loggeds).profile
    const route = useSnapshot(loggeds).route
    const [loading, setloading] = useState(false)
    const navigate = useRouter()
    const [name, setname] = useState("........")
    const [imgs, setimg] = useState("1")
    const [alarm, setalarm] = useState(false)
    const [id, setid] = useState("")
    const [shownot, setshownot] = useState(false)
    const [showmgs, setshowmgs] = useState(false)
    const [alert, setalert] = useState("")
    const notificationRef = useRef(null);
    const mgsRef = useRef(null);
    const [mes, setMes] = useState([])
    const [mgsalarm, setmgsalarm] = useState(false)
    const [logd, setlogd] = useState(false)
    const [nav, setNav] = useState(false);
    const Api = process.env.NEXT_PUBLIC_DOMAIN

    const Get=async()=>{
      try{
        const logg = localStorage.getItem("data");
        const logged = JSON.parse(logg);
        if(!logged){
            setlogd(false)
            setloading(true)
            loggeds.loading = false
            return;
        }
        const token = logged.token;
        const info = await fetch(
          `${Api}/notification/${logged._id}`,
          {
            method: "GET",
            headers: {
              "auth-token": token,
            },
          }
        );
        const data = await info.json();
          
        if(data.auth)
        {   
            const combinedProfile = { ...profile, ...data.profile };
            localStorage.setItem('profile', JSON.stringify(combinedProfile));
            loggeds.profile = {...profile, ...data.profile}
             setimg(data.data.profile_image)
             setname(data.data.user_name)
             setalarm(data.mgs.alarm)
             setid(data.profile._id)
             setalert(data.mgs.notify.reverse())
             setMes(data.profile.message)
             setmgsalarm(data.profile.message.alarm)
             loggeds.login = true
            loggeds.value = true
            setloading(true)
            setloading(true)
            setlogd(true)
        loggeds.loading = false
        }
        else{
          if(data?.ban )
          {
            localStorage.clear()
            navigate.push('/')
             return
          }
          else{
            localStorage.clear()
            navigate.push('/login')
             return
          }
        }
        setloading(true)
        loggeds.loading = false
        
      }
      catch(e)
      {
        setloading(true)
        loggeds.loading = false
        console.log(e)
      }
    }
    const Moveprofile = () =>{
      if(logd)
      {
        setNav(false)
        navigate.push(`/profile/${id}`)
      }
    }
    const handleClickOutside = (event) => {
        if (notificationRef.current && !notificationRef.current.contains(event.target)) {
          setshownot(false);
        }
      };

      const handleClickOutsideMgs = (event) => {
        if (mgsRef.current && !mgsRef.current.contains(event.target)) {
          setshowmgs(false);
        }
      };

      useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);
      useEffect(() => {
        document.addEventListener('mousedown', handleClickOutsideMgs);
        return () => {
          document.removeEventListener('mousedown', handleClickOutsideMgs);
        };
      }, []);
    useEffect(()=>{
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/outofsite/')) {
        Get();
      }
    },[typeof window !== 'undefined' && window.location.pathname])

    useEffect(() => {
      const updatePath = () => loggeds.route = window.location.pathname;
  
      updatePath(); // Set the initial path
  
      window.addEventListener('popstate', updatePath);
  
      return () => {
        window.removeEventListener('popstate', updatePath);
      };
    }, []);
    
    const handleSearch = async (searchTerm, searchOption) => {
      setNav(false)
      navigate.push(`/search/${Encode(searchTerm)}/${searchOption}/1`);
    };

  return (
    <nav className=' bg-topbg sticky  shadow-[0px_1px_1px_#000000] -top-20 z-50  select-none flex flex-col sm:items-center justify-center pt-5'>
        <div className=' w-[98%] sm:w-[95%] xl:w-[80%]'>
        <div className=' flex justify-start'>
            <div className='text-2xl sm:text-4xl text-white mb-6 pl-2 flex items-end'  onClick={()=>navigate.push(`/`)} ><span><img src='/fling.png' className=' w-20 sm:w-32'/></span></div>
        </div>
        <div className=' flex justify-between items-center'>
            <section>
                <ul className=' text-gray flex text-xs sm:text-sm items-center font-semibold h-14'>
                    <li className=" mr-5 h-full flex items-center bg-metal px-5 rounded-t-md text-blue">FORUM</li>
                </ul>
            </section>
            <section className='hidden lg:block'>
                {loading?
            <div className=' flex items-center text-gray '>
                {logged?<div className=' flex items-center cursor-pointer '>
                <div className=' w-8 h-8 mr-2 rounded-full overflow-hidden'  onClick={Moveprofile}><Imagesprofile src={imgs}/></div>
                <p  className=' mr-7 hover:underline'  onClick={Moveprofile}>{name}</p>
                <div className=' flex items-center  mr-10'>
                    <div className=' relative mr-4' ref={mgsRef}  ><FaEnvelope className=' text-sm ' onClick={()=>setshowmgs(!showmgs)}/>{mgsalarm&&<div className=' absolute h-2 w-2 bg-red bottom-0 -right-1 rounded-full' onClick={()=>setshowmgs(!showmgs)}></div>}{showmgs &&<div className=' w-80 z-30 h-60 bg-chatbg absolute top-5 right-0 border-white border-[1px] border-opacity-20 overflow-hidden rounded-md'>
                        <Message alert={mes.message.reverse()} setmgsalarm={setmgsalarm} mgsalarm={mgsalarm} setshowmgs={setshowmgs}  navigate={navigate} id={id} setshownot={setshownot}/>
                        </div>}</div>
                    <div className=' relative' ref={notificationRef} ><IoMdNotifications className=' text-lg' onClick={()=>setshownot(!shownot)}/>{alarm&&<div className=' absolute h-2 w-2 bg-red bottom-0 right-0 rounded-full' onClick={()=>setshownot(!shownot)}></div>}{shownot &&<div className=' w-80 z-30 h-60 bg-chatbg absolute top-5 border-white border-[1px] border-opacity-20 overflow-hidden rounded-md'>
                        <Notify alert={alert} setalarm={setalarm} id={id} alarm={alarm} setshowmgs={setshowmgs} setshownot={setshownot}/>
                        </div>}</div>
                </div>
                </div>:
                <div className=' flex items-center'>
                    <div className=' flex items-center mr-6 cursor-pointer hover:text-white'  onClick={()=>navigate.push(`/login`)}><MdOutlineKey className=' mr-1'/><p className=' text-sm font-semibold'>Log in</p></div>
                    <div className=' flex items-center mr-6 cursor-pointer hover:text-white' onClick={()=>navigate.push(`/register`)} ><PiNotepadFill className=' mr-1'/><p className=' text-sm font-semibold'>Register</p></div>
                    </div>}
                <div>
                <div>
      <SearchBar onSearch={handleSearch} />
    </div>
                </div>
                {logged&&<div className=' flex items-center mr-6 cursor-pointer hover:text-white'  onClick={()=>{
                     localStorage.clear();
                     window.location.reload();
                }}><MdOutlineKey className=' ml-4'/><p className=' text-sm font-semibold'>Log out</p></div>}
            </div>:<div></div>}
            
            </section>
            <section className=' lg:hidden relative '>
                <div>
                  <IoMenu className=' text-white text-2xl mr-5 cursor-pointer' onClick={()=>setNav(!nav)}/>
                </div>
                {nav&&<div className=' fixed py-5 top-0 left-0  bg-metal z-40 w-full border-b-[1px] border-white border-opacity-20' >
                {loading?
            <div className=' relative flex flex-col items-center text-gray '>
              <div className=''>
                  <IoMenu className=' absolute top-0 right-5 z-20 text-white text-2xl mr-5 cursor-pointer' onClick={()=>setNav(!nav)}/>
                </div>
                {logged?<div className=' flex flex-col mb-5 items-center cursor-pointer '>
                <div className=' w-8 h-8  rounded-full overflow-hidden'  onClick={Moveprofile}><Imagesprofile src={imgs}/></div>
                <p  className='  hover:underline mb-3 text-sm'  onClick={Moveprofile}>{name}</p>
                <div className=' flex items-center'>
                    <div className=' relative mr-4' ref={mgsRef}  ><FaEnvelope className=' text-sm ' onClick={()=>setshowmgs(!showmgs)}/>{mgsalarm&&<div className=' absolute h-2 w-2 z-30 bg-red bottom-0 -right-1 rounded-full' onClick={()=>setshowmgs(!showmgs)}></div>}{showmgs &&<div className=' w-full lg:w-80 z-30 h-60 bg-chatbg fixed left-0 lg:absolute top-0 lg:top-5 lg:right-0 border-white border-[1px] border-opacity-20 overflow-hidden rounded-md'>
                        <Message alert={mes.message.reverse()} setmgsalarm={setmgsalarm} setshowmgs={setshowmgs}  navigate={navigate} id={id} setshownot={setshownot}/>
                        </div>}</div>
                    <div className=' relative' ref={notificationRef} ><IoMdNotifications className=' text-lg' onClick={()=>setshownot(!shownot)}/>{alarm&&<div className=' absolute z-30 h-2 w-2 bg-red bottom-0 right-0 rounded-full' onClick={()=>setshownot(!shownot)}></div>}{shownot &&<div className=' w-full lg:w-80 z-30 h-60 bg-chatbg fixed left-0 lg:absolute top-0 lg:top-5 lg:left-0 border-white border-[1px] border-opacity-20 overflow-hidden rounded-md'>
                        <Notify alert={alert} setalarm={setalarm} id={id} setshowmgs={setshowmgs} setshownot={setshownot}/>
                        </div>}</div>
                </div>
                </div>:
                <div className=' flex items-center mb-5'>
                    <div className=' flex items-center mr-6 cursor-pointer hover:text-white'  onClick={()=>{
                      setNav(false)
                      navigate.push(`/login`)}}><MdOutlineKey className=' mr-1'/><p className=' text-sm font-semibold'>Log in</p></div>
                    <div className=' flex items-center mr-6 cursor-pointer hover:text-white' onClick={()=>{
                      setNav(false)
                      navigate.push(`/register`)}} ><PiNotepadFill className=' mr-1'/><p className=' text-sm font-semibold'>Register</p></div>
                    </div>}
                <div>
                <div className=' w-full mb-5'>
      <SearchBar onSearch={handleSearch} />
    </div>
                </div>
                {logged&&<div className=' flex items-center mr-6 cursor-pointer hover:text-white'  onClick={()=>{
                  setNav(false)
                     localStorage.clear();
                     window.location.reload();
                }}><MdOutlineKey className=' ml-4'/><p className=' text-sm font-semibold'>Log out</p></div>}
            </div>:<div></div>}
                </div>}
            </section>

        </div>
        </div>
        <div className=' w-full  bg-metal flex justify-center'>
                <ul className=' text-gray flex items-center text-[11px] justify-between sm:justify-start sm:text-xs font-medium py-3 px-3 sm:px-5 xl:w-[80%] w-full sm:w-[95%] '>
                    <li className={`   sm:mr-5 ${route == '/' ? "text-red font-bold":"text-gray"} cursor-pointer hover:text-white`}  onClick={()=>{
                      loggeds.route = '/'
                      navigate.push(`/`)}}>HOME PAGE</li>
                    {logd&&<li className={`    sm:mr-5  ${route == '/following/1' ? "text-red font-bold":"text-gray"} cursor-pointer hover:text-white`} onClick={()=>{
                      loggeds.route = '/following/1'
                      navigate.push(`/following/1`)}}>FOLLOWED THREAD</li>}
                    <li className={`   sm:mr-5  ${route == '/trending/1' ? "text-red font-bold":"text-gray"} cursor-pointer hover:text-white`} onClick={()=>{
                      loggeds.route = '/trending/1'
                      navigate.push(`/trending/1`)}}>TRENDING</li>
                    <li className={`  ${route == '/latestpost/1' ? "text-red font-bold":"text-gray"} cursor-pointer hover:text-white`} onClick={()=>{
                      loggeds.route = '/latestpost/1'
                      navigate.push(`/latestpost/1`)}} >LATEST</li>
                      
                </ul>
            </div>
    </nav>
  )
}

export default TopNavbar