"use client"
import React,{ useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";

const Stars = ({no}) =>{
    const [colors, setcolors] = useState("yellow")
    const Get = () =>{
        if(no == 1)
        {
            setcolors("yellow")
        }
        else if(no == 2)
        {
            setcolors("purple")
        }
        else if(no == 3)
        {
            setcolors("blue")
        }
        else if(no == 4)
        {
            setcolors("green")
        }
        else if(no == 5)
        {
            setcolors("cyan")
        }
        else if(no == 6)
        {
            setcolors("orange")
        }
                else if(no == 6)
        {
            setcolors("orange")
        }
        else
        {
            setcolors("red")
        }

    }
    useEffect(()=>{
        Get()
    },[])
    return(<main>
                <FaStar style={{color:colors}}/>    
        </main>
    )
}
export default Stars