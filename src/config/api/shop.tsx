import request from '../http'

export const guessLikesapi = (setGuessLikes: Function) => request({url: '/api/goods', fun: setGuessLikes})
export const goodsDetail = (shopId: string) => request({url: `/api/goods/${shopId}`})
