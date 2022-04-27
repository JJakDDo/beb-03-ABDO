import React,{useState} from "react";
import styled from "styled-components";
import { useSelector,useDispatch } from "react-redux";
import userStateActions from "../store/userStateActions";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

import NAV from "../Components/NAV"
import ProfileCard from "../Components/ProfieCard";
import AccountMenuMar from "./AccountMenuBar";
import WritingThumbnailCard from "../Components/WritingThumbnailCard";


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

    const userState = useSelector(state=>state.userState);
    const myWritingsState = useSelector(state=>state.myWritings);

    const [myWritingDatas,setMyWritingDatas] = useState(myWritingsState)

    const navigate = useNavigate();
    const dispatch = useDispatch();

    /**
     * 로그인 되어있는 사용자의 모든 글들을 가져와 store 에 저장합니다.
     */
    function plzGetUserWritings(){
        axios.get('http://127.0.0.1:4000/writing')
        .then((res)=>{
            // 모든글 다 가져옴
            let allWritings = res.data.data;
            // 내 글만 필터링
            let myWritings=allWritings.filter((elem)=>{if(elem.writer == userState.userId){return true}});
            // 스토어에 저장
            dispatch(userStateActions.setMyWritings(myWritings));
            
            setTimeout(()=>{
                alert(JSON.stringify(myWritingsState));
                setMyWritingDatas(myWritingsState);
                }
                ,1000);
            // 테스트
        })
        .catch((err)=>{
            alert(`나의 글을 가져오는데 실패하였습니다.${err}`);
        })
    }

    return(
        <div>
            <NAV/>
            
            <ProfileBannerAreaPivot>
                <ProfileBannerArea>
                    <ProfileCard/>
                </ProfileBannerArea>
                <div style={{display:"flex",justifyContent:"center"}}>
                    <BtnLogout onClick={()=>{plzGetUserWritings()}}>유저정보 업데이트 요청</BtnLogout>
                    <BtnLogout onClick={()=>{dispatch(userStateActions.logout()); dispatch(userStateActions.setClearMyWritings()); navigate('/') }}>로그아웃</BtnLogout>
                </div>
                
            </ProfileBannerAreaPivot>
            <AccountMenuMar></AccountMenuMar>
            {
                myWritingDatas.length == 0?
                <div style={{display:"flex",justifyContent:"center"}}>등록된 글이 없습니다</div>
                :
                myWritingDatas.map((elem,idx)=>{
                    return <WritingThumbnailCard topic={elem.title}/>
                })

            }
            
        </div>
    )
}


export default AccountPage