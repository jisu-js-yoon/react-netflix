const API_KEY = "28a1ae8e4dcfefb67256e8a69a9b2821";
const BASE_PATH ="https://api.themoviedb.org/3/";
//const END_PATH = `api_key=${API_KEY}&language=${LANGUAGE}&region=${REGION}`;

export interface IData{
    id: number,
    backdrop_path: string,
    poster_path: string,
    title?: string,
    name?:string,
    overview: string,
}


export interface IGetDataResult {
    dates:{
        maximum: string,
        minimum: string,
    };
    page: number,
    results: IData[],
    total_pages: number,
    total_results: number,

}

export function getNowPlayingMovies(){
    return (fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}`)
    .then((response)=> response.json()))
}

// export function getLatestMovie(){
//     return (fetch(`${BASE_PATH}/movie/latest?api_key=${API_KEY}`)
//     .then((response)=> response.json()))
// }

export function getPopularMovies(){
    return (fetch(`${BASE_PATH}/movie/popular?api_key=${API_KEY}`)
    .then((response)=> response.json()))
}


export function getTopRatedMovies(){
    return (fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}`)
    .then((response)=> response.json()))
}

export function getUpcomingMovies(){
    return(fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}`)
    .then((response)=> response.json()))
}

export function getAiringTodayShows(){
    return((fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}`)
    .then((response)=> response.json())))
}

export function getPopularShows(){
    return((fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}`)
    .then((response)=> response.json())))
}
export function getTopRatedShows(){
    return((fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}`)
    .then((response)=> response.json())))
}

interface ISearch {
    id: number;
    overview: string;
    title?: string;
    name?: string;
    poster_path?: string;
    backdrop_path?: string;
    media_type: string;
}
export interface IGetSearchResult {
    page: number;
    results: ISearch[];
    total_pages: number;
    total_results: number;
}

export function searchData(keyword: string) {
    return((fetch(`${BASE_PATH}/search/multi?api_key=${API_KEY}&query=${keyword}`)
        .then((response)=> response.json())))
        .catch((err) => err);
}