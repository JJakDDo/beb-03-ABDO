import React from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import userStateActions from "../store/userStateActions";
import { Navigate, useNavigate } from "react-router-dom";


import NAV from "../Components/NAV"
import ProfileCard from "../Components/ProfieCard";
import AccountMenuMar from "./AccountMenuBar";


const AreaIndex = styled.div`
    color:rgb(225, 208, 205);
    font-weight: 500;
    font-size: 55px;
`

// 프로필 배너의 위치가 변하더라도 기준이 되는 Pivot 을 정해줄 컴포넌트
const ProfileBannerAreaPivot = styled.div`
    position: relative;
    top: 120px; 
    
    width: 100%;

    user-select:none;
    
    /* background-color: blue; */
`

// 프로필 배너 영역
const ProfileBannerArea = styled.div`

    width: 100%;
    height: 400px;
    
    display:flex ;
    justify-content: center;
    
    /* background-color: rgb(255,0,0,0.5); */

`

// 로그아웃 버튼
const BtnLogout = styled.button`
    background-color: white;
    border: none;
    box-shadow: 0px 0px 14px rgb(225,208,205) ;
    color: rgb(225,208,205);
    font-weight: 700;
    user-select: none;
    margin: 20px;
    font-size: 24px;

    &:hover{
        background-color: rgb(235,218,215);
        color:rgb(235,190,200);
    };
    &:active{
        filter:drop-shadow(0 0 5px rgb(225,206,205));
    }
`

// 프로필 배너 영역 -> 프로필 카드

// 프로필 배너 영역 -> 프로필 카드 -> 프로필 내용


// 유저의 정보를 보여주는 페이지
const AccountPage = ()=>{

    const navigate = useNavigate();
    const dispatch = useDispatch();
    return(
        <div>
            <NAV/>
            
            <ProfileBannerAreaPivot>
                <ProfileBannerArea>
                    <ProfileCard/>
                </ProfileBannerArea>
                <div style={{display:"flex",justifyContent:"center"}}><BtnLogout onClick={()=>{dispatch(userStateActions.logout()); navigate('/') }}>로그아웃</BtnLogout></div>
                
            </ProfileBannerAreaPivot>
            <AccountMenuMar></AccountMenuMar>
            
        </div>
    )
}


export default AccountPage