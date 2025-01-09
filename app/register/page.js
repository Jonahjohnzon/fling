"use client"
import React, { useEffect, useState } from 'react'
import { Formik } from 'formik'
import { loggeds } from '../action'
import { useRouter } from 'next-nprogress-bar'
import * as Yup from 'yup';


    const page = () => {
    const navigate = useRouter()
    const [msg, setMsg] = useState("")
    const [show, setShow] = useState(false)
    const [load, setLoad] = useState(false)
    const Api = process.env.NEXT_PUBLIC_DOMAIN

    const validationSchema = Yup.object().shape({
        user_name: Yup.string()
          .required('User name is required')
          .min(3, 'User name must be at least 3 characters').max(15,  'User name must be at most 20 characters'),
        email: Yup.string()
          .email('Invalid email address')
          .required('Email is required'),
        password: Yup.string()
          .required('Password is required')
          .min(4, 'Password must be at least 8 characters'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Passwords must match')
          .required('Confirm Password is required'),
        dateOfBirth: Yup.date()
          .required('Date of Birth is required')
          .test(
            'age',
            'You must be at least 18 years old to register',
            function (value) {
              const today = new Date();
              const birthDate = new Date(value);
              let age = today.getFullYear() - birthDate.getFullYear();
              const monthDifference = today.getMonth() - birthDate.getMonth();
      
              if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                age--;
              }
      
              return age >= 18;
            }
          ),
        terms: Yup.boolean()
          .oneOf([true], 'You must accept the terms and conditions'),
      });
useEffect(()=>{
    window.scrollTo({
        top: 0,
        behavior: 'auto'
      });
    loggeds.loading = false
},[])
  return (
    <div className='  flex justify-center items-center text-white '>
        <div className=' min-h-[75vh] w-[95%] lg:w-[63%]'>
            <h1 className=' text-2xl  my-4 '>REGISTER</h1>
            <div className=' shadow-md flex justify-center bg-metal mb-5 rounded-md'>
            <Formik
            validationSchema={validationSchema}
            initialValues={{ user_name: "", email: "", password: "", confirmPassword: "", dateOfBirth: "", terms: false }}
            onSubmit={async (form, { resetForm }) => {
                try{
                setShow(false)
                setMsg("")
                setLoad(true);
                const today = new Date();
                const birthDate = new Date(form.dateOfBirth);
                let age = today.getFullYear() - birthDate.getFullYear();
                const monthDifference = today.getMonth() - birthDate.getMonth();

                if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }

                if (!form.terms) {
                    setMsg('You must agree to the terms and privacy policy');
                    setLoad(false);
                    setShow(true);
                    return;
                }
                if ( age < 18 || isNaN(age)) {
                    setMsg('You must be at least 18 years old.');
                    setLoad(false);
                    setShow(true);
                    return;
                }
                 const data = await fetch(`${Api}/register`,{
                     method:'POST',
                     headers:{'Content-Type': 'application/json'},
                     body:JSON.stringify(form)
                 })
                 const info =  await data.json()
                 if(info.create)
                 {
                  setShow(true)
                  setMsg(info.message)
                  resetForm()
                 }
                 else
                 {
                    setShow(true)
                    setMsg(info.message)
                 }
                 setLoad(false)
                

             }
                 catch(e)
                 {   
                    resetForm()
                 }
            }}
        >
            {(props) => (
                <div className='flex flex-col justify-between items-center w-full'>
                    <div className='text-sm p-5 sm:p-10 w-[100%] flex flex-col items-center'>
                        <div className='mb-5 h-5'>
                            {show && <div className='  text-green'>{msg}</div>}
                        </div>
                        <div className='flex justify-between w-full items-center mb-8'>
                            <div className='w-24 sm:w-40'>
                                <label className='font-semibold'>Username:</label>
                                <p className='text-xs text-gray'>Required</p>
                            </div>
                            <div className='w-full'>
                                <input type='text' className='px-3 outline-none bg-textbg border-[1px] border-white border-opacity-20 w-[100%] h-10 rounded-md' required value={props.values.user_name} onChange={props.handleChange("user_name")} />
                                {props.errors.user_name && props.touched.user_name && ( <p className='text-xs text-red'>{props.errors.user_name}</p>)}
                                <p className='text-xs text-gray'>Can't be more than 15 letters</p>
                            </div>
                        </div>
                        <div className='flex justify-between w-full items-center mb-8'>
                            <div className='w-24 sm:w-40'>
                                <label className='font-semibold'>Email:</label>
                                <p className='text-xs text-gray'>Required</p>
                            </div>
                            <div className='w-full'>
                                <input type='email' className='px-3 outline-none bg-textbg border-[1px] border-white border-opacity-20 w-[100%] h-10 rounded-md' required value={props.values.email} onChange={props.handleChange("email")} />
                                {props.errors.email && props.touched.email && ( <p className='text-xs text-red'>{props.errors.email}</p>)}
                            </div>
                        </div>
                        <div className='flex justify-between w-full items-center mb-8'>
                            <div className='w-24 sm:w-40'>
                                <label className='font-semibold'>Password:</label>
                                <p className='text-xs text-gray'>Required</p>
                            </div>
                            <div className='w-full'>
                                <input type='password' className='px-3 outline-none bg-textbg border-[1px] border-white border-opacity-20 w-[100%] h-10 rounded-md' required value={props.values.password} onChange={props.handleChange("password")} />
                                {props.errors.password && props.touched.password && (<p className='text-xs text-red'>{props.errors.password}</p>)}
                            </div>
                        </div>
                        <div className='flex justify-between w-full items-center mb-8'>
                            <div className='w-24 sm:w-40'>
                                <label className='font-semibold'>Confirm Password:</label>
                                <p className='text-xs text-gray'>Required</p>
                            </div>
                            <div className='w-full'>
                                <input type='password' className='px-3 outline-none bg-textbg border-[1px] border-white border-opacity-20 w-[100%] h-10 rounded-md' required value={props.values.confirmPassword} onChange={props.handleChange("confirmPassword")} />
                                {props.errors.confirmPassword && props.touched.confirmPassword && (<p className='text-xs text-red'>{props.errors.confirmPassword}</p>)}
                            </div>
                        </div>
                        <div className='flex justify-between w-full items-center mb-8'>
                            <div className='w-24 sm:w-40'>
                                <label className='font-semibold'>Date of birth:</label>
                                <p className='text-xs text-gray'>Required</p>
                            </div>
                            <div className='w-full'>
                                <input type='date' className='outline-none cursor-pointer bg-textbg border-[1px] border-white border-opacity-20 w-fit px-5 h-10 rounded-md' required value={props.values.dateOfBirth} onChange={props.handleChange("dateOfBirth")} />
                                {props.errors.dateOfBirth && props.touched.dateOfBirth && ( <p className='text-xs text-red'>{props.errors.dateOfBirth}</p>)}
                            </div>
                        </div>
                        <div className='w-full flex items-center'>
                            <div className='mr-2 w-fit h-fit flex justify-center items-center'>
                                <input type='checkbox' className='bg-transparent cursor-pointer' checked={props.values.terms} onChange={props.handleChange("terms")} />
                            </div>
                            <div className='flex items-center'>
                                <p>I agree to the <span className='text-[#3B7BE8] cursor-pointer font-semibold hover:underline' onClick={()=>navigate.push('/terms')}>terms</span> and <span className='text-[#3B7BE8] hover:underline cursor-pointer font-semibold' onClick={()=>navigate.push('/terms')}>privacy policy</span>.</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-full h-20 bg-[#464A54] border-t-white border-t-[1px] border-opacity-25 flex items-center px-10 overflow-hidden'>
                        <div>
                            {load ? (
                                <div className='rounded-md hover:shadow-none cursor-pointer font-semibold bg-blue shadow-md px-8 py-2 text-sm'>
                                    <div className="w-5 h-5 rounded-full border-2 border-white border-b-0 animate-spin"></div>
                                </div>
                            ) : (
                                <input type='submit' value={"🗒️ Register"} className='text-white rounded-md hover:shadow-none cursor-pointer font-semibold bg-blue shadow-md px-8 py-2 text-sm' onClick={props.handleSubmit} />
                            )}
                        </div>
                    </div>
                </div>
            )}
        </Formik>

            </div>
            <div className=' w-full flex justify-center  text-sm mb-4'>
                <p>Already have an account? <span className='text-[#3B7BE8] cursor-pointer hover:underline ' onClick={()=>navigate.push("/login")}>Login</span></p>
            </div>
        </div>
    </div>
  )
}

export default page