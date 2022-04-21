import React from "react";
import styled from "styled-components";


const CommentCardArea = styled.div`
    margin: 20px;

    display: flex;
    flex-direction: column ;
    align-items: center;


    width: 1200px;
    
    background-color: white;
    box-shadow: 0px 0px 14px rgb(225,208,205) ;
`

// 닉네임
const UserNickname = styled.span`
    font-weight: 700;
    font-size: 25px;
    color:rgb(117, 24, 16);
`
// 아이디

const UserId = styled.span`
    font-weight: 600;
    align-self: center;
    margin-left:20px;

    font-size: 24px;
    color:rgb(117, 24, 16);
`

const UserNicknameCard = styled.div`
    /* background-color: gray; */
    align-self: flex-start;
    padding : 10px;
    display: flex;
    
`

//코멘트 내용
const CommentText =styled.div`
    box-sizing: border-box;
    margin: 10px;
    padding:20px;
    padding-top:0px ;
    width: 100%;
    
    height: 100%;
    font-weight: 500;
    font-size: 30px;
    color : rgb(14,14,14);
    border: none;
    /* background-color: red; */
    overflow: hidden;
`



// 댓글
const CommentCard = ({nickname,userId,text})=>{

    return(
        <CommentCardArea>
            {/* <UserNicknameArea nickname={nickname} userId={userId}></UserNicknameArea> */}
            <UserNicknameCard>
                <UserNickname>{nickname}</UserNickname>
                <UserId>( {userId} )</UserId>
            </UserNicknameCard>
            <CommentText>{text}</CommentText>
        </CommentCardArea>
    )
}


export default CommentCard;