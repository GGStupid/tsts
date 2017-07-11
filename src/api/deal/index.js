import instance from '../config/index'
import qs from 'qs'
let wrapUrl = '/api'
export default {
    //列表-搜索
    search(data,config) {
        return instance.get(wrapUrl + '/quotation/search?' + qs.stringify(data),config)
    },
    //买卖---已购---已购列表
    positions(data) {
        return instance.get(wrapUrl + '/member/positions?' + qs.stringify(data))
    },
    //买卖---已购---最新价
    latestPrice(data) {
        return instance.get(wrapUrl + '/member/positions/latestPrice?' + qs.stringify(data))
    },
    //查询用户余额
    available(data) {
        return instance.get(wrapUrl + '/member/account/available?' + qs.stringify(data))
    },
    //订单-列表//当日委托
    entrusts(data) {
        return instance.get(wrapUrl + '/member/entrusts?' + qs.stringify(data))
    },
    //撤单
    back(data) {
        return instance.post(wrapUrl + '/member/entrusts/back', qs.stringify(data))
    },
    //历史委托
    history(data) {
        return instance.get(wrapUrl + '/member/entrusts/history?' + qs.stringify(data))
    },
    //当日成交列表
    transactions(data) {
        return instance.get(wrapUrl + '/member/transactions?'+ qs.stringify(data))
    },
    //历史成交记录
    transactionshistory(data) {
        return instance.get(wrapUrl + '/member/transactions/history?' + qs.stringify(data))
    },
    //买卖-买-下单
    buy(data) {
        return instance.post(wrapUrl + '/member/entrusts/buy', qs.stringify(data))
    },
    //行情-卖-下单
    sell(data) {
        return instance.post(wrapUrl + '/member/entrusts/sell', qs.stringify(data))
    },
    //行情-买/卖-确认订单数据
    doMsg(data) {
        return instance.post(wrapUrl + '/member/entrusts/doMsg', qs.stringify(data))
    },
    //行情-买/卖-十档行情
    tend(data,config) {
        return instance.post(wrapUrl + '/member/entrusts/tend', qs.stringify(data),config)
    }
}