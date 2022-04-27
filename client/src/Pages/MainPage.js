import React,{ useState } from "react";
import styled from "styled-components";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import userStateActions from "../store/userStateActions";
import { useNavigate } from "react-router-dom";

import NAV from "../Components/NAV";
import CommentInputBox from "../Components/CommentInputBox";
import CommentCardBox from "../Components/CommentBox";
import WritingCard from "../Components/WritingCard";


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

    const [writings,setWritings] = useState(writingsState);

    const [writingsIndex,setWritingsIndex] = useState(writingsState.length-1); // 가장 최신글

    console.log(writings);

    const dispatch = useDispatch();

    // 서버에서 글을 가져와, 페이지에 보이는 글들을 다시 설정합니다.
    function getWritingsAtServer (){
        axios.get('http://127.0.0.1:4000/writing')
        .then((res)=>{
            if(res.data.status==="success")
            {
                // console.log(`서버에 저장된 글을 가져옵니다. 총 ${res.data.data.length}개`);
                dispatch(userStateActions.setAllWritings(res.data.data));
                setWritings(writingsState);
            }
        })
        .catch((err)=>{console.log(err)})
    }

    // 몇번째 글을 볼것인지, 몇번 인덱스의 writingCard 컴포넌트를 볼것인지 설정하는 함수
    function changeWritingCard(how){
        switch(how)
        {
            case "+":{
                if(writingsIndex >= writingsState.length-1){
                    setWritingsIndex(0);
                }else{
                    setWritingsIndex(writingsIndex+1)
                }
                break;
            }
            case "-":{
                if(writingsIndex<=0){
                    setWritingsIndex(writingsState.length-1);
                }else{
                    setWritingsIndex(writingsIndex-1)
                }
                break;
            }
            default:{
                setWritingsIndex(writingsState.length-1)
            }
        }
        console.log(`writings[${writingsIndex}] : ${writings[writingsIndex].id}`);
    }

    // 댓글 추가 기능
    function plzAddComment(comment){
        
        
        //먼저 토큰 체크부터
        if(userState.authorizedToken !== '')
        {
            // 댓글 추가 요청
            axios.post('http://localhost:4000/writing/comment',
            {writingId:writings[writingsIndex].id, comment:comment},
            {headers:{authorization:'Bearer '+userState.authorizedToken}})
            .then((res)=>{
                if(res.data.status === "success"){
                    alert(`댓글을 성공적으로 등록했습니다`);
                    //console.log(`댓글을 성공적으로 보냈습니다 : ${writings[writingsIndex].id} << ${comment}`);
                    getWritingsAtServer(); // 댓글 달고나면 새로고침
                    navigate('/');
                }
            })
            .catch((err)=>{alert(err)});
            
        }
        else{
            alert('로그인해야 댓글을 달 수 있습니다.')
            navigate('/login');
        }
    }

    return(
        <div>
            <NAV />
            <WritingCardWrapper>
                <WritingCardHelperMenubar>
                    <BtnWritingCardHelper onClick={()=>{changeWritingCard('-')}}> 이전글</BtnWritingCardHelper>
                    <BtnWritingCardHelper onClick={getWritingsAtServer} > 새로운 글 가져오기 </BtnWritingCardHelper>
                    <BtnWritingCardHelper onClick={()=>{changeWritingCard('+')}}> 다음글</BtnWritingCardHelper>
                </WritingCardHelperMenubar>
                
                {   // 더미 데이터
                    writings.length == 0? 
                    <WritingCard nickName={dm_writingData.nickName} userId={dm_writingData.userId} topic={dm_writingData.topic} text={dm_writingData.text} />
                    :
                    <WritingCard nickName={writings[writingsIndex].nickname} userId={writings[writingsIndex].writer} topic={writings[writingsIndex].title} text={writings[writingsIndex].content} likes={writings[writingsIndex].likes||"zero"} key={`${writings[writingsIndex].writer}_${writings[writingsIndex].title}_${writings[writingsIndex].id}`} />
                }
                <CommentWrapper>
                  <CommentInputBox plzAddComment={plzAddComment}></CommentInputBox>
                  {
                      writings.length==0?
                      <CommentCardBox commentArray={[]} ></CommentCardBox>
                      :
                      <CommentCardBox commentArray={writings[writingsIndex].comments || []} ></CommentCardBox>
                  }
                </CommentWrapper>
            </WritingCardWrapper>
        </div>
    )
}


export default MainPage