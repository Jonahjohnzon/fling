import Imagesprofile from '@/app/Component/Tab/images'
import React from 'react'
import { useRouter } from "next-nprogress-bar";
import TimeAgo from "timeago-react";
import { Encode } from '@/app/Component/Tab/Encode';
import { FaCommentAlt, FaEye,FaLock } from "react-icons/fa";
import { MdPushPin } from "react-icons/md";
import ProfileImage from './Profileimmg';

const ForumTab = ({data, keys, name, hide, follow, Post, load2}) => {
  const navigate = useRouter()
  let urlname = Encode(name)
  let urltitle = Encode(data.title)
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
    return num?.toString();
  }
  

  const getBgClass = (category) => {
    switch (category?.toLowerCase()) {
      case 'self promotion':
        return 'bg-red';
      case 'web development':
        return 'bg-green';
      case 'mobile development':
        return 'bg-midnight';
      case 'software development':
            return 'bg-tahiti';
      case 'game development':
            return 'bg-red';
      case 'cybersecurity':
            return 'bg-purple';
      case 'requests':
            return 'bg-purple';
      case 'computers':
            return 'bg-green';
      case 'it':
            return 'bg-red';
      case 'freelance support':
            return 'bg-tahiti';
      case 'beermoney':
            return 'bg-red';
      case 'site flipping & sales':
            return 'bg-purple';
      case 'tools sales':
            return 'bg-purple';
      case 'computers':
            return 'bg-green';
      case 'api sales':
            return 'bg-red';
      case 'others':
            return 'bg-green';
      case 'report issues':
            return 'bg-red';
      default:
        return 'bg-blue'; // Default background color if none match
    }
  };
  
  
  return (
    <div className={`border-b-[1px] border-b-white cursor-pointer border-opacity-10  px-3 relative  sm:items-center flex sm:flex-row flex-col  text-sm ${keys % 2 == 0 ?'bg-topbg':'bg-metal'}`}>
      <div className=' sm:items-start items-end flex justify-between pt-3  sm:py-3 lg:w-[200%] w-full sm:w-[150%]'  onClick={()=>{
        navigate.push(`/${urlname}/${urltitle}/${data._id}/1#post-1`)}}>
          <div className='flex items-start w-full'>
          <section className=' mr-2'>
          <ProfileImage imageUrl={data.image} altText={"img"} defaultImageUrl={"https://vidplus.com.ng/df.png"}/>   
       </section>
          <section>
            <div className=' flex  flex-col items-start text-xs sn:text-sm lg:font-semibold  mb-1 pr-3'><div className={`py-1 px-2 mr-2  ${getBgClass(data?.category)} mb-1 text-xs font-semibold h-fit whitespace-nowrap rounded-sm `}>{data?.category}</div><p className=' font-medium lg:font-semibold  text-xs sm:text-sm'>{data.title}</p></div>
            <div className=' flex  items-center text-xs'><div className=' mr-2 text-gray'>{data?.author?.user_name}</div>-<p className=' ml-2'><TimeAgo datetime={data.createdAt} live={false}/></p></div>
          </section>
          </div>
          {follow||<div className=' pr-2 flex items-center'>{data?.sticky&&<div><MdPushPin  className='text-gray text-[13px]'/></div>}{data?.replyallow ||<FaLock className=' text-gray text-[10px] ml-2'/>}</div>}
      </div>
     {hide || <div className=' w-fit sm:w-[80%] sm:block flex items-center lg:w-[60%] sm:px-4 py-1 sm:py-3 sm:border-x-[1px]  sm:border-x-white sm:border-opacity-15 '  onClick={()=>{
        navigate.push(`/${urlname}/${urltitle}/${data._id}/1#post-1`)}}>
        <div className=' flex justify-between items-center w-full sm:items-start mr-5 sm:r-0 sm:mb-1 lg:text-sm text-xs'><p className='hidden sm:block  sm:mr-10 text-gray'>Replies:</p> <FaCommentAlt className=' text-white sm:hidden mr-2'/><div>{formatNumber(data.replycount)}</div></div>
        <div className=' flex justify-between items-center w-full sm:items-start lg:text-sm text-xs'><p className='hidden sm:block  sm:mr-10 text-gray'>Views:</p><FaEye className=' text-white sm:hidden mr-2'/> <div>{formatNumber(data.views)}</div></div>
      </div>}
     { hide ||<div className=' lg:w-[100%] w-full py-3 pr-8 absolute top-0 z-40 right-2 sm:relative'>
        <section className=' hidden  lg:flex justify-end w-full'  onClick={()=>{
          navigate.push(`/${urlname}/${urltitle}/${data._id}/1#post-1`)}}>
          <div className=' mr-4 flex lg:text-sm text-xs flex-col text-[14px] text-gray items-end'>
            <p><TimeAgo datetime={data?.comment[data.comment.length - 1]?.createdAt} live={false}/></p>
            <p>{data?.comment[data.comment.length - 1]?.author?.user_name}</p>
          </div>
          <div className=' min-w-8 min-h-8 max-w-8 max-h-8 rounded-full overflow-hidden  border-gray border-[1px]'><Imagesprofile src={data?.comment[data.comment.length - 1]?.author?.profile_image}/></div>
        </section>

      </div>}
      {follow&&
                                  <div className='  h-full flex items-center mb-2 sm:mb-0'>
                                  {load2 ? (
                                      <div className='rounded-md hover:shadow-none cursor-pointer font-semibold bg-blue shadow-md px-6 sm:px-8 py-2 text-sm'>
                                          <div className="w-3 h-3 rounded-full border-2 border-white border-b-0 animate-spin"></div>
                                      </div>
                                  ) : (
                                    <p className=' text-white px-1 sm:px-3 py-1 text-xs sm:text-sm cursor-pointer bg-blue rounded-sm' onClick={()=>Post(data?._id)}>UnFollow</p>)}
                                  </div>}
    </div>
  )
}

export default ForumTab