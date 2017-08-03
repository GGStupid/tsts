//Verification
export const isPhone = (phone) => {
    if (!(/^1[34578]\d{9}$/.test(phone)) || phone.length != 11) {
        return false
    } else if (/^1[34578]\d{9}$/.test(phone) && phone.length == 11) {
        return true;
    }
}
//密码由8-16位数字及字母组成
export const isPassWord = (password) => {
    if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,16}$/.test(password)) {
        return false
    } else {
        return true
    }
}
//6-18数字和字母
export const isUserName=(username)=>{
    if (!/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/.test(username)) {
        return false
    } else {
        return true
    }
}
//2-30位包含点的真实姓名
export const isRealName = (realName) => {
    if (!/^[\u4e00-\u9fa5\.]{2,30}$/.test(realName)) {
        return false
    } else {
        return true;
    }
}
//身份证包含X
export const isIdCard = (idcard) => {
    if (!/^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X)$/.test(idcard)) {
        return false;
    } else {
        return true;
    }
}
//bank
export const isBankNumber = (bankNumber) => {
    if (!/^(\d{16}|\d{19})$/.test(bankNumber)) {
        return false;
    } else {
        return true;
    }
}
//toast
export const toast = (msg = '', time = 1500) => {
    var toast = document.createElement('div')
    toast.className = 'common-toast common-toast-show'
    toast.innerHTML = msg
    document.body.appendChild(toast)
    toast.style.display = 'block'
    var timer = setTimeout(() => {
        toast.className = 'common-toast common-toast-hide'
        clearTimeout(timer)
        var timer2 = setTimeout(() => {
            document.body.removeChild(toast)
            clearTimeout(timer2)
        }, 200)
    }, time)
}

//cookie setting
export const setCookie = (c_name, value, expiredays) => {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = c_name + "=" + escape(value) +((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}

export const getCookie = (c_name) => {
    if (document.cookie.length > 0) {
        let c_start = document.cookie.indexOf(c_name + "=")
        if (c_start != -1) {
            c_start = c_start + c_name.length + 1
            let c_end = document.cookie.indexOf(";", c_start)
            if (c_end == -1) {
                c_end = document.cookie.length
            }
            return unescape(document.cookie.substring(c_start, c_end))
        }
    }
    return ""
}

export const delCookie = (c_name) => {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(c_name);
    if (cval != null)
        document.cookie = c_name + "=" + cval + ";expires=" + exp.toGMTString();
}