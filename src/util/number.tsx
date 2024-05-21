//将数字转换成金额显示
export const toMoney = (num: any) => {
    const r = split(num)
    return r ? '￥' + r : ''
}

export const split = (num: any, fixed: number = 2) => {
    if(num){
        if(isNaN(num)) {
            return "格式不正确";
        }
        const numarr = String(num).split('.')
        const zs = numarr[0].replace(reg, "$1,")
        let xs = numarr.length > 1 ? numarr[1] : ''
        if(xs || fixed > 0) xs = '.' + xs.padEnd(fixed, '0')
        else xs = ''
        return zs + xs
    }else{
        return '';
    }
}

const reg = /(\d)(?=(\d{3})+$)/g;