import React, { useEffect, useState } from 'react'
import { BASE_URL, API_KEY } from '../utils/request';
import Loader from './loader';
import tv from '../../../public/images/tv.png';
import { AiOutlineSearch } from 'react-icons/ai';
import { PiEqualsBold } from 'react-icons/pi';
import { IMG_URL } from '../utils/request';
import Image from 'next/image';
import Link from 'next/link';


const Navbar = () => {
    const [inputValue, setInputValue] = useState('');
    const [searchResults, setSearchResults] = useState([])
    const [error, setError] = useState(null);
    const [isloading, setIsLoading] = useState(false)
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const searchURL = BASE_URL + '/search/movie?' +API_KEY

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
        console.log(searchResults)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        

          if (inputValue) {
            setIsLoading(true);
               const searchQueryURL = searchURL+'&query='+inputValue
               fetch(searchQueryURL)
                   .then((response) => response.json())
                   .then((data) => {
                        setSearchResults(data.results)
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

        // const posterPath = searchResults.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        // : '/../../../public/images/poster.png';
          

  return (
    <div className=''>
        <nav className={`fixed  top-0 left-0 flex flex-row md:justify-between xsm:justify-around w-[100%] md:h-[80px] xsm:h-[60px]  items-center z-[20]  ${scrolling ? 'bg-black ' : 'bg-transparent'}`}>
                <span className='flex flex-row gap-2 items-center'>
                    <Image className='md:w-[50px] md:h-[50px] xsm:w-[40px] xsm:h-[40px]'src={tv} alt="logo"/>
                    <h4 className='xsm:hidden md:block'>MovieBox</h4>
                </span>
                <div className='flex flex-col xsm:w-[200px] md:w-[525px] '> 
                <span onChange={handleInputChange} className='flex items-center xsm:w-[200px] xsm:h-[40px] md:w-[525px] md:h-[36px] bg-black border-white md:border-2 xsm:border-[1px] md:rounded-[8px] xsm:rounded-[4px] px-4 justify-between '>
                    <input onChange={handleSubmit} className='placeholder:text-[10px] bg-transparent w-[95%] border-none outline-none xsm:text-[16px] md:text-[16px]' type="text" placeholder='what do you want to watch?' />
                    <span onClick={handleSubmit} >
                    <AiOutlineSearch/>
                    </span>
                    
                </span>
                
                {inputValue.length > 0 && (
                <div className='absolute  text-[#be123c] h-[500px] flex flex-col bg-white  md:w-[525px] xsm:w-[230px] mt-8 overflow-auto gap-2 pt-12 scrollbar-thumb-[#be123c] scrollbar-thin '> 
                {isloading ? (
                    <Loader/>
            ) : (
            searchResults.length > 0
              ? (Object.values(searchResults).map((movie) => (
                    <div className='move-up flex flex-row items-center justify-around text-center '>
                        <Link href={`/movies/${movie.id}`}>
                        <span >
                            
                            <Image data-testid='movie-poster' src={`${IMG_URL +'w500' + movie.poster_path}`} width='150' height='70'/>
                        </span>
                        </Link>
                        <span className='move-slow flex flex-col items-center w-[150px]'>
                            <h2 className='text-[14px]'>{movie.title}</h2>
                            <p className='text-[12px] text-black'>{movie.release_date}</p>
                        </span>
                    </div>))):(

                        <div className='text-[24px] flex items-center justify-center text-black'><h2>Not Found</h2></div>
                    ))}
                </div>)}
                </div>
                <span className='xsm:hidden md:flex flex-row items-center md:gap-4 sm:gap-2 '>
                    <h4 className='sm:text-[12px] md:text-[16px]'>Sign In</h4>
                    <span className='bg-[#BE123C] flex items-center justify-center text-white rounded-[100px] md:w-[36px] md:h-[36px] sm:w-[28px] sm:h-[28px]'>
                        <PiEqualsBold/>
                    </span>
                </span>
            </nav>
    </div>
  )
  }
  export default Navbar