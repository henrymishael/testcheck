import React from 'react'
import Favorite from './favorite'
import Image from 'next/image'
import Link from 'next/link'
import { IMG_URL } from '../utils/request'

const Card = ({movie}) => {
    //const IMG_URL = 'https://image.tmdb.org/t/p/w220_and_h330_face'



  return (
    <div>
        <figure data-testid='movie-card' key={movie.id} className='relative bg-white shadow-md  xsm:w-[250px] sm:w-[350px] sm:h-[490px]      xsm:h-[350px]   text-black md:w-[220px] lg:w-[240px]'>
                             <span className='absolute z-[2] right-2 top-2'>
                             <Favorite /></span>
                        <div className='delay-75 xsm:w-[250px] sm:w-[350px] md:h-[370px] sm:h-[370px] xsm:h-[270px] md:w-[220px] lg:w-[240px] '>
                        <Link href={`/movies/${movie.id}`}>
                            <Image data-testid='movie-poster' className=' bg-contain sm:h-[370px] sm:w-[350px] md:w-[250px]   xsm:h-[270px] xsm:w-[250px] lg:w-[240px]' src={movie.poster_path
        ? `${IMG_URL + movie.poster_path}`
        : '/../../public/images/poster.png'}  width='220' height='370' alt="poster"/> </Link>
                        </div>
                       
                        <span className='flex flex-col p-2 lg:text-left xsm:gap-1 font-semibold sm:text-[18px] xsm:text-[13px] '>
                        <span className='flex-row justify-between items-center  text-[#9CA3AF]'>
                        <h4 data-testid='movie-release-date' className='md:text-[12px] xsm:text-[12px] text-[#9CA3AF]'>{movie.release_date}</h4>
                        <p>{movie.imdb_id}</p>
                        </span>
                            <h3 className='font-bold' data-testid='movie-title'>{movie.title.length > 48 ? (movie.title.slice(0,48)) : movie.title}</h3>

                            
                        </span>
                    </figure>
    </div>
  )
}
export default Card
