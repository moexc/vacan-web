import request from '../http'

export const guessLikesapi = () => request({url: '/api/goods'})
export const goodsDetail = (shopId: string) => request({url: `/api/goods/${shopId}`})
