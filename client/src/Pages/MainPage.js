import React,{ useState,useEffect } from "react";
import styled from "styled-components";

import { useSelector, useDispatch } from "react-redux";
import userStateActions from "../store/userStateActions";
import { useNavigate } from "react-router-dom";

import NAV from "../Components/NAV";
import CommentInputBox from "../Components/CommentInputBox";
import CommentCardBox from "../Components/CommentBox";
import WritingCard from "../Components/WritingCard";
import ServerRequestManager from "../RequestServer/ServerRequestManager";


const WritingCardWrapper = styled.div`
    margin-top: 10%;
    display: flex;
    align-items: center;
    flex-direction: column;

    width: 100vw;
    background-color: white;
`

const CommentWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

`
const WritingCardHelperMenubar =styled.div`
    display: flex;
    justify-content: center;
`
const BtnWritingCardHelper = styled.button`
    background-color: white;
    border: none;
    box-shadow: 0px 0px 14px rgb(225,208,205) ;
    color: rgb(225,208,205);
    font-weight: 700;
    margin-left: 20px;
    margin-Right:20px;
    user-select: none;

    &:hover{
        background-color: rgb(235,218,215);
        color:rgb(235,190,200);
    };
    &:active{
        filter:drop-shadow(0 0 5px rgb(225,206,205));
    }

`
// 글이 보여지는 페이지
const MainPage = ()=>{


    let dm_writingData = {
        nickName:"관리자",
        userId:" ",
        topic:" ",
        text:"현재 등록된 글이 없습니다.-글을 적어주세요"
    }

    const navigate = useNavigate();
    
    const writingsState = useSelector(state=>state.writings); // 스토어.글정보
    const userState = useSelector(state=>state.userState); // 스토어.유저정보

    const [,setUpdate] = useState(); // 업데이트를 위한 빈 상태 변수

    const [writings,setWritings] = useState(writingsState); // 모든 글들

    let latestIndex = writings.length-1 >=0? writings.length-1 : 0; // 가장 최신의 글로 설정

    const [writingsIndex,setWritingsIndex] = useState(latestIndex); // 현재 보고 있는 글 인덱스

    const dispatch = useDispatch();

    // 초기화
    useEffect(()=>{
        // 컴포넌트 mount 시 모든글을 서버에서 가져와 저장.
        ServerRequestManager.getAllWritings()
        .then((res)=>{
            // console.log(res,`dma..`)
            if(res.success == true){
                //성공
                dispatch(userStateActions.setAllWritings(res.data.data)); //store 에 모든글 저장
                setWritings(writingsState); // state 에 모든글 옮겨 저장
                setUpdate();
            }
        })
        .catch((err)=>{alert(`잘못된 요청입니다.${err}`)});

    },[])

    // 몇번째 글을 볼것인지, 몇번 인덱스의 writingCard 컴포넌트를 볼것인지 설정하는 함수
    function changeWritingCard(how){
        switch(how)
        {
            case "+":{
                if(writingsIndex >= writings.length-1){
                    setWritingsIndex(0);
                }else{
                    setWritingsIndex(writingsIndex+1)
                }
                break;
            }
            case "-":{
                if(writingsIndex<=0){
                    setWritingsIndex(writings.length-1);
                }else{
                    setWritingsIndex(writingsIndex-1)
                }
                break;
            }
            default:{
                setWritingsIndex(writings.length-1)
            }
        }
        console.log(`writings[${writingsIndex}] : ${writings[writingsIndex].id}`);
    }

    // 댓글 추가 기능
    function plzAddComment(comment){


        //먼저 토큰 체크부터
        if(userState.authorizedToken !== '')
        {
            ServerRequestManager.addComment(
                userState.authorizedToken,
                writings[writingsIndex].id,
                comment
            )
            .then((res)=>{
                // 댓글 추가 성공
                if(res.success === true){
                    alert(res.message);
                    setUpdate();
                    navigate('/'); // 홈으로 이동
                    
                    
                }
                else{
                    alert(res.message,res.err);
                }
            })
            .catch((err)=>{
                alert(err);
            })
        }
        else{
            alert('로그인해야 댓글을 달 수 있습니다.')
            navigate('/login');
        }
    }

    // 좋아요 표시 기능
    function plzAddLike(writingsId){
        if(userState.authorizedToken !== '')
        {
            ServerRequestManager.addLikeToWriting(userState.authorizedToken,writingsId)
            .then((res)=>{
                if(res.success){
                    alert(`좋아요를 표현하였습니다!`);
                }
            })
            .catch((err)=>{
                alert(`이미 좋아요를 표현하였습니다.\n->${err}`);
            })
        }
        else{
            alert(`좋아요는 로그인후에 표현할 수 있습니다.`);
            navigate('/login');
        }
    }

    return(
        <div>
            <NAV />
            <WritingCardWrapper>
                <WritingCardHelperMenubar>
                    <BtnWritingCardHelper onClick={()=>{changeWritingCard('-')}}> 이전글</BtnWritingCardHelper>
                    {/* <BtnWritingCardHelper onClick={getWritingsAtServer} > 새로운 글 가져오기 </BtnWritingCardHelper> */}
                    <BtnWritingCardHelper onClick={()=>{changeWritingCard('+')}}> 다음글</BtnWritingCardHelper>
                </WritingCardHelperMenubar>

                {
                    writings?
                    (
                        writings[writingsIndex] ?
                        <WritingCard plzAddLike={plzAddLike} writingsId={writings[writingsIndex].id} nickName={writings[writingsIndex].nickname} userId={writings[writingsIndex].writer} topic={writings[writingsIndex].title} text={writings[writingsIndex].content} likes={writings[writingsIndex].likes||"zero"} key={`${writings[writingsIndex].writer}_${writings[writingsIndex].title}_${writings[writingsIndex].id}`} />
                        :
                        <div>현재 글 인덱스{writingsIndex}</div>
                    )
                    
                    :
                    <WritingCard nickName={dm_writingData.nickName} userId={dm_writingData.userId} topic={dm_writingData.topic} text={dm_writingData.text} /> 
                }
                <CommentWrapper>
                  <CommentInputBox plzAddComment={plzAddComment}></CommentInputBox>
                  {
                      writings?
                      (
                          writings[writingsIndex]?
                          <CommentCardBox commentArray={writings[writingsIndex].comments || []} ></CommentCardBox>
                          :
                          <div>{writingsIndex}</div>

                      )
                      :
                      <CommentCardBox commentArray={[]} ></CommentCardBox>

                  }
                  {/* {
                      writings.length==0?
                      <CommentCardBox commentArray={[]} ></CommentCardBox>
                      :
                      <CommentCardBox commentArray={writings[writingsIndex].comments || []} ></CommentCardBox>
                  } */}
                </CommentWrapper>
            </WritingCardWrapper>
        </div>
    )
}


export default MainPage