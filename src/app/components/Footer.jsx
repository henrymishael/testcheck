import React from 'react'
import { FaFacebookSquare, FaInstagram, FaTwitter, FaYoutube } from 'react-icons/fa'

const Footer = () => {
  return (
    <div>
         <footer className='w-[100%] h-[40vh] bg-black text-white mt-10 flex justify-center'>
            <article className='flex flex-col items-center justify-center md:gap-12 xsm:gap-6'>
                <div className='flex flex-row items-center md:text-[24px] xsm:text-[16px] md:gap-12 xsm:gap-6'>
                  <span>
                      <FaFacebookSquare/>
                  </span>
                  <span>
                      <FaInstagram/>
                  </span>
                  <span>
                      <FaTwitter/>
                  </span>
                  <span>
                      <FaYoutube/>
                  </span>
                </div>
                <div className='md:text-[24px] xsm:text-[12px] flex md:flex-row xsm:flex-col items-center  justify-center md:gap-4 xsm:gap-1'>
                  <p>Conditions of Use</p>
                  <p>Privacy & Policy</p>
                  <p>Press Room</p>
                </div>
                <p className='md:text-[24px] xsm:text-[12px]'>&copy; 2023 MovieBox by Henry Mishael</p>
            </article>
        </footer>
    </div>
  )
}
export default Footer
