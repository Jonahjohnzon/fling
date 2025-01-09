import React, { useState } from "react";
import { IoSearch } from "react-icons/io5";
import * as yup from "yup";
import { useRouter } from "next-nprogress-bar";
import { Encode } from "./Component/Tab/Encode"; 
const Search = ({id}) => {
    const router = useRouter();
    const [load, setload] = useState(false)
    const [result, setresult] = useState([])
    const [show, setshow] = useState(false)
    const Api = process.env.NEXT_PUBLIC_DOMAIN

    const handleChange =async (e) => {

        try {
            await yup.string().trim().required().validate(e);
          } catch (validationError) {
            if (e.trim() === "") {
                setresult([]);
                setshow(false)
                return;
              }
              setshow(false)
            return;
          }

          if (e.trim() === "") {
            setresult([]);
            setshow(false)
            return;
          }

        setshow(true)
        setload(true)
        const data = await fetch(`${Api}/homesearch/${id}?search=${e}`,{
            method: 'GET',
    })

          const answer = await data.json()
          if(answer?.auth)
          {

            if(answer.data.length > 0)
            {
            setresult(answer.data)
            setload(false)
            }
            else{
            setresult([{title:'Post Not Found', _id:'0'}])
            setload(false) 
            }
          }
          else{
          console.log(answer)
          }
    };
  
    const handleroute =(e)=>{
        if(e._id == '0')
        {
            return
        }
        else{
          const urlname = Encode(e.category)
          const urltitle = Encode(e.title)
            router.push(`/${urlname}/${urltitle}/${e._id}/1#post-1`)
        }
    }
  
    return (
  
            <div className="w-full sm:w-96 mb-4 flex items-center relative">
              <input
                type="text"
                onChange={(e) => handleChange(e.target.value)}
                placeholder="Search..."
                className="bg-[#383B42] h-9 w-full outline-none text-white px-4 placeholder:text-sm rounded-l-md"
              />
              <div
                className="flex justify-center relative z-30 items-center h-9  text-white px-3 text-2xl bg-[#383B42] "
                
              >
                <IoSearch />
              </div>
              {show &&<div className=" absolute top-14 z-30 w-full h-[165px]  ">
                
                {load?
                    <div className=' w-full h-full  flex justify-center bg-[#383B42]   items-center'>
                    <div className=' w-6 h-6 rounded-full border-t-4  border-white   animate-spin flex justify-center items-center'>
                    <div className=' w-3 h-3 rounded-full border-b-4  border-white transform animate-spin'></div>
                    </div>
                    </div>
                    :
                    <div className="w-full">
                {result.map((e,i)=>{
                    return(
                        <div key={i} className=" py-1 border-b-[1px]  px-2 overflow-hidden  bg-[#383B42]  " onClick={()=>handleroute(e)}>
                            <div className=" text-white cursor-pointer hover:text-yellow-500 whitespace-nowrap">{e.title}</div>
                        </div>
                    )
                })}
              </div>}
              </div>}
            </div>
    
    );
  };
  
  export default Search;