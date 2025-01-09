"use client"
import React, { useEffect, useRef, useState , useMemo, useCallback, }from 'react'
import { loggeds } from '@/app/action'
import { Decode, Encode } from '@/app/Component/Tab/Encode'
import DOMPurify from 'dompurify';
import TimeAgo from 'timeago-react';
import { useRouter } from "next-nprogress-bar";
import {
  FaHome,
  FaAngleRight,
} from "react-icons/fa";
import Pager from '@/app/thread/[title]/[pageindex]/[type]/Component/pager';
import Imagesprofile from '@/app/Component/Tab/images';
import Loadelement from '@/app/Loadelement';

const page = ({params}) => {
  const Api = process.env.NEXT_PUBLIC_DOMAIN
  const navigate = useRouter()
    const text = Decode(params.text)
    const title = params.title
    const index = params.index
    const [load, setload] = useState(false)
    const [Datainfo, setDatainfo] = useState([])
    const [size, setSize] = useState()

    const Left =()=>{
          const postInt = parseInt(index, 10); 
          const route =`/search/${params.text}/${title}/${postInt - 1}`
           navigate.push(route)
  }
  const Right =()=>{
          const postInt = parseInt(index, 10); 
          const route =`/search/${params.text}/${title}/${postInt + 1}`
           navigate.push(route)
  }

  const Move =(e)=>{
          const route =`/search/${params.text}/${title}/${e}`
           navigate.push(route)
  }
  const Arrayp =()=>{
      const array = [];
      for (let i = 1; i <= size; i++) {
        array.push(i);
      }
    
      return array;
  }

const Get = async()=>{
    try {
        const response = await fetch(
          `${Api}/search?query=${encodeURIComponent(text)}&title=${title}&index=${index}`,
          {
            method: "GET",
          }
        );
        const data = await response.json();
   
        const filteredPosts = data?.filteredPosts;
        setDatainfo(filteredPosts || [])
        setSize(data.size)
        setload(true)
        loggeds.loading = false
        
      } catch (error) {
        console.error('Error fetching search results:', error);
      }
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
useEffect(()=>{
  window.scrollTo({
    top: 0,
    behavior: 'auto'
  });
  Get()
},[])

const extractSentenceContainingWordOrFirstTag = (html, word) => {
  // Create a temporary DOM element to parse the HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;

  // Get all <p> elements that contain other tags and remove the <p> tags
  const nestedPElements = tempDiv.querySelectorAll('p:has(*):not(:empty)');

  nestedPElements.forEach(nestedP => {
    const parent = nestedP.parentNode;
    while (nestedP.firstChild) {
      parent.insertBefore(nestedP.firstChild, nestedP);
    }
    parent.removeChild(nestedP);
  });

  // Get all elements containing text
  const elements = tempDiv.querySelectorAll('p, b, em, strong, span , li, ul , ol');
  const wordRegex = new RegExp(`\\b${word}\\b`, 'i');

  // Find the first element that contains the word
  for (let element of elements) {
    if (wordRegex.test(element.textContent)) {
      return element.outerHTML;
    }
  }

  if (elements.length > 0) {
    return elements[0].outerHTML;
  }

  return '';
};

const Text = useCallback(({ comment }) => {
  const iframeRef = useRef(null);
  const containsIframe = useMemo(() => comment?.includes('<iframe'), [comment]);

// Memoize the sanitized HTML
const cleanHTMLS = useMemo(() => {
     return DOMPurify.sanitize(comment, { ALLOWED_TAGS: ['p', 'b', 'em', 'strong', 'span' , 'li', 'ul' , 'ol'] });
}, [containsIframe, comment]);

const extractedSentence = useMemo(() => extractSentenceContainingWordOrFirstTag(cleanHTMLS, text), [cleanHTMLS, text]);

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
      className="text-white  "
      dangerouslySetInnerHTML={containsIframe ? undefined : { __html: extractedSentence || cleanHTMLS }}
    />
  );
},[]);
  return (
    <div className=' flex min-h-[95vh] justify-center w-full'>{
      load?
      <div className='sm:w-[70%]  w-[95%]'>
        <div className=' mb-1 flex items-center mt-5'>
          <h3 className=' text-lg sm:text-2xl text-white mr-2 '>Search Query:</h3>
          <p className=' text-blue text-lg sm:text-2xl'>{text}</p>
        </div>
        <p className=' text-xs text-gray mb-7'>Order by relevance</p>
        <div>
        <section className=" mb-2">
              <div className=" flex items-center text-gray">
                <FaHome className=" mr-3 text-xs sm:text-sm cursor-pointer hover:text-white" />
                <FaAngleRight className=" mr-3 text-xs" />
                <p className=" text-xs sm:text-sm  hover:underline cursor-pointer">
                  Search
                </p>
              </div>
            </section>
        </div>
        <div className=' text-white mb-2'>
          <Pager number={index} array={Arrayp()} Right={Right} Move={Move} Left={Left} page={size}/>
        </div>
      {Datainfo.length == 0?<div>
        <div className=' w-full flex justify-center mt-10' ><p className=' text-white text-2xl'>No Post Found</p></div>

      </div>:<div className=' flex justify-center w-full rounded-md overflow-hidden mb-10 flex-col items-center'>
        {Datainfo.map((e,i)=>{
          const cate = Encode(e?.category)
          const titl = Encode(e?.title)
          const url = `/${cate}/${titl}/${e?._id}/1#post-1`
          const urlbody = `/${cate}/${titl}/${e?._id}/${e?.page}#post-${e?.position}`
          return(
            <div key={i} className=' bg-chatbg px-2 cursor-pointer  w-full  flex  pt-4 pb-2 border-y-white border-b-[1px] border-opacity-10' onClick={()=>{
                if(e?.type == "body")
                {
                  navigate.push(urlbody)
                }
                else{
                  navigate.push(url)
                }
            }}>
              <div className=' mr-3'>
              {e?.type == "title"?<div style={{backgroundImage:`url('${e.image}')`}} className=' w-14 h-14 rounded-full bg-cover bg-center'></div>:
                <div className=' sm:w-14 w-12 h-12 sm:h-14 rounded-full'>
                  <Imagesprofile src={e.author.profile_image}/>
                </div>}
              </div>
                <div>
                  <section className=' flex flex-col  items-start'>
                    <p className={` mr-1 px-1 rounded-sm py-1 text-[11px] text-white font-semibold ${getBgClass(e?.category)}`}>{e?.category}</p>
                  <h1 className=' text-blue text-sm sm:font-semibold'>{e?.title}</h1>
                  </section>
                  <section className=' my-1'>
                    {e?.type == "body" &&<div className='text-xs sm:text-sm text-white' ><Text comment={e?.comment}/></div>}
                    {e?.type == "title" &&<div className=' text-xs sm:text-sm text-white' ><Text comment={e?.lastchat}/></div>}

                  </section>
                  <section className=' text-[12px] text-gray flex sm:flex-row flex-col sm:items-center'>
                    <div className=' flex items-center mr-1'>
                      <p className=''>Forum:</p>
                    <p>{e?.category}</p>
                    </div>
                    <div className=' flex items-center'>
                    <div className=' mr-1 sm:mx-1'>
                      <p>{e?.author.user_name}</p>
                    </div>
                    <div className=' mx-1'>
                      <TimeAgo datetime={e.date} live={false}/> 
                    </div>
                    </div>
                  </section>
                </div>
            </div>
          )
        })}
      </div>}
      <div className=' text-white my-2'>
          <Pager number={index} array={Arrayp()} Right={Right} Move={Move} Left={Left} page={size}/>
        </div></div>:<div className=' w-full h-full flex justify-center items-center '>
                    <Loadelement type={"bubbles"}/>
                </div>
      
      }</div>
  )
}

export default page