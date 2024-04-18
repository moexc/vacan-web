import request from '../http'

export const getAddress = () => request({url: '/api/address'})
export const addAddress = (city: string, detailed: string, postCode: string, isdefault: string) => request({url: '/api/address', method: 'post', data:{city, detailed, postCode, isdefault}})
export const setDefault = (id: string) => request({url: `/api/address/${id}`, method: 'put', params:{operation: 'SetDefault'}})
export const deleteAddress = (id: string) => request({url: `/api/address/${id}`, method: 'delete'})