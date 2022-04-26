import userStateActions from "./userStateActions";


// 0.1 단계. 유저의 초기 상태
const InitState = {
    userState:{
        userId:"",
        userNickname:"",
        authorizedToken:"",
        INK:0,
    }
}

// 0.3 단계. 스테이트에 적용하기 위한 새로운 상태 객체를 뱉어내는 Reducer
const userStateReducer = (state=InitState, action)=>{

    switch(action.type){
        case "LOGIN":{
            console.log("로그인합니다");
            return Object.assign({},state,{userState:action.userNewState}) // 기존의 상태에다가, action 이 반환하는 상태로 덮어 씌우는것이다.
            break;
        }
        case "LOGOUT":{
            console.log("로그아웃합니다");
            return Object.assign({},state,{userState:action.userNewState}) // 기존의 상태에 모든 값을 지운 객체로 덮어씌우기
            break;
        }
        default: return state;        
    }
}

export default userStateReducer