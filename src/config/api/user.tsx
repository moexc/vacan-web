import request from '../http'

export type LoginData = {
    username: string,
    password: string,
    reme: boolean
}
export const loginapi = (data: LoginData) => request({url:'/api/auth/login', method: 'post', data})

export type RegisterData = {
    nickname: string,
    username: string,
    password: string,
}
export const registerapi = (data: RegisterData) => request({url:'/api/auth/register', method: 'post', data})

export const logoutapi = () => request({url:'/api/auth/logout', method:'post'})