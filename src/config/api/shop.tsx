import request from '../http'

export type Goods = {
    title: string,
    photo: string,
    subdescr: string,
    detail: string,
    oldPrice: number,
    price: number,
    quantity: number,
    classify: string,
}

export type SearchCondit = {
    name: string
    timeRangeBefore: string
    timeRangeAfter: string
    status: string
}

/**
 * 获取商品列表
 * @param searchCondit 查询条件
 * @param page 页
 * @param rows 每页条数
 * @param fetched callback
 * @returns 
 */
export const getGoodsApi = (searchCondit: SearchCondit, page: number, rows: number, fetched: Function) => request({
    url:'/api/goods/search', method:'post', data: searchCondit, params:{page, rows}, fetched
})

/**
 * 创建新商品
 * @param data Goods
 * @param fetched callback
 * @returns 
 */
export const createGoodsApi = (data: Goods, fetched: Function) => request({
    url: '/api/goods', method: 'post', data, fetched
})

/**
 * 修改商品信息
 * @param data Goods
 * @param id ID
 * @param fetched callback
 * @returns 
 */
export const updateGoodsApi = (data: Goods, id: string, fetched: Function) => request({
    url: `/api/goods/${id}`, method: 'put', data, fetched
})

/**
 * 获取商品详情
 * @param id 商品ID
 * @param fetched callback
 * @returns 
 */
export const getGoodsDetailApi = (id: string, fetched: Function) => request({
    url: `/api/goods/${id}`, fetched
})

/**
 * 修改状态
 * @param id 商品ID
 * @param status 03-上架 04-下架 05-删除
 * @param fetched callback
 * @returns 
 */
export const updateStatusApi = (id: string, status: string, fetched: Function) => request({
    url: `/api/goods/${id}`, method:'patch', params: {status}, fetched
})

/**
 * 推荐商品
 * @param fetched callback
 * @returns 
 */
export const guessLikesapi = (fetched: Function) => request({url: '/api/goods/today-star', fetched})
export const goodsDetail = (shopId: string) => request({url: `/api/goods/${shopId}`})
