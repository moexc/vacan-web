import request from '../http'

export type LoginData = {
    username: string,
    password: string,
    reme: boolean
}

/**
 * 登录
 * @param data 登录请求Data
 * @param fetched callback
 * @returns 
 */
export const loginapi = (data: LoginData, fetched: Function) => request({url:'/api/auth/login', method: 'post', data, fetched})

export type RegisterData = {
    nickname: string,
    username: string,
    password: string,
}

/**
 * 注册
 * @param data 注册请求Data
 * @returns 
 */
export const registerapi = (data: RegisterData, fetched: Function) => request({url:'/api/auth/register', method: 'post', data, fetched})

/**
 * 退出
 * @param fetched callback
 * @returns 
 */
export const logoutapi = (fetched: Function) => request({url:'/api/auth/logout', method:'post', fetched})