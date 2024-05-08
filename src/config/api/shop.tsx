import request from '../http'

export type Goods = {
    title: string,
    photo?: File,
    subdescr: string,
    detail: string,
    oldPrice: number,
    price: number,
    quantity: number,
    classify: string,
}

/**
 * 获取商品列表
 * @param searchCondit 查询条件
 * @param page 页
 * @param rows 每页条数
 * @param fetched callback
 * @returns 
 */
export const getGoodsApi = (searchCondit: any, page: number, rows: number, fetched: Function) => request({
    url:'/api/goods/search', method:'post', data: searchCondit, params:{page, rows}, fetched
})

export const createGoodsApi = (data: Goods, fetched: Function) => request({
    url: '/api/goods', method: 'post', data, fetched, form: true
})

/**
 * 推荐商品
 * @param fetched callback
 * @returns 
 */
export const guessLikesapi = (fetched: Function) => request({url: '/api/goods/today-star', fetched})
export const goodsDetail = (shopId: string) => request({url: `/api/goods/${shopId}`})
