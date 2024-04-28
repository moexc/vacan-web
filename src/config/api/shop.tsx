import request from '../http'

/**
 * 推荐商品
 * @param fetched callback
 * @returns 
 */
export const guessLikesapi = (fetched: Function) => request({url: '/api/goods', fetched})
export const goodsDetail = (shopId: string) => request({url: `/api/goods/${shopId}`})
