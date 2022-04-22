import React from "react";
import styled from "styled-components";

import NAV from "../Components/NAV"
import WriteRequestCard from "../Components/WriteRequestCard";

const AreaIndex = styled.div`
    color:rgb(225, 208, 205);
    font-weight: 500;
    font-size: 55px;
`
//WirteRequestCard 컴포넌트를 감싸는 영역
const WriteRequestCardWrappingArea = styled.div`
    width: 100%;
    display: flex;
    justify-content:center ;
    /* background-color:salmon ; */

`

// 글을 작성할 수 있는 페이지
const WritingPage = ()=>{

    return(
        <div>
            <NAV/>
            <WriteRequestCardWrappingArea>
                <WriteRequestCard>

                </WriteRequestCard>
            </WriteRequestCardWrappingArea>
        </div>
    )
}


export default WritingPage