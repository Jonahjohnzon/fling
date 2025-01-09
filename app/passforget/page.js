"use client"
import { Formik } from 'formik'
import React, { useState } from 'react'
import * as yup from 'yup'
import { useRouter } from 'next-nprogress-bar'
import { loggeds } from '../action'

const page = () => {
    const Api = process.env.NEXT_PUBLIC_DOMAIN
    const router = useRouter()
    const [load, setload] = useState(false)
    const Schema = yup.object({
        email:yup.string().email().label('Email').max(150).required(),
       
      })
    const [show, setshow] = useState(false)
    const [mgs, setmgs] = useState("")
  return (
    <main className=' w-full h-[75vh] flex justify-center items-center  bg-bg'>
        {load ?<div></div>:
        <div>
            <Formik
            initialValues={{email:""}}
            validationSchema={Schema}
            onSubmit={async(form,{})=>{
                try{
                loggeds.loading = true
                setload(true)
                const url =`${Api}/password`
                const data = await fetch(url,{
                    method: "POST",
                    headers: { 'Content-Type': 'application/json'},
                    body:JSON.stringify(form)
                  })
                  const re = await data.json()
                if(re)
                {   
                    setmgs(re.mgs)
                    setshow(re.auth)
                    setload(false)
                    loggeds.loading = false


                }
            
            }
                catch(e)
                {
                    console.log(e)
                }
            }}
            >{(props)=>{
                    return(
                        <div className='flex flex-col items-center'>
                            <h1 className=' text-white font-semibold sm:text-2xl mb-5'>ENTER EMAIL</h1>
                            {show&&<h1 className=' bg-blue px-4 py-2 font-bold text-white mb-3'>{mgs}</h1>}
                            <div className=' text-red text-sm'>{props.touched.email && props.errors.email}</div>
                            <input type='email' value={props.values.email} placeholder='EMAIL' className='w-full text-white sm:w-96 h-9 px-3 mb-3 bg-transparent border-[1px] border-white border-opacity-25' onChange={props.handleChange("email")}/>
                            <div className=' flex justify-center mb-10 text-sm sm:text-base '><input className=' px-20 py-2 hover:bg-blue bg-green text-white font-semibold cursor-pointer' type='submit' onClick={props.handleSubmit} value={"SUBMIT"}/></div>
                            <div className=' text-sm sm:text-base  flex justify-center mb-10 font-semibold text-white px-2 py-2 bg-red  cursor-pointer' onClick={()=>router.push("/")}><p>GO HOME</p></div>
                        </div>
                    )
                }}
            </Formik>
        </div>}
    </main>
  )
}

export default page