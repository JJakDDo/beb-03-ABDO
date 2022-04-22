import React from "react";
import styled from "styled-components";

import NAV from "../Components/NAV";
import CommentInputBox from "../Components/CommentInputBox";
import CommentCardBox from "../Components/CommentBox";
import WritingCard from "../Components/WritingCard";


const WritingCardWrapper = styled.div`
    margin-top: 10%;
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

// 글이 보여지는 페이지
const MainPage = ()=>{

    let writingData = {
        nickName:"못말",
        userId:"helloWorld5523",
        topic:"요즘",
        text:"아무일 없는데 괜찮은데-이상하게 마음이 무겁다-설명할 수 없는 감정만-깊어지는 요즘"
    }

    return(
        <div>
            <NAV />
            <WritingCardWrapper>
                <WritingCard nickName={writingData.nickName} userId={writingData.userId} topic={writingData.topic} text={writingData.text} />
                
                <CommentWrapper>
                  <CommentInputBox></CommentInputBox>
                  <CommentCardBox></CommentCardBox>
                </CommentWrapper>
            </WritingCardWrapper>
        </div>
    )
}


export default MainPage