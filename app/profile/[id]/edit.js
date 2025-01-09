import React,{useState} from 'react'
import * as yup from 'yup'
import { Formik } from 'formik'
import { FaCheck } from "react-icons/fa";
import Imagesprofile from '@/app/Component/Tab/images';
import { loggeds } from '@/app/action';


const Edit = ({datalist, selected, setSelected, params, setload}) => {
  const Api = process.env.NEXT_PUBLIC_DOMAIN
  
    const Schema=yup.object({
        user_name:yup.string().min(3).max(15).required().label('UserName'),
      })
      const Pass = yup.object({
        cpassword:yup.string().min(4).required().label('Current Password'),
        npassword:yup.string().min(4).required().label('New Password'),
        copassword:yup.string().oneOf([yup.ref('npassword'),null],'Password must match').required().label('New Password Comfirmation')
      })
    const [passdis, setpassdis] = useState(false)
    const [text,settext] = useState()
    const [masg, setmasg] = useState("")
    const arrays = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","15","16","17","18","19","20","21","22","23"]
  return (
    <div>
        <Formik
              initialValues={{user_name:datalist.user_name, url:""}}
              validationSchema={Schema}
              onSubmit={async(form)=>{
                loggeds.loading = true
                try{
                const logg = localStorage.getItem("data");
                const logged = JSON.parse(logg);
                if(!logged){
                  return;
              }
              const token = logged.token;
                setload(true)
                const isUrl = (value) => {
                  try {
                    new URL(value);
                    return true;
                  } catch (_) {
                    return false;
                  }
                };
                let total ;
                if(isUrl(form.url))
                {
                  total ={
                    profile_image:form.url
                  }
                }
                else
                {
                total ={
                  profile_image:selected
                }}
                const tot = {...total, ...form}
                
                  const data = await fetch(`${Api}/pushUsers/${params.id}`,{
                    method:'PUT',
                    headers:{'Content-Type': 'application/json',
                      "auth-token": token,
                    },
                    body:JSON.stringify(tot)
                  })
                  const info = await data.json()
                  if(info?.auth)
                  {
                    window.location.reload()
                  }
                  else{
                    setmasg(info?.mgs)
                    setload(false)
                    
                  }}
                  catch(e)
                  {
                    console(e)
                  }
              }}  
              >
              
                {(prop)=>{
                return(

                  <form   className=" mb-5 border-opacity-10 border-b-[1px] border-white w-full"
                  >
                
                <>
                <div><h1 className=' font-semibold  mb-5 text-white'>Change User:</h1></div>
                <div className=' text-red mb-2'>{masg}</div>
                <div className=' text-red text-sm'>{prop.touched.user_name && prop.errors.user_name}</div>
                <div className=' flex flex-col text-white sm:flex-row justify-between items-center mb-10 text-sm'><p className=' mr-2'>USER_NAME: </p><div className=' w-full'><input type='text' placeholder='Change Username' className=' w-full sm:w-96 h-9 px-3 bg-transparent border-[1px] border-gray border-opacity-25' value={prop.values.user_name} onChange={prop.handleChange("user_name")}/></div></div>
                <div className=' flex flex-col text-white sm:flex-row justify-between items-center mb-10 text-sm'><p className=' mr-2'>IMAGE_URL: </p><div className=' w-full'><input type='text' placeholder='Use Url for Profile image' className=' w-full sm:w-96 h-9 px-3 bg-transparent border-[1px] border-gray border-opacity-25' value={prop.values.url} onChange={prop.handleChange("url")}/></div></div>
                <div><h1 className=' font-semibold  mb-5 text-white'>Change Avatar:</h1></div>
                <div className=' flex flex-wrap mb-5'>{
                  arrays.map((e,w)=>{
                    return(<div key={w}>
                      <div className=' sm:mr-10  mb-5  relative w-16 rounded-full overflow-hidden group' onClick={()=>setSelected(e)}><Imagesprofile src={e}/>{selected == e &&<div className='absolute top-0 bg-opacity-80 w-full h-full z-40 bg-blacke cursor-pointer flex justify-center items-center text-red text-xl '><FaCheck /></div>}<div className=' absolute top-0 bg-opacity-0 group-hover:bg-opacity-60 w-full h-full z-20 bg-black '></div></div>
                    </div>)
                  })}</div>
                  <div className=' flex justify-center sm:justify-end items-center mb-10'> <div><input type='submit' className=' bg-green text-blacke px-7 py-1 text-sm rounded-sm cursor-pointer'  value="SUBMIT" onClick={prop.handleSubmit} /></div></div></></form>)}
                }
              </Formik>
               
         <Formik
                initialValues={{cpassword:"",npassword:"",copassword:""}}
                validationSchema={Pass}
                onSubmit={async(form)=>{
                  try{
                    loggeds.loading = true
                  const logg = localStorage.getItem("data");
                  const logged = JSON.parse(logg);
                  if(!logged){
                    return;
                }
                  const token = logged.token;
                  const data = await fetch(`${Api}/changePass/${params.id}`,{
                    method:'PUT',
                    headers:{
                    'Content-Type': 'application/json',
                    "auth-token": token,
                    },
                    body:JSON.stringify(form)
                  })
                  const info = await data.json()
                  if(info?.auth)
                  {
                    window.location.reload()
                  }
                  else{
                    settext(info?.mgs)
                    setpassdis(true)
                  }}
                  catch(e)
                  {
                    console.log(e)
                  }

                }}
                
                >
                  {(prop)=>{
                    return(
                      <form className=' w-full text-white'>
                                        <div><h1 className=' font-semibold  mb-5 text-white'>Change Password:</h1></div>
                                        <div className='h-5 flex justify-center mb-5'>{passdis&&<p className=' text-red'>{text}</p>} </div>
                <div className=' flex flex-col sm:flex-row w-full justify-between items-center text-sm '><p>CURRENT PASSWORD: </p><div className='w-full'><input autoComplete="current-password"   type='password' placeholder='* * * * *' className='w-full sm:w-96 h-9 px-3 bg-transparent border-[1px] border-gray border-opacity-25' value={prop.values.cpassword} onChange={prop.handleChange("cpassword")}/></div></div>
                <div className=' text-red text-sm mb-10'>{prop.touched.cpassword &&prop.errors.cpassword}</div>
                <div className=' flex flex-col sm:flex-row justify-between items-center text-sm '><p>NEW PASSWORD: </p><div className='w-full'><input  type='password' autoComplete="new-password"  placeholder='* * * * *' className='w-full sm:w-96 h-9 px-3 bg-transparent border-[1px] border-gray border-opacity-25' value={prop.values.npassword} onChange={prop.handleChange("npassword")}/></div></div>
                <div className=' text-red text-sm mb-10'>{prop.touched.npassword &&prop.errors.npassword}</div>
                <div className=' flex flex-col sm:flex-row  justify-between items-center  text-sm'><p>COMFIRM PASSWORD: </p><div className='w-full'><input type='password' autoComplete="cofirm-password"   placeholder='* * * * *' className='w-full sm:w-96 h-9 px-3 bg-transparent border-[1px] border-gray border-opacity-25' value={prop.values.copassword} onChange={prop.handleChange("copassword")}/></div></div>
                <div className=' text-red text-sm mb-10'>{prop.touched.copassword &&prop.errors.copassword}</div>
                <div className=' flex flex-col sm:flex-row justify-end items-center mb-10'> <div><input type='submit' className='bg-green text-sm text-blacke px-7 py-1 rounded-sm cursor-pointer'  value="SUBMIT" onClick={prop.handleSubmit} /></div></div>
                      </form>
                    )

                  }
                  }
                </Formik>
    </div>
  )
}

export default Edit