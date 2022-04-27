import {createStore} from 'redux';
import stateReducer from './userStateReducer';

// 전역에서 접근할 수 있는 스토어 생성
const store = createStore(stateReducer);

export default store;