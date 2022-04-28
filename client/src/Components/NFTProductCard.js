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
height: 500px;
`

const NFTNameDisplayer = styled.span`
    font-weight: 600;
    font-size:15px ;
    color: rgb(127, 89, 86);
    /* background-color:blue ; */
    margin-top: 2px;
`

const NFTProductDescription = styled.span`
    font-weight: 600;
    font-size:14px ;
    color: rgb(250, 153, 156);
    text-align: center;
    margin-top: 2px;
`
const NFTImage = styled.img`
    width: 250px;
    height: 250px;
    filter:drop-shadow( 0 0 4px rgb(207, 176, 174));

`
const NFTTokenDisplayerBox = styled.div`
    width: 250px;
    height:40px ;

    margin-top: 20px;

    display:flex ;
    align-items: center;
    justify-content:space-between ;

    background-color: white;
    border-radius: 20px 20px 20px 20px;
    filter:drop-shadow( 0 0 2px rgb(207, 176, 174)) ;/* */
`

const TokenIcon = styled.div`
    width: 30px;
    height: 30px;

    border-radius: 5px 5px 5px 5px ;
 
`
const NFTPriceCounter = styled.div`
    font-size: 24px;
    color: rgb(128,80,80);
    /* color:white; */
    text-shadow: 0 0 2px rgb(200, 29, 13 );
`
const TokenSymbol = styled.div`
    font-size: 24px;
    color: rgb(127,80,80);
    font-weight: 600;
`
const TokenImg = styled.img.attrs({
    src:"/Resource/ICO/ICO_InkTokenIcon.png"
})`
    width:30px;
    height:30px;
`

const BtnBuyNFT = styled.button`
    width: 100px;
    height: 50px;

    background-color: white;
    border: none;
    box-shadow: 0px 0px 14px rgb(225,208,205) ;
    color: rgb(155, 60, 63);
    font-weight: 700;
    user-select: none;
    margin: 20px;
    font-size: 24px;

    &:hover{
        background-color: rgb(235,218,215);
        color:rgb(155, 60, 63);
    };
    &:active{
        filter:drop-shadow(0 0 5px rgb(225,206,205));
    }
`
const Spacer = styled.div`
    width: 100%;
    height: 50px;
`



const NFTProductCard = ({NFTInfo,isProduct})=>{

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
            <Spacer/>
            <NFTImage src={NFTInfo.imageURL}></NFTImage>
            <NFTNameDisplayer>{NFTInfo.name}</NFTNameDisplayer>
            <Spacer/>
            
            <NFTProductDescription>{NFTInfo.description}</NFTProductDescription>
            
            {isProduct?
            <>
                <NFTTokenDisplayerBox>
                <div/>
                <TokenIcon><TokenImg/></TokenIcon><NFTPriceCounter>{NFTInfo.price}</NFTPriceCounter><TokenSymbol>INK</TokenSymbol>
                <div/>
                </NFTTokenDisplayerBox>
                <Spacer/>
                <BtnBuyNFT onClick={buyNFT}>구매</BtnBuyNFT>
            </>
            :
            null}
            <Spacer/>
        </NFTProductCardArea>

    )
}

export default NFTProductCard