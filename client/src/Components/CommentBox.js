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

const CommentCardBox = ()=>{

    let commentText = "로렘 입숨은 은 출판이나 그래픽 디자인 분야에서 폰은 출판이나 그래픽 디자인 분야에서 폰출판이나 그래픽 디자인 분야에서 폰트, 타이포그래피, 레이아웃 같은 그래픽 요소나 시각적 연출을 보여줄 때 사용하는 표준 채우기 텍스트로, 최종 결과물에 들어가는 실제적인 문장 내용이 채워지기 전에 시각 디자인 프로젝트 모형의 채움 글로도 이용된";

    return (
        <CommentCardArea>
            <CommentCard nickname="닮은살걀" userId="zseegas152" text={commentText}></CommentCard>
            <CommentCard nickname="이뻔한세상" userId="1sag1s152" text={commentText}></CommentCard>
            <CommentCard nickname="삼뻔한세상" userId="oos03152" text={commentText}></CommentCard>
            <CommentCard nickname="네번한세상" userId="ionlz52" text={commentText}></CommentCard>
        </CommentCardArea>
    )
}


export default CommentCardBox;