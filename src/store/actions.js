export default {
    //loadShow
    loadShow({commit},payload){
        commit('loadShow',payload)
    },
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
    //productId
     productId({commit},payload){
        commit('productId', payload)
    },
    //title
    title({commit},payload){
        commit('title', payload)
    },
    //commentSendData
    commentSendData({commit},payload){
        commit('commentSendData', payload)
    },
    //currentView
    currentView({commit},payload){
        commit('currentView', payload)
    },
    //code
    code({commit},payload){
        commit('code', payload)
    },
    //attorncode
    attorncode({commit},payload){
        commit('attorncode', payload)
    },
    //topPrice
    topPrice({commit},payload){
        commit('topPrice', payload)
    },
    //openPrice
    openPrice({commit},payload){
        commit('openPrice', payload)
    },
    //bottomPrice
    bottomPrice({commit},payload){
        commit('bottomPrice', payload)
    },
}