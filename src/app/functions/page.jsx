// 'use client';



// const [movies, setMovies] = useState([]);
// const [error, setError] = useState(null);
// const [inputValue, setInputValue] = useState('');
// const [searchResults, setSearchResults] = useState([])
// const [isloading, setIsLoading] = useState(false)


   


    export const handleSubmit = (e) => {
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

   
    