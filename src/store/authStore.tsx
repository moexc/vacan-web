import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    logined: '0',
    username: null,
    userimg: '',
    nickname: null,
    jwt: null,
};

const authStore = createSlice({
    name: 'user',
    initialState: initialState,
    reducers:{
        login(state, {payload}){
            payload = {...payload, userimg: payload.userimg || '/assets/images/profile-7.jpeg'} || state;
            localStorage.setItem('token', payload.jwt)
            state.logined = payload.logined;
            state.username = payload.username;
            state.userimg = payload.userimg;
            state.nickname = payload.nickname;
            state.jwt = payload.jwt;
        },
        logout(state){
            localStorage.removeItem('token')
            state.logined = initialState.logined;
            state.username = initialState.username;
            state.userimg = initialState.userimg;
            state.nickname = initialState.nickname;
            state.jwt = initialState.jwt;
        }
    }
})

export const {login, logout} = authStore.actions
export default authStore.reducer