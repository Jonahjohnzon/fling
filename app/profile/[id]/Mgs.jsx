import { Formik } from 'formik'
import React, {useState} from 'react'
import * as yup from 'yup'
import Blocked from './Element/Blocked'
import Allowmgs from './Element/Allowmgs'


const Mgs = ({log, sender, f, sf, f2, sf2}) => {
    const Schema=yup.object({
        text:yup.string().min(1).required().label('Text'),
      })
    const [mgs, setmgs] = useState("")
    const [show, setshow] = useState(false)
    const [load, setload] = useState(false)
    const Api = process.env.NEXT_PUBLIC_DOMAIN
  return (
    <div className=' text-white flex flex-col items-start w-full'>
        <p className=' mb-3 sm:text-lg font-semibold'>Send Message</p>
        <div className=' mb-5'>
        <Blocked f={f} sf={sf} pid={log}/>
        </div>
        <>
        <Formik
         initialValues={{text:""}}
         validationSchema={Schema}
         onSubmit={async(form,{resetForm})=>{
          try{
          const logg = localStorage.getItem("data");
          const logged = JSON.parse(logg);
          if(!logged){
              return;
          }
          const token = logged.token;
            setload(true)
          const newMgs = {
            text:form.text,
            sender:sender
          }
          
            const data = await fetch(`${Api}/message/${log}`,{
              method:'POST',
              headers:{'Content-Type': 'application/json',"auth-token": token,},
              body:JSON.stringify(newMgs)
            })
            const info = await data.json()
            if(info.auth)
            {
            setshow(true)
            setmgs(info?.mgs)
            }
            else
            {
              setshow(true)
              setmgs(info?.mgs)
            }
            setload(false)
            resetForm()
          }catch(e){
            console.log(e)
          }

          }}
        >
            {(prop)=>{
                return(
                    <form className=' w-full'>
                        <div className=' mb-2 h-5'>{show&&<div className='text-sm font-semibold text-green'>{mgs}</div>}</div>
                        <div className=' flex flex-col sm:flex-row w-full justify-between items-center text-sm mb-2 '><p className=' mr-2'> MESSAGE: </p><div className='w-full'><input autoComplete="text"   type='text' placeholder='* * * * *' className='w-full sm:w-96 h-9 px-3 bg-transparent outline-none border-[1px] border-gray border-opacity-25' value={prop.values.text} onChange={prop.handleChange("text")}/></div></div>
                        <div className=' text-red text-sm h-5'>{prop.touched.text &&prop.errors.text}</div> 
                        {load?<div className=' flex items-center w-full justify-end'><div className='rounded-md hover:shadow-none cursor-pointer mb-2 font-semibold bg-green shadow-md px-7 py-1 text-sm'><div className=" w-5 h-5 rounded-full border-[1px] border-blacke border-b-0 animate-spin"></div></div></div>:<div className=' flex flex-col sm:flex-row justify-end items-center mb-2'> <div><input type='submit' className='bg-green text-sm text-blacke px-7 py-1 rounded-sm cursor-pointer'  value="SUBMIT" onClick={prop.handleSubmit} /></div></div>}
                    </form>
                )
            }}
        </Formik>
        </>
    </div>
  )
}

export default Mgs