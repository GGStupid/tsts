export default {
    //baseImgUrl
    baseImgUrl(state,payload){
        state.baseImgUrl=payload
    },
    //SelectBank
    SelectBank(state,payload){
        state.SelectBank=payload
    },
    //token
    saveToken(state,payload){
        localStorage.setItem('token', payload)
        state.token=payload
    },
    //isLogin
    isLogin(state,payload){
        localStorage.setItem('isLogin', payload)
        state.isLogin=payload
    },
    //register regCode
    regCode(state,payload){
        state.regCode=payload
    },
    //userInfor
    userInfor(state,payload){
        localStorage.setItem('userInfor', JSON.stringify(payload))
        state.userInfor=payload
    },
    //savePhone
    savePhone(state,payload){
        state.phone=payload
    },
    //phoneCode
    phoneCode(state,payload){
        state.phoneCode=payload
    },
    //payPassword
    payPassword(state,payload){
        state.payPassword=payload
    },
    //publisherId
    publisherId(state,payload){
        state.publisherId=payload
    },
}