import request from '../http'

export const getTrades = (searchCondit: any, page: number, rows: number) => request({
    url:'/api/trade/search', method:'post', data: searchCondit, params:{page, rows}
})
export const sendEngine = (tradeId: string) => request({url:`/api/trade/${tradeId}`, method:'put', params:{'operation': 'Send2Engine'}})
export const createTrade = (data: string) => request({url:'/api/trade', method: 'post', data})
export const deleteTrade = (tradeId: string) => request({url:`/api/trade/${tradeId}`, method: 'delete'})
export const getPushed = () => request({url:'/api/trade/pushed'})