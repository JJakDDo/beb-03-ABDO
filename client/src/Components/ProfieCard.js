import React,{useState} from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const ProfieCardArea = styled.div`
    box-sizing: border-box;

    width:500px ;
    height:400px ;

    display:flex ;
    flex-direction:column ;
    align-items:center ;
    padding-top: 50px;
    /* background-color:yellow ; */
`
const ProfileImage = styled.div`
    width: 200px;
    height: 200px;
    background-color:white ;
    
    filter:drop-shadow( 0 0 12px rgb(207, 176, 174)) ;
    border-radius: 20px 20px 20px 20px ;
    /* box-shadow: rgb(0 0 5px rgb(230,120,120)); */

`
const UserNicknameDisplayer = styled.span`
    font-weight: 600;
    font-size:25px ;

    /* background-color:red ; */
    margin-top: 20px;
`
const UserIdDisplayer = styled.span`
    font-weight: 600;
    font-size:20px ;
    color: rgb(127, 89, 86);
    /* background-color:blue ; */
    margin-top: 2px;
`

// 유저를 토큰 개수를표시하기 위한 바
const UserBalanceDisplayerBox = styled.div`
    width: 250px;
    height:40px ;

    margin-top: 20px;

    display:flex ;
    align-items: center;
    justify-content:space-between ;

    background-color: white;
    border-radius: 20px 20px 20px 20px;
    filter:drop-shadow( 0 0 12px rgb(207, 176, 174)) ;/* */
`

const TokenIcon = styled.div`
    width: 30px;
    height: 30px;

    border-radius: 5px 5px 5px 5px ;
    /* background-color:rgb(127,89,86,0.5); ; */
`

const UserBalanceCounter = styled.div`
    font-size: 24px;
    color: rgb(128,80,80);
    /* color:white; */
    text-shadow: 0 0 2px rgb(200, 29, 13 );
`
const TokenSymbol = styled.div`
    font-size: 24px;
    color: rgb(127,80,80);
    font-weight: 600;
`
const TokenImg = styled.img.attrs({
    src:"/Resource/ICO/ICO_InkTokenIcon.png"
})`
    width:30px;
    height:30px;
`

const ProfileCard = ()=>{

    const userState = useSelector(state=>state.userState); // 유저의 정보 가져오기
    
    //alert(JSON.stringify(userState))
    return(
        <ProfieCardArea>
            <ProfileImage></ProfileImage>
            <UserNicknameDisplayer>{userState.userNickname}</UserNicknameDisplayer>
            <UserIdDisplayer>{userState.userId}</UserIdDisplayer>
            <UserBalanceDisplayerBox>
                <div/>
                <TokenIcon><TokenImg/></TokenIcon><UserBalanceCounter>{userState.INK}</UserBalanceCounter><TokenSymbol>INK</TokenSymbol>
                <div/>
            </UserBalanceDisplayerBox>
        </ProfieCardArea>
    )
}


export default ProfileCard;