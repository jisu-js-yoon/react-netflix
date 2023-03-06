import styled from "styled-components";
import { makeImagePath } from "../utils";
import {IData} from "../api";

const BannerContainer = styled.div<{bgPhoto:string}>`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 60px;
    background-image: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1)),url(${(props)=> props.bgPhoto});
    background-size: cover;
`
const Title = styled.h2`
    font-size:4rem;
    margin-bottom: 20px;

`
const Overview = styled.p`
    font-size: 1.7rem;
    width: 50%;

`
interface IBanner {
    bannerInfo: IData,
}


function Banner({
    bannerInfo,
  }: IBanner){
    return(
         <BannerContainer 
        bgPhoto={makeImagePath(bannerInfo?.backdrop_path || " ")}
        >
            <Title>{bannerInfo?.title ? bannerInfo?.title: bannerInfo?.name}</Title>
            <Overview>{bannerInfo.overview}</Overview>
        </BannerContainer>
    )
}

export default Banner;