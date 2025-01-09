import React from 'react'
import ForumTab from './forumTab'
import { useRouter } from "next-nprogress-bar";

import Pager from './pager'

const Forumbody = ({str, thread, size, index, setid, setedit, mod, profi,settitle,setimage,setstick, type, setcategory, setreplyallow}) => {
    const navigate = useRouter()
    const Left =()=>{
            const postInt = parseInt(index, 10); 
            const route =`/thread/${str}/${postInt - 1}/${type}`
             navigate.push(route)
    }
    const Right =()=>{
            const postInt = parseInt(index, 10); 
            const route =`/thread/${str}/${postInt + 1}/${type}`
             navigate.push(route)
    }
  
    const Move =(e)=>{ 
            const route =`/thread/${str}/${e}/${type}`
             navigate.push(route)
    }
    const Arrayp =()=>{
        const array = [];
        for (let i = 1; i <= size; i++) {
          array.push(i);
        }
      
        return array;
    }

    const handleSelectChange = (event) => {
        const value = event.target.value;
        let route = '';
    
        switch (value) {
          case 'latest':
            route = `/thread/${str}/1/latest`;
            break;
          case 'toppost':
            route = `/thread/${str}/1/toppost`;
            break;
          case 'mostview':
            route = `/thread/${str}/1/mostview`;
            break;
          case 'recent':
            route = `/thread/${str}/1/recent`;
            break;
          default:
            return;
        }
    
        navigate.push(route);
    }
  return (
    <div className=' w-full min-h-[90vh] lg:min-h-fit xl:w-[70%] mb-5 sm:mb-0  3xl:w-[79%] text-white text-sm '>
        <section className=' mb-3'>
            <Pager number={index} array={Arrayp()}  Move={Move} Right={Right} Left={Left} page={size}/>
        </section>
        <section className=' w-full bg-metal rounded-sm'>
            <div  className=' py-3 flex border-y-[1px] border-y-white border-opacity-15 justify-end px-2'>
            <select
      className="text-[#6E94C0] text-xs w-28 sm:text-sm outline-none cursor-pointer bg-transparent rounded-sm px-2 py-1 hover:bg-opacity-5 hover:bg-white"
      onChange={handleSelectChange}
      defaultValue={type}
    >
      <option value="" disabled className="text-[#6E94C0] py-2 bg-metal">
        Sort by / Filter
      </option>
      <option value="latest" className="text-[#6E94C0] py-2 bg-metal">
        Latest Post
      </option>
      <option value="toppost" className="text-[#6E94C0] py-2 bg-metal">
        Top Post
      </option>
      <option value="mostview" className="text-[#6E94C0] py-2 bg-metal">
        Most-Viewed Post
      </option>
      <option value="recent" className="text-[#6E94C0] py-2 bg-metal">
        Recently Active
      </option>
    </select>
            </div>
            {index == '1'&&<div>
                <div className=' py-3 px-2 border-b-[1px] bg-textbg border-b-white border-opacity-10'>
                    <p className=' text-xs lg:text-sm font-semibold'>STICKY THREADS</p>
                </div>
                <div>
                    {thread.map((e, i)=>{
                       
                        return(
                            <div key={i}>
                           { e.sticky &&<div key={e._id}><ForumTab data={e} setedit={setedit} setid={setid} keys={e._id}  name={e.category} mod={mod} profi={profi} settitle={settitle} setimage={setimage} setstick={setstick} setreplyallow={setreplyallow} setcategory={setcategory}/></div>}
                            </div>
                        )
                    })}
                </div>
            </div>}
            <div>
                <div className=' py-3 px-2 border-b-[1px] border-b-white bg-textbg border-opacity-10'>
                    <p className=' text-xs lg:text-sm font-semibold'>NORMAL THREADS</p>
                </div>
                <div>
                    {thread.map((e, i)=>{
                       
                        return(
                            <div key={i}>
                           { e.sticky ||
                            <div key={e._id}><ForumTab data={e} keys={e._id} setedit={setedit} setid={setid}  name={e.category} mod={mod} profi={profi} settitle={settitle} setimage={setimage} setstick={setstick} setreplyallow={setreplyallow} setcategory={setcategory}/></div>}
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
        <section className=' mt-3'>
        <Pager number={index} array={Arrayp()} Right={Right} Move={Move} Left={Left} page={size}/>
        </section>
    </div>
  )
}

export default Forumbody