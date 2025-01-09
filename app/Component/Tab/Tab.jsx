"use client";
import React, { useState } from 'react';
import { useRouter } from 'next-nprogress-bar';
import { Encode } from './Encode';
import { FaSketch,  FaTools, FaBeer, FaSnapchatGhost,FaCoins , FaPiedPiperHat,FaGamepad ,FaRobot, FaFilePrescription,FaAngleUp,FaAngleDown} from "react-icons/fa";
import { SiFreelancer } from "react-icons/si";
import { FaMoneyCheckDollar,FaComputer,FaComputerMouse } from "react-icons/fa6"
import { SiWebmoney } from "react-icons/si";
import { GiBuyCard,GiCyberEye,GiAlienBug  } from "react-icons/gi";
import { DiAndroid } from "react-icons/di";
import { SiOnlyfans } from "react-icons/si";


const Tab = ({ data,opening }) => {
  const navigate = useRouter();
  const [open, setopen] = useState(opening)
  const Check = (src) => {
    switch (src) {
      case 'book':
        return "📕";
      case 'rank':
        return "🈺";
      case 'km':
        return "💥";
      case 'note':
        return "🖇️";
      case 'cyb':
        return <GiCyberEye  className="text-red" />;
 
      case 'fs':
        return <img src='/xxx.png' className=' w-10'/>;
      case 'pg':
        return "🐦";
      case 'ts':
        return "🇫🇷";
      case 'bm':
        return <FaBeer className="text-green" />;
      case 'news':
        return "🍿";
      case 'sfs':
        return <SiWebmoney className=' text-yellow'/>;
      case 'oi':
        return <FaCoins className=" text-yellow"/>;
        case 'gd':
        return < FaSnapchatGhost className="text-yellow"/>;
      case 'as':
        return "🇪🇸";
      case 'other':
        return <FaSketch className=' text-green'/>;
      case 'report':
        return "🚨";
      case 'md':
        return <SiOnlyfans className="text-blue"/>;
      case 'com':
        return "🫦"
      case 'it':
          return "👙";
      case 'ai':
          return <FaRobot className='  text-white'/>;
      case 'bh':
          return <GiAlienBug className='  text-white'/>;
      case 'scr':
        return <FaFilePrescription className='  text-white'/>;
      default:
        return "📕";
    }
  };

  const Change =()=>{
    setopen(!open)
  }

  return (
    <div className='w-full mb-5 shadow-[0px_2px_2px_#000000] rounded-sm overflow-hidden'>
      <div>
        <section className='w-full cursor-pointer text-white flex justify-between items-center px-5 bg-blue' onClick={Change}>
          <h1 className='py-2   sm:text-base text-sm font-semibold'>{data.title}</h1>
          <div className='  transition-all duration-300 ease-in-out'  >{open?<FaAngleUp className=' scale-125'/>:<FaAngleDown className=' scale-125'/>}</div>
        </section>
        {open&&<section className='bg-textbg'>
          {data?.categories?.map((e, i) => {
            let url = Encode(e.direction);
            return (
              <div key={i} className='py-4 px-5 border-b-gray border-b-[1px] border-opacity-20'>
                <div className='flex items-center cursor-pointer' onClick={() => {
                  navigate.push(`/thread/${url}/1/latest`)}}>
                  <section className='mr-3 text-xl sm:text-3xl'>{Check(e.icon)}</section>
                  <section>
                    <h2 className='font-semibold text-white mb-1 text-[13px] sm:text-sm 2xl:text-base'>{e.name}</h2>
                    {e.about !== '' && <p className='text-gray sm:text-sm text-[11px]'>{e.about}</p>}
                  </section>
                </div>
                <div></div>
              </div>
            );
          })}
        </section>}
      </div>
    </div>
  );
};

export default Tab;
