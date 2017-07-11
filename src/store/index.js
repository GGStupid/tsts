import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state={
    loadShow:true,
    baseImgUrl:'http://test.static.53fxp.com/',//http://test.static.53fxp.com/
    token:'',
    isLogin:localStorage.getItem('isLogin'),
    pubkey:"-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC/4z1XpxhDUUMR2FAVDivOoRlheMXrTG4MaAq718xdBOmhfCuQlj8o1X8c1eOGt3hnt3JlkLdYh6dPhVfOsD0nXD5Etpb2X8udw/TwKh70pS94hvysLcuKkjdQfIkx+c54YOtIXhc2Pxb6f0HhNhChgJDfz/Ygx67DP7w6XJB57QIDAQAB-----END PUBLIC KEY-----",
    regCode:'',
    phone:'',
    phoneCode:'',
    payPassword:'',
    SelectBank:'',
    userInfor:JSON.parse(localStorage.getItem('userInfor')),
    productId:localStorage.getItem('productId'),
    title:'',
    commentSendData:JSON.parse(localStorage.getItem('commentSendData')),
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})