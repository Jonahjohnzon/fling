import React from 'react'
import ForumTab from '@/app/thread/[title]/[pageindex]/[type]/Component/forumTab';
import { useRouter } from "next-nprogress-bar";
import Pager from '@/app/thread/[title]/[pageindex]/[type]/Component/pager';
import { FaHome, FaAngleRight } from "react-icons/fa";
import Loadelement from '@/app/Loadelement';

const Forumbody = ({thread, size, index,load}) => {
    const navigate = useRouter()
    const Left =()=>{
            const postInt = parseInt(index, 10); 
            const route =`/latestpost/${postInt - 1}`
             navigate.push(route)
    }
    const Right =()=>{
            const postInt = parseInt(index, 10); 
            const route =`/latestpost/${postInt + 1}`
             navigate.push(route)
    }
  
    const Move =(e)=>{
            const route =`/latestpost/${e}`
             navigate.push(route)
    }
    const Arrayp =()=>{
        const array = [];
        for (let i = 1; i <= size; i++) {
          array.push(i);
        }
      
        return array;
    }
  return (
    <div className=' w-[100%] text-white text-sm '>
    <div className=' flex items-center text-gray'>
            <FaHome className=' mr-3 text-xs lg:text-sm cursor-pointer hover:text-white' onClick={()=>navigate.push('/')}/>
            <FaAngleRight className=' mr-3 text-xs'/>
            <p  className=' text-xs lg:text-sm font-medium hover:underline cursor-pointer text-white'>LatestPost</p>
          </div>
        <section className=' mb-3'>
            <Pager number={index}  Move={Move}  array={Arrayp()} Right={Right} Left={Left} page={size}/>
        </section>
        <section className=' w-full bg-metal rounded-sm'>
            <div>
                <div className=' py-3 px-2 border-b-[1px] bg-textbg border-b-white border-opacity-10'>
                    <p className=' sm:text-base text-sm font-semibold'>LATEST THREADS</p>
                </div>
            </div>
            <div>
                <div className=' py-3 px-2 border-b-[1px] border-b-white bg-textbg border-opacity-10'>
                </div>
                {load?<div className=' w-full min-h-[70vh] flex justify-center items-start '>
                    <Loadelement type={"bubbles"}/>
                </div>:
                <div  className=' min-h-[70vh]'>
                    {thread.map((e, i)=>{
                       
                        return(
                            <div key={e._id}>
                           { e.sticky ||
                            <div ><ForumTab data={e} keys={e._id}  name={e.category} show /></div>}
                            </div>
                        )
                    })}
                </div>}
            </div>
        </section>
        <section className=' mt-3'>
        <Pager number={index} array={Arrayp()} Right={Right} Move={Move} Left={Left} page={size}/>
        </section>
    </div>
  )
}

export default Forumbody