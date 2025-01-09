import React from 'react'
import { FaCaretRight, FaCaretLeft } from "react-icons/fa6";
import { loggeds } from '@/app/action';

const Pager = ({number,Move,array,page,Right,Left}) => {
  return (
    <div className=' w-full   flex flex-col sm:flex-row items-center sm:justify-between'>
    <div className=''>
    </div>
    <section className=' flex items-center text-xs sm:text-sm'>
      <p className=' pr-4'>Page {number} of <span className=' text-blue-500'>{page}</span>:</p>
      <div className='bg-[#A5AFBE] bg-opacity-40 w-[1px] h-full mr-3'></div>
      <div className=' flex items-center'>
      {number > 1 && <div className='bg-metal mr-2 px-1  cursor-pointer flex items-center justify-between ' onClick={()=>{
        loggeds.loading = true
        Left()}}><FaCaretLeft  className=' text-blue-500  cursor-pointer' /><p className=' ml-2'>Prev</p></div>}
      <div className='flex items-center'>
  {array.map((e, i, a) => (
    <div key={i}>
      {i < 3 ? (
        <div
          className={`mr-1 bg-metal  flex  cursor-pointer ${e == number ?"text-green font-semibold":""}`}
          
          onClick={() => {
            if (e != number) {
              loggeds.loading = true
              Move(e);
            }
          }}
        >
          <p className=' bg-metal px-1 sm:px-2 cursor-pointer '>{e}</p>
        </div>
      ) : i === a.length - 1 ? (
        <div
          className='mr-1 cursor-pointer flex'
          style={e === number ? { color: "green",  borderBottom:"solid", borderBottomWidth:"1px"  } : { color: "" }}
          onClick={() => {
            if (e != number) {
              loggeds.loading = true
              Move(e);
            }
          }}
        >... <p className='ml-1 bg-metal px-1 sm:px-2 cursor-pointer'>{e}</p>
        </div>
      ) : (
        <p className=''></p>
      )}
    </div>
  ))}
</div>


      {number < page&&<div className='bg-metal ml-1 px-1  flex items-center justify-between  cursor-pointer' onClick={()=>{
        loggeds.loading = true
        Right()}}><p className=' mr-2'>Next</p><FaCaretRight  className=' text-blue-500  cursor-pointer' /></div>}
      </div>
    </section>
  </div>
  )
}

export default Pager