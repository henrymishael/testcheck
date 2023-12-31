'use client';
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Image from 'next/image'
import tv from '../../../../public/images/tv.png';
import { AiOutlineHome  } from "react-icons/ai";
import { PiTelevisionLight  } from "react-icons/pi";
import { LuVideo } from "react-icons/lu";
import { IoCalendarOutline } from "react-icons/io5";
import Link from 'next/link';
import YouTube from 'react-youtube';




export default function page() {
    
    const [selectedMovie, setSelectedMovie] = useState([]);
    const [selectedVideo, setSelectedVideo] = useState([])
    const IMG_URL = 'https://image.tmdb.org/t/p/original'
    const API_KEY = 'api_key=73014d3d6afb77d4c6482499395d4e95'
    
    const backgroundImage = `${IMG_URL}${selectedMovie?.backdrop_path}`
    const {id} = useParams();
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3MzAxNGQzZDZhZmI3N2Q0YzY0ODI0OTkzOTVkNGU5NSIsInN1YiI6IjY0ZmY2NGYwMmRmZmQ4MDEwMDE0ODVhMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EJYLY68pCva5JCfyJBBcL8LURWMBALPHHPwsz73IpDE'
        }
      };

      

      useEffect(() => {
        const fetchMovieDetails = async () => {
          try {
            const url = `https://api.themoviedb.org/3/movie/${id}?${API_KEY}&language=en-US`;
            const response = await fetch(url);
    
            if (!response.ok) {
              throw new Error(`Failed to fetch movie details. Status code: ${response.status}`);
            }
    
            const data = await response.json();
            setSelectedMovie(data); // Set the entire movie object, not just a property
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchMovieDetails(); // Call the fetchMovieDetails function
    
      }, [id]); // Include 'id' as a dependency to re-fetch when the ID changes
      const posterPath = selectedMovie.poster_path
      ? `https://image.tmdb.org/t/p/w1280${selectedMovie.poster_path}`
      : '/../../../../public/images/poster.png';

      async function fetchMovieVideos(movieId) {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}&language=en-US&append_to_response=videos,credits`
          );
          if (!response.ok) {
            throw new Error('Failed to fetch movie details');
          }
          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Error fetching movie details:", error);
          throw error;
        }
      }

      async function loadMovieTrailer(movieId) {
        try {
          const movieDetails = await fetchMovieVideos(movieId);
      
          if (movieDetails.videos && movieDetails.videos.results) {
            // Filter for videos with type 'Trailer'
            const trailers = movieDetails.videos.results.filter(
              (video) => video.type === 'Trailer'
            );
      
            // Extract YouTube trailer keys from the filtered trailers
            const youtubeTrailerKeys = trailers.map((trailer) => trailer.key);
      
            return youtubeTrailerKeys;
          } else {
            console.error("No videos found for this movie.");
            return [];
          }
        } catch (error) {
          console.error("Error loading movie trailer:", error);
          return [];
        }
      }
      


      // useEffect(() => {
      //   const fetchMovieTrailer = async () => {
      //     try {
      //       const url = `https://api.themoviedb.org/3/movie/${movieid}?${API_KEY}&language=en-US&append_to_response=videos,credits`;

      //       const response = await fetch(url);
    
      //       if (!response.ok) {
      //         throw new Error(`Failed to fetch movie Trailer. Status code: ${response.status}`);
      //       }
    
      //       const data = await response.json();
      //       setSelectedVideo(data.videos.resultsfind(
      //         (video) => video.type === "Trailer"
      //       ));
      //     } catch (error) {
      //       console.error(error);
      //     }
      //   };
    
      //   fetchMovieTrailer(); // Call the fetchMovieDetails function
    
      // }, [id]); 


      // const fetchMovieTrailer = async(movieid)  => {
      //   try {
      //     const response = await fetch(
      //       `https://api.themoviedb.org/3/movie/${movieid}?${API_KEY}&language=en-US&append_to_response=videos,credits`
      //     );
      //     const data = await response.json();
      //     return data;
      //   } catch (error) {
      //     console.error("Error fetching movie details:", error);
      //     throw error;
      //   }
      // }
      // const movieDetails = fetchMovieTrailer(id);
      // if (movieDetails.videos && movieDetails.videos.results) {
      // const trailer = selectedMovie.videos.results.find(
      // (video) => video.type === "Trailer"
      //  );

        // Extract the YouTube trailer key
      
     
      const releaseDate = new Date(selectedMovie.release_date);
      const utcReleaseDay = releaseDate.toUTCString().slice(0,17);
    
      
    
  return (
    <div className='w-[100vw] h-[100vh] flex  flex-row' >
        <div className='xsm:hidden h-[100vh] md:flex flex-col items-center lg:w-[20%] md:w-[30%] bg-[#242424] rounded-tr-[24px] rounded-br-[24px] text-white pt-6 '>
          <span className='cursor-pointer w-[80%] flex flex-row  justify-around items-center text-[24px] font-semibold'>
                    <Image src={tv} alt="logo" width='50' height='50'/>
                    <h4>MovieBox</h4>
          </span>
        <nav className='flex flex-col gap-20 mt-24 w-[100%] items-center'>
          <Link href='../'>
          <span className='cursor-pointer flex flex-row items-center gap-3 w-[100%] justify-center h-[86px]'>
            <AiOutlineHome/>
            <h3>Home</h3>
          </span>
          </Link>
          <span className='bg-[#be123d3b] flex flex-row items-center justify-center gap-3 border-r-2 border-[#be123c] w-[100%]  h-[86px]'>
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
        <div className='mt-4 w-[100%] flex  flex-col md:px-16 xsm:px-0 items-center  '>
        <Image  className='rounded-[16px]  lg:bg-cover xsm:bg-contain w-[70vw] xsm:h-[40vh] lg:h-[60vh]' src={backgroundImage} width='300' height='300'/>
          
            <div className='lg:mt-3 xsm:mt-8  flex flex-col md:gap-4  xsm:gap-1 xsm:px-4 md:px-0'>
              <span className='flex md:flex-row xsm:flex-col lg:gap-6 xsm:gap-2 items-center md:justify-between xsm:justify-center'>
              <h2 data-testid='movie-title' className='md:text-[30px] xsm:text-[22px] font-bold'>Title: {selectedMovie.title}</h2>
              <p className='md:text-[20px] xsm:text-[12px] text-center' data-testid='movie-release-date'>Release Date: {utcReleaseDay}</p>
              <p className='md:text-[20px] xsm:text-[12px]'data-testid='movie-runtime'>Runtime: {selectedMovie.runtime}mins</p>
              </span>
              <p data-testid='movie-overview' className='text-[16px] leading-8'>{selectedMovie.overview}</p>
            </div>
        </div>
        </div>
   
  )
}
