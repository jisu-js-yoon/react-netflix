import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled from "styled-components";
import {IGetDataResult } from "../api";
import { makeImagePath } from "../utils";

const SliderContainer = styled.div`
    position: relative;
    top:-100px;
`
const Row = styled(motion.div)`
    display: grid;
    gap: 5px;
    grid-template-columns: repeat(6,1fr);
    //position: absolute;
    margin-top: 100px;
    width: 100%;
`
const Box = styled(motion.div)<{bgPhoto:string}>`
    background-color: white;
    height: 200px;
    background-image: url(${(props)=>props.bgPhoto});
    background-size: cover;
    background-position: center center;
    font-size: 30px;
    cursor: pointer;
    &:first-child{
        transform-origin: center left;
    }
    &:last-child{
        transform-origin: center right;
    }
`
const ArrowBtn = styled(motion.div)`
    width:30px;
    height: 30px;
    border-radius: 50%;
    color: white;
    background-color: black;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 50;
    top: 50%;
    cursor: pointer;
`
const LeftArrowBtn = styled(ArrowBtn)`
  left: 0;
`;

const RightArrowBtn = styled(ArrowBtn)`
  right: 0;
`;

const Overlay = styled(motion.div)`
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    opacity: 0 ;
`
const BigMovie= styled(motion.div)`
    z-index: 99;
    position:absolute; 
    width: 40vw;
    height: 80vh;
    left:0;
    right:0;
    margin: 0 auto;
    border-radius: 15px;
    overflow: hidden;
    background-color: ${props=> props.theme.black.lighter};
`
const BigCover = styled.div`
    width: 100%;
    height: 400px;
    background-size: cover;
    background-position: center center;
    
`
const BigTitle = styled.h3`
    color: ${props => props.theme.white.lighter};
    padding: 10px;
    font-size: 36px;
    position: relative;
    top: -60px;
` 
const BigOverview =styled.p`
    padding: 20px;
    position: relative;
    top: -60px;
    color: ${(props)=>props.theme.white.lighter};
`
const rowVariants = {
    hidden: {
        x: window.outerWidth+5,
    },
    visible:{
        x:0,
    },
    exit:{
        x: -window.outerWidth-5,
    },
}
const boxVariants ={
    normal:{
        scale:1
    },
    hover:{
        scale:1.3,
        y:-50,
        transition:{
            delay: 0.3,
            duration: 0.3,
            type:"tween",
        }
    }
}
const infoVariants = {
    hover:{
        opacity:1,
        transition:{
            delay: 0.3,
            duration: 0.3,
            type:"tween",
        }
    }
}
const offset =6;

const Info = styled(motion.div)`
    padding: 10px;
    background-color: ${props=> props.theme.black.lighter};
    opacity: 0;
    position: absolute;
    width: 100%;
    bottom: 0;
    h4{
        text-align:center;
        font-size: 18px;
    }
`
interface ISlider{
    data: IGetDataResult
    title: string,
    listType: string,
    menuName: string,
    mediaType:string,
}

function Slider({
    data,
    title,
    listType,
    menuName,
    mediaType,
  }: ISlider){
    const history = useHistory();
    const bigMovieMatch = useRouteMatch<{id:string}>(`/${menuName}/${listType}/:id`);
    const {scrollY} =useScroll();
    const [index, setIndex] =useState(0);
    // const arrowBtnOnClickRight = ()=> {
    //     if(data){
    //         if(leaving) return;
    //         toggleLeaving()
    //         const totalResult = data.results.length -1;
    //         const maxIndex = Math.floor(totalResult/ offset)-1;
    //         setIndex((prev)=> prev===maxIndex? 0 : prev+1)
    //     }
    // };
    // const arrowBtnOnClickLeft=()=>{
    //     if(data){
    //         if(leaving) return;
    //         toggleLeaving()
    //         const totalResult = data.results.length -1;
    //         const maxIndex = Math.floor(totalResult/ offset)-1;
    //         setIndex((prev)=> prev===maxIndex? 0 : prev-1)
    //     }
    // }

    const [leaving, setLeaving] = useState(false);
    const toggleLeaving =() => setLeaving((prev)=> !prev)
    const onBoxClicked= (menu:string, type:string ,id:number)=>{
        history.push(`/${menu}/${type}/${id}`)
    }
    const onOverlayClick = () =>{
        history.goBack();
    }
    const clickedMovie = bigMovieMatch?.params.id && data?.results.find(type => String(type.id) === bigMovieMatch.params.id)

    return (
        <>
        <h1>{title}</h1>
        <SliderContainer>
            <LeftArrowBtn
                // onClick={arrowBtnOnClickLeft}           
            >&larr;</LeftArrowBtn>
            <RightArrowBtn
                // onClick={arrowBtnOnClickRight}
            >&rarr;</RightArrowBtn>
        <AnimatePresence 
        initial={false} 
        onExitComplete={toggleLeaving}>
            <Row 
            variants={rowVariants} 
            initial="hidden" 
            animate="visible" 
            exit="exit" 
            transition={{type: "tween", duration:1}} 
            key={index}
            >
            {data?.results
            .slice(1)
            .slice(offset*index, offset*index+offset)
            .map(i=>
            <Box 
                layoutId={i.id +""+ listType}
                onClick={()=> onBoxClicked(menuName, listType, i.id)}
                key={i.id} 
                variants={boxVariants}
                whileHover="hover"
                initial="normal"
                transition={{type:"tween"}}
                bgPhoto={makeImagePath(i.backdrop_path, "w500")}
        >
            <Info variants={infoVariants}>
                <h4>{i.title? i.title: i.name}</h4>
            </Info>    
        </Box>
        )}
    </Row>
        </AnimatePresence>
            </SliderContainer>
                <AnimatePresence>
                        {bigMovieMatch? 
                        <>
                        <Overlay 
                        onClick={onOverlayClick} 
                        exit={{opacity:0}} 
                        animate={{opacity:1}}/>
                        <BigMovie
                        style={{top: scrollY.get()+70}}
                        layoutId={bigMovieMatch.params.id +listType}>
                            {clickedMovie && (
                            <>
                            <BigCover style={{backgroundImage:`linear-gradient(to top, black, transparent), url(${makeImagePath(clickedMovie.backdrop_path,"w500")})`}} />
                            <BigTitle>{clickedMovie.title ?clickedMovie.title : clickedMovie.name}</BigTitle>
                            <BigOverview>{clickedMovie.overview}</BigOverview>
                            
                            
                            </>)}
                            </BigMovie> 
                            </>
                            : null}
                    </AnimatePresence>
                    </>
    )
}
export default Slider;