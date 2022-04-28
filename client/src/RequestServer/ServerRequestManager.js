import axios from "axios";
import NFTProducts from '../Data/NFT_Products.json'

const serverURI = process.env.REACT_SERVER_URI || "http://127.0.0.1:4000";



/**
 * 서버에 데이터 요청을 담당하고 값 저장을 담당하는 객체 입니다.
 */
const ServerRequestManager = {

    /**서버에 초기 상품 추가 요청 합니다.*/
    InitRegisterNFTProducts: async ()=>{
        let nftDatas = NFTProducts;
        nftDatas.filter((elem)=>{
            axios.get(serverURI+`/nft/${elem.productId}`)
                .then((res1)=>{
                    if(res1.data === null){
                        // 추가가 안되어 있으니 추가하자
                        axios.post(serverURI+`/nft`,{
                            productId:elem.productId,
                            name:elem.name,
                            url:elem.url,
                            price:elem.price
                        })
                        .then((res2)=>{
                            if(res2.data.productId == elem.productId){
                                return {message:`상품 ${elem.productId} 가 성공적으로 추가 되었습니다.`,success:true};
                            }
                            else{
                                return {message:`추가 요청하였지만 상품을 찾을 수가 없습니다.`,success:false}
                            }
                        })
                        .catch((err2)=>{
                            return {message:`nft 상품 등록 실패. ${err2}`,success:false};
                        })
    
                    }else{
                        return {message:`상품[${elem.productId}]이 이미 있습니다.`,success:true};
                    }
                })
                .catch((err1)=>{
                    return {message:`nft 상품 [${elem.productId}] 가 있는지 확인하려 했지만 잘못된 요청이었습니다. ${err1}`, success:false };
            })
        })
    },

    /**모든 NFT 상품 정보를 서버의 데이터를 가져와 반환합니다*/
    getAllNFTProducts: async()=>{
        return axios.get(serverURI+`/nft`)
        .then((res)=>{
            return res;
        })
        .catch((err)=>{return err});
    },

    /**입력한 메타데이터URL 로부터 데이터를 가져옵니다. */
    getMetaDataFromURl : async(metadataurl)=>{
        return axios.get(metadataurl)
        .then((res)=>{
           
            const {name,description,image,attributes} = res.data;
            return {name,description,image,attributes};
        })
    },

    /**NFT 구매 요청합니다. */
    buyNFT : async (userId,authorizedToken,productId)=>{
        return axios.post(serverURI+`/nft/${productId}`,
        {userId:userId},
        {headers:{authorization: "Bearer "+authorizedToken}})
        .then((res)=>{
            return res;
        })
        .catch((err)=>{return err});
    }

}


export default ServerRequestManager;
