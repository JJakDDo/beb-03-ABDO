import React,{ useState } from "react";
import styled from "styled-components";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import userStateActions from "../store/userStateActions";

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

// 글이 보여지는 페이지
const MainPage = ()=>{


    let dm_writingData = {
        nickName:"관리자",
        userId:" ",
        topic:" ",
        text:"현재 등록된 글이 없습니다.-글을 적어주세요"
    }

    const writingsState = useSelector(state=>state.writings); // 스토어에 저장된값

    const [writings,setWritings] = useState(writingsState);

    console.log(writings);

    const dispatch = useDispatch();

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


    return(
        <div>
            <NAV />
            <WritingCardWrapper>
                <button onClick={getWritingsAtServer}>글 새로고침</button>
                {   // 더미 데이터
                    writings.length == 0? <WritingCard nickName={dm_writingData.nickName} userId={dm_writingData.userId} topic={dm_writingData.topic} text={dm_writingData.text} />: null
                }
                {
                    writings.map(elem=>{
                        return <WritingCard nickName={elem.nickname} userId={elem.writer} topic={elem.title} text={elem.content} likes={elem.likes||"zero"} key={`${elem.writer}_${elem.title}_${elem.id}`} />
                    })
                }
                <CommentWrapper>
                  <CommentInputBox></CommentInputBox>
                  <CommentCardBox></CommentCardBox>
                </CommentWrapper>
            </WritingCardWrapper>
        </div>
    )
}


export default MainPage