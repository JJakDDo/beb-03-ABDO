import React from "react";
import styled from "styled-components";
import { useState } from "react";
import axios from 'axios';
import sha256 from 'sha256';

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
// 유저의 정보 관련 컴포넌트를 모두 포함하는 컴포넌트
const SignupCardArea = styled.div`
    display: flex;
    flex-direction:column ;
    justify-content: space-between;
    align-items:center ;


    box-shadow: 0px 0px 14px rgb(225,208,205) ;
    width: 40vw;
    height: 700px;

    /* background-color: white; */
`
// 빈 공간을 표시하는 컴포넌트. flex 내 컴포넌트를 보기좋게 모으기 위해 사용합니다.
const Spacer = styled.div`
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
    
    function clearUserInput(){
        setUserId('');
        setUserPw('');
        setUserPwConfirm('');
        setUserNickname('');
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
            // alert(JSON.stringify({userId,userPw,userPwConfirm,userNickname}));

            //이미 있는 유저인지 확인해야해
            /* 임시 요청. 현재는 아이디만 요청하면 모든 정보를 주기 때문에,
            해당 유저가 이미 있는지 없는지만 확인하는 새로운 엔드포인트 필요*/
            axios.get(`http://127.0.0.1:4000/account/${userId}`)
            .then((res)=>{
                alert(res);
                if(res.data.message === "cannot find account"){
                    // 해당 아이디를 쓰고 있는 유저가 없다는 이야기. 즉 새로운 계정 생성이 가능하다.
                    /*
                    axios.post('http://127.0.0.1:4000/account',{
                        userId:userId,
                        password:userPw, // 나중에 SHA256 암호화 필요. frontend 에서의 모듈설치에러 문제로 아직 해결하지 못함
                        nickname:userNickname
                    })
                    .then((res2)=>{
                        alert(`유저의 아이디 (${res2.data.userId}) 가 생성되었습니다.`);
                        
                        clearUserInput(); //모든 유저 입력 지움
                    })
                    .catch((err2)=>{
                        console.log(err2);
                    })
                    */
                }else{
                    let resultMessage = `
                        ${res.data.userId} 는 이미 있는 유저입니다.
                        __id:${res.data._id},
                        userId:${res.data.userId},
                        password:${res.data.password.slice(0,2).concat('******')};
                        ...
                        그리고 ... 이미 있는 유저인지 검증할 수 있는 새로운 엔드포인트가 필요합니다.
                    `;
                    alert(resultMessage);
                }
            }).catch((err)=>{
                console.log(err);
                console.log('없는 유저');
                // DB 에 없는 유저는 에초에 404 에러가 떠버려.
                // 그래서 이 유저가 없는 유저인건지, 요청을 잘못보낸건지 구분을 할수 없게 되어버려
                // 이미 있는 유저인지 검증할 수 있는 새로운 엔드포인트가 필요합니다.

                // 계정 생성하는 임시 코드
                axios.post('http://127.0.0.1:4000/account',{
                    userId:userId,
                    password:sha256(userId+userPw+process.env.REACT_APP_CLIENTKEY), // 암호화 하여 DB 에 저장
                    nickname:userNickname
                })
                .then((res2)=>{
                    alert(`유저의 아이디 (${res2.data.userId}) 가 생성되었습니다.`);
                    
                    clearUserInput(); //모든 유저 입력 지움
                })
                .catch((err2)=>{
                    console.log(err2);
                })
            })
        }
    }

    return (
        <SignupCardArea>
            <Spacer/>
            <ErrorCard>{errMessage}</ErrorCard>
            <DataFieldName>아이디</DataFieldName>
            <InputSignupDataCard placeholder="아이디 를 입력해주세요..." onInput={limiterUserIdInput} value={userId}/>
            <DataFieldName>비밀번호</DataFieldName>
            <InputSignupDataCard placeholder="비밀번호 를 입력해주세요..."  onInput={limiterPwInput} value={userPw} type="password"/>
            <DataFieldName>비밀번호 확인</DataFieldName>
            <InputSignupDataCard placeholder="비밀번호를 똑같이 입력해주세요..." onInput={limiterPwConfirmInput} value={userPwConfirm} type="password"/>
            <DataFieldName>닉네임</DataFieldName>
            <InputSignupDataCard placeholder="닉네임 를 입력해주세요..." onInput={limiterNicknameInput} value={userNickname}/>
            <div/>
            <BtnSignupRequest onClick={requestUserSignup}>계정생성</BtnSignupRequest>
            <Spacer/>
        </SignupCardArea>
    )
}


export default SignupCard