import { useQuery } from "react-query";
import styled from "styled-components";
import { getAiringTodayShows, getPopularShows, getTopRatedShows, IData, IGetDataResult } from "../api";
import Banner from "../Components/Banner";
import Slider from "../Components/Slider";

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
height: 100vh;
`

function Tv(){
    const {data: popularShows, isLoading} = useQuery<IGetDataResult>(["popularShows", "popular"], getPopularShows);
    const {data:airingTodayShows} = useQuery<IGetDataResult>(["airingTodayShows","airingToday"], getAiringTodayShows);
    const{data: topRatedShows} =useQuery<IGetDataResult>(["topRatedShows", "topRated"],getTopRatedShows);
    
    return (
        <Wrapper>
            {isLoading?
            (<Loader>Loading...</Loader>
                ):(
                    <>
                        <Banner 
                        bannerInfo={popularShows?.results[0] as IData}
                        />
                        <SliderContainer>
                            <Slider data={popularShows as IGetDataResult}
                            title="POPULAR"
                            listType="popular"
                            menuName="tv"
                            mediaType="tv"
                            />
                            <Slider data={airingTodayShows as IGetDataResult}
                            title="AIRING TODAY"
                            listType="airingToday"
                            menuName="tv"
                            mediaType="tv"
                            />
                            <Slider data={topRatedShows as IGetDataResult}
                            title="TOP RATED"
                            listType="topRated"
                            menuName="tv"
                            mediaType="tv"
                            />
                        </SliderContainer>
                    </>
                )    
        }
        </Wrapper>
    )
}

export default Tv;