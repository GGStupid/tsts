<template>
    <div class="quickPayWrap">
         <v-PayPwToast :isShow="isShow" @cancelToast="cancelToast"></v-PayPwToast>
        <div class="form">
            <div class="list" style="margin:0.266667rem 0">
                <span>充值金额</span>
                <input type="text" v-model="moneyNum" placeholder="请输入充值金额">
            </div>
            <div class="list" @click="showBankLists">
                <span>支付银行</span>
                <input type="text" v-model="SelectBank" placeholder="请选择支付银行" readonly>
                <img class="rIcon" src="../../../assets/arrow_right.png" alt="">
            </div>
            <div class="list">
                <span>银行卡号</span>
                <input type="text" v-model="bankId" placeholder="请输入银行卡号">
            </div>
            <div class="list">
                <span>手机号码</span>
                <input type="text" v-model="tel" placeholder="请输入银行预留手机号">
            </div>
            <div class="list">
                <span>验证码&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <input type="tel" maxlength="6" v-model='phoneCode' placeholder='输入验证码'>
                <span @click='getphoneCode' v-text='phoneCodetitle' class="rIcon cdspan" :class="{unactive:iscount}"></span>
            </div>
        </div>
        <div class="button">
            <v-Button title='确定' :isActive='isActive' topNum='0.6667rem' @toNext='toNext'></v-Button>
        </div>
    </div>
</template>

<script>

import Button from '@/components/buttons/Button690'
import PayPwToast from '@/components/PayPwToast'
import { isPhone } from '@/util/index'
export default {
    data() {
        return {
            isShow:false,
            moneyNum: '',
            bankId:'',
            tel: '',
            phoneCode: '',
            phoneCodetitle: '获取验证码',
            count: 60,
            iscount: false,
            isActive: true
        }
    },
    computed: {
        SelectBank() {
            return this.$store.state.SelectBank
        }
    },
    components: {
        'v-Button': Button,
        'v-PayPwToast': PayPwToast
    },
    methods: {
        showBankLists() {
            console.log('showBankLists')
            this.$router.push('/selectBank')
        },
        getphoneCode() {
            if (isPhone(this.tel)) {
                if (this.count != 60) {
                    return false
                }
                let timer = setInterval(() => {
                    this.iscount = true
                    this.count--
                    this.phoneCodetitle = `${this.count}s`
                    if (this.count == 0) {
                        clearInterval(timer)
                        this.phoneCodetitle = '重新获取验证码'
                        this.count = 60
                        this.iscount = false
                    }
                }, 1000)
                let sendData = {
                    phone: this.phone
                }
                login.userGetRegistCode(sendData).then(data => {
                    if (data.data.code == 200) {

                    } else {
                        toast(data.data.message)
                    }
                })
            }
        },
        toNext() {
            console.log('toNext---pay')
            this.isShow = true
        },
        cancelToast(){
            this.isShow = false
        }
    },
    beforeRouteEnter(to, from, next) {
        document.querySelector('title').innerText = '快捷支付'
        next()
    },
}
</script>

<style lang="less" scoped>
@import '../../../less/config.less';
.quickPayWrap {
    .tips {
        color: @yellow;
        padding: @p30;
        font-size: 0.32rem;
    }
    .form {
        .list {
            height: 1.30667rem;
            padding: 0 0.32rem;
            position: relative;
            font-size: @fontsize32;
            color: @color;
            background-color: @bgcolor;
            border-bottom: 1px solid #191A22;
            img {
                width: 0.16rem;
                line-height: 1.1733rem;
                vertical-align: middle
            }
            .cdspan {
                color: @yellow;
                padding: 0 0 0 0.2667rem;
                text-align: center;
                border-left: 1px solid #191A22;
            }
            .unactive {
                color: @placeColor
            }
            .rIcon {
                position: absolute;
                right: 0.32rem;
                top: 0.44rem;
            }
            input {
                color: #ffffff;
                line-height: 1.1733rem;
                margin-left: 1.06667rem;
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
    }
    .button {
        padding: 0 @p30;
    }
}
</style>
