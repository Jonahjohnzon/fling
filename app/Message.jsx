import React, { useEffect } from 'react'
import TimeAgo from 'timeago-react'

const Message = ({alert,mgsalarm, setmgsalarm, id, setshownot, navigate, setshowmgs}) => {
    const Api = process.env.NEXT_PUBLIC_DOMAIN
    const GET =async()=>{
        try{
            if(!mgsalarm)
            { return}
        const logg = localStorage.getItem("data");
        const logged = JSON.parse(logg);
        const token = logged.token;
        const data = await fetch(`${Api}/mgsalarm/${id}`,{
            method: 'GET',
            headers: {
                "auth-token": token,
              },
          })
          const result = await data.json()
          if(result?.login)
          {
            router.push('/')
          }
        }catch(e)
        {
            console.log(e)
        }
    }
    useEffect(()=>{
        setshownot(false)
        setmgsalarm(false)
        GET()
    },[])
  return (
    <div className=' p-2 h-full'>
    <h2 className=' text-white border-b-[1px] border-b-white border-opacity-10 font-semibold pb-2 mb-2'>Messages</h2>
    <div className=' overflow-y-scroll h-full pb-5 scrollbar-thumb-metal scrollbar-track-transparent scrollbar-thin'>
        {
            alert.map((data)=>{
                return(
                    <div key={data._id} className=' border-b-[1px] border-b-white border-opacity-10 pb-2 mb-2'>
                        <div>
                            <p className=' text-xs'>From <span className=' text-green font-semibold cursor-pointer hover:underline' onClick={()=>{
                                navigate.push(`/profile/${data.sender}`)
                                setshowmgs(false)
                            }}>{data.sendername}</span></p>
                            <p className=' text-xs sm:text-sm text-white  '>{data.text}</p></div>
                        <p className=' w-full'><TimeAgo datetime={data.date} live={false} className=' text-[9px] sm:text-[11px] '/></p>
                    </div>
                )
            })
        }
    </div>
</div>
  )
}

export default Message