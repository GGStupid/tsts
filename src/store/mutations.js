export default {
    //token
    saveToken(state,payload){
        localStorage.setItem('token', payload)
        state.token=payload
    },
    //register phone
    saveRegisterPhone(state,payload){
        state.phone=payload
    }
}