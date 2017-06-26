import instance from '../config/index'
import qs from 'qs'
let wrapUrl='/api'
export default {
    //获取Token
    getToken(){
        return instance.get(wrapUrl+'/token')
    },
    // 用户登录
    userLogin(data){
        return instance.post(wrapUrl+'/login',qs.stringify(data))
    },
    // 用户获取验证码
    userGetRegistCode(data){
        return instance.post(wrapUrl+'/userRegist/sendMsg',qs.stringify(data))
    },
    //注册1
    userCheckRegistCode(data){
        return instance.post(wrapUrl+'/userRegist/checkPhone',qs.stringify(data))
    },
    //用户注册
    userRegister(data){
        return instance.post(wrapUrl+'/userRegist',qs.stringify(data))
    },
    //忘记密码验证码
    userGetForgotCode(data){
        return instance.post(wrapUrl+'/forgotPwd/getForgotCode',qs.stringify(data))
    },
    //忘记密码确定
    userForgot(data){
        return instance.post(wrapUrl+'/forgotPwd/doForgotPwd',qs.stringify(data))
    }
}