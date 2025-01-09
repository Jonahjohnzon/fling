"use client"
import Tiptap from '@/app/[forum]/[pageindex]/[postid]/[post]/Component/Tiptap';
import React, { useState, useRef  } from 'react'
import { FaHome, FaAngleRight } from "react-icons/fa";
import { Formik } from 'formik';
import {Link} from "lucide-react";
import { loggeds } from '@/app/action';
import { useSnapshot } from 'valtio';
import { Decode } from '@/app/Component/Tab/Encode';
import { useRouter } from "next-nprogress-bar";
import * as yup from 'yup'

const page = ({params}) => {
  const Api = process.env.NEXT_PUBLIC_DOMAIN
  const tiptapRef = useRef();
  let userSchema = yup.object({
    title: yup.string().required().max(150).min(2).label('Thread Title'),
    link: yup.string().required().label('Thread Image'),
  });
  const navigate = useRouter()
  const profile = useSnapshot(loggeds).profile
  let str = params.title
  let Url = Decode(str)
  const [imagepop, setImagepop] = useState(false)
  const [loading, setloading] = useState(false)

 const AddImage =(e)=>{
  e.preventDefault();
  setImagepop(!imagepop)
}
  return (
    <div className=' flex justify-center w-full pt-5 pb-20 text-white'>
        <Formik
        initialValues={{title:"", link:"" }}
        validationSchema={userSchema}
        onSubmit={async(form,{resetForm})=>{
          const logg = localStorage.getItem("data");
          const logged = JSON.parse(logg);
          if(!logged){
            return;
        }
        const token = logged.token;
          if(!tiptapRef?.current)
            {
              return
            }
            let value = tiptapRef.current?.getEditor().getHTML()
            if (!value || value.trim() === "<p></p>" || value.trim() === "<p> </p>") {
              return;
            }
        
        const datas={
            form:form,
            category:Url,
            value:value
          }
          
          setloading(true)
          try{ const data = await fetch(`${Api}/createthread/${profile._id}`,{
               method:'POST',
               headers:{'Content-Type': 'application/json',"auth-token": token,},
               body:JSON.stringify(datas)
           })
           const info =  await data.json()
           if(info?.login)
           {
            navigate.push(`/login`)
           }
           if(info.auth)
           {
            resetForm()
            navigate.push(`/thread/${ params.title}/1//latest`)
           }
          

       }
           catch(e)
           {   
             
           }
   

   }}
        >
          {(props)=>{
            return(
      <div className=' lg:w-[80%] w-[95%]'>
        <h1 className=' text-white sm:text-2xl lg:text-3xl mb-5'>POST THREAD</h1>
        <section className=' mb-2'>
          <div className=' flex items-center text-gray'>
            <FaHome className=' mr-3 text-xs tsm:ext-sm cursor-pointer hover:text-white'/>
            <FaAngleRight className=' mr-3 text-xs'/>
            <p  className=' text-xs sm:text-sm font-semibold hover:underline cursor-pointer'>{Url}</p>
          </div>
        </section>
        <section className=' w-full  bg-textbg rounded-t-md p-3'>
          <div className=' flex h-fit mb-1 items-center p-3   border-white border-[1px] border-opacity-20 rounded-md'>
            <div className=' mr-5   '><p className=' bg-green text-xs px-2 py-1 rounded-sm font-semibold whitespace-nowrap '>{Url}</p></div>
            <div className=' w-full '><input type='text' className=' text-lg sm:text-xl outline-none rounded-md w-full h-10 sm:h-12 bg-metal border-white border-[1px] border-opacity-20 px-2 sm:placeholder:text-2xl' placeholder=' Thread Title ... ' value={props.values.title} onChange={props.handleChange("title")}/></div>
          </div>
          <div className=' text-red mb-4 font-semibold text-xs sm:text-sm'>{props.touched.title &&props.errors.title}</div>
          <div className=' bg-bg w-full h-fit select-text'>
          <Tiptap ref={tiptapRef} profile={profile}/>
        </div>
        <div className=' flex relative justify-start mt-4 w-fit'>
          <div className={` flex text-sm items-center cursor-pointer ${props.values.link ? 'bg-red' : 'bg-blue'}  px-2 py-1 rounded-md`}    onClick={(e)=>{
          setImagepop(!imagepop)
        }}><Link className=' scale-50'/> <p className=' font-semibold text-xs sm:text-sm'>Thread Image Upload</p></div>
        {(imagepop) && <div className=' absolute top-8 w-40 sm:w-60 z-30 text-xs  shadow-md font-semibold  py-2 text-white bg-metal rounded-lg left-0 flex justify-center'>
        <div className=' w-[90%] flex flex-col items-center' >
          <input type='text'   className=' outline-none w-full bg-transparent px-2 border-white border-[1px] border-opacity-35 mb-2 h-8 rounded-md' placeholder='image link...' value={props.values.link} onChange={props.handleChange("link")} required/>
          <div   className={`cursor-pointer px-10 rounded-md py-1 bg-green`} onClick={AddImage}>Add</div>
        </div>
      </div>}
        </div>
        <div className=' text-red font-semibold mt-1 text-xs sm:text-sm'>{props.touched.link && props.errors.link}</div>
        <div className=' pt-5'>
          <h4 className=' font-semibold'>🚨 Thread Rules 🚨</h4>
          <ul className=' pt-10 pl-5 sm:pl-10 text-sm list-disc'>
            <li className=' mb-1'>Please search first before creating a Request to avoid any duplicate threads</li>
            <li className=' mb-1'>Please do not upload copyrighted videos, images etc.</li>
            <li className=' mb-1'>Requests that do not follow the above guidelines will be removed</li>
          </ul>
        </div>
    
        </section>
        <div className=' py-4 w-full bg-metal px-10'>
                {loading ?<div><div className=' animate-spin h-4 w-4 rounded-full border-[2px] border-x-green border-b-green border-t-transparent'></div></div>:<input type='submit' value={"Create Thread"} className=' px-5 py-1 bg-blue cursor-pointer' onClick={props.handleSubmit}/>}
        </div>
      </div>
          )}}
      </Formik>
    </div>
  )
}

export default page