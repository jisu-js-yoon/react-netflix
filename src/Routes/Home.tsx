import styled from "styled-components";
import { useQuery } from "react-query";
import { getPopularMovies, getNowPlayingMovies, getTopRatedMovies, getUpcomingMovies, IData, IGetDataResult } from "../api";
import Slider from "../Components/Slider";
import Banner from "../Components/Banner";

const Wrapper = styled.div`
    background-color: black;
    padding-bottom: 200px;
`
const Loader = styled.div`
    height: 20vh;
    display: flex;
    justify-content: center;
    align-items: center;
`
const SliderContainer = styled.div`
    /* position:relative; */
    height: 100vh;
`

function Home(){
    const {data: nowPlayingMovies, isLoading} = useQuery<IGetDataResult>(
        ["nowMovies", "nowPlaying"], getNowPlayingMovies);
    const {data: topRatedMovies} = useQuery<IGetDataResult>(
        ["topRatedMovies" , "topRated"], getTopRatedMovies);
    const {data: upcomingMovies} =useQuery<IGetDataResult>(
        ["upcomingMovies" , "upcoming"], getUpcomingMovies);
    const {data: popularMovies} = useQuery<IGetDataResult>(
        ["popularMovies", "popular"], getPopularMovies);
    // const {data: latestMovie} = useQuery<IGetDataResult>(["latestMovie" , "latest"], getLatestMovie);
    
    return (
        <Wrapper>
            {isLoading?
            (<Loader>Loading...</Loader>
            ):(
                <>
                    <Banner 
                    bannerInfo={nowPlayingMovies?.results[0] as IData}
                    />
                    <SliderContainer>
                    <Slider 
                    data={nowPlayingMovies as IGetDataResult}
                    title="NOW PLAYING"
                    listType="nowPlaying"
                    menuName="home"
                    mediaType="movie"
                    
                    />
                    <Slider 
                    data={topRatedMovies as IGetDataResult}
                    title="TOP RATED"
                    listType="topRated"
                    menuName="home"
                    mediaType="movie"
                    />
                    <Slider 
                    data={upcomingMovies as IGetDataResult}
                    title="UPCOMING"
                    listType="upcoming"
                    menuName="home"
                    mediaType="movie"
                    />
                    <Slider 
                    data={popularMovies as IGetDataResult}
                    title="POPULAR"
                    listType="popular"
                    menuName="home"
                    mediaType="movie"
                    />
                    {/* <Slider data={latestMovie as IGetDataResult}/> */}
                    </SliderContainer>

                </>
            )}
            </Wrapper>
    )
}

export default Home;