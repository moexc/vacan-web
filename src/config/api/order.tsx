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

export const searchOrdersApi = (searchCondit: string, page: number, rows: number) => request({
    url: '/api/order/search', method: 'post', data: searchCondit, params:{page, rows}
})

export const cancelOrderApi = (orderId: string) => request({url: `/api/order/${orderId}/cancel`, method: 'put'})
export const deliverOrderApi = (orderId: string) => request({url: `/api/order/${orderId}/deliver`, method: 'put'})
export const acceptOrderApi = (orderId: string) => request({url: `/api/order/${orderId}/accept`, method: 'put'})

export const deleteOrderApi = (orderId: string) => request({url: `/api/order/${orderId}`, method: 'delete'})


export const getPayOrderResultApi = (orderId: string) => request({url: `/api/pay/result/${orderId}`})


