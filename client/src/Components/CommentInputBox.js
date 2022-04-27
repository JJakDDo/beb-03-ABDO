import React from "react";
import styled from "styled-components";
import { useState } from "react";


const CommentInputArea = styled.div`
    margin: 20px;

    display: flex;
    align-items: center;


    width: 1200px;
    height: 100px;
    background-color: white;
    box-shadow: 0px 0px 14px rgb(225,208,205) ;
`

//내용입력칸
const InputBox =styled.input`
    box-sizing: border-box;
    margin: 10px;
    width: 1050px;
    height: 80px;

    font-size: 25px ;
    font-weight: 600;
    padding: 20px;
    border: none;
`

//전송버튼
const BtnSubmit = styled.button`
    width: 80px;
    height: 80px;
    font-weight: 700;
    font-size: 23px;
    border: none;
    background-color: white;
    /* box-shadow: 0px 0px 14px rgb(225,208,205) ; */
    user-select: none;

    &:hover{
        /* background-color: rgb(50,50,50); */
        /* -webkit-filter: drop-shadow(5px 5px 5px #222); */
        filter:drop-shadow(0px 0px 14px rgb(225,208,205))
        
    }

`


// 댓글 입력 칸
const CommentInputBox = ({plzAddComment})=>{

    const [commentText,setCommentText] = useState('');

    // 글을적을때마다 변수에 저장하도록
    function commentInput(e){
        setCommentText(e.target.value);
    }

    // 댓글전송 버튼을 누르면 부모컴포넌트 MainPage.js 에게 댓글 추가해달라고 요청
    function addComment(){
        plzAddComment(commentText); // 부모함수에서 준 함수 호출, 현재 입력된 값을 넣어서
        setCommentText('');
    }



    return(
        <CommentInputArea>
            <InputBox placeholder="댓글로 공감을 표시해보세요" onChange={commentInput} value={commentText}></InputBox>
            <div style={{display:"flex",justifyContent:"center",backgroundcolor:"red",width:"150px"}}>
                <BtnSubmit onClick={addComment}><img src="/Resource/ICO/ICO_Comment.png" style={{padding:"0",width:"70px",height:"70px"}}></img></BtnSubmit>
            </div>
            
        </CommentInputArea>
    )
}


export default CommentInputBox;