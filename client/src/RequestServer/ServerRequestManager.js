import axios from "axios";
import sha256 from 'sha256';

import NFTProducts from '../Data/NFT_Products.json'

const serverURI = process.env.REACT_SERVER_URI || "http://127.0.0.1:4000";

/*
 login                   : 로그인
 signup                  : 회원가입
 getUserInfo             : 로그인상태에서 토큰을 이용하요 유저의 정보를 다시 가져옵니다.
 getWritingsAtServer     : 서버에서 모든 글을 가져옵니다
 getUserWritings         : 특정 유저의 모든 글들을 가져옵니다.
 addWriting              : 서버에 글 추가 요청을 보냅니다
 addComment              : 서버에 댓글 추가 요청을 보냅니다.
 addLikeToWriting        : 글에 좋아요 를 표합니다.
 InitRegisterNFTProducts : DB 의 NFT 상품이 비어있을때, 클라이언트의 NFT 상품문서를 바탕으로 서버에 NFT상품을 추가합니다.
 getAllNFTProduct        : 모든 NFT 상품 정보를, 서버(DB)의 데이터를 가져와 반환합니다.
 getMetaDataFromURI      : 입력한 metadata URL 로부터 NFT의 데이터를 가져옵니다.
 buyNFT                  : 서버에 NFT 구매요청을 보냅니다.
 */

/**
 * 서버에 데이터 요청을 담당하고 값 저장을 담당하는 객체 입니다.
 */
