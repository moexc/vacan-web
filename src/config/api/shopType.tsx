import request from '../http'

export const getTypeMenu = () => request({url: '/api/goods-type'})