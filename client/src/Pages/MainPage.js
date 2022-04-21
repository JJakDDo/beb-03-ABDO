import React from "react";
import styled from "styled-components";

import NAV from "../Components/NAV";
import CommentInputBox from "../Components/CommentInputBox";
import CommentCardBox from "../Components/CommentBox";
import WritingCard from "../Components/WritingCard";


const WritingCardWrapper = styled.div`
    margin-top: 5%;
    display: flex;
    align-items: center;
    flex-direction: column;

    width: 100vw;
    background-color: white;
`

const CommentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
`
// 댓글 관련 영역
const CommentArea = ()=>{

    return (
        <div>
            <CommentWrapper>
                <CommentInputBox></CommentInputBox>
                <CommentCardBox></CommentCardBox>
            </CommentWrapper>
        </div>
    )
}

// 모든 컴포넌트 모음
const WritingViewArea = ()=>{

    return (
        <div>
            <WritingCardWrapper>
                <WritingCard></WritingCard>
                <CommentArea></CommentArea>
            </WritingCardWrapper>
        </div>
    )
}


// 글이 보여지는 페이지
const MainPage = ()=>{

    return(
        <div>
            <NAV />
            <WritingViewArea></WritingViewArea>
        </div>
    )
}


export default MainPage