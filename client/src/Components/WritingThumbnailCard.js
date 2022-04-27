import React from "react";
import styled from "styled-components";

// 모든 컴포넌트 포함
const WritingThumbnailCardArea = styled.div`
display: flex;
flex-direction:column ;
justify-content:center ;
align-items:center ;
box-shadow: 0px 0px 14px rgb(225,208,205) ;
margin: 20px;
width: 300px;
height: 200px;

/* background-color: white; */
`
const WritingTopic = styled.div`
    font-size: 30px;
    font-weight: 600;
`

const WritingThumbnailCard = ({topic})=>{



    return (
        <WritingThumbnailCardArea>
            <WritingTopic>{topic||"무제"}</WritingTopic>
        </WritingThumbnailCardArea>
    )
}

export default WritingThumbnailCard