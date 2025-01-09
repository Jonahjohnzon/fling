import React, { useEffect } from 'react'
import TimeAgo from 'timeago-react'
import { useRouter } from "next-nprogress-bar";


const Notify = ({alert, setalarm, id, setshowmgs, setshownot, alarm}) => {
    const navigate = useRouter()
    const Api = process.env.NEXT_PUBLIC_DOMAIN
    const GET =async()=>{
        try{
            if(!alarm)
            {
                return
            }
        const logg = localStorage.getItem("data");
        const logged = JSON.parse(logg);
        if(!logged){

            return;
        }
        const token = logged.token;
        const data = await fetch(`${Api}/notify/${id}`,{
            method: 'GET',
            headers: {
                "auth-token": token,
              },
          })
          const result = await data.json()
          if(result?.login)
          {
            navigate.push('/')
          }}
          catch(e)
          {
            console.log(e)
          }
    }
    useEffect(()=>{
        setshowmgs(false)
        setalarm(false)
        GET()
        
    },[])
  return (
    <div className=' p-2 h-full'>
        <h2 className=' text-white border-b-[1px] border-b-white border-opacity-10 font-semibold pb-2 mb-2'>Alerts</h2>
        <div className=' overflow-y-scroll h-full pb-5 scrollbar-thumb-metal scrollbar-track-transparent scrollbar-thin'>
            {
                alert.map((data)=>{
                    return(
                        <div key={data._id} className=' border-b-[1px] border-b-white border-opacity-10 pb-2 mb-2' onClick={()=>{

                            if(data?.url)
                            {
                            navigate.push(data?.url)
                            }
                            setshownot(false)
                        }}>
                            <p className=' text-sm sm:font-semibold  mb-1 text-green'>{data.title}</p>
                            <p className=' text-xs sm:text-sm text-white  mb-1'>{data.message}</p>
                            <p className=' w-full'><TimeAgo datetime={data.data} className=' text-xs ' live={false}/></p>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Notify