const ServerRequestManager = {

    /**회원가입 */
    signup : async (userId,password,nickname)=>{
        // 이미 있는 계정인지 검증
        return axios.get(serverURI+`/account/${userId}`)
        .then((res)=>{
            // 이미 있는 유저입니다.
            alert(`'${userId}' 는 이미 있는 아이디 입니다. 사용하실수 없는 아이디 입니다.`)
            return {success:false, data:null, message:`'${userId}' 는 이미 있는 아이디 입니다. 사용하실수 없는 아이디 입니다.`}
        })
        .catch((err)=>{
            // 없는 유저 -> 등록가능
            return axios.post(serverURI+`/account`,{
                userId : userId,
                password : sha256(userId+password+process.env.REACT_APP_CLIENTKEY),
                nickname : nickname
            })
            .then((res2)=>{
                // 아이디 등록 성공
                return {success : true, data:null, message:`아이디 '${userId}' 를 성공적으로 등록하였습니다.`};
            })
            .catch((err2)=>{
                // 아이디 등록 실패
                throw new Error(`아이디 등록 요청에 실패하였습니다. \n->${err2}`);
            })
        })

    },

    /**로그인 */
    login : async (userId, password)=>{
        return axios.post(serverURI+`/account/login`,{
            userId : userId,
            password:sha256(userId+password+process.env.REACT_APP_CLIENTKEY)
        })
        .then((res)=>{
            const {userId,nickname,nft,token,jsonWebToken} = res.data;
            return {userId:userId, userNickname:nickname, authorizedToken:jsonWebToken, INK:token, NFT:nft}
        })
        .catch((err)=>{
            throw err;
        })
    },
    
    /**유저의 정보를 가져옵니다. */
    getUserInfo : async(userId,authorizedToken)=>{
        if(authorizedToken !== '')
        {
            return axios.get(serverURI+`/account/${userId}`)
            .then((res)=>{
                const {userId,nickname,nft,token} = res.data;
                return {userId:userId, userNickname:nickname, authorizedToken:authorizedToken,INK:token, NFT:nft}
            })
            .catch((err)=>{
                return new Error(`유저정보를 가져오는데 실패하였습니다.\n->${err}`);
            })
        }
        else{
            throw new Error(`로그인이 필요합니다.(토큰없음)`);
        }

    },

    /**서버에서 모든 글을 가져옵니다. */
    getAllWritings : async ()=>{
        return axios.get(serverURI+`/writing`)
        .then((res)=>{
            if(res.data.status==="success"){
                return {success:true, data:res.data, message:`모든 글 ${res.data.length} 개 를 가져왔습니다.`}; 
            }
            else{
                //return {success:false,data:res.data, message:`보내기 요청은 제대로 갔으나, 실패하였습니다.`};
                throw new Error(`글 가져오기 요청은 제대로 갔으나 실패하였습니다.\n
                -> status : ${res.data.status}, res.data:${res.data};`)
            }
        })
        .catch((err)=>{throw new Error(`글 가져오기 요청에 실패하였습니다. \n->err`)});
    },

    /**특정 유저의 글들을 모두 가져옵니다. */
    getUserWritings : async (userId)=>{
        return axios.get(serverURI+`/writing`)
        .then((res)=>{
            //모든 글 다 가져오기
            let allWritings = res.data.data;
            // 내 글만 필터링
            let myWritings=allWritings.filter((elem)=>{if(elem.writer == userId){return true}});
            console.log(`요청은 성공`);
            return {success:true, data:myWritings, message:`user[${userId}] 의 모든글을 가져왔습니다.`}
        })
        .catch((err)=>{
            throw new Error(`user[${userId}] 글을 가져오는데 실패하였습니다.\n->${err}`);
        })
    },

    /**서버에 글 추가 요청을 보냅니다 */
    addWriting : async (userId,authorizedToken,nickname,topic,content)=>{
        // 로그인 여부 확인
        if(authorizedToken !== ''){

            // 글쓰기 요청
            return axios.post(serverURI+`/writing`,
            {title:topic, content:content, userId:userId, nickname:nickname},
            {headers:{authorization: "Bearer "+authorizedToken}})
            .then((res)=>{
                // 글쓰기 요청 보내기 성공시
                if(res.data.status == "success"){
                    return {success:true,data:res.data.data, message:"글을 성공적으로 등록하였습니다."};
                }
                else{
                    //return {success:false, data:res.data.data, message:"글 추가 요청은 성공했으나, 글 추가에 실패하였습니다."};
                    throw new Error(`글 추가 요청은 갔으나 글 추가에 실패하였습니다.\n
                    -> res.data: \n${JSON.stringify(res.data)}`);
                }
            })
            .catch((err)=>{
                // 글쓰기 요청 보내기 실패시
                //return {success:false,err:err,message:"잘못된 요청입니다"}
                throw new Error(`잘못된 요청입니다.\n->${err}`)
            })
        }
        else{
            //return {success:false,err:"토큰이 없습니다.",message:"로그인 되지않은 잘못된 요청입니다.(토큰없음)"};
            throw new Error(`로그인 되지않은 잘못된 요청입니다.(토큰없음)`)
        }

    },

    /**서버에 댓글 추가 요청을 보냅니다 */
    addComment: async (authorizedToken,writingId,comment,)=>{
        // 로그인 유효성 검사
        if(authorizedToken !== '')
        {
            // 댓글 추가 요청
            return axios.post(serverURI+`/writing/comment`,
            {writingId:writingId, comment:comment},
            {headers:{authorization:'Bearer '+authorizedToken}})
            .then((res)=>{
                if(res.data.status === "success"){
                    return {success:true, err:null, data:res.data, message:"댓글을 성공적으로 등록했습니다"};
                }
                else{
                    //return {success:false, err:null, data:res.data, message:"댓글추가 요청은 잘 전송되었지만, 추가에 실패했습니다."}
                    throw new Error(`댓글추가 요청은 잘 전송되었지만, 추가에 실패했습니다.\n
                    -> res : ${res}`)
                }
            })
            .catch((err)=>{
                //return {success:false, err:err, data:null, message:"잘못된 댓글추가 요청입니다."}
                throw new Error(`잘못된 댓글 추가 요청입니다.`);
            });
        }
        else{
            //return{success:false, err:"로그인 상태에서 댓글을 달 수 있습니다.(토큰없음)", data:null, message:"로그인 상태에서 댓글을 달 수 있습니다.(토큰없음)"};
            throw new Error(`로그인 한 유저만 댓글을 달 수 있습니다.(토큰없음)`);
        }
    },

    /*좋아요 */
    addLikeToWriting: async(authorizedToken,writingId)=>{
        if(authorizedToken !== '')
        {
            return axios.post(serverURI+`/writing/like`,
            {writingId:writingId},
            {headers:{authorization:'Bearer '+authorizedToken}})
            .then((res)=>{
                if(res.data.status == "success")
                {
                    return {success:true, message:"좋아요를 표시하였습니다"};
                }
            })   
        }
        else{
            throw new Error(`로그인한 유저만 좋아요를 누를수 있습니다.(토큰없음)`);
        }
    },

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
                                return {success:true, data:res2.data, message:`상품 ${elem.productId} 가 성공적으로 추가 되었습니다.`,};
                            }
                            else{
                                //return {success:false, data:res2.data, message:`추가 요청하였지만 상품을 찾을 수가 없습니다.`}
                                throw new Error(`nft 추가 요청 하였지만 상품을 찾을 수 없습니다.\n-> res.data : ${res2.data}`);
                            }
                        })
                        .catch((err2)=>{
                            //return {message:`nft 상품 등록 실패. ${err2}`,success:false};
                            throw new Error(`nft 상품 등록 실패\n->${err2}`);
                        })
    
                    }else{
                        return {message:`상품[${elem.productId}]이 이미 있습니다.`,success:true};
                    }
                })
                .catch((err1)=>{
                    //return {message:`nft 상품 [${elem.productId}] 가 있는지 확인하려 했지만 잘못된 요청이었습니다. ${err1}`, success:false };
                    throw new Error(`nft 상품 [${elem.productId}] 가 있는지 확인하려 했지만 잘못된 요청이었습니다. \n${err1}`);
            })
        })
    },

    /**모든 NFT 상품 정보를 서버의 데이터를 가져와 반환합니다*/
    getAllNFTProducts: async()=>{
        return axios.get(serverURI+`/nft`)
        .then((res)=>{
            return res;
        })
        .catch((err)=>{throw new Error(err) });
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
        .catch((err)=>{throw new Error(err) });
    },


}


export default ServerRequestManager;
