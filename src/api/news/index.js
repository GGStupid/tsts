import instance from '../config/index'
import qs from 'qs'
let wrapUrl='/api'
export default {
    //资讯banner列表
    banners(){
        return instance.get(wrapUrl+'/informations/banners')
    },
    //资讯分页列表
    informations(data){
        return instance.get(wrapUrl+'/informations/?'+qs.stringify(data))
    },
    // 资讯详情
    informationId(data){
        return instance.get(wrapUrl+'/informations/detail?'+qs.stringify(data))
    },
}