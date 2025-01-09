"use client"
import { useEffect } from "react"
import { loggeds } from "./action"
export default function Custom404() {
useEffect(()=>{

  loggeds.loading = false

},[])
    return( 
    <div className=" min-h-[70vh] w-full  text-3xl text-white flex justify-center items-center">
    <h1>404 - Page Not Found</h1>
    </div>)
  }
  