import instance from '../config/index'
import qs from 'qs'
let wrapUrl = '/api'
export default {
    //热门产品
    hot(data) {
        return instance.post(wrapUrl + '/quotation/hot', qs.stringify(data))
    },
    //新人预告
    new(data) {
        return instance.post(wrapUrl + '/quotation/purchase/new', qs.stringify(data))
    },
    //增发预告预告
    inc(data) {
        return instance.post(wrapUrl + '/quotation/purchase/inc', qs.stringify(data))
    },
    //分类列表
    type(data) {
        return instance.get(wrapUrl + '/quotation/type?' + qs.stringify(data))
    },
    //行情 自选
    my(data) {
        return instance.get(wrapUrl + '/member/quotation/my?' + qs.stringify(data))
    },
    //产品列表
    list(data) {
        return instance.get(wrapUrl + '/quotation/list?' + qs.stringify(data))
    },
    //前台产品行情页面
    quotation(data) {
        return instance.get(wrapUrl + '/quotation?' + qs.stringify(data))
    },
    //添加自选功能/或取消
    optional(data) {
        return instance.post(wrapUrl + '/member/quotation/optional', qs.stringify(data))
    },
    //产品论坛分页列表
    getforums(data) {
        return instance.get(wrapUrl + '/forums?' + qs.stringify(data))
    },
    //上传图片
    upload(data) {
        return instance.post(wrapUrl + '/file/upload', qs.stringify(data))
    },
    //发表论坛
    postforums(data) {
        return instance.post(wrapUrl + '/member/forums', qs.stringify(data))
    },
    //论坛评论
    comment(data) {
        return instance.post(wrapUrl + '/member/forums/comment', qs.stringify(data))
    },
    //论坛点赞
    like(data) {
        return instance.post(wrapUrl + '/member/forums/like', qs.stringify(data))
    },
    //删除评论
    commentDelete(data) {
        return instance.post(wrapUrl + '/member/forums/commentDelete', qs.stringify(data))
    },
    //发行人简介
    detailget(data) {
        return instance.get(wrapUrl + '/publisher/detail?' + qs.stringify(data))
    },
    //前台新闻列表
    news(data) {
        return instance.get(wrapUrl + '/news?' + qs.stringify(data))
    },
    //新闻详情
    newsId(data,config) {
        return instance.get(wrapUrl + '/news/detail?' + qs.stringify(data),config)
    },
    //艺人公告
    announces(data) {
        return instance.get(wrapUrl + '/announces?' + qs.stringify(data))
    },
    //买卖-申购-详情
    detail(data) {
        return instance.post(wrapUrl + '/member/purchase/detail', qs.stringify(data))
    },
    //买卖-申购-下单
    purchase(data) {
        return instance.post(wrapUrl + '/member/purchase', qs.stringify(data))
    },
}