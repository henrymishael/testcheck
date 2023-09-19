'use client';


import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import tv from '../../../public/images/tv.png';
import imdb from '../../../public/images/imdb.png';
import rt from '../../../public/images/tomatoes.png';
import { AiOutlineSearch  } from "react-icons/ai";
import { AiFillPlayCircle  } from "react-icons/ai";
import { PiEqualsBold } from "react-icons/pi";
import { handleInputChange } from '../functions/page';
import { handleSubmit } from '../functions/page';
import { getTrendingMovies } from '../utils/request';
import post from '../../../public/images/Poster.png';
import postsm from '../../../public/images/sm.png';
import Navbar from './Navbar.jsx';
import { IMG_URL } from '../utils/request';

function Header() {
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const [animationClass, setAnimationClass] = useState('');
   
    const Img_url = 'https://image.tmdb.org/t/p/original/'
    const Img_url2 = 'https://image.tmdb.org/t/p/w1280'

   
    useEffect(() => {
        async function fetchTrendingMovies() {
            try {
                const movies = await getTrendingMovies()
                //check if the fetched url response is not empty
                if (Array.isArray(movies) && movies.length > 0) {
                    setTrendingMovies(movies);

                  

                //randomly display trending movies
                    const randomIndex = Math.floor(Math.random() * movies.length)
                    const randomMovie = movies[randomIndex];
                    setMovie(randomMovie)

                    // Apply the slide-in animation
                        setAnimationClass('slide-in');
                        // Remove the animation class after a delay 
                         setTimeout(() => {
                            setAnimationClass('');
                        }, 500); // 1000 milliseconds = 1 second
                        
                }else {
                    //error handling
                    setError("Invalid API response: There is nothing here")
                }
            }catch(error){
                setError("trending movies: something went wrong")
            }
        }

        
        
        fetchTrendingMovies();
        setInterval(fetchTrendingMovies, 40000);
        const intervalId = setInterval(fetchTrendingMovies, 20000);

         // Clean up the interval when the component unmounts to avoid memory leaks
            return () => clearInterval(intervalId);
    }, []);

        

   
   
   const backgroundImage = `${Img_url}${movie?.backdrop_path}`
   const backgroundImage2 = `${Img_url2}${movie?.backdrop_path}`
    
     

    const imdb_id = Math.ceil(movie?.vote_average * 10)
    

    return(
        <div className=' relative left-0 top-0  '>
            <div className={`absolute `}>
             <Image className={` slide-in lg:bg-cover lg:bg-center xsm:hidden md:block w-[100vw] md:h-[100vh] lg:h-[100vh] xsm:h-[100vh]`} src={backgroundImage} alt="poster"  width='1000' height='1000'/>
             <Image className={`overflow-auto slide-in lg:hidden  bg-center bg-cover md:hidden w-[100vw]  md:h-[40vh] lg:h-[100vh] xsm:h-[100vh]`} src={backgroundImage2} alt="poster"  width='1280' height='300'/>
            
        </div>
        <div className={`w-[100vw] h-[100vh]`}>
        <header className='relative  xsm:px-3 lg:px-[70px]  w-[100%] xsm:h-[100vh] md:h-[100vh] lg:h-[70vh] text-white '>
            <Navbar className='fixed'/>
            <div className='relative lg:mt-24  xsm:mt-10 md:w-[80%] lg:w-[60%] xsm:w-[80%] sm:w-[200px] flex flex-col lg:gap-[16px] xsm:gap-[14px] md:gap-[12px] w-[80%] h-[100%]  justify-center md:px-8'> 
                <h2 className='xsm:text-[30px]  md:text-[60px] md:leading-[65px] lg:text-[48px] lg:leading-[56px] xsm:leading-[32px]  font-bold '>{movie?.title}</h2>
                <div className=' flex flex-row md:gap-5 xsm:gap-2  xsm:text-[10px] md:text-[12px] xsm:text-white '> 
                    <span className='flex flex-row items-center xsm:gap-2 md:gap-2'>
                        <Image src={imdb} alt="imdb"/>
                        <h4>{imdb_id}%</h4>
                    </span>
                    <span className='flex flex-row items-center gap-2'>
                        <Image src={rt} alt="rotten"/>
                        <h4>97%</h4>
                    </span>
                </div>
                <p className='xsm:text-[16px]  md:text-[18px] lg:text-[14px] md:w-auto sm:w-[150%]   text-white '>{movie?.overview}</p>
                <button className='flex items-center justify-center gap-2 lg:w-[169px] xsm:w-[120px] xsm:h-[28px] lg:h-[36px] text-white bg-[#BE123C] lg:text-[14px] xsm:text-[10px] rounded-[6px]'><span className='text-[20px]'><AiFillPlayCircle/></span>WATCH TRAILER</button>
            </div>
        </header>
        </div>
        </div>
    )
   
}
export default Header
