"use client"
import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import { FaExclamationCircle } from "react-icons/fa";
import { useRouter } from 'next-nprogress-bar'
import { loggeds } from '../action';
import * as Yup from 'yup';


const page = () => {
    const Api = process.env.NEXT_PUBLIC_DOMAIN
    const navigate = useRouter()
    const [result, setresult] = useState("")
    const [load, setload] = useState(false)
    const validationSchema = Yup.object().shape({
        email: Yup.string()
          .email('Invalid email address')
          .required('Email is required'),
        password: Yup.string()
          .required('Password is required')
          .min(4, 'Password must be at least 8 characters'),
      });
    useEffect(()=>{
        loggeds.loading = false
    },[])
  return (
    <div className='  flex justify-center items-center text-white '>
        <div className=' min-h-[75vh] w-[95%] sm:w-[80%] lg:w-[63%]'>
            <h1 className=' text-2xl  my-4 '>LOGIN</h1>
            <div className="  relative text-white border-2 overflow-y-hidden mb-5 rounded-sm border-blue bg-textbg flex items-center">
      <div className=" w-[3%]  absolute left-0 h-full  flex items-center justify-center bg-blue">
      <FaExclamationCircle />
      </div>
      <div className=" pl-[5%] py-3 text-xs sm:text-sm">
        <p>Important!!! Copyrighted contents are not allowed </p>
      </div>
           
    </div>
            <div className=' shadow-md flex justify-center bg-metal rounded-md'>
            <Formik
             validationSchema={validationSchema}
                            initialValues={{email:"", password:""}}
                            onSubmit={async(form)=>{
                                try{
                                    setresult("")
                                  setload(true)
                                    const data = await fetch(`${Api}/login`,{
                                        method:'POST',
                                        headers:{'Content-Type': 'application/json'},
                                        body:JSON.stringify(form)
                                    })
                                    const info =  await data.json()
                                    if(!info.auth)
                                    {
                                      setresult(info.message)
                                      setload(false)
                                    }
                                    else{
                                        const datas = {
                                            token:info.token,
                                            _id:info?.data._id
                                        }
                                        const infos = JSON.stringify(datas)
                                        localStorage.setItem("data",infos)
                                        window.location.href = '/';
                                        
                                    }

                                   
                                }
                                    catch(e)
                                    {   
                                        
                                    }
            
                            }}>
                {(props)=>{
                    return(
                        <div className=' flex flex-col justify-between items-centerv w-full'>
                        <div className=' text-sm  px-4 sm:px-10 pb-10 pt-5 w-[100%] flex flex-col items-center '>
                            <div  className=' h-10 w-full flex justify-center'>{result != ""&&<p className=' font-semibold '>{result}</p>}</div>
                            <div className=' flex justify-between w-full items-center mb-8'>
                                <div className='sm:w-40 w-24  '>
                                    <label className=' font-semibold'>Email:</label>
                                    <p className=' text-xs text-gray'>Required</p>
                                </div>
                                <div className=' w-full'>
                                    <input type='email' className='  px-3 outline-none bg-textbg border-[1px] border-white border-opacity-20  w-[100%]  h-10 rounded-md' value={props.values.email} onChange={props.handleChange('email')} required/>
                                    {props.errors.email && props.touched.email && ( <p className='text-xs text-red'>{props.errors.email}</p>)}
                                </div>
                                
                            </div>
                            <div className=' flex justify-between w-full items-center mb-8'>
                                <div className='  sm:w-40 w-24'>
                                    <label className=' font-semibold'>Password:</label>
                                    <p className=' text-xs text-gray'>Required</p>
                                </div>
                                <div className=' w-full'>
                                    <input type='password' className='  px-3 outline-none bg-textbg border-[1px] border-white border-opacity-20  w-[100%]  h-10 rounded-md' value={props.values.password} onChange={props.handleChange('password')} required/>
                                    {props.errors.password && props.touched.password && (<p className='text-xs text-red'>{props.errors.password}</p>)}
                                </div>
                                
                            </div>
            
                            <div className=' w-full flex items-center'>
                                <div className=' mr-2 w-fit h-fit flex justify-center items-center'><input type='checkbox' className=' bg-transparent cursor-pointer '/></div>
                                <div className=' flex items-center'><p>Stay logged in.</p></div>
                            </div>
                
                        </div>
                        <div className='w-full h-20 bg-[#464A54] border-t-white border-t-[1px] border-opacity-25 flex items-center px-10  overflow-hidden'>
                                <div>
                                {load?<div className='rounded-md hover:shadow-none cursor-pointer font-semibold bg-blue shadow-md px-8 py-2 text-sm'><div className=" w-5 h-5 rounded-full border-2 border-white border-b-0 animate-spin"></div></div>:<input type='submit' value={"🔒 Log in"} className=' text-white   rounded-md hover:shadow-none cursor-pointer font-semibold bg-blue shadow-md px-8 py-2 text-sm' onClick={props.handleSubmit}/>}
                                </div>
                        </div>
                        </div>
                    )
                }}
            </Formik>
            </div>
            <div className=' w-full flex text-sm justify-center mt-2'>
                <p>Don't have an account? <span className='text-[#3B7BE8]  cursor-pointer hover:underline ' onClick={()=>navigate.push("/register")}>Register</span></p>
            </div>
            <div className=' w-full flex text-sm justify-center mt-1'>
                <p> <span className='text-[#3B7BE8]  cursor-pointer hover:underline ' onClick={()=>navigate.push("/passforget")}>Forgot Password?</span></p>
            </div>
        </div>
    </div>
  )
}

export default page