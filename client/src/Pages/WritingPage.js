import React from "react";
import styled from "styled-components";

import NAV from "../Components/NAV"

const AreaIndex = styled.div`
    color:rgb(225, 208, 205);
    font-weight: 500;
    font-size: 55px;
`


// 글을 작성할 수 있는 페이지
const WritingPage = ()=>{

    return(
        <div>
            <NAV/>
            <AreaIndex>
                this Area is WritingPage
            </AreaIndex>
        </div>
    )
}


export default WritingPage