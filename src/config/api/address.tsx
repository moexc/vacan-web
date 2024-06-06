import request from '../http'

export type AddressVO = {
    id: string
    address: string
    postCode: string
    isdefault: string
}

export const getAddressApi = (fetched: Function) => request({url: '/api/address', fetched})
export const addAddressApi = (city: string, detailed: string, postCode: string, isdefault: string) => request({url: '/api/address', method: 'post', data:{city, detailed, postCode, isdefault}})
export const setDefaultApi = (id: string) => request({url: `/api/address/${id}`, method: 'put', params:{operation: 'SetDefault'}})
export const deleteAddressApi = (id: string) => request({url: `/api/address/${id}`, method: 'delete'})