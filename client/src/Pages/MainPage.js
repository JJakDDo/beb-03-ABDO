import React from "react";
import styled from "styled-components";

import NAV from "../Components/NAV";

const AreaIndex = styled.div`
    color:rgb(225, 208, 205);
    font-weight: 500;
    font-size: 55px;
`


// 글이 보여지는 페이지
const MainPage = ()=>{

    return(
        <div>
            <NAV />
            <AreaIndex>
                this Area is MainPage
            </AreaIndex>
        </div>
    )
}


export default MainPage