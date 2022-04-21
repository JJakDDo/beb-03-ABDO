import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

import NAV from "../Components/NAV"

const AreaIndex = styled.div`
    color:rgb(225, 208, 205);
    font-weight: 500;
    font-size: 55px;
`
const BtnSignupRequest =styled.button`
    width: 200px;
    height: 100px;
`


// 회원가입을 할수 있는 페이지
const SignupPage = ()=>{

    return(
        <div>
            <NAV/>
            <AreaIndex>
                this Area is SignupPage
            </AreaIndex>
            <Link to="/account"><BtnSignupRequest>계정생성</BtnSignupRequest></Link>
        </div>
    )
}


export default SignupPage