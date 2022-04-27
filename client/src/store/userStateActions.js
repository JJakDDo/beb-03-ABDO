// 0.2 단계. 실행할때 dispatch 에 넣어서 보낼 명령표.
const userStateActions ={

    login : (userId,userNickname,authorizedToken, INK,NFT)=>{
        return {
            type: "LOGIN",
            userNewState:{ // state 에 저장될 상태
                    userId,
                    userNickname,
                    authorizedToken,
                    INK,
                    NFT
            }
        }
    },

    logout:()=>{
        return {
            type : "LOGOUT",
            userNewState:{
                userId:"",
                userNickname:"",
                authorizedToken:"",
                INK:0,
                NFT:[]
            }
        }
    },

    /**
     * 모든 글들을 가져와 Store 에 저장합니다.
     * @param {Array} writings DB의 모든 글들
     * @returns 
     */
    setAllWritings : (writings)=>{
       return {
           type:"SET_ALL_WRITINGS",
           newWritings:writings
       }
    },

    /**
     * 나의 글들을 가져와 Store 에 저장합니다.
     * @param {Array} writings 나의 글들
     * @returns 
     */
    setMyWritings : (writings)=>{
        return{
            type:"SET_MY_WRITINGS",
            newMyWritings:writings
        }
    },

    /**
     * 저장된 나의 글들을 Store 에서 모두 지웁니다.
     * @returns 
     */
    setClearMyWritings : ()=>{
        return{
            type:"SET_CLEAR_MY_WRITINGS",
            newMyWritings:[]
        }
    }

}

export default userStateActions