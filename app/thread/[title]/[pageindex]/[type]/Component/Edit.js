import React,{useState} from 'react'
import * as yup from 'yup'
import { Formik } from 'formik'




const Edit = ({id, setedit, mod, title, image, stick, category, replyallow}) => {
  const Api = process.env.NEXT_PUBLIC_DOMAIN
  const Main = process.env.NEXT_PUBLIC_MAIN

      const [load, setload] = useState(false)
      const Pass = yup.object({
        title: yup.string().required().max(150).min(2).label('Thread Title'),
        image: yup.string().required().label('Thread Image'),
        sticky:yup.boolean().required('Sticky status is required'),
        replyallow: yup.boolean().required('Please select an option'),
        category: yup.string().oneOf([
          'Self Promotion', 'Requests', 'General Discussion', 'Twitter', 'Onlyfans',
          , 'Snapchat', 'Beermoney','Trending Leaks','Member Review','Celebrities',
          'Public Exhibition', 'XXX', 'Ai Fakes', 'Others','Forum Guides & Updates','Report Issues','Adult Comics','Content Sales','French','Spanish','Other Topics'], 'Invalid category').required('Category is required'),
      })

  return (
    <div className=' w-full relative'>
      <div className=' absolute top-2 right-2'>
        <p className=' bg-red px-2 py-1 text-sm cursor-pointer  text-blacke rounded-sm' onClick={()=>setedit(false)}>Close</p>
      </div>
         <Formik
                initialValues={{title:title,image:image, sticky: stick,replyallow: replyallow, category:category  }}
                validationSchema={Pass}
                onSubmit={async(form)=>{
                  try{
                    setload(true)
                    const storedProfile = localStorage.getItem('profile');
                const prof = JSON.parse(storedProfile);
                const logg = localStorage.getItem("data");
                const logged = JSON.parse(logg);
                if(!logged){
                  return;
              }
              const fallbackImage = `${Main}/df.png`
              async function validateImage(url) {
                try {
                  const response = await fetch(url, { method: "HEAD" });
                  return response.ok;
                } catch {
                  return false;
                }
              }
              let imag = form.image
              const isValidImage = await validateImage(imag);
              if (!isValidImage) {
                imag = fallbackImage;
              }
              form.image = imag
              const token = logged.token;
                  const data = await fetch(`${Api}/editpost/${id}/${prof._id}`,{
                    method:'PUT',
                    headers:{'Content-Type': 'application/json', "auth-token": token,},
                    body:JSON.stringify(form)
                  })
                  const info = await data.json()
                  if(info.auth)
                  {
                    window.location.reload()
                  }
                  else{
                    window.location.reload()
                  }
                }catch(e){
                  console.log(e)
                  window.location.reload()

                }

                }
              
              }
                
                >
                  {(prop)=>{
                    return(
                      <form className=' w-full text-white'>
                                        <div><h1 className=' font-semibold sm:text-xl mb-5 whitespace-nowrap text-white'>Edit Theard:</h1></div>
                <div className=' flex flex-col sm:flex-row w-full justify-between items-center text-sm  whitespace-nowrap'><p className=' mr-3'>Thread Title: </p><div className='w-full'><input    type='text' placeholder='* * * * *' className='w-full sm:w-96 h-9 px-3 bg-transparent border-[1px] border-gray border-opacity-25' value={prop.values.title} onChange={prop.handleChange("title")}/></div></div>
                <div className=' text-red text-sm mb-10'>{prop.touched.title &&prop.errors.title}</div>
                <div className=' flex flex-col sm:flex-row justify-between items-center text-sm  whitespace-nowrap'><p className=' mr-3'>Image Link: </p><div className='w-full'><input  type='text'  placeholder='* * * * *' className='w-full sm:w-96 h-9 px-3 bg-transparent border-[1px] border-gray border-opacity-25' value={prop.values.image} onChange={prop.handleChange("image")}/></div></div>
                <div className=' text-red text-sm mb-10'>{prop.touched.image &&prop.errors.image}</div>
                {mod &&(<div className='flex flex-col mb-5 sm:flex-row justify-between items-center text-sm'>
            <p className='whitespace-nowrap mr-3'>Sticky Post: </p>
            <div className='w-full flex items-center'>
              <label className='mr-7 flex items-center '>
                <input
                  type='radio'
                  name='sticky'
                  value={true}
                  checked={prop.values.sticky === true}
                  onChange={() => prop.setFieldValue("sticky", true)}
                  className=' mr-1'
                />
                Sticky
              </label>
              <label className=' flex items-center '>
                <input
                  type='radio'
                  name='sticky'
                  value={false}
                  checked={prop.values.sticky === false}
                  onChange={() => prop.setFieldValue("sticky", false)}
                  className=' mr-1'
                />
                Normal
              </label>
            </div>
          </div>)}
          {mod &&(<div className='flex flex-col sm:flex-row justify-between items-center text-sm'>
        <p className='whitespace-nowrap mr-3'>Allow Replies: </p>
        <div className='w-full flex items-center'>
          <label className='mr-7 flex items-center'>
            <input
              type='radio'
              name='replyallow'
              value={true}
              checked={prop.values.replyallow === true}
              onChange={() => prop.setFieldValue('replyallow', true)}
              className='mr-1'
            />
            Yes
          </label>
          <label className=' flex items-center'>
            <input
              type='radio'
              name='replyallow'
              value={false}
              checked={prop.values.replyallow === false}
              onChange={() => prop.setFieldValue('replyallow', false)}
              className='mr-1'
            />
            No
          </label>
        </div>
      </div>)}
      <div className='text-red text-sm mb-10'>{prop.touched.replyallow && prop.errors.replyallow}</div>
      
      {mod &&(<div className='flex flex-col sm:flex-row justify-between items-center text-sm'>
        <p className='whitespace-nowrap mr-3'>Category: </p>
        <div className='w-full'>
          <select
            name='category'
            className='w-full sm:w-96 h-9 px-3 bg-transparent bg-textbg  border-[1px] border-gray border-opacity-25'
            value={prop.values.category}
            onChange={prop.handleChange('category')}
          >
            <option value='' label='Select category' className='bg-textbg ' />
            <option value='Forum Guides & Updates' className='bg-textbg '>Forum Guides & Updates</option>
            <option value='Self Promotion' className='bg-textbg '>Self Promotion</option>
            <option value='Requests' className='bg-textbg '>Requests</option>
            <option value='General Discussion' className='bg-textbg '>General Discussion</option>
            <option value='Twitter' className='bg-textbg '>Twitter</option>
            <option value='Onlyfans' className='bg-textbg '>Onlyfans</option>
            <option value='Snapchat' className='bg-textbg '>Snapchat</option>
            <option value='Beermoney' className='bg-textbg '>Beermoney</option>
            <option value='Trending Leaks' className='bg-textbg '>Trending Leaks</option>
            <option value='Celebrities' className='bg-textbg '>Celebrities</option>
            <option value='Public Exhibition' className='bg-textbg '>Public Exhibition</option>
            <option value='XXX' className='bg-textbg '>XXX</option>
            <option value='Ai Fakes' className='bg-textbg '>Ai Fakes</option>
            <option value='Adult Comics' className='bg-textbg '>Adult Comics</option>
            <option value='Others' className='bg-textbg '>Others</option>
            <option value='Content Sales' className='bg-textbg '>Content Sales</option>
            <option value='French' className='bg-textbg '>French</option>
            <option value='Spanish' className='bg-textbg '>Spanish</option>
            <option value='Other Topics' className='bg-textbg '>Other Topics</option>
            <option value='Report Issues' className='bg-textbg '>Report Issues</option>
            <option value='Member Review' className='bg-textbg '>Member Review</option>
          </select>
        </div>
      </div>)}
      <div className='text-red text-sm mb-10'>{prop.touched.category && prop.errors.category}</div>
      
                <div className=' flex flex-col sm:flex-row justify-end items-center mb-10'>  {load ? (
                                <div className='rounded-md hover:shadow-none cursor-pointer font-semibold bg-green shadow-md px-8 py-2 text-sm'>
                                    <div className="w-3 h-3 rounded-full border-[1px] border-blacke border-b-0 animate-spin"></div>
                                </div>
                            ) : <div><input type='submit' className='bg-green text- text-blacke sm:text-sm text-blecke px-7 py-1 rounded-sm cursor-pointer'  value="SUBMIT" onClick={prop.handleSubmit} /></div>}</div>
                      </form>
                    )

                  }
                  }
                </Formik>
    </div>
  )
}

export default Edit