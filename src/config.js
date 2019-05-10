import axios from 'axios'
import { Toast } from 'antd-mobile'
axios.interceptors.request.use(config=>{
    Toast.loading('加载中',0)
    return config
})
axios.interceptors.response.use(config=>{
    Toast.hide()
    return config
},function(err){
    switch(err.response.status){
        case 404:
            console.log("请求地址不存在"+err.response.status)
            return false;
        case 500:
            console.log("服务器出错"+err.response.status)
            return false;
        default:
            return false
    }
})
