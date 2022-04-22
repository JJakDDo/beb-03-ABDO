import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

import NAV from "../Components/NAV"

const AreaIndex = styled.div`
    color:rgb(225, 208, 205);
    font-weight: 500;
    font-size: 55px;
`
const BtnSignup = styled.button`
    width: 200px;
    height: 100px;
`


// 로그인시 페이지
const LoginPage = ()=>{

    return(
        <div>
            <NAV/>
            <AreaIndex>
                this Area is LoginPage
            </AreaIndex>
            <Link to="/signup"><BtnSignup>가입하기</BtnSignup></Link>
        </div>
    )
}


export default LoginPage