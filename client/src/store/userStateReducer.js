import userStateActions from "./userStateActions";


// 0.1 단계. 유저의 초기 상태
const InitState = {
    userState:{
        userId:"",
        userNickname:"",
        authorizedToken:"",
        INK:0,
    },
    writings:[
        {
            id: "_id",
            title:"요즘",
            content:"아무일 없는데 괜찮은데-이상하게 마음이 무겁다-설명할 수 없는 감정만-깊어지는 요즘",
            writer:"ClientDev",
            nickname:"못말",
            likes:4885,
            createdAt:"2022.04.25",
            comments:[
                {
                    userId:"comment user Id",
                    nickname:"comment user nickname",
                    comment:"comment text .... "
                },
                {
                    userId:"comment user Id",
                    nickname:"comment user nickname",
                    comment:"comment text .... "
                },
                {
                    userId:"comment user Id",
                    nickname:"comment user nickname",
                    comment:"comment text .... "
                }
            ]
            
    
        }
    ]
}

// 0.3 단계. 스테이트에 적용하기 위한 새로운 상태 객체를 뱉어내는 Reducer
const stateReducer = (state=InitState, action)=>{

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
        case "SET_ALL_WRITINGS":{
            //console.log(`글이 등록됩니다. 총 ${action.newWritings.length}`); //글 개수 확인
            return Object.assign({},state,{writings:action.newWritings}); // 글 부분만 새로 설정
            break;
        }
        default: return state;        
    }
}

export default stateReducer