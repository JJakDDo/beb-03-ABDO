import React from "react";
import styled from "styled-components";

import CommentCard from "./CommentCard";

// 댓글들을 모아놓은 박스
const CommentCardArea = styled.div`
    display: flex;
    flex-direction:column ;
    align-items: center;
    margin: 20px;
    width: 1500px;
    /* background-color : gray; */
`

const CommentCardBox = ({commentArray})=>{

    return (
        <CommentCardArea>
            {
               commentArray.length ==0 ? 
               <CommentCard nickname="관리자" userId="ClientDev" text="댓글이 없습니다"></CommentCard>
               :
                commentArray.map((elem,idx)=>{
                    return(
                        <CommentCard nickname={elem.nickname} userId={elem.userId} text={elem.comment} key={`comment_${elem.nickname}_${elem.userId}_${idx}`}></CommentCard>            
                    )
                })
            }
        </CommentCardArea>
    )
}


export default CommentCardBox;