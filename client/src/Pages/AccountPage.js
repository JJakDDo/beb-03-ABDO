import React from "react";
import styled from "styled-components";

import NAV from "../Components/NAV"
import ProfileCard from "../Components/ProfieCard";


const AreaIndex = styled.div`
    color:rgb(225, 208, 205);
    font-weight: 500;
    font-size: 55px;
`

// 프로필 배너의 위치가 변하더라도 기준이 되는 Pivot 을 정해줄 컴포넌트
const ProfileBannerAreaPivot = styled.div`
    position: relative;
    top: 100px; 

    width: 100%;
    
    /* background-color: blue; */
`

// 프로필 배너 영역
const ProfileBannerArea = styled.div`

    width: 100%;
    height: 400px;
    
    display:flex ;
    justify-content: center;
    
    background-color: red;

`

// 프로필 배너 영역 -> 프로필 카드

// 프로필 배너 영역 -> 프로필 카드 -> 프로필 내용


// 유저의 정보를 보여주는 페이지
const AccountPage = ()=>{

    return(
        <div>
            <NAV/>
            <ProfileBannerAreaPivot>
                <ProfileBannerArea>
                    <ProfileCard/>
                </ProfileBannerArea>
            </ProfileBannerAreaPivot>

            
        </div>
    )
}


export default AccountPage