<template>
    <div class="quickPayWrap">
        <!--<v-PayPwToast :isShow="isShow" :payword="payword" @cancelToast="cancelToast"></v-PayPwToast>-->
        <v-BankLists :banks="banks" :bankListShow="bankListShow" @selectBank="selectBank" @cancelLists="cancelLists"></v-BankLists>
        <div class="form">
            <div class="list" style="margin:0.266667rem 0" @click="showBankLists">
                <span>银行卡&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <span class="bankName" :class="{'activeColor':activeColor}">{{bankSelect}}</span>
                <img class="rIcon" src="../../../assets/arrow_right.png" alt="">
            </div>
            <div class="list">
                <span>充值金额</span>
                <input type="text" v-model="amount" placeholder="请输入充值金额">
            </div>
            <div class="list">
                <span>手机号码</span>
                <span class="bankName">{{mobilePhone}}</span>
            </div>
            <div class="list">
                <span>验证码&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <input type="tel" maxlength="6" v-model='phoneCode' placeholder='请输入验证码'>
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
import BankLists from '@/components/mine/BankLists'
import { toast, isPhone } from '@/util/index'
import mine from '@/api/mine/index'
export default {
    data() {
        return {
            isShow: false,
            bankListShow: false,
            banks: [],
            bankName: '',
            bankSelect: '请选择银行卡',
            userBankId: '',
            amount: '',
            mobilePhone: '选择银行即可',
            bankNum: '',
            tel: '',
            phoneCode: '',
            phoneCodetitle: '获取验证码',
            count: 60,
            iscount: false,
            isActive: true
        }
    },
    computed: {
        activeColor() {
            return this.bankSelect != '请选择银行卡'
        }
    },
    methods: {
        showBankLists() {
            console.log('showBankLists')
            this.bankListShow = true
        },
        cancelLists() {
            console.log('cancelLists')
            this.bankListShow = false
        },
        selectBank(bank) {
            console.log('selectBank')
            console.log(bank)
            this.bankSelect = `${bank.bankName} (尾号${bank.bankNo.slice(-4)})`
            this.userBankId = bank.id
            this.bankName = bank.bankName
            this.userBankId = bank.id.toString();
            this.mobilePhone = bank.mobilePhone
        },
        getphoneCode() {
            let sendData = {
                amount: this.amount,
                userBankId: this.userBankId,
            }
            if (this.count != 60) {
                return false
            }
            if (!this.userBankId) return toast('请选择我的银行卡')
            if (!this.amount) return toast('请输入充值金额')
            console.log(11111111)
            mine.rechargeMsg(sendData).then(data => {
                if (data.data.code == 200) {
                    toast('手机验证码已发送请注意查收')
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
                } else {
                    toast(data.data.message)
                }
            })
        },
        toNext() {
            console.log('toNext---pay')
            // this.isShow = true
            let sendData = {
                amount: this.amount,
                userBankId: this.userBankId,
                smsCode:this.phoneCode
            }
            // this.isShow = true
            if (!this.userBankId) return toast('请选择我的银行卡')
            if (!this.amount) return toast('请输入充值金额')
            if (this.phoneCode.length != 6) return toast('请输入正确的验证码')
            mine.recharge(sendData).then((data) => {
                if (data.data.code == 200) {
                    toast(data.data.message)    
                    this.$router.go(-2)  
                } else {
                    toast(data.data.message)
                    // toast(data.data.message)
                }
            })
        },
        cancelToast() {
            this.isShow = false
        }
    },
    mounted() {
        mine.userBank().then(data => {
            this.banks = data.data.data
        })
    },
    beforeRouteEnter(to, from, next) {
        document.querySelector('title').innerText = '银行卡充值'
        next()
    },
    components: {
        'v-Button': Button,
        'v-PayPwToast': PayPwToast,
        'v-BankLists': BankLists
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
            padding: 0 @p30;
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
            .bankName {
                display: inline-block;
                color: #999999;
                height: 1.30667rem;
                line-height: 1.30667rem;
                margin-left: 1.06667rem;
            }
            .activeColor {
                color: #ffffff;
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
        .telWrap {
            margin: @p30 0;
            font-size: 0.373333rem;
            color: #999;
            padding: 0 @p30;
        }
    }
    .button {
        padding: 0 @p30;
    }
}
</style>
