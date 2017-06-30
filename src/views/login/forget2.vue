<template>
    <div class="register1wrap">
        <div class="form">
            <div class="list">
                <span>登录密码</span>
                <input v-if='ispassword1' type="password" maxlength="16" v-model='password1' placeholder='8-16位数字和字母组成' @keyup='isCleanShow1'>
                <input v-if='!ispassword1' type="text" maxlength="16" v-model='password1' placeholder='8-16位数字和字母组成' @keyup='isCleanShow1'>
                <img src="../../assets/icon_clean.png" v-show="passShow1" @click='isClean1' alt="">
                <img class="rIcon" :src="passwordSrc1" alt="" @click='checkTpye1'>
            </div>
            <div class="list">
                <span>确认密码</span>
                <input v-if='ispassword2' type="password" maxlength="16" v-model='password2' placeholder='再次确认密码' @keyup='isCleanShow2'>
                <input v-if='!ispassword2' type="text" maxlength="16" v-model='password2' placeholder='再次确认密码' @keyup='isCleanShow2'>
                <img src="../../assets/icon_clean.png" v-show="passShow2" @click='isClean2' alt="">
                <img class="rIcon" :src="passwordSrc2" alt="" @click='checkTpye'>
            </div>
        </div>
        <v-button title='确定' :isActive='isActive' topNum='0.6667rem' @toNext='confirm'></v-button>
    </div>
</template>

<script>
import login from '@/api/login/index'
import Button from '@/components/buttons/Button690'
import { toast, isPassWord } from '@/util/index'
export default {
    data() {
        return {
            password1: '',
            passShow1: false,
            ispassword1: true,
            passwordSrc1: require('../../assets/icon_hide_pwd.png'),
            password2: '',
            passShow2: false,
            ispassword2: true,
            passwordSrc2: require('../../assets/icon_hide_pwd.png'),
            isActive: true
        }
    },
    components: {
        'v-button': Button
    },
    methods: {
        isCleanShow1() {
            if (this.password1 != '') {
                this.passShow1 = true
                return
            } else {
                this.passShow1 = false
                return
            }
        },
        isClean1() {
            if (this.password1 != '') {
                this.password1 = ''
                this.passShow1 = false
                return
            }
        },
        checkTpye1() {
            this.ispassword1 = !this.ispassword1;
            if (!this.ispassword1) {
                this.passwordSrc1 = require('../../assets/icon_show_pwd.png')
            } else {
                this.passwordSrc1 = require('../../assets/icon_hide_pwd.png')
            }
        },
        isCleanShow2() {
            if (this.password2 != '') {
                this.passShow2 = true
                return
            } else {
                this.passShow2 = false
                return
            }
        },
        isClean2() {
            if (this.password2 != '') {
                this.password2 = ''
                this.passShow2 = false
                return
            }
        },
        checkTpye() {
            this.ispassword2 = !this.ispassword2;
            if (!this.ispassword2) {
                this.passwordSrc2 = require('../../assets/icon_show_pwd.png')
            } else {
                this.passwordSrc2 = require('../../assets/icon_hide_pwd.png')
            }
        },
        confirm() {
            if (isPassWord(this.password1) && this.password1 == this.password2) {
                console.log('confirm')
                let encrypt = new JSEncrypt();
                encrypt.setPublicKey(this.$store.state.pubkey);
                let sendData = {
                    mobilePhone: this.$store.state.phone,
                    password: encrypt.encrypt(this.password2),
                    phoneCode: this.$store.state.phoneCode,
                }
                login.resetPwd(sendData).then(data => {
                    if (data.data.code == 200) {
                        toast('密码修改成功，请登录')
                        this.$router.push({ path: '/' })
                    } else {
                        toast(data.data.message)
                    }
                })
            } else if(this.password1 != this.password2){
                toast('2次密码输入不一致')
            }else{
                toast('请输入正确的密码格式')
            }
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../less/config.less';
.register1wrap {
    padding: @m50 @p30 0;
    .form {
        border-radius: 0.08rem;
        background-color: #353641;
    }
    .list {
        height: 1.30667rem;
        padding: 0 0.32rem;
        position: relative;
        font-size: @fontsize32;
        color: @color;
        border-bottom: 1px solid #191A22;
        img {
            width: 0.42667rem;
            line-height: 1.1733rem;
            vertical-align: middle
        }
        .cdspan {
            color: @yellow;
            padding: 0 0 0 0.2667rem;
            text-align: center;
            border-left: 1px solid #191A22;
        }
        .rIcon {
            position: absolute;
            right: 0.32rem;
            top: 0.44rem;
        }
        input {
            color: #ffffff;
            line-height: 1.1733rem;
            margin-left: 0.64rem;
        }
        input::-webkit-input-placeholder {
            /* WebKit browsers*/
            color: @placeColor;
        }
        input::-moz-placeholder {
            /* Mozilla Firefox 4 to 18*/
            color: @placeColor;
        }
        input::-moz-placeholder {
            /* Mozilla Firefox 19+*/
            color: @placeColor;
        }
        input:-ms-input-placeholder {
            /* Internet Explorer 10+*/
            color: @placeColor;
        }
    }
    .agreement {
        margin-top: 0.2667rem;
        color: @color;
        text-align: center;
        font-size: @p30;
        .tips {
            color: #f8cc00;
        }
    }
}
</style>
