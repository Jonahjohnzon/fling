import React, { useEffect, useRef, useState ,memo,useCallback, useMemo} from "react";
import Imagesprofile from "@/app/Component/Tab/images";
import Stars from "@/app/stars";
import { FaReply } from "react-icons/fa";
import { BsThreeDotsVertical } from "react-icons/bs";
import { PiArrowFatUpFill, PiArrowFatDownFill } from "react-icons/pi";
import { HiShare } from "react-icons/hi";
import TimeAgo from "timeago-react";
import { FaCopy,} from "react-icons/fa";
import DOMPurify from 'dompurify';
import ReplyCp from "./ReplyCp";
import { loggeds } from "@/app/action";
import { useSnapshot } from "valtio";
import Type from "./Type";

const CommentCp = ({Vote,scrollToElement,ei, i,idb, ReplyComment, pid, postid, fullUrl, mod, profi, allow,HandleComment, profile,navigate,isLessThanTenMinutesAgo })=>{
    const [isShareVisible, setShareVisible] = useState(false);
    const editcontent  = useSnapshot(loggeds).editcontent
    const [isMenuVisible, setMenuVisible] = useState(false);
    const shareContainerRef = useRef(null);
    const menuContainerRef = useRef(null);
      const [liked, setLiked] = useState(ei.upvotedBy.includes(pid))
      const [disliked, setdisliked] = useState(ei.downvotedBy.includes(pid))
      const [vote, setvote] = useState(ei?.vote)
      const [load, setload] = useState(false)
     const showNewBadge = isLessThanTenMinutesAgo(ei.createdAt);
     const [visibleReplies, setVisibleReplies] = useState(2);

     const handleShowMore = () => {
      setVisibleReplies(prev => Math.min(prev + 2, ei.reply.length));
     };
  
    const handleClickOutside = (event) => {
      if (shareContainerRef.current && !shareContainerRef.current.contains(event.target)) {
        setShareVisible(false);
      }
      if (menuContainerRef.current && !menuContainerRef.current.contains(event.target)) {
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
     const handleShowLess = () => {
       setVisibleReplies(2);
     };
  
     const visibleRepliesArray = ei?.reply?.slice(-visibleReplies);
     const Delete = useCallback(async(commentId)=>{
      try {
        const logg = localStorage.getItem("data");
        const logged = JSON.parse(logg);
        if(!logged){
          return;
      }
      const token = logged.token;
        setload(true)
        const response = await fetch(`${Api}/post/${postid}/comment/${commentId}/${pid}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            "auth-token": token,
          },
        });
    
        const result = await response.json();
    
        if (result.auth) {
          loggeds.Comment = loggeds.Comment.filter(comment => comment._id !== commentId);

    
          // Optionally, you can refresh the page or update the state to reflect the deletion
        } else {
          setload(false)
        }
      } catch (error) {
        console.error('Error deleting post:', error);
      }
     },[ei._id])
  
     const Edit =()=>{
      loggeds.eid = ei._id
      loggeds.Rep = false
      loggeds.Repid = ""
      loggeds.edit = {type:true,
        reply:false,
        commentId:ei._id
      }
      loggeds.editcontent = ei?.comment
      scrollToElement(ei._id)
      setMenuVisible(false);
     }
     function copyToClipboard() {
      let word = `${fullUrl}${idb}`
      navigator.clipboard.writeText(word).then(() => {
        alert("Link copied")
        setShareVisible(false);
      }).catch(err => {
          console.error("Failed to copy text: ", err);
      });
    }
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
          className="text-white prose sm:prose-p:text-base max-w-none prose-p:text-sm prose-h1:text-2xl sm:prose-h1:text-4xl prose-h2:text-xl  sm:prose-h2:text-2xl prose-h3:text-base sm:prose-h3:text-xl prose-h4:text-sm sm:prose-h4:text-base prose-code:text-[#FFFDD0]  prose-code:bg-blacke prose-code:text-xs prose-code:p-1   "
          dangerouslySetInnerHTML={containsIframe ? undefined : { __html: cleanHTMLS }}
        />
      );
    },[]);

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
        <div className=" min-h-28 sm:min-h-40  flex flex-col sm:flex-row  ">
        <div className='  bg-metal  rounded-l-md border-r-white border-opacity-10 border-r-[1px] shadow-lg px-3 sm:px-5 flex sm:justify-center items-start pt-2 pb-2 sm:pb-0 sm:pt-5'>
    <div className=' flex sm:flex-col justify-center sm:justify-start items-center h-full '>
      <div className=' sm:w-14 sm:h-14 w-12 h-12 sm:mb-2 mr-2 sm:mr-0 border border-white rounded-full overflow-hidden cursor-pointer' onClick={()=>{
            if(profi)
              {
                          navigate.push(`/profile/${ei?.author?._id}`)
              }
              else{
                navigate.push('/login') 
            }
                      }}><Imagesprofile src={ei?.author?.profile_image}/></div>
      <div className=' flex flex-col items-center'>
        <p className=' text-xs  sm:text-sm  cursor-pointer text-blue font-semibold' onClick={()=>{
              if(profi)
                {
                          navigate.push(`/profile/${ei?.author?._id}`)
                }
                else{
                  navigate.push('/login') 
              }
                      }}>{ei?.author?.user_name}</p>
                      <p className=" text-xs sm:text-sm mb-1"><Type info={ei?.author}/></p>
        <div className=" flex text-xs"><Stars no={parseInt(ei?.author?.rank)}/><Stars no={parseInt(ei?.author?.rank)}/><Stars no={parseInt(ei?.author?.rank)}/></div></div>
    </div>
  </div>
  <div className=" h-full   w-full">
    <div className={`min-h-28 sm:min-h-40 w-full transition-all ease-in-out duration-500 ${ei?.reply?.length > 0 ?'rounded-tr-md':'rounded-r-md'} flex flex-col justify-between bg-chatbg `}>
      
        <div className=" flex text-xs sm:text-sm justify-between items-center border-b-white border-opacity-10 border-b-[1px] mb-2 text-gray  h-fit pb-3 pt-2 px-2"><div><TimeAgo live={false} datetime={ei.createdAt}/></div>
        <div className="flex items-center">
        <div>
          {showNewBadge && <p className="bg-purple text-white text-xs mr-3 px-1 sm:px-2 py-1 rounded-sm">New</p>}
        </div>
        <div className="relative cursor-pointer" ref={shareContainerRef}>
          <div
            className={`absolute bottom-0 z-30 right-0 sm:-right-10 justify-center items-start px-2 w-40 sm:w-60 h-60 py-3 bg-textbg shadow-lg border-white border-[1px] border-opacity-10 ${isShareVisible ? 'flex' : 'hidden'}`}
          >
            <div className="flex items-center justify-between w-full pb-2 pt-6 font-normal text-xs rounded-sm text-white border-white border-y-[1px] py-2 border-opacity-10">
              <p className="whitespace-nowrap w-[80%] overflow-hidden">{`${fullUrl}${idb}`}</p>
              <FaCopy className="text-white hover:text-green" onClick={copyToClipboard} />
            </div>
          </div>
          <HiShare className="cursor-pointer hover:text-green scale-90 mr-7" onClick={() => setShareVisible(!isShareVisible)} />
        </div>
        {(pid === ei?.author?._id || mod) && (
          <div className="relative cursor-pointer" ref={menuContainerRef}>
            <div
              className={`absolute z-30 bottom-0 h-60 bg-textbg rounded-md border-[1px] border-white border-opacity-10 right-0  w-40 sm:w-60 flex-col font-semibold items-center ${isMenuVisible ? 'flex' : 'hidden'}`}
            >
              {pid === ei?.author?._id  && (
                <p className="py-3 border-y-[1px] border-blacke w-full text-center bg-white text-blacke" onClick={Edit}>
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
                    <p className="py-3 border-y-[1px] border-blacke w-full text-center bg-white text-blacke" onClick={() => Delete(ei._id)}>
                      Delete
                    </p>
                  )}
                </>
              )}
            </div>
            <BsThreeDotsVertical className="scale-90 cursor-pointer mr-7" onClick={() => setMenuVisible(!isMenuVisible)} />
          </div>
        )}
        <div className="text-xs h-full flex items-end" id={`#${idb}`}>
          {`#${idb}`}
        </div>
      </div></div>
      <div className=" h-full flex-1 px-2 select-text pb-2 w-full ">
      <Text comment={ei?.comment}/>
        </div>
        {(profi &&( !profi?.suspend && !profi?.ban))&&<div className=" min-h-8  border-t-white border-opacity-10 border-t-[1px] text-gray text-sm flex justify-end items-center px-2">
       <div><div className=" flex items-center pt-1">
                {allow&&<div className="mr-6 hover:text-green cursor-pointer flex  items-center" onClick={()=>{ 
                   loggeds.eid = ei._id
                   loggeds.editcontent = ""
                  loggeds.Repid = ei._id       
                 loggeds.quoteid = ei.author._id 
                  loggeds.postpart = idb
                  loggeds.Rep = true
                  loggeds.boxid = i
                  scrollToElement(ei._id)
                }}><FaReply className=" mr- sm:scale-100 scale-[90%] "/><p className="sm:text-sm text-xs ml-1">Reply</p></div>}
                <div className="mr-6 text-base hover:text-green cursor-pointer flex  items-center"  onClick={()=>{         
                        if(liked){
                          setLiked(false)
                          setvote(prev=>prev - 1)
                        }
                        else{
                          setLiked(true)
                          if(vote == -1)
                          {
                            setvote(1)
                          }
                          else{
                          setvote(prev=>prev + 1)
                          }
                          setdisliked(false)
                        }
                  Vote({vote:'upvote', id:ei?._id, reply:false, replyId:""})}}><PiArrowFatUpFill  className={`  sm:scale-100 scale-[90%] ${liked && "text-green"}`}/>{vote > 0 &&<div className=" text-[12px]">{formatNumber(vote)}</div>}</div>
                <div className="text-base hover:text-red cursor-pointer  flex  items-center" onClick={()=>{
                    if(disliked){
                      setdisliked(false)
                      setvote(prev=>prev + 1)
                    }
                    else{
                      setdisliked(true)
                      if(vote == 1)
                        {
                          setvote(-1)
                        }
                        else{
                      setvote(prev=>prev - 1)
                        }
                      setLiked(false)
                    }
  
                  Vote({vote:'downvote', id:ei?._id, reply:false, replyId:""})}}><PiArrowFatDownFill className={`sm:scale-100 scale-[90% ${disliked && "text-red"}`}/>{vote  < 0 &&<div className=" text-xs" >{formatNumber(vote)}</div>}</div>
                
            </div></div>
        </div>}
    </div>
    {ei?.reply?.length > 0 && <>
      <div className=" w-full flex items-center border-t-[1px] border-white border-opacity-20  justify-between px-2 py-2">
        {visibleReplies < ei.reply.length && (
          <button onClick={handleShowMore} className=" border-[1px] px-2 py-1 border-white border-opacity-20 text-xs font-semibold cursor-pointer">
            Show More Replies
          </button>
        )}
        {visibleReplies > 2 && (
          <button onClick={handleShowLess} className=" border-[1px] px-2 py-1 border-white border-opacity-20 text-xs font-semibold cursor-pointer">
            Show Less Replies
          </button>
        )}</div>
           {visibleRepliesArray.map((e, y) => {
             const totalReplies = ei.reply.length;
             let actualIndex = totalReplies - visibleReplies + y + 1;
             if(actualIndex == 0)
             {
              actualIndex = 1
             }
             const rid = `${i + 1}.${actualIndex}`;
          return (
            <div key={e._id} id={`post-${i + 1}.${y + 1}`}>
            {e?.deleted?<div className="py-1 text-xs sm:text-sm opacity-50 px-3 bg-metal mb-1">
              <p>Comment deleted</p>
            </div>:<div >
              <ReplyCp e={e}
               y={y} 
               rid={rid} 
                ei={ei}
                idb={idb}
                scrollToElement={scrollToElement}
                i={i}
                profile={profile}
                ReplyComment={ReplyComment}
                pid={pid}
                postid={postid}
                fullUrl={fullUrl}
                mod={mod}
                profi={profi}
                allow={allow}
                HandleComment={HandleComment}
                editcontent={editcontent}
                navigate={navigate}
                isLessThanTenMinutesAgo={isLessThanTenMinutesAgo}
                Vote={Vote}
              />
      
            </div>}</div>
          );
        })}
  
    </>}
    </div>
    
    </div>
      )
    }

const MemoizedComments = memo(CommentCp);

export default MemoizedComments;
