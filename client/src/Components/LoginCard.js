import React,{ useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import userStateActions from "../store/userStateActions";
import { useSelector,userDispatcher, useDispatch } from "react-redux";

// 어떤 데이터를 입력하도록 할것인지 필드명을 알립니다.
const DataFieldName = styled.div`
    font-size: 25px;
    font-weight: 600;
    color:rgb(225,208,205);
`

// 유저 정보를 입력하는 칸
const InputLoginData = styled.input`
    width: 70% ;
    height:60px ;
    margin: 10px;

    border: none;

    font-size: 25px ;
    text-align: center;

    box-shadow: 0px 0px 14px rgb(225,208,205) ;
    
    background-color: white;

`
// 버튼으로 페이지 이동 및 로그인 요청을 진행합니다.
const BtnRequest =styled.button`
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

// 버튼 모음
const BtnArea = styled.div`
    width: 70%;
    height: 70px;

    display: flex;
    align-items: center;
    justify-content: space-between;

`

// 유저의 정보 관련 컴포넌트를 모두 포함하는 컴포넌트
const LoginCardArea = styled.div`
    display: flex;
    flex-direction:column ;
    justify-content: space-between;
    align-items:center ;


    box-shadow: 0px 0px 14px rgb(225,208,205) ;

    width: 40vw;
    height: 700px;

`

// 빈 공간을 표시하는 컴포넌트. flex 내 컴포넌트를 보기좋게 모으기 위해 사용합니다.
const Spacer = styled.div`
    height: 30px;
`

// 유저의 입력정보를 바탕으로 로그인 요청하는 컴포넌트
const LoginCard = ()=>{

    let [userId,setUserId] = useState('');
    let [userPw,setUserPw] = useState('');

    let [errMessage,setErrMessage] = useState('');

    // 상태관리 관련 함수
    const userState = useSelector(state=>state);
    const dispatch = useDispatch(); // store에 전송하는 함수

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

                if(sanitizedInput.length>0){
                    setUserId(sanitizedInput.reduce((a,c)=>a+c));
                }
                setErrMessage('');
            }
            
        }else{
            setUserId(inputdata.reduce((a,c)=>a+c).slice(0,20));
            setErrMessage("아이디는 최대 20자 입니다.");
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
            setErrMessage("비밀번호는 최대 20자 입니다.");
        }
    }

    // 유저 로그인 요청
    function requestUserLogin(){
        if(userId.length === 0){
            setErrMessage('아이디를 입력해주세요');return;
        }
        else if(userPw.length ===0){
            setErrMessage('비밀번호를 입력해 주세요');return;
        }
        else if(userId.length < 5){
            setErrMessage('아이디를 최소 5자 이상 적어주세요');return;
        }else if(userPw.length < 8){
            setErrMessage('비밀번호 최소 8자 이상 입력해주세요');return;
        }
        else{
            // 정상적인 값
            setErrMessage('');
            //alert(JSON.stringify({userId,userPw}));

            axios.post('http://127.0.0.1:4000/account/login',{
                userId:userId,
                password:userPw
            })
            .then((res)=>{
                //alert(`유저 '${res.data.userId}' 로그인 되었습니다. token : ${res.data.token}`);
                dispatch(userStateActions.login(res.data.userId,res.data.nickname,res.data.token,0));
                alert(`reduxStore :: userState:{userId:${userState.userId}, userToken:${userState.authorizedToken}}`);
            })
            .catch((err)=>{
                alert(`로그인 실패하였습니다.${err}`);
            })
            
        }
    }


    return (
        <LoginCardArea>
            <Spacer/>
            <ErrorCard>{errMessage}</ErrorCard>
            <DataFieldName>아이디</DataFieldName>
            <InputLoginData placeholder="아이디 를 입력해주세요..." onInput={limiterUserIdInput} value={userId}/>
            <DataFieldName>비밀번호</DataFieldName>
            <InputLoginData placeholder="비밀번호 를 입력해주세요..."  onInput={limiterPwInput} value={userPw} type="password"/>
            <div/>
            <BtnArea>
                <Link to="/signup">
                    <BtnRequest>가입하기</BtnRequest>
                </Link>
                <BtnRequest onClick={requestUserLogin}>로그인</BtnRequest>
            </BtnArea>
            <Spacer/>
        </LoginCardArea>
    )
}


export default LoginCard