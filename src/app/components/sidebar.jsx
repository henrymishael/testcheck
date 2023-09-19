import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import tv from '../../../public/images/tv.png';
import { LuVideo } from "react-icons/lu";
import { IoCalendarOutline } from "react-icons/io5";
import { AiOutlineHome  } from "react-icons/ai";
import { PiTelevisionLight  } from "react-icons/pi";

export default function Sidebar() {
    const [sidebar, showSideBar] = useState(false)
  
    const toggleSideBar = () => {
      showSideBar(!sidebar);
      if(!sidebar) {
          document.body.style.overflow = 'hiddden';
      }else{
          document.body.style.overflow ='auto';
      }
  }
    return (
   
        <div className={`${sidebar ? 'sm:flex overflow-none' : 'hidden'} h-[100vh]  flex-col items-center sm:w-[100%] md:w-[20%] bg-[#000000] rounded-tr-[24px] rounded-br-[24px] pt-6 absolute z-[3] xsm:hidden text-white`}>
          <span onClick={toggleSideBar} className='cursor-pointer w-[80%] flex flex-row  justify-around items-center text-[24px] font-semibold'>
                    <Image src={tv} alt="logo" width='50' height='50'/>
                    <h4>MovieBox</h4>
          </span>
        <nav className='flex flex-col gap-20 mt-24 w-[100%] items-center'>
          <Link href='../'>
          <span className='bg-[#be123d3b] border-[#be123c] flex flex-row items-center justify-center gap-3 w-[20vw] border-r-2 h-[86px]'>
            <AiOutlineHome/>
            <h3>Home</h3>
          </span>
          </Link>
          <span className=' flex flex-row items-center justify-center gap-3   w-[100%]  h-[86px]'>
            <LuVideo/>
              <h3>Movies</h3>
          </span>
          <span className='flex flex-row items-center gap-3 w-[100%] justify-center h-[86px]'>
           <PiTelevisionLight/>
           <h3>Tv Series</h3>
          </span>
          <span className='flex flex-row items-center gap-3 w-[100%] justify-center h-[86px]'>
          <IoCalendarOutline/>
          <h3>Upcoming</h3>
          </span>
        </nav>
        </div>
    
  )
}
