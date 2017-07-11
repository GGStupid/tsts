import instance from '../config/index'
import qs from 'qs'
let wrapUrl = '/api'
export default {
    //消息首页接口
    message(data, config) {
        return instance.get(wrapUrl + '/member/message?' + qs.stringify(data), config)
    },
    //消息-通知分页列表
    announces(data, config) {
        return instance.get(wrapUrl + '/member/message/announces?' + qs.stringify(data), config)
    },
    //消息-系统通知分页列表
    noticeLogs(data, config) {
        return instance.get(wrapUrl + '/member/message/noticeLogs?' + qs.stringify(data), config)
    },
}