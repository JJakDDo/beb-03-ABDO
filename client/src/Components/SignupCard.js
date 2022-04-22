import React from "react";
import styled from "styled-components";
import { useState } from "react";


// 어떤 데이터를 입력하도록 할것인지 필드명을 알립니다.
const DataFieldName = styled.div`
    font-size: 25px;
    font-weight: 600;
    color:rgb(225,208,205);
`

// 유저 정보를 입력하는 칸
const InputSignupDataCard = styled.input`
    width: 70% ;
    height:60px ;
    margin: 10px;

    border: none;

    font-size: 25px ;
    text-align: center;

    box-shadow: 0px 0px 14px rgb(225,208,205) ;
    
    background-color: white;

`
// 유저의 정보를 입력하여 서버에 등록요청을 한다
const BtnSignupRequest =styled.button`
    width: 200px;
    height: 50px;
    
    font-size:25px ;
    font-weight:600 ;
    color:rgb(154, 115, 111);

    border-radius:20px 20px 20px 20px;
    border:none ;
    box-shadow: 0px 0px 14px rgb(225,208,205) ;
    background-color: white;

    user-select: none;
    
    &:hover{
        background-color:rgb(228, 197, 194) ;
        color:white;
    };

    &:active{
        box-shadow: 0px 0px 20px rgb(236, 168, 161) ;
        color: rgb(236, 168, 161);
    };
`

// 입력 에러 관련 안내 메시지
const ErrorCard = styled.div`
    font-size: 24px;
    font-weight: 600;
    color:rgb(245, 76, 60) ;
    height: 30px;
`

// 유저의 입력정보를 바탕으로 회원가입 요청하는 컴포넌트
const SignupCard = ()=>{

    let [userId,setUserId] = useState('');
    let [userPw,setUserPw] = useState('');
    let [userPwConfirm,setUserPwConfirm] = useState('');
    let [userNickname,setUserNickname] = useState('');

    let [errMessage,setErrMessage] = useState('');

    // 아이디 문자열 검사
    function limiterUserIdInput(e){
        let inputdata = [...e.target.value];
        
        // 20 자 제한 + 살균코드
        if(inputdata.length<=20){
            if(inputdata.length===0){
                setUserId('')
            }else{            
                let sanitizedInput = inputdata.filter(
                    (char)=>{
                        let c = char.charCodeAt(0);
                        if( (c>=97 && c<=122) || (c>=65 && c<=90)  || (c>=48 && c<=57) ){
                            return true
                        }
                        else{
                            setErrMessage(`허용할 수 없는 문자 감지`);
                            return false;}
                });
                setUserId(sanitizedInput.reduce((a,c)=>a+c));
                setErrMessage('');
            }
            
        }else{
            setUserId(inputdata.reduce((a,c)=>a+c).slice(0,20));
            setErrMessage("아이디는 최대 20자까지 가능합니다.");
        }
    }

    // 비밀번호 문자열 검사
    function limiterPwInput(e){
        let inputdata = e.target.value
        
        // 20 자 제한
        if(inputdata.length<=20){
            setUserPw(inputdata);
            setErrMessage('')
        }else{
            setErrMessage("비밀번호는 최대 20자까지 가능합니다.");
        }
    }

    // 비밀번호 확인 문자열 검사
    function limiterPwConfirmInput(e){
        let inputdata = e.target.value
        
        // 20 자 제한
        if(inputdata.length<=20){
            setUserPwConfirm(inputdata);
            setErrMessage('');

        }else{
            setErrMessage("비밀번호는 최대 20자까지 가능합니다.");
        }
    }
    
    // 유저 닉네임 문자열 검사
    function limiterNicknameInput(e){
        let inputValue = e.target.value;
        if(inputValue.length <= 20){
            setUserNickname(inputValue);
            setErrMessage('');
        }else{
            setErrMessage('닉네임은 20자 이하여야 합니다.');
        }
    }
    

    // 유저 회원가입 요청
    function requestUserSignup(){
        if(userId.length === 0){
            setErrMessage('아이디를 입력해주세요');return;
        }
        else if(userPw.length ===0){
            setErrMessage('비밀번호를 입력해 주세요');return;
        }
        else if(userPwConfirm !== userPw){
            setErrMessage('비밀번호 불일치-비밀번호를 재확인 해주세요');return;
        }
        else if(userNickname.length === 0){
            setErrMessage('유저 닉네임을 입력해주세요');return;
        }
        else if(userId.length < 5){
            setErrMessage('아이디를 최소 5자 이상 적어주세요');return;
        }else if(userPw.length < 8){
            setErrMessage('비밀번호 최소 8자 이상 입력해주세요');return;
        }else if(userNickname.length < 2 ){
            setErrMessage('닉네임 최소 2자 이상 넣어주세요');return;
        }else{
            // 정상적인 값
            setErrMessage('');
            alert(JSON.stringify({userId,userPw,userPwConfirm,userNickname}));
        }
    }

    return (
        <>
            <ErrorCard>{errMessage}</ErrorCard>
            <DataFieldName>아이디</DataFieldName>
            <InputSignupDataCard placeholder="아이디 를 입력해주세요..." onInput={limiterUserIdInput} value={userId}/>
            <DataFieldName>비밀번호</DataFieldName>
            <InputSignupDataCard placeholder="비밀번호 를 입력해주세요..."  onInput={limiterPwInput} value={userPw}/>
            <DataFieldName>비밀번호 확인</DataFieldName>
            <InputSignupDataCard placeholder="비밀번호를 똑같이 입력해주세요..." onInput={limiterPwConfirmInput} value={userPwConfirm}/>
            <DataFieldName>닉네임</DataFieldName>
            <InputSignupDataCard placeholder="닉네임 를 입력해주세요..." onInput={limiterNicknameInput} value={userNickname}/>
            <div/>
            <BtnSignupRequest onClick={requestUserSignup}>계정생성</BtnSignupRequest>
        </>
    )
}


export default SignupCard