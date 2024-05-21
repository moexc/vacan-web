export const sleep = (ms : number) => {
    return new Promise<void>(resolve =>setTimeout(() => resolve(), ms));
};

/**
 * 日期格式化
 */
export const parseDate = (date: Date, dateSplit = '-', timeSplit=':') => {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const day = date.getDate().toString().padStart(2, "0")
    const hours = date.getHours().toString().padStart(2, "0")
    const minutes = date.getMinutes().toString().padStart(2, "0")
    const seconds = date.getSeconds().toString().padStart(2, "0")
    return `${year}${dateSplit}${month}${dateSplit}${day} ${hours}${timeSplit}${minutes}${timeSplit}${seconds}`
}

/**
 * 时间戳转为格式化日期
 */
export const parse = (timestamp: number, dateSplit = '-', timeSplit=':') => {
    if(!timestamp) return ''
    const date = new Date(timestamp)
    return parseDate(date, dateSplit, timeSplit)
}

/**
 * 日期格式化 不带时分秒
 */
export const parseDay = (date: Date, dateSplit = '-') => {
    const year = date.getFullYear()
    const month = (date.getMonth() + 1).toString().padStart(2, "0")
    const day = date.getDate().toString().padStart(2, "0")
    return `${year}${dateSplit}${month}${dateSplit}${day}`
}