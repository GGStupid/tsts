import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './actions'

Vue.use(Vuex)

const state={
    token:'',
    pubkey:"-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQC/4z1XpxhDUUMR2FAVDivOoRlheMXrTG4MaAq718xdBOmhfCuQlj8o1X8c1eOGt3hnt3JlkLdYh6dPhVfOsD0nXD5Etpb2X8udw/TwKh70pS94hvysLcuKkjdQfIkx+c54YOtIXhc2Pxb6f0HhNhChgJDfz/Ygx67DP7w6XJB57QIDAQAB-----END PUBLIC KEY-----",
    regCode:'',
    SelectBank:'',
    userInfor:''
}

export default new Vuex.Store({
    state,
    mutations,
    actions
})