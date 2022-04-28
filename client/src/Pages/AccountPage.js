import React,{useEffect, useState} from "react";
import styled from "styled-components";
import { useSelector,useDispatch } from "react-redux";
import userStateActions from "../store/userStateActions";
import { useNavigate } from "react-router-dom";

import NAV from "../Components/NAV"
import ProfileCard from "../Components/ProfieCard";
import AccountMenuMar from "./AccountMenuBar";
import WritingThumbnailCard from "../Components/WritingThumbnailCard";
import ServerRequestManager from "../RequestServer/ServerRequestManager";
import NFTProductCard from "../Components/NFTProductCard";

import NFT_Products from "../Data/NFT_Products.json"

// 프로필 배너의 위치가 변하더라도 기준이 되는 Pivot 을 정해줄 컴포넌트
const ProfileBannerAreaPivot = styled.div`
    position: relative;
    top: 120px; 
    
    width: 100%;

    user-select:none;
    
    /* background-color: blue; */
`

// 프로필 배너 영역
const ProfileBannerArea = styled.div`

    width: 100%;
    height: 400px;
    
    display:flex ;
    justify-content: center;
    
    /* background-color: rgb(255,0,0,0.5); */

`

// 로그아웃 버튼
const BtnLogout = styled.button`
    background-color: white;
    border: none;
    box-shadow: 0px 0px 14px rgb(225,208,205) ;
    color: rgb(225,208,205);
    font-weight: 700;
    user-select: none;
    margin: 20px;
    font-size: 24px;

    &:hover{
        background-color: rgb(235,218,215);
        color:rgb(235,190,200);
    };
    &:active{
        filter:drop-shadow(0 0 5px rgb(225,206,205));
    }
`

// 유저가 가지고 있는 아이템 정렬 영역
const StorageArea = styled.div`
    width:90% ;
    padding:20px;

    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`


// 유저의 정보를 보여주는 페이지
const AccountPage = ()=>{

    const userState = useSelector(state=>state.userState);
    const myWritingsState = useSelector(state=>state.myWritings);
    const myNFTState = userState.NFT; //[3,4]

    const [myWritingDatas,setMyWritingDatas] = useState(myWritingsState)
    const [myStorageType,setMyStorageType]=useState('writings');
    const [NFTData, setNFTData] = useState([]); // 유저가 현재 가지고있는 NFT 들의 세부데이터를 참조하기위해 선언

    const navigate = useNavigate();
    const dispatch = useDispatch();

    // 초기화
    useEffect(()=>{
        plzGetUserWritings();
        getNFTDataAndSave();
        updateUserInfo();
    },[])


    // 로그인하여 받은 토큰과 userId 로 유저의 정보를 업데이트
    function updateUserInfo(){
        if(userState.authorizedToken !== '')
        {
            ServerRequestManager.getUserInfo(userState.userId,userState.authorizedToken)
            .then((res)=>{
                // 받은 정보로 다시 업데이트
                dispatch(userStateActions.updateUserInfo(
                    res.userId,
                    res.userNickname,
                    res.authorizedToken,
                    res.INK,
                    res.NFT
                ));
            })
            .catch((err)=>{
                alert(err)
            })
        }
        else{
            alert(`로그인이 필요합니다.`);
            navigate('/login');
        }
    }

    /**
     * 서버로부터 모든 NFT 의 정보를 요청하여 State 에 저장합니다.
     * 이는 유저가 가지고있는 NFT들이 어떠한 정보를 가지고 있는지를, 해당 State 에서 찾습니다.
     */
    function getNFTDataAndSave (){
        ServerRequestManager.getAllNFTProducts()
        .then((res)=>{            
            const nftObjects = res.data; // 서버에서 받아온 모든 NFT 정보
            let resultNFTObjects = [];

            for(let i = 0 ; i < nftObjects.length ; i++)
            {
                let nftObj = nftObjects[i];
                ServerRequestManager.getMetaDataFromURl(nftObj.url)
                .then((res)=>{
                    // console.log(JSON.stringify(res));

                    resultNFTObjects.push({
                        _id : nftObj._id,
                        productId : nftObj.productId,
                        metadataURL : nftObj.url,
                        price : nftObj.price,
                        __v : nftObj.__v,

                        name:res.name,
                        description : res.description,
                        imageURL : res.image,
                        attributes : res.attributes
                    })
                })
                .catch((err)=>{console.log(err)})
            }

            setTimeout(()=>{
                setNFTData(resultNFTObjects); // 스테이트에 적용
            },1000)
            
        })
    }

    
    /**로그인 되어있는 사용자의 모든 글들을 가져와 store 에 저장합니다.*/
    function plzGetUserWritings(){
        
        // 해당 유저의 모든 글을 가져옵니다.
        ServerRequestManager.getUserWritings(userState.userId)
        .then((res)=>{
            dispatch(userStateActions.setMyWritings(res.data));
            setTimeout(()=>{setMyWritingDatas(myWritingsState)},1000); //  1초 뒤에 업데이트
        })
        .catch((err)=>{
            alert(err);
        })
    }

    function plzSetMyStorageType(type){
        switch(type){
            case "writings":{
                setMyStorageType("writings");
                console.log("writings");
                break;
            }
            case "nfts":{
                setMyStorageType("nfts");
                console.log("nfts")
                break;
            }
            default : {
                setMyStorageType("writings");
                console.log("writings");
                break;
            }
        }
    }

    // 임시로 스토어의 NFT 데이터에서 productId 에 해당하는 NFT 의 정보를찾습니다.
    function getNFTDataByDummyData(productId){
        let resultNFTInfo = NFTData.filter((elem)=>{
            console.log(elem);
            if(elem.productId === productId){
                return elem;
            }
        })
        console.log(resultNFTInfo[0]);
        return resultNFTInfo[0];
    }

    return(
        <div>
            <NAV/>
            
            <ProfileBannerAreaPivot>
                <ProfileBannerArea>
                    <ProfileCard/>
                </ProfileBannerArea>
                <div style={{display:"flex",justifyContent:"center"}}>
                    <BtnLogout onClick={()=>{plzGetUserWritings()}}>유저정보 업데이트 요청</BtnLogout>
                    <BtnLogout onClick={()=>{dispatch(userStateActions.logout()); dispatch(userStateActions.setClearMyWritings()); navigate('/') }}>로그아웃</BtnLogout>
                </div>
                
            </ProfileBannerAreaPivot>
            <AccountMenuMar plzSetMyStorageType={plzSetMyStorageType}></AccountMenuMar>
            <StorageArea>
            {
                myStorageType === "writings" ?
                (
                    myWritingDatas.length == 0?
                    <div style={{display:"flex",justifyContent:"center"}}>등록된 글이 없습니다</div>
                    :
                    myWritingDatas.map((elem,idx)=>{
                        return <WritingThumbnailCard topic={elem.title} key={elem.title+idx}/>
                    })
                )
                :
                (
                    myNFTState.length == 0?
                    <div style={{display:"flex",justifyContent:"center"}}>보유한 NFT 가 없습니다</div>
                    :
                    myNFTState.map((productId,idx)=>{
                        console.log(`아이템을 찾습니다. ${productId}`);
                        let nftInfo=getNFTDataByDummyData(productId);
                        if(nftInfo)
                        {
                            return <NFTProductCard NFTInfo={nftInfo} key={"NFT"+nftInfo.name+idx} isProduct={false}></NFTProductCard>
                        }else{

                        }
                    })
                )
            }
            </StorageArea>
            
        </div>
    )
}


export default AccountPage