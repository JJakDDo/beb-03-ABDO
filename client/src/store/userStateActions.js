// 0.2 단계. 실행할때 dispatch 에 넣어서 보낼 명령표.
const userStateActions ={

    login : (userId,userNickname,authorizedToken, INK)=>{
        return {
            type: "LOGIN",
            userNewState:{ // state 에 저장될 상태
                    userId,
                    userNickname,
                    authorizedToken,
                    INK
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
                INK:0
            }
        }
    }
}

export default userStateActions