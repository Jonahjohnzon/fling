"use client"
import { useEffect } from "react";
import Categories from "./Component/Category/Categories";
import TopNotice from "./Component/Tab/TopNotice";
import { loggeds } from "./action";




export default function Home() {

useEffect(()=>{
  window.scrollTo({
    top: 0,
    behavior: 'auto'
  });
  loggeds.loading = false
 
},[])
  return (
    <main className=" bg-bg   flex flex-col  items-center justify-start w-full pb-20 pt-6 select-none">
    <TopNotice/>
   <Categories/>
    </main>
  );
}
