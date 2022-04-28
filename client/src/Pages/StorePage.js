import React,{useEffect, useState} from "react";
import styled from "styled-components";
import { useSelector,useDispatch } from "react-redux";
import userStateActions from "../store/userStateActions";
import NAV from "../Components/NAV"
import NFTProductCard from "../Components/NFTProductCard";

import ServerRequestManager from "../RequestServer/ServerRequestManager";
// import axios from "axios";

const AreaIndex = styled.div`
    color:rgb(225, 208, 205);
    font-weight: 500;
    font-size: 55px;
`

/**nft 상품 카드를 모두 모아놓은 박스 */
const NftCardBox = styled.div`

    display: flex;
    /* background-color:red ; */

`



// NFT 를 구매할 수 있는 페이지
const StorePage = ()=>{

    const dispatch = useDispatch();
    const storeNFTProducts = useSelector(state=>state.NFTProducts);
    const [isLoading, setIsLoading] = useState(false);

    const [NFTProducts,setNFTProducts] = useState(storeNFTProducts)
    
    /** 서버로부터 nft 들을 업데이트 받아 store 저장후 state 에 적용하는 함수 */
    function updateProuducts(){
        setIsLoading(true);

        ServerRequestManager.getAllNFTProducts()
        .then((res)=>{            
            const nftObjects = res.data;
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
                dispatch(userStateActions.setNFTProducts(resultNFTObjects)); // 스토어 저장
                setNFTProducts(storeNFTProducts); // 스테이트에 적용
                console.log(NFTProducts);
                setIsLoading(false);
            },3000)
            
        })

    }

    function showStore(){
        console.log(storeNFTProducts);
    }

    return(
        <div>
            <NAV/>
            <AreaIndex>
                this Area is StorePage
            </AreaIndex>
            <div>
                
                <button onClick={updateProuducts} style={{marginTop:"50px"}}>업데이트</button>
            </div>
            <div>
                <button onClick={showStore}> 상황 </button>
                {
                    isLoading?
                    <div>"상품을 업데이트 하는 중입니다."</div>
                    :
                    null
                }
                <NftCardBox>
                    {
                        NFTProducts?(
                            NFTProducts.length ==0 ?
                            null    
                            :
                            NFTProducts.map((elem,idx)=>{
                                return <NFTProductCard NFTInfo={elem} key={elem.name}/>
                            })
                        ):"상품이 없습니다. 상품을 업데이트 해주세요"
                    }
                </NftCardBox>
                
            </div>
        </div>
    )
}


export default StorePage