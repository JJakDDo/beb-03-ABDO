import React from "react";
import styled from "styled-components";

import AccountMenuBarIcon from "./AccountMenubarIcon";


const AccountMenuArea = styled.div`

    
    width:100% ;
    height:80px ;
    display:flex ;
    justify-content: space-around;
    align-items: center;
    padding-bottom:20px;
    /* background-color:rgb(255,0,255,0.1) ; */
    /* padding-bottom: 50px; */
    margin-top: 110px;
`
const AccountLine = styled.div`
    width: 80%;
    height: 2px;
    background-color:rgb(247, 226, 224) ;
    filter: drop-shadow(0 0 2px rgb(222, 198, 196));
    user-select:none;
`
const AccountMenuBar = ()=>{
    

    return(
        <div style={{display:"flex", flexDirection:"column", alignItems:"center",}}>
            <AccountMenuArea>
                <div/>
                <div/>
                <AccountMenuBarIcon iconName="나의글"/>
                <AccountMenuBarIcon iconName="NFT"/>
                <div/>
                <div/>
            </AccountMenuArea>
            <AccountLine/>
        </div>
    )
}


export default AccountMenuBar;