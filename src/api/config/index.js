import axios from 'axios'
import app from '../../main'
const instance = axios.create();
instance.defaults.timeout = 10000
instance.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
axios.interceptors.request.use = instance.interceptors.request.use
instance.interceptors.request.use(config => {
    // console.log('发送请求')
    if(config.loading==false){
        return config
    }
    app.$store.dispatch('loadShow', false)
    return config
}, err => {
    return Promise.reject(err)
})

instance.interceptors.response.use(response => {
    //   console.log('请求结束')
    if (response.data.code == 401) {
        app.$router.push('/')
        app.$store.dispatch('loadShow', true)
        return  response
    }
    setTimeout(() => {
        app.$store.dispatch('loadShow', true)
    }, 300)
    return response
}, err => {
    return Promise.reject(err)
})

export default instance