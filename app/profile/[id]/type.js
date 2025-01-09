import React, { useEffect, useState } from 'react'

const Type = ({no}) => {
    const [color, setcolors] = useState()
    const [text, settext] = useState()
    const Get = () =>{
        if(no == 1)
        {
            setcolors("yellow")
            settext("EXPLORER")
          
        }
        else if(no == 2)
        {
            setcolors("purple")
            settext("KNIGHT")
           
        }
        else if(no  == 3)
        {
            setcolors("blue")
            settext("LEGEND")
        }
        else if(no == 4)
        {
            setcolors("green")
            settext("IMMORTAL")
        }
        else if(no == 5)
        {
            setcolors("cyan")
            settext("ANGEL")
        }
        else if(no ==6)
        {
            setcolors("orange")
            settext("KNIGHT ANGEL")
        }
        else
        {
            setcolors("red")
            settext("DRAGON")
        }
    }
    useEffect(()=>{
        Get()
    },[])
  return (
    <div><div className=' px-2 py-1 font-semibold text-xs sm:text-sm text-black' style={{backgroundColor:color}}>{text}</div></div>
  )
}

export default Type