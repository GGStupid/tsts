import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'
import { getCookie } from '@/util/index'

Vue.use(Vuex)

const state={
    loadShow:true,
    baseImgUrl:'http://static.53fxp.com/',//http://test.static.53fxp.com/
    token:'',
    isLogin:getCookie('TAOKE_USER_DATA') || localStorage.getItem("isLogin"),
    pubkey:"-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC/4z1XpxhDUUMR2FAVDivOoRlheMXrTG4MaAq718xdBOmhfCuQlj8o1X8c1eOGt3hnt3JlkLdYh6dPhVfOsD0nXD5Etpb2X8udw/TwKh70pS94hvysLcuKkjdQfIkx+c54YOtIXhc2Pxb6f0HhNhChgJDfz/Ygx67DP7w6XJB57QIDAQAB-----END PUBLIC KEY-----",
    regCode:'',
    phone:'',
    phoneCode:'',
    payPassword:'',
    SelectBank:'',
    userInfor:JSON.parse(localStorage.getItem('userInfor')),
    productId:localStorage.getItem('productId'),
    title:'',
    topPrice:'',
    openPrice:'',
    bottomPrice:'',
    commentSendData:JSON.parse(localStorage.getItem('commentSendData')),
    currentView:'Buy',
    code:JSON.parse(localStorage.getItem('code'))||'',
    attorncode:JSON.parse(localStorage.getItem('code'))||'',
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})