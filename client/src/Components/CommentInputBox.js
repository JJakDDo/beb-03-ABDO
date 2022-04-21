import React from "react";
import styled from "styled-components";


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

    &:hover{
        /* background-color: rgb(50,50,50); */
        /* -webkit-filter: drop-shadow(5px 5px 5px #222); */
        filter:drop-shadow(0px 0px 14px rgb(225,208,205))
        
    }

`


// 댓글 입력 칸
const CommentInputBox = ()=>{

    function printInput(text){
        alert(text);
    }

    return(
        <CommentInputArea>
            <InputBox placeholder="댓글로 공감을 표시해보세요"></InputBox>
            <div style={{display:"flex",justifyContent:"center",backgroundcolor:"red",width:"150px"}}>
                <BtnSubmit><img src="/Resource/ICO/ICO_Comment.png" style={{padding:"0",width:"70px",height:"70px"}}></img></BtnSubmit>
            </div>
            
        </CommentInputArea>
    )
}


export default CommentInputBox;