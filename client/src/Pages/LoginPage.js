import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

import NAV from "../Components/NAV"
import LoginCard from "../Components/LoginCard"


// 유저 등록 카드 컴포넌트의 축이되는 컴포넌트
const LoginCardPivot = styled.div`
    position:relative;
    top:100px;

    display:flex ;
    justify-content: center;

    padding-top: 5%;
    width:100% ;
    height: 1px;
    
`



// 로그인시 페이지
const LoginPage = ()=>{

    return(
        <div>
            <NAV/>
            <LoginCardPivot>
                <LoginCard>

                </LoginCard>
            </LoginCardPivot>
        </div>
    )
}


export default LoginPage