import request from '../http'

export const getTradesApi = (searchCondit: any, page: number, rows: number, getTraded: Function) => request({
    url:'/api/trade/search', method:'post', data: searchCondit, params:{page, rows}, fetched: getTraded
})
export const sendEngine = (tradeId: string) => request({url:`/api/trade/${tradeId}`, method:'put', params:{'operation': 'Send2Engine'}})
export const createTradeApi = (data: any, fetched : Function) => request({url:'/api/trade', method: 'post', data, fetched})
export const deleteTradeApi = (tradeId: string, fetched : Function) => request({url:`/api/trade/${tradeId}`, method: 'delete', fetched})
export const getPushedApi = (getTraded: Function) => request({url:'/api/trade/pushed', fetched: getTraded})