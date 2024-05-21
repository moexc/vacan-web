import request from '../http'

export type Trade = {
    tradeName: string,
    startTime: string,
    bids: Bid[],
}

export type Bid = {
    name: string,
    startPrice: number,
    bidPrice: number,
    countDown: number,
    resetCd: number,
}

export type SearchCondit = {
    tradeName: string
    timeRangeBefore: string,
    timeRangeAfter: string,
    tradeStatus: string,
    sendStatus: string
}

/**
 * 获取专场列表
 * @param searchCondit 查询条件
 * @param page 页
 * @param rows 每页条数
 * @param fetched callback
 * @returns 
 */
export const getTradesApi = (searchCondit: SearchCondit, page: number, rows: number, fetched: Function) => request({
    url:'/api/trade/search', method:'post', data: searchCondit, params:{page, rows}, fetched
})

/**
 * 创建专场
 * @param data 专场数据
 * @param fetched callback
 * @returns 
 */
export const createTradeApi = (data: Trade, fetched : Function) => request({url:'/api/trade', method: 'post', data, fetched})

/**
 * 获取专场详情
 * @param tradeId 专场ID
 * @param fetched callback
 * @returns 
 */
export const getTradeDetailApi = (tradeId: string, fetched: Function) => request({url: `/api/trade/${tradeId}`, method: 'get', fetched})

/**
 * 修改专场
 * @param tradeId 专场ID
 * @param data 专场数据
 * @param fetched callback
 * @returns 
 */
export const updateTradeApi = (tradeId: string, data: Trade, fetched: Function) => request({url: `/api/trade/${tradeId}`, method: 'put', data, fetched})

/**
 * 删除专场
 * @param tradeId 专场ID
 * @param fetched callback
 * @returns 
 */
export const deleteTradeApi = (tradeId: string, fetched : Function) => request({url:`/api/trade/${tradeId}`, method: 'delete', fetched})

/**
 * 推送至引擎
 * @param tradeId 专场ID
 * @returns 
 */
export const sendEngine = (tradeId: string, fetched: Function) => request({url:`/api/trade/${tradeId}`, method:'patch', params:{'operation': 'Send2Engine'}, fetched})

/**
 * 获取已发布专场（已推送 && 未结束）
 * @param fetched callback
 * @returns 
 */
export const getPushedApi = (fetched: Function) => request({url:'/api/trade/pushed', fetched})