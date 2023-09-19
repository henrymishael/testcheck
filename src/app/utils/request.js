export const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const IMG_URL = 'https://image.tmdb.org/t/p/'

export const getTopRatedMovies = async () => {
    const res = await fetch(
        `${BASE_URL}/movie/top_rated?language=en-US&${API_KEY}`
    );
    const data = await res.json();
    return data.results;
}


export const discoverMovies = async () => {

    const res = await fetch(
        `${BASE_URL}/discover/movie?${API_KEY}`
    );
    const data = await res.json();
    return data.results;
}


export const getTrendingMovies = async () => {
    const res = await fetch(
        `${BASE_URL}/trending/movie/day?language=en-US&${API_KEY}`
    );
    const data = await res.json();
    return data.results;
}


export const searchMovies = async(query) => {
    const res = await fetch(
        `${BASE_URL}/search/movie?${API_KEY}&query=${query}`
    );
    const data = await res.json();
    return data.results;
}


export const getMovieDetails = async (id) => {
    const url = `${BASE_URL}/movie/${id}?${API_KEY}/language=en-US`

    const res = await fetch(url);
    const data = await res.json();
    return data;
}

export const getSimilarMovies = async(id) => {
    const res = await fetch (
        `${BASE_URL}/movie/${id}/similar?${API_KEY}`
    )

    const data = await res.json();
    return data.results;
}

