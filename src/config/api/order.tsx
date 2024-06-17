import request from '../http'

export type OrderVO = {
    id: string
    customerId: string
    goodsId: string
    title: string
    photo: string
    price: number
    quantity: number
    amount: number
    address: string
    status: string
    createTime: number
    payTime?: number
    deliveryTime?: number
    acceptTime?: number
    cancelTime?: number
    autoCancelTime?: number
    deleteTime?: number
}

export type SearchCondit = {
    title: string
    status: string
    createTimeRangeBefore: string
    createTimeRangeAfter: string
}

/**
 * 创建订单
 * @param shopId 商品ID
 * @param quantity 数量
 * @param address 地址
 * @param fetched callback
 * @returns 
 */
export const createOrderApi = (shopId: string, quantity: number, address: string, fetched: Function) => request({
    url: '/api/order', method: 'post', data:{shopId, quantity, address}, fetched
})

/**
 * 订单详情
 * @param orderId 订单ID
 * @param fetched callback
 * @returns 
 */
export const getOrderDetailApi = (orderId: string, fetched: Function) => request({
    url: `/api/order/${orderId}`, fetched
})

/**
 * 获取付款二维码
 * @param orderId 订单ID
 * @param fetched calback(base64(png)) => void
 * @returns 
 */
export const getPayQrcodeApi = (orderId: string, fetched: Function) => request({
    url: `/api/pay/${orderId}`, params:{mode: 'alipay_qrcode'}, fetched
})

/**
 * 获取支付状态
 * @param orderId 订单ID
 * @returns callback
 */
export const getPayOrderResultApi = (orderId: string, fetchedata: (data: any) => void) => request({
    url: `/api/pay/result/${orderId}`, fetchedata
})

/**
 * 我的订单列表
 * @param searchCondit 查询条件
 * @param page 页
 * @param rows 行
 * @param fetched callback
 * @returns 
 */
export const getOrderListApi = (searchCondit: SearchCondit, page: number, rows: number, fetched: Function) => request({
    url: '/api/order/search', method: 'post', data: searchCondit, params:{page, rows}, fetched
})

/**
 * 取消订单
 * @param orderId 订单ID
 * @param fetched callback
 * @returns 
 */
export const cancelOrderApi = (orderId: string, fetched: Function) => request({
    url: `/api/order/${orderId}/cancel`, method: 'put', fetched
})

/**
 * 发货
 * @param orderId 订单ID
 * @param fetched callback
 * @returns 
 */
export const deliverOrderApi = (orderId: string, fetched: Function) => request({
    url: `/api/order/${orderId}/deliver`, method: 'put', fetched
})

/**
 * 收货
 * @param orderId 订单ID
 * @param fetched callback
 * @returns 
 */
export const acceptOrderApi = (orderId: string, fetched: Function) => request({
    url: `/api/order/${orderId}/accept`, method: 'put', fetched
})

/**
 * 删除订单
 * @param orderId 订单ID
 * @param fetched callback
 * @returns 
 */
export const deleteOrderApi = (orderId: string, fetched: Function) => request({
    url: `/api/order/${orderId}`, method: 'delete', fetched
})
