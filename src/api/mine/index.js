import instance from '../config/index'
import qs from 'qs'
let wrapUrl = '/api'
export default {
    //获取用户信息 从缓存获取
    getUserInfor() {
        return instance.get(wrapUrl + '/sessionUser')
    },
    //获取用户信息，实时
    getUserInforPost() {
        return instance.post(wrapUrl + '/sessionUser')
    },
    // 用户获取验证码
    userGetRegistCode(data) {
        return instance.post(wrapUrl + '/member/user/phoneCode', qs.stringify(data))
    },
    //修改昵称
    nickName(data) {
        return instance.post(wrapUrl + '/member/user/nickName', qs.stringify(data))
    },
    //支付验证码接口
    phoneCode(data) {
        return instance.post(wrapUrl + '/member/user/phoneCode', qs.stringify(data))
    },
    //支付密码修改1
    verifyPayPasswordCode(data) {
        return instance.post(wrapUrl + '/member/user/verifyPayPasswordCode', qs.stringify(data))
    },
    //支付密码修改2
    payPassword(data) {
        return instance.post(wrapUrl + '/member/user/payPassword', qs.stringify(data))
    },
    //支付密码-是否设置
    ispayPassword(data) {
        return instance.get(wrapUrl + '/member/user/payPassword', qs.stringify(data))
    },
    //支付密码是否输入正确
    verifyOldPayPassword(data) {
        return instance.post(wrapUrl + '/member/user/verifyOldPayPassword', qs.stringify(data))
    },
    // 支付密码修改-通过原密码
    oldPayPassword(data) {
        return instance.post(wrapUrl + '/member/user/oldPayPassword', qs.stringify(data))
    },
    //修改登录密码
    password(data) {
        return instance.post(wrapUrl + '/member/user/password', qs.stringify(data))
    },
    //好友列表 param:{page: "int(第几页开始 默认1)", rows: "int(每页多少条记录 默认20)"}
    inviteUser(data) {
        return instance.post(wrapUrl + '/member/user/inviteUser', qs.stringify(data))
    },
    //用户中心-我的-二维码
     inviteCode(data) {
        return instance.get(wrapUrl + '/member/user/inviteCode', qs.stringify(data))
    },
    //上传图片
    upload(data) {
        return instance.post(wrapUrl + '/file/upload', qs.stringify(data))
    },
    //更新头像
    avatarUrl(data) {
        return instance.post(wrapUrl + '/member/user/avatarUrl', qs.stringify(data))
    },
    //实名认证
    userVerified(data) {
        return instance.post(wrapUrl + '/member/user/userVerified', qs.stringify(data))
    },
    //银行列表
    bankList(data) {
        return instance.get(wrapUrl + '/member/amount/bankList', qs.stringify(data))
    },
    //我的银行卡
    userBank(data) {
        return instance.post(wrapUrl + '/member/user/userBank',qs.stringify(data))
    },
    //是否能添加银行卡
    verifyBank(data) {
        return instance.get(wrapUrl + '/member/user/verifyBank', qs.stringify(data))
    },
    //添加银行卡
    bank(data) {
        return instance.post(wrapUrl + '/member/user/bank', qs.stringify(data))
    },
    //删除银行卡
    delBank(data) {
        return instance.post(wrapUrl + '/member/user/delBank', qs.stringify(data))
    },
    //提现
    cash(data) {
        return instance.post(wrapUrl + '/member/amount/cash', qs.stringify(data))
    },
    //充值
    recharge(data) {
        return instance.post(wrapUrl + '/member/amount/recharge', qs.stringify(data))
    },
    //银行卡充值验证码
    rechargeMsg(data) {
        return instance.post(wrapUrl + '/member/amount/rechargeMsg', qs.stringify(data))
    },
    //资金记录
    accountLog(data) {
        return instance.post(wrapUrl + '/member/amount/accountLog', qs.stringify(data))
    },
    //我投资的发行人列表
    positions(data) {
        return instance.get(wrapUrl + '/member/positions?'+qs.stringify(data))
    },
    //交割
    delivery(data) {
        return instance.post(wrapUrl + '/member/positions/delivery', qs.stringify(data))
    },
    //交割记录
    records(data) {
        return instance.get(wrapUrl + '/member/positions/delivery/records?'+qs.stringify(data))
    },
    //帮助中心分类列表
    classes(data) {
        return instance.get(wrapUrl + '/helps/classes', qs.stringify(data))
    },
    //帮助中心内容列表
    contents(data) {
        return instance.get(wrapUrl + '/helps/contents?'+qs.stringify(data))
    },
}