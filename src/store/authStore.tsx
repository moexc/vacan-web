import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userid: null,
    logined: '0',
    username: null,
    userimg: '',
    nickname: null,
    token: null,
    reftoken: null,
};

const authStore = createSlice({
    name: 'user',
    initialState: initialState,
    reducers:{
        login(state, {payload}){
            payload = {...payload, userimg: payload.userimg || '/assets/images/profile-7.jpeg'} || state;
            state.userid = payload.userId;
            state.logined = payload.logined;
            state.username = payload.username;
            state.userimg = payload.userimg;
            state.nickname = payload.nickname;
            state.token = payload.token;
            state.reftoken = payload.reftoken;
        },
        logout(state){
            state.userid = initialState.userid;
            state.logined = initialState.logined;
            state.username = initialState.username;
            state.userimg = initialState.userimg;
            state.nickname = initialState.nickname;
            state.token = initialState.token;
            state.reftoken = initialState.reftoken;
        },
        flushToken(state, {payload}){
            state.token = payload.token
            state.reftoken = payload.reftoken
        }
    }
})

export const {login, logout, flushToken} = authStore.actions
export default authStore.reducer