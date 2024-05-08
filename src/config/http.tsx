// 封装请求
import axios from 'axios'
import { confirm, toast } from '../components/Toast'

// 请求
const http = axios.create({
    //vite.config配置了代理 此处注释掉
    // baseURL: import.meta.env.VITE_API_URL,
    timeout: 6000
})
// 请求拦截
http.interceptors.request.use(config => {
    //请求头设置
    config.headers.Token = localStorage.getItem('token') || ''
    return config
}, err => {
    console.log(err);
})
// 响应拦截
http.interceptors.response.use(
    response => {
        return response.data
    }, 
    err => {
        let response = err.response;
        switch(response.status) {
            case 400:
                toast(`参数错误: ${response.data.msg}`, 'warning')
                break;
            case 401:
                gotoLogin('未登录', '请先登录 ⊙﹏⊙∥')
                break;
            case 402:
                gotoLogin('登录超时', '登录有效期已过，是否重新登录?')
                break;
            case 403:
                toast('无权操作', 'warning')
                break;
            case 404:
                toast('服务器离家出走了 ⊙﹏⊙∥', 'danger')
                break;
            case 500:
                toast('服务器出现了点小问题 ⊙﹏⊙∥', 'danger')
                break;
            default:
                toast(response.data.msg, 'warning')
        }
    }
)

function gotoLogin(title: string, content: string){
    confirm({title, text: content}, () => {
        window.location.href='/auth/login'
    })
}

type ReCfg = {
    url: string;
    method?: 'get' | 'post' | 'put' | 'delete';
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