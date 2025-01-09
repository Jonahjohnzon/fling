import React from 'react'
import { Main } from '@/app/Data'
import Tab from '../Tab/Tab'
import Sidenav from './Sidenav'





const Categories = () => {

  return (
    <div className=' w-[95%] xl:w-[80%] flex xl:flex-row flex-col items-center xl:items-start justify-between '>
        <div className=' w-full xl:w-[70%]  3xl:w-[77%]'>
        {Main.map((e,i)=>{
          let open = true; 
          if (e.title == "Blackhat / Whitehat"  || e.title == "Report Issues" || e.title == "Marketplace")
          {
            open = false
          }
            return(
                <div key={i} className=' w-full'>
                    <Tab data={e} opening={open}/>
                </div>
            )
        })}
        </div>
       <Sidenav/>
    </div>
  )
}

export default Categories