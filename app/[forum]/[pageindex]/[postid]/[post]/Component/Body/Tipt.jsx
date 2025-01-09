import React,{forwardRef, memo} from 'react'
import Tiptap from '../Tiptap'
import { loggeds } from '@/app/action'
import { useSnapshot } from 'valtio'

const Ti = forwardRef(({profi, editcontent, send, HandleComment, handleClear, ei},ref) => {
    const eid = useSnapshot(loggeds).eid
  return (
    <div   
    className={`${eid == ei._id? "block":"hidden" } transition-all ease-in-out duration-500 px-2 py-2`}>
              <Tiptap ref={ref} profile={profi} editcontent={editcontent} send={send} reply />
              <div className="bg-[#383C42] w-full flex justify-end px-3 items-center py-2 sm:py-3 border-opacity-10 border-t-0 border border-white text">
                {send ? (
                  <div className="sm:py-3 py-2 px-9 rounded-sm shadow-md bg-blue cursor-pointer">
                    <div className="h-3 w-3 border-white border-2 rounded-full border-t-transparent animate-spin"></div>
                  </div>
                ) : (
                  <div
                    className="sm:py-2 py-1 px-3 text-sm rounded-sm shadow-md bg-blue cursor-pointer"
                    onClick={HandleComment}
                  >
                    Post reply
                  </div>
                )}
                <div>
                  <p
                    className="sm:py-2 py-1 opacity-60 ml-5 px-3 text-sm rounded-sm shadow-md bg-blue cursor-pointer"
                    onClick={handleClear}
                  >
                    Cancel
                  </p>
                </div>
              </div>
            </div>
  )
})

const Tipt = memo(Ti)
export default Tipt