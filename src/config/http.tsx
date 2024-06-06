// 封装请求
import axios from 'axios'
import { confirm, toast } from '../components/Toast'
import store from '../store'
import { gotoLogin as gotoLoginPage } from '../router/routes'
import { flushToken, logout } from '../store/authStore'
import { flushTokenapi } from './api/user'

let refreshing = false
let awaitArr: any[] = []

// 请求
const http = axios.create({
    //vite.config配置了代理 此处注释掉
    // baseURL: import.meta.env.VITE_API_URL,
    timeout: 6000
})
// 请求拦截
http.interceptors.request.use(config => {
    //请求头设置
    config.headers.Token = store.getState().authStore.token || ''
    return config
}, err => {
    console.log(err);
})
// 响应拦截
http.interceptors.response.use(
    response => {
        return response && response.data
    }, 
    async err => {
        let response = err.response;
        if(!response){
            toast('服务器出现了点小问题 ⊙﹏⊙∥', 'danger')
            return;
        }
        switch(response.status) {
            case 400:
                toast(`参数错误: ${response.data.msg}`, 'warning')
                break;
            case 401:
                gotoLogin('未登录', '请先登录 ⊙﹏⊙∥')
                break;
            case 402:
                const originalRequest = err.config
                if(refreshing){
                    return new Promise(resolve => {
                        awaitArr.push(async (newtoken: string) => {
                            originalRequest.headers.Token = newtoken
                            resolve((await axios(originalRequest)).data)
                        })
                    })
                }
                refreshing = true
                const reftoken = store.getState().authStore.reftoken || ''
                if(!reftoken){
                    flushTokenFail()
                    break;
                }

                try{
                    let newtoken = '', newreftoken
                    await flushTokenapi(reftoken, (res: any)=>{
                        newtoken = res?.token
                        newreftoken = res?.refToken
                    })
                    if(!newtoken || !newreftoken){
                        flushTokenFail()
                        break;
                    }
                    store.dispatch(flushToken({'token': newtoken, 'reftoken': newreftoken}))
                    originalRequest.headers.Token = newtoken
                    const new_response = await axios(originalRequest)

                    awaitArr.forEach(f => f(newtoken))
                    awaitArr = []
                    return new_response.data
                }catch{
                    flushTokenFail()
                }finally{
                    awaitArr = []
                    refreshing = false
                }
                break;
            case 403:
                toast('无权操作', 'warning')
                break;
            case 404:
                toast('服务器离家出走了 ⊙﹏⊙∥', 'danger')
                break;
            case 409:
                toast('请稍后重试', 'warning')
                break;
            case 500:
                toast('服务器出现了点小问题 ⊙﹏⊙∥', 'danger')
                break;
            default:
                toast(response.data.msg, 'warning')
        }
    }
)

const flushTokenFail = () =>{
    store.dispatch(logout())
    awaitArr = []
    refreshing = false
    gotoLoginPage()
}

function gotoLogin(title: string, content: string){
    confirm({title, text: content}, () => {
        gotoLoginPage()
    })
}

type ReCfg = {
    url: string;
    method?: 'get' | 'post' | 'put' | 'delete' | 'patch';
    params?: any;
    data?: any;
    fetched?: Function;
    fetchedata?: (data: any) => void,
    form?: boolean
}

async function request({ 
    method = 'get', 
    url, 
    data = {}, 
    params = {}, 
    fetched, 
    fetchedata = (data) => {
        // console.log(data);
    },
    form = false
}: ReCfg) {
    
    const rdata = !form ? await http({method, url, data, params})
                        : await http({method, url, data, params, headers: {'Content-Type': `multipart/form-data; boundary=${data._boundary}`}}) 
    if(!rdata) return
    fetched && fetched(rdata.data)
    fetchedata && fetchedata(rdata)
}

export default request