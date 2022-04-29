import React from "react";
import styled from "styled-components";


const AccountMenuIconArea = styled.div`

    width:120px ; height:80px ;

    display:flex ;
    justify-content:center ;
    
    border-bottom: 5px solid rgb(230,120,120,0.5);
    font-weight:600 ;
    font-size: 25px;
    /* background-color: gray ; */
    &:hover{
        border-bottom: 5px solid rgb(230,120,120,1);
        filter:drop-shadow( 0 0 3px rgb(230,120,120)) ;
    }
`
const IconNameDisplayer = styled.div`
    /* background-color: red; */
    display:flex ;
    align-items: center;
    margin-top:40px ;
    user-select:none;

    color:#C7AAA7;

    &:hover{
        color:#8B605C ;
    };

    &:active{
        color:white;
        filter:drop-shadow(0 0 5px #5A2B27);
    }
`


const AccountMenuBarIcon = ({iconName,setStorage,storage})=>{

    return (
        <AccountMenuIconArea>
            <IconNameDisplayer onClick={()=>{
                setStorage(storage);
            }}>{iconName}</IconNameDisplayer>
        </AccountMenuIconArea>
    )
}

export default AccountMenuBarIcon;

