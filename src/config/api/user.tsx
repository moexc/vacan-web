import request from '../http'

export type LoginData = {
    username: string,
    password: string,
    reme: boolean
}
export const loginapi = (data: LoginData, logined: Function) => request({url:'/api/auth/login', method: 'post', data, fetched: logined})

export type RegisterData = {
    nickname: string,
    username: string,
    password: string,
}
export const registerapi = (data: RegisterData) => request({url:'/api/auth/register', method: 'post', data})

export const logoutapi = (logouted: Function) => request({url:'/api/auth/logout', method:'post', fetched: logouted})