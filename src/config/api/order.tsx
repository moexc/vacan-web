import request from '../http'

export const getOrders = (searchCondit: string, page: number, rows: number) => request({
    url: '/api/order/search', method: 'post', data: searchCondit, params:{page, rows}
})
export const createOrder = (shopId: string, quantity: number, address: string) => request({
    url: '/api/order', method: 'post', data:{shopId, quantity, address}
})
export const cancelOrder = (orderId: string) => request({url: `/api/order/${orderId}`, method: 'put', params:{operation: 'CancelOrder'}})
export const deleteOrder = (orderId: string) => request({url: `/api/order/${orderId}`, method: 'delete'})
export const payOrder = (orderId: string) => request({url: `/api/pay/${orderId}`, params:{mode: 'alipay_qrcode'}})
export const payOrderResult = (orderId: string) => request({url: `/api/pay/result/${orderId}`})
export const acceptOrder = (orderId: string) => request({url: `/api/order/${orderId}`, method: 'put', params: {operation: 'Accept'}})

export const deliverOrder = (orderId: string) => request({url: `/api/order/${orderId}`, method: 'put', params: {operation: 'Deliver'}})