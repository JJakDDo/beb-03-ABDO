import React from "react";
import styled from "styled-components";

import NAV from "../Components/NAV"

const AreaIndex = styled.div`
    color:rgb(225, 208, 205);
    font-weight: 500;
    font-size: 55px;
`


// NFT 를 구매할 수 있는 페이지
const StorePage = ()=>{

    return(
        <div>
            <NAV/>
            <AreaIndex>
                this Area is StorePage
            </AreaIndex>
        </div>
    )
}


export default StorePage