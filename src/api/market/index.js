import instance from '../config/index'
import qs from 'qs'
let wrapUrl = '/api'
export default {
    //发行人简介
    publisher(data) {
        return instance.get(wrapUrl + '/publisher/', qs.stringify(data))
    },
    //前台新闻列表
    news(data) {
        return instance.get(wrapUrl + '/news', qs.stringify(data))
    },
    //新闻详情
    newsId(newsId) {
        return instance.get(wrapUrl + '/news/'+newsId)
    },
    //艺人公告
     announces(newsId) {
        return instance.get(wrapUrl + '/announces/'+newsId)
    },
}