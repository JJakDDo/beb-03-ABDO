import axios from "axios";
import React from "react";
import styled from "styled-components";
import ServerRequestManager from "../RequestServer/ServerRequestManager";
import { useSelector } from "react-redux";

// 모든 컴포넌트 포함
const NFTProductCardArea = styled.div`
display: flex;
flex-direction:column ;
justify-content:center ;
align-items:center ;
box-shadow: 0px 0px 14px rgb(225,208,205) ;
margin: 20px;
width: 300px;
height: 450px;
`

const NFTImage = styled.img`
    width: 250px;
    height: 250px;

`
const BtnBuyNFT = styled.button`
    width: 100px;
    height: 50px;
`
const Spacer = styled.div`
    width: 100%;
    height: 50px;
`

const NFTProductCard = ({NFTInfo})=>{

    const storeUserState = useSelector(state=>state.userState);

    /** nft 구매 */
    function buyNFT(){

        // 검증과정 필요
        // 로그인 토큰 및 INK 토큰 검증과정이 필요하다

        ServerRequestManager.buyNFT(storeUserState.userId,storeUserState.authorizedToken,NFTInfo.productId)
        .then((res)=>{
            alert(`구매성공`);
            return res.data
        })
        .catch((err)=>{return err});
    }



    return (
        <NFTProductCardArea>
            <Spacer/>
            {/* <img src={NFTInfo.url.image}></img> */}
            <NFTImage src={NFTInfo.imageURL}></NFTImage>
            <div>{NFTInfo.name}</div>
            <Spacer/>
            <div style={{textAlign:"center", fontSize:"14px"}}>{NFTInfo.description}</div>
            <Spacer/>
            <div>{NFTInfo.price} INK</div>
            <Spacer/>
            <BtnBuyNFT onClick={buyNFT}>구매</BtnBuyNFT>
            <Spacer/>
        </NFTProductCardArea>

    )
}

export default NFTProductCard