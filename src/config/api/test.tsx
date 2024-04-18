import request from "../http";

export const getTradeNotice = (page: number, rows: number) => request({
    url: '/api/others/selectZcjygg', 
    params:{page, 
        rows, 
        'first':'',
        'jyggLx': '粮油交易公告',
        'jyggBt': '',
        'pz': '全部',
        'fx': '全部',
        'fgs': '全部'
    }, 
})

export const addId = (list : any, orid: string) => {
    for (let index = 0; index < list.length; index++) {
        list[index] = {...list[index], 'id': list[index][orid]}
    }
    return list
}