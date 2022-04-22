import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

import NAV from "../Components/NAV";
import SignupCard from "../Components/SignupCard";

// 유저 등록 카드 컴포넌트의 축이되는 컴포넌트
const SignupCardPivot = styled.div`
    position:relative;
    top:100px;

    display:flex ;
    justify-content: center;

    width:100% ;
    height: 1px;
    background-color: rgb(155,155,155,0.5);
`


// 유저의 정보 관련 컴포넌트를 모두 포함하는 컴포넌트
const SignupCardArea = styled.div`
display: flex;
flex-direction:column ;
justify-content: space-between;
align-items:center ;


box-shadow: 0px 0px 14px rgb(225,208,205) ;
margin-top: 5%;
width: 40vw;
height: 700px;

/* background-color: white; */
`

// 회원가입을 할수 있는 페이지
const SignupPage = ()=>{

    return(
        <div>
            <NAV/>
            <SignupCardPivot>
                <SignupCardArea>
                    <div/><div/>
                        <SignupCard/>
                    <div/><div/>
                </SignupCardArea>
            </SignupCardPivot>
            
        </div>
    )
}


export default SignupPage