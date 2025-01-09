import React, { useState } from 'react'
import { FaBold,FaItalic, FaUnderline, FaStrikethrough,FaPalette, FaHeading , FaList, FaListOl , FaQuoteRight, FaHighlighter, FaUndo, FaRedo, FaLink, FaExternalLinkSquareAlt, FaImage, FaVideo, FaYoutube,FaCode  } from "react-icons/fa";
import { FaAlignRight } from "react-icons/fa";

const Tip = ({editor, reply}) => {
  const [linkpop, setlinkpop] = useState(false)
  const Main = process.env.NEXT_PUBLIC_MAIN
  const [linkpop2, setlinkpop2] = useState(false)
  const [href,sethref] = useState()
  const [href2,sethref2] = useState()
  const [imagepop, setImagepop] = useState(false)
  const [imag, setImag] = useState("")
  const [videopop, setVideopop] = useState(false)
  const [video, setVideo] = useState("")
  const [videopop2, setVideopop2] = useState(false)
  const [video2, setVideo2] = useState("")
  const [loadp, setloadp] = useState(false)
  const [title, settitle] = useState()
    const colorList = ['#001f3f', '#0074D9', '#7FDBFF', '#39CCCC', '#3D9970', '#2ECC40', '#01FF70', '#FFDC00', '#FF851B', '#FF4136','#ff0000', '#85144b', '#F012BE', '#B10DC9', '#111111', '#AAAAAA', '#DDDDDD', '#FFFFFF'];
    const [pop, setpop] = useState(false)
    const [col, setcol] = useState("")
    const [pop2, setpop2] = useState(false)
    const [pop3, setpop3] = useState(false)
    const [col2, setcol2] = useState("")
    const [menu, setmenu] = useState(false);
    const Api = process.env.NEXT_PUBLIC_DOMAIN

    if (!editor) {
        return null;
      }

    const handleColor =()=>{
     setpop(true)
    }

    const handleLeave =()=>{
      setpop(false)
     }


     const handleColor2 =()=>{
      setpop2(true)
     }
 
     const handleLeave2 =()=>{
       setpop2(false)
      }
      const handleColor3 =()=>{
        setpop3(true)
       }
   
       const handleLeave3 =()=>{
         setpop3(false)
        }

     const Addlink = (e)=>{
      e.preventDefault();
      let modifiedHref = href2;
      if (!/^https?:\/\//i.test(modifiedHref)) {
        modifiedHref = `https://${modifiedHref}`;
      }
      const encode = encodeURIComponent(modifiedHref)
      editor.chain().focus().extendMarkRange('link').setLink({ href:`${Main}/outofsite/${encode}` }).command(({ tr }) => {
        tr.insertText(title)
        setmenu(!menu)
        return true
     }).run()
     setlinkpop(!linkpop)
     }

  const Add = async (e) => {
    
    e.preventDefault();
    setloadp(true)
    let modifiedHref = href;
    if (!/^https?:\/\//i.test(modifiedHref)) {
      modifiedHref = `https://${modifiedHref}`;
    }
    const encode = encodeURIComponent(modifiedHref);
    
    // Generate a unique ID for the placeholder
    const placeholderId = `link-preview-${Date.now()}`;
    
    // Insert placeholder content
    editor.chain().focus().insertContent({
      type: 'placeholder',
      attrs: { id: placeholderId },
    }).run();
    setmenu(false)
    try {
      const res = await fetch(`${Api}/metadata?url=${modifiedHref}`);
      const data = await res.json();
      const datas = data.result;
    
      // Remove the placeholder content by its unique ID
      editor.commands.command(({ tr, state, dispatch }) => {
        let { doc } = state;
        let pos;
        doc.descendants((node, position) => {
          if (node.type.name === 'placeholder' && node.attrs.id === placeholderId) {
            pos = position;
          }
        });
        if (pos !== undefined) {
          tr.delete(pos, pos + 1);
          dispatch(tr);
        }
        return true;
      });
    
      if (!data.timeout && datas?.ogImage) {
        editor.commands.insertContent( `<a href="${Main}/outofsite/${encode}"  class="link-container">
              ${datas?.ogImage[0]?.url ? `<img src="${datas?.ogImage[0]?.url}" class="link-image" />` : ''}
              <b>
                ${datas?.ogTitle ? `<em>${datas?.ogTitle}</em>` : ""}
                ${datas?.ogDescription ? `<em>${datas?.ogDescription}</em>` : ""}
                ${datas?.ogUrl ? `<em>${datas?.ogUrl}</em>` : ""}
              </b>
            </a><br>`)
        setloadp(false)
        setlinkpop2(!linkpop2)
      } else {
        setmenu(false)
        editor.chain().focus().extendMarkRange('link').setLink({ href: `${Main}/outofsite/${encode}` }).command(({ tr }) => {
          tr.insertText(modifiedHref + '\n');
          return true;
        }).run();
        setloadp(false)
        setlinkpop2(!linkpop2)
      }
    } catch (error) {
      setmenu(false)
      console.error('Error fetching metadata:', error);
      editor.chain().focus().extendMarkRange('link').setLink({ href: `${Main}/outofsite/${encode}` }).command(({ tr }) => {
        tr.insertText(modifiedHref);
        return true;
      }).run();
      setloadp(false)
      setlinkpop2(!linkpop2)

      // Handle error appropriately, maybe display a message to the user
    }
};

    const AddImage =(e)=>{
      e.preventDefault();
      setImagepop(!imagepop)
      editor.chain().focus().setImage({ src: imag ,alt: 'An image', width:80, height:80}).run(); 
      setmenu(false)
    }
    const AddVideo2 =(e)=>{
      e.preventDefault();
      setVideopop(!videopop)
          if (video2) {
      editor.commands.setYoutubeVideo({
        src: video2,
        width: 440,
        height: 280,
      })
   
    }
    setmenu(false)
    }

    const AddVideo =(e)=>{
      e.preventDefault();
      setVideopop2(!videopop2)
          if (video) {
            editor.chain().focus().setIframe({ src: video }).run();
            setmenu(false)
   
    }
    }

    const Level =(e)=>{
      editor.commands.toggleHeading({ level: e })


    }
  return (
    <div
    className={`lg:px-4 px-2 py-1 relative  rounded-t-md lg:rounded-tr-md lg:rounded-tl-none ${reply?"border-l-white border-l-[1px]":"lg:border-l-transparent "} flex flex-col bg-[#383C42] sm:flex-row sm:justify-between items-center
  sm:gap-5 w-full  border border-white border-opacity-10`}
  >
    <div className="flex justify-between mb-1 sm:mb-0 sm:justify-start items-center sm:gap-3 2xl:gap-3 w-full sm:w-[60%] 2xl:w-8/12  "  >
    <button
        onMouseEnter={handleColor3} onMouseLeave={handleLeave3}
        className={`
          ${editor.isActive("heading")
            ? " bg-blue text-white p-1 rounded-lg relative"
            : "text-white p-1 relative"}`
        }
      >
        {pop3&&<div className=' absolute z-40 border-[1px] border-white border-opacity-20 left-0 bottom-5 flex px-2 py-3 rounded-sm bg-metal items-center  '>
          <p className={` font-semibold mx-2 cursor-pointer hover:text-blue ${editor.isActive('heading', { level: 1 })? 'text-blue':'text-white'}`}    onClick={() => {
            setpop3(false)
          Level(1)
        }}>H1</p>
          <p className={` font-semibold mx-2 cursor-pointer hover:text-blue ${editor.isActive('heading', { level: 2 })? 'text-blue':'text-white'}`}  onClick={() => {
            setpop3(false)
          Level(2)
        }}>H2</p>
          <p className={` font-semibold mx-2 cursor-pointer hover:text-blue ${editor.isActive('heading', { level: 3 })? 'text-blue':'text-white'}`}  onClick={() => {
            setpop3(false)
          Level(3)
        }}>H3</p>
          <p className={` font-semibold mx-2 cursor-pointer hover:text-blue ${editor.isActive('heading', { level: 4 })? 'text-blue':'text-white'}`}  onClick={() => {
            setpop3(false)
          Level(4)
        }}>H4</p>
        </div>}
        <FaHeading className=" scale-[80%] " />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBold().run();
        }}
        className={`
          ${editor.isActive("bold")
            ? " bg-blue text-white p-1 rounded-lg"
            : "text-white p-1"}`
        }
      >
        <FaBold className=" scale-[80%] " />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleItalic().run();
        }}
        className={`
          ${editor.isActive("italic")
            ? " bg-blue text-white p-1 rounded-lg"
            : "text-white p-1"}`
        }
      >
        <FaItalic className=" scale-[80%] " />
      </button>
     
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleUnderline().run();
        }}
        className={`
          ${editor.isActive("underline")
            ? " bg-blue text-white p-1 rounded-lg"
            : "text-white p-1"}`
        }
      >
        <FaUnderline className=" scale-[80%] " />
        
      </button>
  
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleStrike().run();
        }}
        className={`
          ${editor.isActive("strike")
            ? " bg-blue text-white p-1 rounded-lg"
            : "text-white p-1"}`
        }
      >
        <FaStrikethrough className=" scale-[80%] " />
      </button>
      <div className=' relative flex items-center justify-center' onMouseEnter={handleColor} onMouseLeave={handleLeave}>
      <button
        onClick={(e) => {
          e.preventDefault();
          setpop(true)
        }}
        className='text-white'
        style={{backgroundColor:col}}
      >
        <FaPalette  className=" scale-[80%] "/>
      </button>
      {pop &&<div className=' w-40  bg-metal border-[1px] border-white border-opacity-40 absolute top-4 flex flex-wrap z-30 rounded-sm shadow-sm'>
        {
            colorList.map((e,i)=>{
                return(
                    <div key={i} className=' h-fit m-1 border-[1px] border-transparent hover:border-white  rounded-full overflow-hidden cursor-pointer'>
                        <div style={{backgroundColor:e}} className=' w-5 h-5' onClick={()=>{
                            if(e != '#FFFFFF' )
                            {
                            setcol(e)
                            }
                            else{
                                setcol("")
                            }
                            editor.chain().focus().setColor(e).run()
                            setpop(false)
                          }
                            
                            }></div>
                    </div>
                )
            })
        }
        
        </div>}
      </div>


      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBulletList().run();
        }}
        className={`
          ${editor.isActive("bulletList")
            ? " bg-blue text-white p-1 rounded-lg"
            : "text-white p-1"}`
        }
      >
        <FaList className=" scale-[80%] " />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleOrderedList().run();
        }}
        className={`
          ${editor.isActive("orderedList")
            ? " bg-blue text-white p-1 rounded-lg"
            : "text-white p-1"}`
        }
      >
        <FaListOl className=" scale-[80%] " />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBlockquote().run();
        }}
        className={`
          ${editor.isActive("blockquote")
            ? " bg-blue text-white p-1 rounded-lg hidden sm:block"
            : "text-white p-1 hidden sm:block"}`
        }
      >
        <FaQuoteRight className=" scale-[80%] " />
      </button>
      <div className=' hidden  relative sm:flex items-center justify-center' onMouseEnter={handleColor2} onMouseLeave={handleLeave2}>
      <button
        onClick={(e) => {
          e.preventDefault();
          setpop2(true)
        }}
        className={`
          ${editor.isActive("highlight")
            ? " bg-blue text-white p-1 rounded-lg"
            : "text-white p-1"}`
        }
      >
        <FaHighlighter  className=" scale-[80%] "/>
      </button>
      {pop2 &&<div className=' w-40  bg-metal border-[1px] border-white border-opacity-40  right-0 absolute top-4 flex flex-wrap z-30 rounded-sm shadow-sm'>
        {
            colorList.map((e,i)=>{
                return(
                    <div key={i} className={` h-fit m-1 border-[1px] border-transparent ${editor.isActive('highlight', { color: e }) && "border-white"} hover:border-white  rounded-full overflow-hidden cursor-pointer`}>
                        <div style={{backgroundColor:e}} className={` w-5 h-5`} onClick={()=>{
                            setcol2(e)
                            editor.commands.toggleHighlight({ color: e})
                            setpop2(false)
                          }
                            
                            }></div>
                    </div>
                )
            })
        }
        
        </div>}
      </div>

      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().undo().run();
        }}
        className={`
          ${editor.isActive("undo")
            ? " bg-blue text-white p-1 rounded-lg"
            : "text-white p-1"}`
        }
      >
        <FaUndo className=" scale-[80%] "/>
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleCode().run()
        }}
        className={`
          ${editor.isActive("code")
            ? " bg-blue text-white p-1 rounded-lg hidden sm:block"
            : "text-white p-1 hidden sm:block"}`
        }
      >
        <FaCode className=" scale-[80%]  "/>
      </button>
      <button>
        <FaAlignRight className='text-white sm:hidden   scale-[80%] '       
         onClick={(e) => {
          e.preventDefault();
          setmenu(!menu)
        }}/>
    </button>
    </div>

   <div className={` ${menu?"flex":"hidden sm:flex"}  justify-around absolute sm:static py-1 pt-2 sm:py-0 bg-chatbg z-20  top-8 sm:top  sm:justify-end items-center sm:pr-2  w-full sm:w-[40%]   2xl:w-5/12`}>
    <button
        onClick={(e) => {
          e.preventDefault();
          editor.chain().focus().toggleBlockquote().run();
          setmenu(false)
        }}
        className={`
          ${editor.isActive("blockquote")
            ? " bg-blue text-white rounded-lg sm:hidden block"
            : "text-white  sm:hidden block"}`
        }
      >
        <FaQuoteRight className=" scale-[80%] " />
      </button>
    <div className=' relative flex sm:hidden  justify-center' onMouseEnter={handleColor2} onMouseLeave={handleLeave2}>
      <button
        onClick={(e) => {
          e.preventDefault();
          setpop2(true)
        }}
        className={`
          ${editor.isActive("highlight")
            ? " bg-blue text-white  rounded-lg"
            : "text-white"}`
        }
      >
        <FaHighlighter  className=" scale-[80%] "/>
      </button>
      {pop2 &&<div className=' w-40  bg-metal border-[1px] border-white border-opacity-40 left-0 absolute top-4 flex flex-wrap z-30 rounded-sm shadow-sm'>
        {
            colorList.map((e,i)=>{
                return(
                    <div key={i} className={` h-fit border-[1px] border-transparent ${editor.isActive('highlight', { color: e }) && "border-white"} hover:border-white  rounded-full overflow-hidden cursor-pointer`}>
                        <div style={{backgroundColor:e}} className={` w-5 h-5`} onClick={()=>{
                            setcol2(e)
                            editor.commands.toggleHighlight({ color: e})
                            setpop2(false)
                            setmenu(false)
                          }
                            
                            }></div>
                    </div>
                )
            })
        }
        
        </div>}
      </div>
      <div className=' relative '>
      <button
        type="submit"
        className=" scale-[80%] text-white hover:text-white"
        onClick={(e)=>{
          e.preventDefault();
          setImagepop(false)
          setVideopop(false)
          setlinkpop2(false)
          setlinkpop(!linkpop)
          setVideopop2(false)
        }}
      >
       <FaLink />
      </button>

      {(linkpop && !imagepop && !videopop && !linkpop2 && !videopop2) &&<div className='shadow-sm border-[1px] border-white border-opacity-20 absolute top-8 w-40 lg:w-60 z-30 text-xs  font-semibold  py-2 text-white bg-metal rounded-sm -right-40 sm:right-0 flex justify-center'>
        <form className=' w-[90%] flex flex-col items-center' onSubmit={Addlink}>
          <input type='text'   className=' w-full bg-transparent px-2 border-white border-[1px] border-opacity-20 mb-2 h-7 rounded-sm' placeholder='Title...' onChange={(e)=>{
            settitle(e.target.value)
          }} required/>
          <input type='text'  className=' w-full bg-transparent mb-2 px-2 border-white border-[1px] border-opacity-20 h-7 rounded-sm' placeholder='Link...' onChange={(e)=>{
            sethref2(e.target.value)
          }} required/>
        <input type='submit' value={"Add"} className=' text-blacke bg-green cursor-pointer  w-20 rounded-sm py-1  '/>
        </form>
      </div>}
      </div>
            <div className=' relative ml-4' >
      <button
        type="submit"
        className=" scale-[80%] text-white hover:text-white"
        onClick={(e)=>{
          e.preventDefault();
          setImagepop(false)
          setVideopop(false)
          setlinkpop2(!linkpop2)
          setlinkpop(false)
          setVideopop2(false)
        }}
      >
       <FaExternalLinkSquareAlt />
      </button>

      {(linkpop2 && !imagepop && !videopop && !linkpop && !videopop2) &&<div className='shadow-sm border-[1px] border-white border-opacity-20 absolute top-8 w-40 lg:w-60 z-30 text-xs  font-semibold  py-2 text-white bg-metal rounded-sm -right-40 sm:right-0  flex justify-center'>
        <form className=' w-[90%] flex flex-col items-center' onSubmit={Add}>
          <input type='text'  className=' w-full bg-transparent mb-2 px-2 border-white border-[1px] border-opacity-20 h-7 rounded-sm' placeholder='Preview Link...' onChange={(e)=>{
            sethref(e.target.value)
          }} required/>
          {loadp? <div className='rounded-sm hover:shadow-none cursor-pointer font-semibold bg-green shadow-sm px-8 py-2 text-sm'>
                                    <div className="w-3 h-3 rounded-full border-[1px] border-blacke border-b-0 animate-spin"></div>
                                </div>:<input type='submit' value={"Add"} className=' bg-green text-blacke cursor-pointer  w-20 rounded-sm py-1  '/>}
        </form>
      </div>}
      </div>
      <div className=' relative ml-4'>
      <button
        type="submit"
        className=" scale-[80%]  text-white hover:text-white"
        onClick={(e)=>{
          e.preventDefault();
          setlinkpop(false)
          setVideopop(false)
          setImagepop(!imagepop)
          setlinkpop2(false)
          setVideopop2(false)
        }}
      >
      <FaImage />
      </button>

      {(imagepop && !videopop && !linkpop && !linkpop2 && !videopop2) &&<div className='shadow-sm absolute top-8 w-40 lg:w-60 z-30 text-xs  font-semibold  py-2 text-white bg-metal border-[1px] border-white border-opacity-20 rounded-sm right-0 flex justify-center'>
        <form className=' w-[90%] flex flex-col items-center' onSubmit={AddImage}>
          <input type='text'   className=' w-full bg-transparent px-2 border-white border-[1px] border-opacity-20 mb-2 h-7 rounded-sm' placeholder='Image Link...' onChange={(e)=>{
            setImag(e.target.value)
          }} required/>
          <input type='submit' value={"Add"} className=' bg-green cursor-pointer text-blacke  w-20 rounded-sm py-1  '/>
        </form>
      </div>}
      </div>
      <div className=' relative ml-4'>
      <button
        type="submit"
        className=" scale-[80%]  text-white hover:text-white"
        onClick={(e)=>{
          e.preventDefault();
          setImagepop(false)
          setlinkpop(false)
          setVideopop(!videopop)
          setlinkpop2(false)
          setVideopop2(false)
        }}
      >
      <FaVideo />
      </button>

      {(videopop && !imagepop && !linkpop && !linkpop2 && !videopop2) &&<div className='border-[1px] border-white border-opacity-20 shadow-sm absolute top-8 w-40 lg:w-60 z-30 text-xs  font-semibold  py-2 text-white bg-metal rounded-sm right-0 flex justify-center'>
        <form className=' w-[90%] flex flex-col items-center' onSubmit={AddVideo}>
          <input type='text'   className=' w-full bg-transparent px-2 border-white border-[1px] border-opacity-20 mb-2 h-7 rounded-sm text-xs' placeholder='Embed Video Link' onChange={(e)=>{
            setVideo(e.target.value)
          }} required/>
          <input type='submit' value={"Add"} className=' bg-green cursor-pointer text-blacke  w-20 rounded-sm py-1  '/>
        </form>
      </div>}
      </div>
      <div className=' relative ml-4'>
      <button
        type="submit"
        className="scale-[80%] text-white hover:text-white"
        onClick={(e)=>{
          e.preventDefault();
          setImagepop(false)
          setlinkpop(false)
          setVideopop2(!videopop2)
          setlinkpop2(false)
          setVideopop(false)
        }}
      >
      <FaYoutube />
      </button>

      {(videopop2 && !videopop && !imagepop && !linkpop && !linkpop2) &&<div className='border-[1px] border-white border-opacity-20 shadow-sm absolute top-8 w-40 lg:w-60 z-30 text-xs  font-semibold  py-2 text-white bg-metal rounded-sm right-0 flex justify-center'>
        <form className=' w-[90%] flex flex-col items-center' onSubmit={AddVideo2}>
          <input type='text'   className=' w-full bg-transparent px-2 border-white border-[1px] border-opacity-20 mb-2 h-7 rounded-sm text-xs' placeholder='Youtube Video Link' onChange={(e)=>{
            setVideo2(e.target.value)
          }} required/>
          <input type='submit' value={"Add"} className=' bg-green cursor-pointer text-blacke  w-20 rounded-sm py-1  '/>
        </form>
      </div>}
      </div>

      </div>
 
  </div>
  )
}

export default Tip