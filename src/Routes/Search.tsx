import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { useHistory, useLocation } from "react-router-dom";
import styled from "styled-components";
import { IGetSearchResult, searchData } from "../api";
import { makeImagePath } from "../utils";

const Wrapper= styled.div`
    padding: 11rem 6rem 0;
`;

const Row = styled.div`
  margin-bottom: 3rem;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgphoto: string;}>`
  display: block;
  float: left;
  margin: 0.3rem;
  height: 16rem;
  background-image: url(${(props) => props.bgphoto});
  background-size: cover;
  background-position: center;
  font-size: 2rem;
  cursor: pointer;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

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

const Info = styled(motion.div)`
  position: relative;
  top: 15.8rem;
  width: 100%;
  padding: 1rem;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  h4 {
    text-align: center;
    font-size: 1rem;
  }
`;
const NoResult = styled.div`
    font-size: 1.5rem;
    `

function Search(){
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get("keyword");
    const { data } = useQuery<IGetSearchResult>(
        ["search", keyword],
        () => searchData(keyword || ""),
        { useErrorBoundary: true }
    );
    const history = useHistory();
    const onBoxClicked = (menuName: string, id: number) => {
        history.push(`/search/${menuName}/${id}?keyword=${keyword}`);
      };

    return (
        <Wrapper>
            {data && data.results.length > 0 ? (
            <Row>
            {data?.results.map((i) => (
                <Box
                layoutId={i.id + "" + i.media_type}
                key={i.id}
                variants={boxVariants}
                initial="normal"
                whileHover="hover"
                transition={{ type: "tween" }}
                bgphoto={makeImagePath(i.backdrop_path || "", "w500")}
                onClick={() => onBoxClicked(i.media_type, i.id)}
                >
                <Info variants={infoVariants}>
                    <h4>{i.title ? i.title : i.name}</h4>
                </Info>
                </Box>
            ))}
            </Row>
      ) : <NoResult>No Result...</NoResult>}
        </Wrapper>
    )
    
}

export default Search;