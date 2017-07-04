import axios from 'axios'
import app from '../../main'
const instance=axios.create();
instance.defaults.timeout=5000
instance.defaults.headers['Content-Type']='application/x-www-form-urlencoded'
axios.interceptors.request.use=instance.interceptors.request.use
instance.interceptors.request.use(config=>{
    // console.log('发送请求')
    return config
},err=>{
    return Promise.reject(err)
})

instance.interceptors.response.use(response=>{
    //   console.log('请求结束')
    if(response.data.code==401){
        app.$router.push('/')
    }
    return response
},err=>{
    return Promise.reject(err)
})

export default instance