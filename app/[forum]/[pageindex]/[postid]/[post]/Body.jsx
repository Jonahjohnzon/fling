"use client";
import React, { useState, useEffect, useRef , useCallback} from "react";
import Tiptap from "./Component/Tiptap";
import Sidenav from "@/app/Component/Category/Sidenav";
import Comments from "./Component/Comments";
import Pager from "@/app/thread/[title]/[pageindex]/[type]/Component/pager";
import { useRouter } from "next-nprogress-bar";
import { useSnapshot } from "valtio";
import {
  FaHome,
  FaAngleRight,
  FaUser,
  FaClock,
  FaExclamationCircle,
} from "react-icons/fa";
import { loggeds } from "@/app/action";
import { Decode } from "@/app/Component/Tab/Encode";
import Following from "./Component/Following";
import Edit from "@/app/thread/[title]/[pageindex]/[type]/Component/Edit";
import { BsThreeDotsVertical } from 'react-icons/bs';
import Loadelement from "@/app/Loadelement";
 

const Body = ({ params }) => {
  const Main = process.env.NEXT_PUBLIC_MAIN
  const Api = process.env.NEXT_PUBLIC_DOMAIN
  const [profi, setProfi] = useState(null);
  const Comment = useSnapshot(loggeds).Comment
  const forum = Decode(params.forum);
  const title = Decode(params.pageindex);
  const fullUrls = `${Main}/${params.forum}/${params.pageindex}/${params.postid}/1#post-1`
   const fullUrl = `${Main}/${params.forum}/${params.pageindex}/${params.postid}/${params.post}#post-`
  const id = params.postid;
  const [newtitle, settitle] = useState()
  const [author, setauthor] = useState()
  const page = params.post
  const tiptapRef = useRef();
  const [size, setsize] = useState(0)
  const edit = useSnapshot(loggeds).edit
  const send  = useSnapshot(loggeds).send
  const send2 = useSnapshot(loggeds).send2
  const [edt, setedt] = useState(false)
  const [ids, setid] = useState("");
  const [load, setload] = useState(false);
  const [load2, setload2] = useState(false);
  const Rep = useSnapshot(loggeds).Rep
  const Repid  = useSnapshot(loggeds).Repid
  const boxid =  useSnapshot(loggeds).boxid
  const navigate = useRouter()
  const quoteid  = useSnapshot(loggeds).quoteid
  const quote = useSnapshot(loggeds).Quote
  const name =  useSnapshot(loggeds).name
  const quotemgs= useSnapshot(loggeds).quotemgs
  const postpart = useSnapshot(loggeds).postpart
  const [f, sf] = useState(false)
   const [mod, setmod] = useState(false)
   const [allow, setallow] = useState(true)
  const [length, setlength] = useState(15)
  const [ a, sa] = useState()
const eid = useSnapshot(loggeds).eid
const [time, settime] = useState()
const [go, setgo] = useState(false)
 

const HandleComment = useCallback(async () => {
  try {
    setgo(true)
    if (!tiptapRef?.current) {
      return;
    }
    let value = tiptapRef.current?.getEditor().getHTML();
    if (!value || value.trim() === "<p></p>" || value.trim() === "<p> </p>") {
      return;
    }

    const Urlpost = `${fullUrl}${postpart}`;
    let datas = {
      value: value,
      id: ids,
      reply: Rep,
      replyid: Repid,
      quote: quote,
      quoteid:{_id: quoteid,user_name:name},
      author:{
        user_name:name,
      },
      quotemgs: quotemgs,
      url: Urlpost,
    };

    const storedProfile = localStorage.getItem('profile');
    const prof = JSON.parse(storedProfile);
    const logg = localStorage.getItem("data");
    const logged = JSON.parse(logg);

    if (!prof || !logged || logged.suspend || logged.ban) {
      return;
    }

    const token = logged.token;
    loggeds.send2 = true;

    if (edit.type) {
      const datas = { ...edit, editbody: value };

      const datainfo = await fetch(
        `${Api}/postupdate/${id}/pid/${prof._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json", "auth-token": token },
          body: JSON.stringify(datas),
        }
      );
      const info = await datainfo.json();

      if (edit.reply) {
        loggeds.Comment = loggeds.Comment.map(comment => {
          if (comment._id === edit.commentId) {
            return {
              ...comment,
              reply: comment.reply.map(repl => {
              
                if (repl._id === edit.replyId) {
                  return { ...repl, comment: value };
                }
                return repl;
              }),
            };
          }
          return comment;
        });
      } else {
        loggeds.Comment = loggeds.Comment.map(comment => {
          if (comment._id === edit.commentId) {
            return { ...comment, comment: value };
          }
          return comment;
        });
      }

      // Resetting states
      loggeds.send2 = false;
      loggeds.Rep = false;
      loggeds.Repid = "";
      loggeds.edit = { type: false };
      loggeds.Quote = false;
      loggeds.quoteid = "";
      loggeds.eid = "";
    } else {
      const data = await fetch(
        `${Api}/commentthread/${prof._id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json", "auth-token": token },
          body: JSON.stringify(datas),
        }
      );

      const info = await data.json();
      if (info?.auth) {
        const randomNumber = Math.floor(Math.random() * 1000);

        const add = {
          comment: value,
          createdAt: new Date().toISOString(),
          author:{_id: prof._id,rank: prof.rank,profile_image: prof.profile_image,user_name:prof.user_name},
          vote: 0,
          _id: info?.id || randomNumber,
          upvotedBy: [],
          downvotedBy: [],
          quote: quote,
          quoteid:{ 
            user_name:name,
            _id:quoteid,},
          quotemgs: quotemgs,
        };

        loggeds.Comment[boxid] = {
          ...loggeds.Comment[boxid],
          reply: [...loggeds.Comment[boxid].reply, add],
        };

        const element = document.getElementById(`#${boxid + 1}`);
        if (element) {
          element.scrollIntoView({
            behavior: "instant",
            block: "start",
            inline: "nearest",
            offsetTop: 20,
          });
        }

        // Resetting states
        loggeds.send2 = false;
        loggeds.eid = "";
        loggeds.Rep = false;
        loggeds.Repid = "";
        loggeds.edit = { type: false };
        loggeds.Quote = false;
        loggeds.quoteid = "";
        loggeds.name = "";
        loggeds.quotemgs = "";
      } else {
        if (info?.login) {
          navigate.push('/login');
        }
      }
    }
  } catch (e) {
    console.log(e);
  }
}, [eid]);

  const Handlepost =useCallback(async ()=>{
try{
  setgo(true)
  if (
    Rep !== false ||
    edit.type !== false ||
    quote !== false )
    {
      return
    }
  if(!tiptapRef?.current)
    {
      return
    }
    let value = tiptapRef.current?.getEditor().getHTML()
    if (!value || value.trim() === "<p></p>" || value.trim() === "<p> </p>") {
      return;
    }
   
     let datas = {
        value: value,
        id: ids,
        reply: Rep,
      };
      const storedProfile = localStorage.getItem('profile');
      const prof = JSON.parse(storedProfile)
      const logg = localStorage.getItem("data");
      const logged = JSON.parse(logg);
      if(!prof)
      {
        return
      }
      if(!logged){
        return;
    }
    if(logged.suspend || logged.ban)
      {
        return
      }
    const token = logged.token;
    loggeds.send = true
    const data = await fetch(
      `${Api}/commentthread/${prof._id}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "auth-token": token },
        body: JSON.stringify(datas),
      }
    );

    const info = await data.json();
    if (info?.auth) {
        const add = {
          comment: value,
          createdAt: new Date().toISOString(),
          author:{_id: prof._id,rank: prof.rank,profile_image: prof.profile_image,user_name:prof.user_name},
          vote: 0,
          upvotedBy:[],
          downvotedBy:[],
          reply: [],
          _id: info?.id || randomNumber,
        };
        loggeds.Comment.push(add)
        const element = document.getElementById("chat");
        if (element) {
          // 👇 Will scroll smoothly to the top of the next section
          element.scrollIntoView({ behavior: "smooth" });
          
        }
        loggeds.send = false
        
}
        else{
          if(info?.login)
            {
              navigate.push('/login')
            }
        }
      
 
}
catch(e){
  console.log(e)
}
  },[tiptapRef, Comment])
  const Get = async () => {
    try{
    const storedProfile = localStorage.getItem('profile');
    const prof = JSON.parse(storedProfile);
    if (storedProfile) {
      setProfi(prof)
    }
    const data = await fetch(
       `${Api}/getcomment/${id}?page=${page}${prof?._id ? `&&myid=${prof._id}` : ''}`
    );
    const info = await data.json();
    if (info.auth) {
      sa(info?.data)
      loggeds.Comment = info?.data?.comment
      setid(info?.data?._id);
      setallow(info?.data?.replyallow)
      settitle(info?.data?.title)
      setauthor(info?.data?.authorname)
      setsize(info?.size)
      setlength(info?.length)
      setload(true);
      settime(info?.data?.createdAt)
      if(info?.following && info?.following?.length > 0)
        {
          const isIncluded =  info?.following?.some(f => f?.postid.includes(id));
          sf(isIncluded)
        }
      if(prof)
      {
     
        if (prof?.mod?.category == forum ) {
          setmod(true)
        } else if (prof?.supermod) {
          setmod(true)
        } else if (prof?.admin) {
          setmod(true)
        } else {
          setmod(false)
        }
      }

      loggeds.loading = false

    }}catch(e)
    {
      console.log(e)
    }
  };
  const Arrayp =()=>{
    const array = [];
    for (let i = 1; i <= size; i++) {
      array.push(i);
    }
  
    return array;
}
  useEffect(() => {
    Get();
  }, []);


const Move =(e)=>{
    const route =`/${params.forum}/${params.pageindex}/${params.postid}/${e}#post-1`
     navigate.push(route)
}
const Left =()=>{
  const postInt = parseInt(params.post, 10); 
  const route =`/${params.forum}/${params.pageindex}/${params.postid}/${postInt - 1}#post-1`
   navigate.push(route)

}
const Right =()=>{
  const postInt = parseInt(params.post, 10); 
  const route =`/${params.forum}/${params.pageindex}/${params.postid}/${postInt + 1}#post-1`
   navigate.push(route)
}

useEffect(()=>{
  if(Comment.length >= 16)
  {
    const page = Math.ceil(length/15)
    const route =`/${params.forum}/${params.pageindex}/${params.postid}/${page}#post-1`
    navigate.push(route)
    
  }
},[Comment])

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
  if(!send && !send2 && !go)
  {
  const hash = window.location.hash;
  const rehash = hash.replace('#', '')
  const scrollToElement = (selector, offsetTop = 200) => {
    const element = document.getElementById(selector);
    
    if (!element) {
      return;
    }

    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - offsetTop;
    window.scrollTo({
      top: offsetPosition,
      behavior: 'auto' 
    });
  };
    if (rehash.trim() != 'post-1') {
   scrollToElement(rehash)}
   else {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }
    } 
  
},[Comment])
function shortenString(str, maxLength) {
  if (str.length <= maxLength) {
      return str;
  }
  return str.substring(0, maxLength) + '...';
}

const formatDate = (dateInput) => {
  const date = new Date(dateInput);
  if (isNaN(date)) {
    // If the date is invalid, return a default or error message
    return 'Invalid Date';
  }
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

async function deletePost() {
  try {
    setload2(true)
    const storedProfile = localStorage.getItem('profile');
    const prof = JSON.parse(storedProfile);
    const logg = localStorage.getItem("data");
    const logged = JSON.parse(logg);
    if(!logged){
        return;
    }
    const token = logged.token;
    const response = await fetch(`${Api}/postdelete/${id}/${prof._id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',"auth-token": token,
      },
    });

    const result = await response.json();

    if (result.auth) {
      navigate.push(`/thread/${params.forum}/1/latest`)
      // Optionally, you can refresh the page or update the state to reflect the deletion
    } else {
      setload2(false)
      console.log('Failed to delete post:', result.message);
    }
  } catch (error) {
    console.error('Error deleting post:', error);
  }
}
  return (
    <div className=" min-h-[95vh] ">
      {(load) ?(
        <div className=" w-full flex flex-col items-center justify-center pb-40  text-white">
                {edt&&<div className=' fixed z-50 h-[100vh] bg-bg bg-opacity-60 flex justify-center items-center  w-[100vw]  top-0 right-0'>
        <div className="xl:w-[50%] w-full sm:w-[90%] lg:w-[70%] bg-bg p-5 border-[1px] border-white overflow-hidden border-opacity-25 rounded-md" >
        <Edit id={id}  setedit={setedt} mod={mod} title={a?.title} stick={a?.sticky} category={a?.category} replyallow={a?.replyallow} image={a?.image}/>
        </div>
      </div>}
          <div className="   mb-5 w-[95%] 2xl:w-[80%]">
            <div className="mt-7 mb-4">
              <div className=" w-full flex justify-between">
              <div className=" flex  flex-col items-start  mb-2">
                <h1 className={` ${getBgClass(forum)} text-xs sm:text-base font-semibold px-3 mb-2 sm:mb-0 py-2 mr-2 rounded-sm shadow-lg`}>
                  {forum}
                </h1>
                <div>
                  <h1 className=" text-sm sm:text-xl font-semibold">{newtitle}</h1>
                </div>
              </div>
              {profi &&<Following f={f} sf={sf} url={fullUrls} title={newtitle} category={forum} postid={id} pid={profi._id}/>}
              </div>
              <div className=" flex items-center  text-xs text-gray font-semibold">
                <div className=" flex items-center mr-2">
                  <FaUser className="mr-1" />
                  <p>{author}</p>
                </div>{" "}
                .{" "}
                <div className=" ml-2 flex items-center">
                  <FaClock className="mr-1" />
                  <p>{formatDate(time)}</p>
                </div>
              </div>
            </div>
            <div  className=" flex items-center justify-between" >
            {((mod))&&<div className=' '>
       <div
        className='relative group'
        ><BsThreeDotsVertical />
        <div className={` group-hover:flex flex-col justify-end hidden absolute top-0 border-[1px] border-white border-opacity-10 text-blacke font-semibold h-60 bg-textbg  rounded-md  z-40  left-0 w-40 sm:w-60`}>
            {mod&&<>{load2?<div className=' w-full h-9 bg-white flex justify-center items-center'><p className=" w-4 h-4 border-[1px] border-green mt-1 rounded-full border-t-[0px] sm:text-base text-xs  animate-spin "></p></div>:<p className=' w-full bg-white py-3 text-center hover:text-red sm:text-sm text-xs' onClick={deletePost}>Delete</p>}</>}
        </div>
        
        </div>
        </div>}

            {(profi?._id == a?.authorid || mod)&&<div className=" w-full flex justify-end mb-2 px-2">
              <p className=" px-3 py-1 bg-green rounded-sm cursor-pointer text-xs sm:text-base   text-blacke" onClick={()=>setedt(true)}>Edit</p>
            </div>}</div>
            <div className="  relative text-white border-2 overflow-y-hidden mb-5 rounded-sm border-blue bg-textbg flex items-center">
              <div className=" w-[3%]  absolute left-0 h-full  flex items-center justify-center bg-blue">
                <FaExclamationCircle />
              </div>
              <div className=" pl-[5%] py-3 text-[12px] sm:text-base ">
                <p>Important!!! Spamming will get your account banned </p>
              </div>
            </div>
            <section className="">
              <div className=" flex items-center text-gray">
                <FaHome className=" mr-3 text-xs sm:text-sm cursor-pointer hover:text-white" onClick={()=>navigate.push('/')} />
                <FaAngleRight className=" mr-3 text-xs" />
                <p className=" text-xs sm:text-sm  hover:underline cursor-pointer" onClick={()=>navigate.push(`/thread/${params.forum}/1/latest`)}>
                  {forum}
                </p>
                <FaAngleRight className=" mr-3 text-xs" />
                <p className=" text-xs sm:text-sm font-semibold hover:underline cursor-pointer">
                  {shortenString(newtitle,10)}
                </p>
              </div>
            </section>
          </div>
          <div className=" w-[98%] sm:w-[95%] 2xl:w-[80%]  flex xl:flex-row flex-col items-center xl:items-start justify-between">
            <div className=" w-full min-h-[60vh] lg:min-h-fit  xl:w-[70%] mb-10 xl:mb-0  3xl:w-[79%]">
              <section className=" mb-7">
                <Pager
                  number={page}
                  array={Arrayp()}
                  Right={Right}
                  Left={Left}
                  page={size}
                  Move={Move}
                />
              </section>
              <div className="">
                <Comments
                  pid ={profi?._id}
                  postid = {id}
                  edit={edit}
                  fullUrl={fullUrl}
                  mod={mod}
                  profi={profi}
                  allow={allow}
                  HandleComment={HandleComment}
                  ref={tiptapRef}
                  
                />
              </div>
              <section className=" mt-3 mb-10">
                <Pager
              number={page}
               array={Arrayp()}
               Right={Right}
               Move={Move}
               Left={Left}
               page={size}
                />
              </section>
              {allow?<section>
              {(profi &&( !profi?.suspend && !profi?.ban))?<div>

              <div  className=" ">

                <Tiptap ref={tiptapRef}  profile={profi}   send={send} show  />
              </div>
              <div className=" bg-[#383C42] w-full flex justify-end px-3 py-1 sm:py-3 border-opacity-10  border-t-0  border  border-white text">
                {send ? (
                  <div className=" py-2 px-9 rounded-md shadow-md bg-blue cursor-pointer ">
                    <div className=" sm:h-5 sm:w-5 h-3 w-3 border-white border-2 rounded-full border-t-transparent animate-spin"></div>
                  </div>
                ) : (
                  <div
                    className=" py-2 px-5 sm:text-base text-sm rounded-sm shadow-md bg-blue cursor-pointer"
                    onClick={Handlepost}
                  >
                    Post reply
                  </div>
                )}
              </div>
              </div>:<div className=" mt-2 w-full flex justify-end">
                <p className=" text-xs sm:text-sm bg-chatbg px-3 py-1 rounded-sm font-semibold cursor-pointer border-[1px] border-white border-opacity-10 text-blue" onClick={()=>{
                  if(!profi?.suspend)
                  {
                    navigate.push('/login')
                  }
                }}>{profi?.suspend?"Account Suspend":"Please login to post, like and comment"}</p>
              </div>}</section>:<div className=" mt-2 w-full flex justify-end">
                <p className=" text-xs sm:text-sm bg-chatbg px-3 py-1 rounded-sm font-semibold border-[1px] border-white border-opacity-10 text-blue">Theard Locked</p>
              </div>}
            </div>
            <Sidenav forum={forum} />
          </div>
        </div>
      ):<div className=' w-full h-full flex justify-center items-center '>
      <Loadelement type={"bubbles"}/>
  </div>}
    </div>
  );
};

export default Body;
