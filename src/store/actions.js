export default {
    //baseImgUrl
    baseImgUrl({commit},payload){
        commit('baseImgUrl',payload)
    },
    //SelectBank
    SelectBank({ commit }, payload) {
        commit('SelectBank', payload)
    },
    //Token
    saveToken({ commit }, payload) {
        commit('saveToken', payload)
    },
    //isLogin
    isLogin({ commit }, payload) {
        commit('isLogin', payload)
    },
    //register phone
    regCode({ commit }, payload) {
        commit('regCode', payload)
    },
    //userInfor
    userInfor({commit},payload){
        commit('userInfor', payload)
    },
    //savePhone
    savePhone({commit},payload){
        commit('savePhone', payload)
    },
    //phoneCode
    phoneCode({commit},payload){
        commit('phoneCode', payload)
    },
    //payPassword
    payPassword({commit},payload){
        commit('payPassword', payload)
    },
    //publisherId
     publisherId({commit},payload){
        commit('publisherId', payload)
    },
}