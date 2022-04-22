import React from "react";
import styled from "styled-components";
import {Link} from "react-router-dom";


const NavIconBox = styled.div`
    width: 80px;
    height: 80px;
    display: flex;

    flex-direction: column;

    justify-content: center;
    align-items: center;
    color: black;
    /* background-color:gray ; */
    margin: 10px;
    user-select:none;
`
const NavIconImg = styled.img`
    width: 50px;
    height: 50px;

    &:hover{
        filter:drop-shadow(0 0 5px black)
    }
`

const NavIconName = styled.span`
    font-weight: 600;
`




const NavIcon = ({url,iconName})=>{

    let iconSrc = "/Resource/ICO/"
    switch(iconName){
        case "view": {iconSrc+="ICO_View.png"; break}
        case "writing" : {iconSrc+="ICO_Writing.png"; break}
        case "store" : {iconSrc+="ICO_Store.png"; break}
        case "login" : {iconSrc+="ICO_Login.png"; break}
        case "account" : {iconSrc+="ICO_Account.png";break}
        default : {iconSrc+="ICO_IconDumy5050.png";break}
    }
    // console.log(iconSrc);

    return(
        <Link to={url} style={{textDecoration:"none"}}>
            <NavIconBox>
                <NavIconImg src={iconSrc}></NavIconImg>
                <NavIconName>{iconName ||"페이지명"}</NavIconName>
            </NavIconBox>
        </Link>
    )
}

export default NavIcon;