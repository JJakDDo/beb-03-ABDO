import React from "react";
import styled from "styled-components";

import NAV from "../Components/NAV"

const AreaIndex = styled.div`
    color:rgb(225, 208, 205);
    font-weight: 500;
    font-size: 55px;
`


// 유저의 정보를 보여주는 페이지
const AccountPage = ()=>{

    return(
        <div>
            <NAV/>
            <AreaIndex>
                this Area is AccountPage
            </AreaIndex>
        </div>
    )
}


export default AccountPage