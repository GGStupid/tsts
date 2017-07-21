<template>
    <div class="PayPwToastWrap" v-show="isShow">
        <div class="mask">
        </div>
        <label for="payPasswordinput">
            <div class="title">
                请输入支付密码
                <img src="../assets/trade_box_close.png" @click="cancelToast" alt="">
            </div>
            <div class="pwWrap">
                <div class="payPassword">
                    <span v-show="payPassword.length>=1"></span>
                </div>
                <div class="payPassword">
                    <span v-show="payPassword.length>=2"></span>
                </div>
                <div class="payPassword">
                    <span v-show="payPassword.length>=3"></span>
                </div>
                <div class="payPassword">
                    <span v-show="payPassword.length>=4"></span>
                </div>
                <div class="payPassword">
                    <span v-show="payPassword.length>=5"></span>
                </div>
                <div class="payPassword" style="border:none">
                    <span v-show="payPassword.length>=6"></span>
                </div>
                <input type="tel" autofocus="autofocus" ref="payPasswordinput" id="payPasswordinput" maxlength="6" v-model="payPassword">
            </div>
            <div class="end" @click="toPayPw">
                忘记密码？
            </div>
        </label>
    </div>
</template>

<script>
import mine from '@/api/mine/index'
import { toast, isPhone } from '@/util/index'
export default {
    data() {
        return {
            payPassword: ''
        }
    },
    props: {
        isShow: {
            type: Boolean
        },
        amount: {
            type: String
        },
        userBankId: {
            type: String
        }
    },
    methods: {
        cancelToast() {
            this.$emit('cancelToast')
            this.payPassword = ''
        },
        toPayPw() {
            this.$router.replace('/paypassword')
        }
    },
    watch: {
        isShow() {
            setTimeout(() => {
                document.querySelector('#payPasswordinput').focus();
            }, 500)
        },
        payPassword: function () {
            if (this.payPassword.length == 6) {
                console.log('toSuccessAjax')
                let encrypt = new JSEncrypt();
                encrypt.setPublicKey(this.$store.state.pubkey);
                let sendData = {
                    amount: this.amount,
                    userBankId: this.userBankId,
                    payPassword: encrypt.encrypt(this.payPassword),
                }
                mine.cash(sendData).then(data => {
                    if (data.data.code == 200) {
                        toast(data.data.message)
                        this.$router.go(-1)
                    } else {
                        toast(data.data.message)
                        this.payPassword=''
                    }
                })
            }
        }
    }
}
</script>

<style lang="less" scoped>
@msgColor: #333;
@buttonColor: #007aff;
@buttonsHeight: 1.2rem;
@fontSize: 0.45333rem;
@borderColor: #ddd;
@borderRadius: 0.32rem;
.mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    height: 100%;
    width: 100%;
    background-color: #000;
    opacity: 0.5;
}

label {
    width: 7.2rem;
    height: 3.73333rem;
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -40%);
    z-index: 1000;
    background-color: #fff;
    font-size: @fontSize;
    border-radius: @borderRadius;
    .title {
        width: 6.4rem;
        color: #000;
        font-size: 0.48rem;
        margin: 0.48rem auto 0.56rem;
        text-align: center;
        position: relative;
        img {
            position: absolute;
            top: 0.05rem;
            right: 0;
            width: 0.373333rem;
        }
    }
    .pwWrap {
        display: flex;
        justify-content: space-between;
        border: 0.026667rem solid #ddd;
        height: 1.06667rem;
        width: 6.4rem;
        margin: 0 auto;
        position: relative;
        .payPassword {
            border-right: 0.026667rem solid #ddd;
            flex: 1 1 1.066667rem;
            display: flex;
            justify-content: center;
            align-items: center;
            span {
                display: inline-block;
                width: 0.18666rem;
                height: 0.18666rem;
                border-radius: 50%;
                background-color: #000;
            }
        }
        #payPasswordinput {
            position: absolute;
            left: -9999px;
        }
    }
    .end {
        color: #007aff;
        font-size: 0.346667rem;
        width: 6.4rem;
        text-align: right;
        margin: 0.48rem auto;
    }
}
</style>
