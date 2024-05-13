import request from "../http";

/**
 * 上传文件
 * @param file 文件
 * @param fetched callback
 * @returns 
 */
export const fileUploadApi = (file: File, fetchedata: (data: any) => void) => request({
    url: '/api/file', method: 'post', data: {'file': file}, fetchedata, form: true
})