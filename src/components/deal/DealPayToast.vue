<template>
    <div class="PayPwToastWrap" v-show="isShow">
        <div class="mask">
        </div>
        <label for="payPwdinput">
            <div class="title">
                请输入支付密码
                <img src="../../assets/trade_box_close.png" @click="cancelToast" alt="">
            </div>
            <div class="pwWrap">
                <div class="payPwd">
                    <span v-show="payPwd.length>=1"></span>
                </div>
                <div class="payPwd">
                    <span v-show="payPwd.length>=2"></span>
                </div>
                <div class="payPwd">
                    <span v-show="payPwd.length>=3"></span>
                </div>
                <div class="payPwd">
                    <span v-show="payPwd.length>=4"></span>
                </div>
                <div class="payPwd">
                    <span v-show="payPwd.length>=5"></span>
                </div>
                <div class="payPwd" style="border:none">
                    <span v-show="payPwd.length>=6"></span>
                </div>
                <input type="tel" autofocus="autofocus" ref="payPwdinput" id="payPwdinput" maxlength="6" v-model="payPwd">
            </div>
            <div class="end" @click="toPayPw">
                忘记密码？
            </div>
        </label>
    </div>
</template>

<script>
import deal from '@/api/deal'
import { toast, isPhone } from '@/util/index'
export default {
    data() {
        return {
            payPwd: ''
        }
    },
    props: {
        isShow: {
            type: Boolean
        },
        number: '',
        price: '',
        productId: ''
    },
    methods: {
        cancelToast() {
            this.$emit('cancelToast')
            this.payPwd = ''
        },
        toPayPw() {
            this.$router.replace('/paypassword')
        }
    },
    watch: {
        isShow() {
            setTimeout(() => {
                document.querySelector('#payPwdinput').focus();
            }, 500)
        },
        payPwd: function () {
            if (this.payPwd.length == 6) {
                console.log('toSuccessAjax')
                let encrypt = new JSEncrypt();
                encrypt.setPublicKey(this.$store.state.pubkey);
                let sendData = {
                    number: this.number,
                    price: this.price,
                    productId: this.productId,
                    payPwd: encrypt.encrypt(this.payPwd),
                }
                deal.buy(sendData).then(data => {
                    if (data.data.code == 200) {
                        toast(data.data.message)
                        this.payPwd = ''
                        this.$emit('isPayToastHide', false)
                    } else {
                        this.payPwd = ''
                        toast(data.data.message)
                        this.$emit('isPayToastHide', false)
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
        .payPwd {
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
        #payPwdinput {
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
