import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

import NavIcon from './NAVIcon';


// 로고영역




// 네비게이션바 영역을 정하는 컴포넌트
const NavBar = styled.div`
    position:fixed ;
    top: 0;
    display: flex;
    flex-wrap:nowrap;
    flex-direction: row;
    justify-content: space-between;
    
    background-color: rgb(255,255,255,0.7);
    width: 100%;
    height: 100px;
    box-shadow: 0px 0px 12px rgb(225,208,205,0.5);
    z-index: 5;
`

// Logo를 가진 아이콘
const LogoIconBox = styled.div`
    display: flex;
    width:120px; height: 80px;
    
    margin: 10px;
    user-select: none;
`
// LogoImage
const LogoImg = styled.img.attrs({
    src:"/Resource/ICO/ICO_Logo.png"
    
})`

    &:hover{
        filter:drop-shadow(0px 0px 5px black);
    }
`


// NAVIcon 을 포함하는 유저 메뉴
const NavIconBox = styled.div`
    
    display:flex ;
    align-self: flex-end ;
`

const NAV = ()=>{
    let isAccountValid = false;


    return (
    
        <NavBar>
            <Link to="/" ><LogoIconBox><LogoImg/></LogoIconBox></Link>

            <NavIconBox>
                <NavIcon url="/" iconName="view" />
                <NavIcon url="/writing" iconName="writing" />
                <NavIcon url="/store" iconName="store" />
                { isAccountValid? //계정 로그인이 되어있는가? 마이페이지 : 로그인페이지
                <NavIcon url="/account" iconName="account" /> : 
                <NavIcon url="/login" iconName="login" />}
            </NavIconBox>
        </NavBar>
    
    )
}

export default NAV;