import React from "react";
import styled from "styled-components";
import { useState } from "react";
import axios from 'axios';

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";


const PageTitle = styled.span`
    font-size: 50px;
    font-weight:700 ;
    color: rgb(207, 185, 183);
`

const PageTitleArea= styled.div`

    display: flex;
    justify-content:center ;
    align-items: center;

    margin-top:10% ;
    width:100% ;
    height: 10%;

    /* background-color: red; */
    
`
//----------------------------------------------------------------------^ 페이지 타이틀 영역

// 글쓰기 카드 의 영역
const WriteCardArea = styled.div`
    
    margin-top: 20px;


    display: flex;
    flex-direction: column;

    width: 1200px;
    height: 650px;

    background-color: white;
    box-shadow: 0px 0px 14px rgb(225,208,205) ;
`
//----------------------------------------------------------------------^ WirteRequestCard 를 포함하여, 전체에서 어느위치에 위치시킬것인가 결정하는 컴포넌트

const BtnSubmitImg = styled.img.attrs({
    src:"/Resource/ICO/ICO_Writing.png"
})`
    
    width:80px;
    height:80px;
    &:hover{
        filter:drop-shadow(0 0 5px black)
    };
    &:active{
        filter:drop-shadow(0 0 14px red) ;
    }
`

// 전송버튼
const BtnSubmit =styled.button`
    position: relative;
    top: 20px;
    left:-20px;
    
    width: 8%;
    height: 80px;

    border:none ;
    background-color:white ;
    /* box-shadow: 0px 0px 14px rgb(225,208,205) ; */
    
`
// 전송버튼 영역
const BtnSubmitArea = styled.div`
    height: 3%;
    width: 100%;

    display: flex;
    justify-content: flex-end;
    
    /* background-color: red; */
`
//----------------------------------------------------------------------^ 전송버튼 컴포넌트 관련

// 글 제목 입력칸
const InputTopic = styled.input`
    height:80% ;
    width: 60% ;
    border: none;

    font-size: 55px ;
    text-align: center;

    box-shadow: 0px 0px 14px rgb(225,208,205) ;

    background-color: white;
`
// 글 제목 영역
const InputTopicArea = styled.div`
    height:17% ;
    width: 100%;

    display:flex ;
    justify-content:center ;
    align-items: center;

    /* background-color: blue; */
`

//----------------------------------------------------------------------^ 제목 입력 컴포넌트 관련

// 글내용 입력칸
const InputText = styled.textarea`
    height:80% ;
    width: 60% ;

    font-size: 30px ;
    text-align: center;

    overflow:hidden ;

    border: none;
    box-shadow: 0px 0px 14px rgb(225,208,205) ;
    /* background-color: white; */
`
// 글 내용 입력 영역
const InputTextArea = styled.div`
    height:80% ;
    width: 100%;

    display:flex ;
    justify-content:center ;
    align-items: center;

    /* background-color: yellow; */
`

//---------------------------------------------------------------------^ 글 내용 입력 관련 컴포넌트

// 글 등록을 요청하기위한 컴포넌트
const WriteRequestCard = ()=>{

    let [text,setText] = useState('');
    let [topic,setTopic] = useState('');

    const userState = useSelector(state=>state.userState); // 유저상태 가져오기


    function textInput(e){
        // e 는 자동적으로 넘어온다
        setText(e.target.value); // 저장
    }
    function topicInput(e){
        setTopic(e.target.value);
    }

    // 글쓴 내용을 약간의 처리를 한다음 전송한다
    function textTransmit(){
        let changedText = '';
        let textCopy = [...text];

        // 띄어쓰기 변환
        changedText = textCopy.map((char)=>{
            if(char === '\n'){
                return '-'
            }
            else{
                return char
            }
        })

        changedText = changedText.reduce((a,c)=>a+c,'');

        // let resultWriting = topic.concat('{',changedText,'}');


        // 로그인 여부 확인 , 토큰여부
        if(userState.authorizedToken !== '')
        {   // 글 쓰기 등록
            axios.post('http://127.0.0.1:4000/writing',
                {title:topic, content:changedText, userId:userState.userId, nickname:userState.userNickname},
                {headers:{authorization: "Bearer "+userState.authorizedToken}}
            )
            .then((res)=>{
                // 보내기 성공시
                if(res.data.status === "success"){
                    alert('성공적으로 글을 등록하였습니다');

                }
                else{
                    alert('보내기 실패',res.data.status, res.data.message);
                }
            }).catch((err)=>{
                alert(err);
            })        
        }
        else{
            alert('로그인되지 않은 잘못된 요청입니다.(토큰없음)');
        }
        

        setText("");  // 내용 비우기
        setTopic(""); // 주제 비우기
    }

    return (
        <div>
            <PageTitleArea>
                <PageTitle>글쓰기</PageTitle>
            </PageTitleArea>
            <WriteCardArea>
                <BtnSubmitArea>
                    <BtnSubmit onClick={textTransmit}>
                        <BtnSubmitImg></BtnSubmitImg>
                    </BtnSubmit>
                </BtnSubmitArea>
                <InputTopicArea>
                    <InputTopic onInput={topicInput} value={topic}></InputTopic>
                </InputTopicArea>
                <InputTextArea>
                    <InputText onInput={textInput} value={text}>
                    </InputText>
                </InputTextArea>
            </WriteCardArea>
        </div>
    )
}




export default WriteRequestCard