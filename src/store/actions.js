export default {
    //SelectBank
    SelectBank({ commit }, payload) {
        commit('SelectBank', payload)
    },
    //Token
    saveToken({ commit }, payload) {
        commit('saveToken', payload)
    },
    //register phone
    regCode({ commit }, payload) {
        commit('regCode', payload)
    },
    //userInfor
    userInfor({commit},payload){
        commit('userInfor', payload)
    }
}