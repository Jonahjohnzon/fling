import React, { useEffect, useRef, useState , forwardRef, useMemo, useCallback, memo} from "react";
import Imagesprofile from "@/app/Component/Tab/images";
import { BsThreeDotsVertical } from "react-icons/bs";
import { PiArrowFatUpFill, PiArrowFatDownFill } from "react-icons/pi";
import { HiShare } from "react-icons/hi";
import TimeAgo from "timeago-react";
import { FaCopy,  FaQuoteLeft} from "react-icons/fa";
import { loggeds } from "@/app/action";
import DOMPurify from 'dompurify';

const ReplyCp = ({e,rid, ei, i, pid, postid, fullUrl, mod, profi, allow,Vote, isLessThanTenMinutesAgo,scrollToElement,navigate}) =>{
    const [like, setLike] = useState(e?.upvotedBy?.includes(pid) )
    const [dislike, setdislike] = useState(e?.downvotedBy?.includes(pid))
    const [vot, setvot] = useState(e?.vote)
    const [load, setload] = useState(false)
   const showNewBadge = isLessThanTenMinutesAgo(e?.createdAt);
   const [isShareVisible, setShareVisible] = useState(false);
  const [isMenuVisible, setMenuVisible] = useState(false);
  const shareRef = useRef(null);
  const menuRef = useRef(null);

  const Text = useCallback(({ comment }) => {
    const iframeRef = useRef(null);
    const containsIframe = useMemo(() => comment?.includes('<iframe'), [comment]);

  // Memoize the sanitized HTML
  const cleanHTMLS = useMemo(() => {
    return containsIframe ? comment : DOMPurify.sanitize(comment);
  }, [containsIframe, comment]);

  // Effect to update iframeRef content
  useEffect(() => {
    if (iframeRef.current && containsIframe) {
      iframeRef.current.innerHTML = cleanHTMLS;
    }
  }, [containsIframe, cleanHTMLS]);

    return (
      <div
        ref={iframeRef}
        style={{ whiteSpace: "pre-line" }}
        className="text-white prose sm:prose-p:text-[14px] max-w-none prose-p:text-[12px] prose-h1:text-xl sm:prose-h1:text-3xl prose-h2:text-lg  sm:prose-h2:text-xl prose-h3:text-sm sm:prose-h3:text-lg prose-h4:text-xs sm:prose-h4:text-sm   prose-code:text-[#FFFDD0]  prose-code:bg-blacke prose-code:text-[11px] prose-code:p-1"
        dangerouslySetInnerHTML={containsIframe ? undefined : { __html: cleanHTMLS }}
      />
    );
  },[]);

  const handleClickOutside = (event) => {
  if (shareRef.current && !shareRef.current.contains(event.target)) {
    setShareVisible(false);
  }
  if (menuRef.current && !menuRef.current.contains(event.target)) {
    setMenuVisible(false);
  }
  };
  const Api = process.env.NEXT_PUBLIC_DOMAIN
  useEffect(() => {
  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
  }, []);
   const Edit =()=>{
    loggeds.eid = ei._id
    loggeds.Repid = ""
    loggeds.Rep = false
    loggeds.edit = {type:true,
      reply:true,
      commentId:ei._id,
      replyId:e._id
    }
    loggeds.editcontent = e?.comment
    scrollToElement(ei._id)
    setMenuVisible(false);
  
   }
   function copyToClipboard() {
    let word = `${fullUrl}${rid}`
    navigator.clipboard.writeText(word).then(() => {
      alert("Link copied")
      setShareVisible(false);
    }).catch(err => {
        console.error("Failed to copy text: ", err);
    });
  }
  
  
  
  
  const Delete = async(commentId, replyId)=>{
    try {
      const logg = localStorage.getItem("data");
      const logged = JSON.parse(logg);
      if(!logged){
        return;
    }
    if(!logged){
      return;
  }
      const token = logged.token;
      setload(true)
      const response = await fetch(`${Api}/post/${postid}/comment/${commentId}/reply/${replyId}/${pid}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": token,
        },
      });
  
      const result = await response.json();
  
      if (result.auth) {
        loggeds.Comment[i] = {
          ...loggeds.Comment[i],
          reply: loggeds.Comment[i].reply.filter(reply => reply._id !== replyId)
        };
    
  
        // Optionally, you can refresh the page or update the state to reflect the deletion
      } else {
        setload(false)
        console.log('Failed to delete post:', result.message);
      }
    } catch (error) {
      console.error('Error deleting post:', error);
    }
   }

   function formatNumber(num) {
    if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
    }
    if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
    if (num >= 1_000) {
      return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
    }
    return num.toString();
  }
    return(
  <div className={` ${e.quote?"min-h-24 pt-2":"min-h-28 border-white border-opacity-10 border-t-[1px]"}    flex flex-col sm:flex-row justify-center `} >
  <div className={`${e.quote? "hidden":"flex"} px-2 sm:px-1 bg-metal   border-r-white border-opacity-20 border-r-[1px]  shadow-lg  sm:justify-center items-start pt-1 pb-1 sm:pb-0 sm:pt-5`}>
  <div className=' sm:flex  hidden flex-col items-center h-full '>
    <div className=' w-12 h-12 mb-2 border  border-white rounded-full overflow-hidden cursor-pointer' onClick={()=>{
      if(profi)
      {
        navigate.push(`/profile/${e.author?._id}`)
      }
      else{
        navigate.push('/login') 
    }
                    }}><Imagesprofile src={e?.author?.profile_image}/></div>
  
  </div>
  </div>
  <div className={`  ${e.quote?" w-[99%] border-white border-opacity-10 border-[1px]":"w-full"} flex flex-col justify-between bg-metal `}>
      <div className=" flex text-xs w-full font-semibold justify-between items-center mb-1 text-gray  h-fit pb-1 pt-2 px-2"><div  className=" flex items-center"><div className="text-blue cursor-pointer hover:underline" onClick={()=>{
            if(profi)
              {
                        navigate.push(`/profile/${e?.author?._id}`)
              }
              else{
                navigate.push('/login') 
            }
                  }}> {e?.author?.user_name}</div>{e.quote?<p className=" text-white pl-1">Replied<span className=" ml-1 hover:underline text-green cursor-pointer" onClick={()=>{
                    if(profi)
                      {
                      navigate.push(`/profile/${e.quoteid._id}`)
                      }
                      else{
                        navigate.push('/login') 
                    }
                  }}>{e?.quoteid?.user_name}</span></p>:<span className=" text-white pl-1"> Commented</span>}</div>  <div className="flex items-center">
                  <div>
                    {showNewBadge && <p className="bg-purple text-white text-[9px] mr-3 px-1 py-[1px] rounded-sm">New</p>}
                  </div>
                  <div className="relative cursor-pointer" ref={shareRef}>
                    <div
                      className={`absolute z-30 bottom-0 right-0 sm:-right-10  justify-center items-start w-40 h-60 py-3 bg-textbg shadow-lg border-white border-[1px] border-opacity-10 ${isShareVisible ? 'flex' : 'hidden'}`}
                    >
                      <div className="flex items-center justify-between w-full px-2 font-normal text-sm rounded-sm text-white border-white border-y-[1px] pb-2 pt-6 border-opacity-10">
                        <p className="whitespace-nowrap text-xs w-[80%] overflow-hidden">{`${fullUrl}${rid}`}</p>
                        <FaCopy className="text-white hover:text-green text-xs" onClick={copyToClipboard} />
                      </div>
                    </div>
                    <HiShare className="cursor-pointer hover:text-green scale-90 mr-6" onClick={() => setShareVisible(!isShareVisible)} />
                  </div>
                  {(pid == e?.author?._id || mod) && (
                    <div className="relative cursor-pointer" ref={menuRef}>
                      <div
                        className={`absolute z-30 bottom-0 right-0 h-60 bg-textbg border-[1px] border-white border-opacity-10 rounded-md  flex-col items-start w-40 ${isMenuVisible ? 'flex' : 'hidden'}`}
                      >
                        {pid == e?.author?._id  && (
                          <p className="w-full text-center py-2 border-y-[1px] border-y-blacke bg-white text-blacke rounded-sm" onClick={Edit}>
                            Edit
                          </p>
                        )}
                        {load ? (
                          <div className="bg-white w-full h-10 flex justify-center items-center">
                            <p className="w-4 h-4 border-[1px] border-green mt-1 rounded-full border-t-[0px] animate-spin"></p>
                          </div>
                        ) : (
                          <>
                            {mod && (
                              <p className="w-full text-center py-3 border-y-[1px] border-blacke bg-white text-blacke" onClick={() => Delete(ei._id, e._id)}>
                                Delete
                              </p>
                            )}
                          </>
                        )}
                      </div>
                      <BsThreeDotsVertical className="scale-90 cursor-pointer mr-6" onClick={() => setMenuVisible(!isMenuVisible)} />
                    </div>
                  )}
                  <div className="text-xs h-full flex items-end" id={`#${rid}`}>
                    {`#${rid}`}
                  </div>
                </div>
                            </div>
                  <div className=" w-full flex justify-center">
                  {e.quote&&<div className="   w-[95%]  px-3 mx-5 overflow-x-hidden overflow-y-scroll scrollbar-thumb-metal scrollbar-track-transparent scrollbar-thin border-[1px] border-white border-opacity-10  flex-1 select-text mb-3 py-2 max-h-20 min-h-10 bg-chatbg " ><Text comment={e?.quotemgs}/></div>}
                  </div>
      <div className=" text-[11px] h-full flex-1 px-2 pb-1 w-full select-none" ><Text comment={e?.comment}/></div>
      {(profi &&( !profi?.suspend && !profi?.ban))&&<div className={` min-h-8  border-t-white ${e.quote||"border-opacity-10 border-t-[1px]"} text-white text-[10px]  sm:text-sm flex justify-between   items-center pr-2`}>
      <div className={`  flex-col items-center  `}>
      <p className=' text-[10px]  sm:text-xs whitespace-nowrap border-white border-[1px] border-opacity-5 py-1 px-2'><TimeAgo datetime={e.createdAt} live={false}/></p>
    </div>
          <div className=" flex items-center pt-1">
          {allow&&<div className=" mr-6 hover:text-green cursor-pointer flex  items-center" onClick={()=>{ 
                loggeds.eid = ei._id
                loggeds.editcontent = ""
                loggeds.name = e?.author?.user_name
                loggeds.postpart = rid
                loggeds.Repid = ei._id
                loggeds.Rep = true
                loggeds.boxid = i
                loggeds.Quote = true
                loggeds.edit = {type:false}
                loggeds.quoteid = e.author._id 
                loggeds.quotemgs = e?.comment
                scrollToElement(ei._id)
              }}><FaQuoteLeft className="  scale-[90%] "/></div>}
              <div className=" mr-6 text-base hover:text-green cursor-pointer flex  items-center" onClick={()=>{         
                      if(like){
                        setLike(false)
                        setvot(prev=>prev - 1)
                      }
                      else{
                        setLike(true)
                        if(vot == -1)
                        {
                          setvot(1)
                        }
                        else{
                        setvot(prev=>prev + 1)
                        }
                        setdislike(false)
                      }
                Vote({vote:'upvote', id:ei?._id, reply:true, replyId:e?._id})}}><PiArrowFatUpFill className={`scale-[90%]  ${like && "text-green"}`}/>{vot > 0 &&<div className=" text-[12px]">{formatNumber(vot)}</div>}</div>
              <div className="text-base hover:text-red cursor-pointer  flex  items-center" onClick={()=>{
                  if(dislike){
                    setdislike(false)
                    setvot(prev=>prev + 1)
                  }
                  else{
                    setdislike(true)
                    if(vot == 1)
                      {
                        setvot(-1)
                      }
                      else{
                    setvot(prev=>prev - 1)
                      }
                    setLike(false)
                  }
  
                Vote({vote:'downvote', id:ei?._id, reply:true, replyId:e?._id})}}><PiArrowFatDownFill className={`scale-[90%] ${dislike && "text-red"}`}/>{vot  < 0 &&<div className=" text-xs">{formatNumber(vot)}</div>}</div>
              <div></div>
          </div>
      </div>}
  </div>
  </div>
    )
  }

const Memomize = memo(ReplyCp)

export default Memomize