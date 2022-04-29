import React,{useEffect, useState} from "react";
import styled from "styled-components";
import { useSelector,useDispatch } from "react-redux";
import userStateActions from "../store/userStateActions";
import NAV from "../Components/NAV"
import NFTProductCard from "../Components/NFTProductCard";

import ServerRequestManager from "../RequestServer/ServerRequestManager";


const AreaIndex = styled.div`
    color:rgb(225, 208, 205);
    font-weight: 500;
    font-size: 55px;
`

/**nft 상품 카드를 모두 모아놓은 박스 */
const NftCardBox = styled.div`

    display: flex;
    /* background-color:red ; */
    justify-content:center ;

`

const ProductMenuBar = styled.div`
    
    margin-top: 100px;
    width: 100%;
    height: 100px;
    display: flex;
    justify-content: center;

`

const BtnProductUpdate = styled.button`
    background-color: white;
    border: none;
    border-radius: 20px 20px 20px 20px ;
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



// NFT 를 구매할 수 있는 페이지
const StorePage = ()=>{

    const dispatch = useDispatch();
    const storeNFTProducts = useSelector(state=>state.NFTProducts);
    const [isLoading, setIsLoading] = useState(false);

    const [NFTProducts,setNFTProducts] = useState(storeNFTProducts);

    useEffect(()=>{
        updateProuducts();
    },[])
    
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
            <ProductMenuBar>
                <BtnProductUpdate onClick={updateProuducts}>상품 업데이트 요청</BtnProductUpdate>
            </ProductMenuBar>
            <div>
                {
                    isLoading?
                    <div style={{display:"flex",justifyContent:"center",height:"20px",width:"100%",userSelect:"hidden"}}>
                        "상품을 업데이트 하는 중입니다."
                    </div>
                    :
                    <div style={{display:"flex",justifyContent:"center",height:"20px",width:"100%"}}/>

                }
                <NftCardBox>
                    {
                        NFTProducts?(
                            NFTProducts.length ==0 ?
                            null    
                            :
                            NFTProducts.map((elem,idx)=>{
                                return <NFTProductCard NFTInfo={elem} key={elem.name} isProduct={true}/>
                            })
                        ):"상품이 없습니다. 상품을 업데이트 해주세요"
                    }
                </NftCardBox>
                
            </div>
        </div>
    )
}


export default StorePage