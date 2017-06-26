export default {
    //SelectBank
    SelectBank(state,payload){
        state.SelectBank=payload
    },
    //token
    saveToken(state,payload){
        localStorage.setItem('token', payload)
        state.token=payload
    },
    //register regCode
    regCode(state,payload){
        state.regCode=payload
    },
    //userInfor
    userInfor(state,payload){
        localStorage.setItem('userInfor', JSON.stringify(payload))
        state.userInfor=payload
    }
}