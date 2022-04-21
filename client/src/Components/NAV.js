import React from 'react';
import {Link} from 'react-router-dom';
import styled from 'styled-components';

const NavBar = styled.div`
    display: flex;
    flex-wrap:nowrap;
    flex-direction: row;
    background-color: white;
    height: 100px;
    box-shadow: 0px 0px 12px rgb(225,208,205);
`

const NavIconBox = styled.div`
    width: 80px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: black;
    background-color:white ;
    margin: 10px;
`

const NavIcon = ({iconName})=>{

    return(
        <NavIconBox>
            <span>{iconName}</span>
        </NavIconBox>
    )
}

const NAV = ()=>{
    let isAccountValid = false;

    return (
        <>
            <NavBar>
                <Link to="/"><NavIcon iconName={"view"}/></Link>
                <Link to="/writing"><NavIcon iconName={"writing"}/></Link>
                <Link to="/store"><NavIcon iconName={"store"}/></Link>
                {
                    isAccountValid? // 계정 로그인이 되어있는가? 마이페이지 : 로그인페이지
                    (<Link to="/account"><NavIcon iconName={"account"}/></Link>):
                    (<Link to="/login"><NavIcon iconName={"login"}/></Link>)
                }
            </NavBar>
        </>
    )
}

export default NAV;