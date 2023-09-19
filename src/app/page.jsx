"use client";
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

import imdb from '../../public/images/imdb.png';
import rt from '../../public/images/tomatoes.png';
import post from '../../public/images/Poster.png';
import postsm from '../../public/images/sm.png';
import { AiOutlineSearch  } from "react-icons/ai";
import { AiFillPlayCircle  } from "react-icons/ai";
import { AiOutlineRight  } from "react-icons/ai";
import { PiEqualsBold } from "react-icons/pi";
import Loader from './components/loader.jsx';
import { FaFacebookSquare  } from "react-icons/fa";
import { FaInstagram  } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import tv from '../../public/images/tv.png';
import { LuVideo } from "react-icons/lu";
import { IoCalendarOutline } from "react-icons/io5";
import { AiOutlineHome  } from "react-icons/ai";
import { PiTelevisionLight  } from "react-icons/pi";
import Link from 'next/link';
import Favorite from './components/favorite.jsx';
import Header from './components/header.jsx';




const page = () => {
    
    const [movies, setMovies] = useState([]);
    const [topMovies, setTopMovies] = useState([])
     const [error, setError] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [searchResults, setSearchResults] = useState([])
    const [isloading, setIsLoading] = useState(false)
    const [sidebar, showSideBar] = useState(false)

    
    const API_KEY = 'api_key=73014d3d6afb77d4c6482499395d4e95'
    const BASE_URL = 'https://api.themoviedb.org/3'
    const API_URL = BASE_URL + '/movie/top_rated?language=en-US&page=1' + API_KEY
    const ApiUrl = BASE_URL + '/movie/top_rated?language=en-US&page=1' + API_KEY
    const IMG_URL = 'https://image.tmdb.org/t/p/'
    const searchURL = BASE_URL + '/search/movie?'+API_KEY
    
    //'/movie/top_rated?language=en-US&page=1'
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzAxNGQzZDZhZmI3N2Q0YzY0ODI0OTkzOTVkNGU5NSIsInN1YiI6IjY0ZmY2NGYwMmRmZmQ4MDEwMDE0ODVhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EJYLY68pCva5JCfyJBBcL8LURWMBALPHHPwsz73IpDE'
        },
        params: {
            api_key:API_KEY,

        }

      };

      useEffect(() => {
       
      
          fetch(API_URL, options)
            .then(response => response.json())
            .then(data => {
                
                setMovies(data.results.slice(0,10));
                })

            .catch(err => setError('failed to fetch movie data', err));
            
        }, []);

        const Movies2 = async () => {
          const res = await fetch(
          ApiUrl)
          .then(res => res.json())
          .then(data => {
            setMovies((data.results))
          },[])
          
        };

       const handleSeeMore =  () => {
        setMovies(Movies2)
       }

       

        
        const toggleSideBar = () => {
          showSideBar(!sidebar);
          if(!sidebar) {
              document.body.style.overflow = 'hiddden';
          }else{
              document.body.style.overflow ='auto';
          }
      }

        const handleInputChange = (e) => {
            setInputValue(e.target.value);
            console.log(searchResults)
        }
        
        // Function to handle search srequests
        const handleSubmit = (e) => {
            e.preventDefault();
            

              if (inputValue) {
                setIsLoading(true);
                   const searchQueryURL = searchURL+'&query='+inputValue
                   fetch(searchQueryURL)
                   .then((response) => response.json())
                   .then((data) => {
                        setSearchResults(data.results)
                        setMovies(data.results);//update search results state
                        setIsLoading(false)
                        setError(null);
                   })
                   .catch((err) => {
                    setSearchResults([]); //clear search results
                    setIsLoading(false);
                    setError('Failed to fetch search results', err)
                   })
              }
            
            console.log('Input Value:', inputValue);
        }

        
        
      
        const posterPath = movies.poster_path ? `https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`
        : '/../../../../public/images/poster.png';

        

  return (
    <div className={`${sidebar ? 'sm:overflow-hidden' : 'overscroll-auto'} w-[100vw] min-h-[100vh] flex flex-col bg-white  `}>
        <Header/>
        <section className=' xsm:mt-6 sm:mt-8 lg:mt-62md:mt-24 xsm:px-[10px] md:px-[20px] lg:px-[40px] w-[100vw] min-h-[100vh]  '>
            <article className='flex flex-col text-white ' >
                <div className='flex flex-row justify-between items-center w-[100%] '>
                    <h2 className='sm:text-[18px] xsm:text-[18px]  md:text-[36px] font-bold text-black'>Featured Movie</h2>

                    <h4 onClick={handleSeeMore}  className='flex flex-row items-center md:text-[18px] xsm:text-[12px]  text-[#f6577f] gap-2 cursor-pointer'>see more <span className='md:text-[20px] xsm:text-[10px]'><AiOutlineRight/></span></h4>
                </div>
                <div className='xsm:mt-3 md:mt-5 grid xsm:grid-cols-1 lg:grid-cols-5 md:grid-cols-3 xsm:gap-[30px] md:gap-[20px] sm:gap-[25px]   '>
                    {/* loop through all the movies */}
                    {/* Display either top movies or search results */}
                    
            {isloading ? (
                    <Loader/>
                    )
              : (
                // Display movies
                (Object.values(movies)).map((movie) => (
                        // movie card
                        
                        <figure data-testid='movie-card' key={movie.id} className='relative bg-white shadow-md  xsm:w-[250px] sm:w-[350px] sm:h-[490px]      xsm:h-[350px]   text-black md:w-[220px] lg:w-[240px]'>
                             <span className='absolute z-[2] right-2 top-2'>
                             <Favorite /></span>
                        <div className='delay-75 xsm:w-[250px] sm:w-[350px] md:h-[370px] sm:h-[370px] xsm:h-[270px] md:w-[220px] lg:w-[240px] '>
                        <Link href={`/movies/${movie.id}`}>
                            <Image data-testid='movie-poster' className=' bg-contain sm:h-[370px] sm:w-[350px] md:w-[250px]   xsm:h-[270px] xsm:w-[250px] lg:w-[240px]' src={movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
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
                   
              ))
                    )
                            }
                </div>
            </article>
        </section>
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

export default page