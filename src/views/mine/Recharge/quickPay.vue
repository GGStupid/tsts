<template>
    <div class="quickPayWrap">
        <!--<v-PayPwToast :isShow="isShow" @cancelToast="cancelToast"></v-PayPwToast>-->
        <div class="form">
            <div class="list" style="margin:0.266667rem 0">
                <span>充值金额</span>
                <input type="tel" v-model="amount" placeholder="请输入充值金额">
            </div>
            <div class="list" @click="showBankLists">
                <span>支付银行</span>
                <span class="bankName" :class="{'activeColor':activeColor}">{{bankName}}</span>
                <img class="rIcon" src="../../../assets/arrow_right.png" alt="">
            </div>
            <div class="list">
                <span>银行卡号</span>
                <input type="tel" v-model="bankNo" maxlength="20" placeholder="请输入银行卡号">
            </div>
            <div class="list">
                <span>手机号码</span>
                <input type="tel" v-model="mobilePhone" maxlength="11" placeholder="请输入银行预留手机号">
            </div>
            <div class="list">
                <span>验证码&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <input type="tel" maxlength="6" v-model='smsCode' placeholder='输入验证码'>
                <span @click='getsmsCode' v-text='smsCodetitle' class="rIcon cdspan" :class="{unactive:iscount}"></span>
            </div>
        </div>
        <div class="button">
            <v-Button title='确定' :isActive='isActive' topNum='0.6667rem' @toNext='toNext'></v-Button>
        </div>
        <div class="bankNameWrap" v-show="isbankNames">
            <div class="list" @click="toSelect(bank)" v-for="(bank,index) in bankLists" :key="index">
                <img class="icon" :src="baseImgUrl+bank.icon" alt="">
                <span>{{bank.name}}</span>
                <img class="rIcon" v-show="bankName==bank.name" src="../../../assets/pay_select_s.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>

import Button from '@/components/buttons/Button690'
import PayPwToast from '@/components/PayPwToast'
import mine from '@/api/mine/index'
import { toast, isBankNumber, isPhone } from '@/util/index'
export default {
    data() {
        return {
            baseImgUrl: this.$store.state.baseImgUrl,
            isShow: false,
            amount: '',
            bankName: '请选择银行卡',
            bankCode:'',
            isbankNames: false,
            bankLists: [],
            bankNo: '',
            mobilePhone: '',
            smsCode: '',
            smsCodetitle: '获取验证码',
            count: 60,
            iscount: false,
            isActive: true
        }
    },
    computed: {
        // bankName() {
        //     return this.$store.state.bankName
        // },
        activeColor() {
            return this.bankName != '请选择银行卡'
        }
    },
    methods: {
        showBankLists() {
            console.log('showBankLists')
            // this.$router.push('/bankName')
            this.isbankNames = true
            document.querySelector('title').innerText = '选择支付银行'
        },
        toSelect(bank) {
            console.log(bank)
            this.bankCode = bank.insideCode
            this.bankName = bank.name
            this.isbankNames = false
            document.querySelector('title').innerText = '快捷支付'
        },
        getsmsCode() {
            let senddata = {
                amount: this.amount,
                bankCode: this.bankCode,
                bankName: this.bankName,
                bankNo: this.bankNo,
                mobilePhone: this.mobilePhone,
                smsCode: this.smsCode
            }
            if (this.count != 60) {
                return false
            }
            if (!this.amount) return toast('请输入充值金额')
            if (!this.bankCode) return toast('请选择充值银行')
            if (!isBankNumber(this.bankNo)) return toast('请输入正确的充值银行卡号')
            if (!isPhone(this.mobilePhone)) return toast('请输入正确的充值银行手机号')
            mine.rechargeMsg(senddata).then(data => {
                if (data.data.code == 200) {
                    toast('手机验证码已发送请注意查收')
                    let timer = setInterval(() => {
                        this.iscount = true
                        this.count--
                        this.smsCodetitle = `${this.count}s`
                        if (this.count == 0) {
                            clearInterval(timer)
                            this.smsCodetitle = '重新获取验证码'
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
            let senddata = {
                amount: this.amount,
                bankCode: this.bankCode,
                bankName: this.bankName,
                bankNo: this.bankNo,
                mobilePhone: this.mobilePhone,
                smsCode: this.smsCode
            }
            // this.isShow = true
            if (!this.amount) return toast('请输入充值金额')
            if (!this.bankCode) return toast('请选择充值银行')
            if (!isBankNumber(this.bankNo)) return toast('请输入正确的充值银行卡号')
            if (!isPhone(this.mobilePhone)) return toast('请输入正确的充值银行手机号')
            if (this.smsCode.length != 6) return toast('请输入正确的验证码')
            mine.recharge(senddata).then((data) => {
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
        mine.getUserInforPost().then((data) => {
            this.$store.dispatch('userInfor', data.data.data)
        }),
            mine.bankList().then(data => {
                this.bankLists = data.data.data
            })
    },
    beforeRouteEnter(to, from, next) {
        document.querySelector('title').innerText = '快捷支付'
        next()
    },
    components: {
        'v-Button': Button,
        'v-PayPwToast': PayPwToast
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
                width: 5.5rem;
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
    .bankNameWrap {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 10;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        width: 100%;
        height: 100%;
        .list {
            height: 1.30667rem;
            line-height: 1.30667rem;
            padding: 0 @p30;
            font-size: @fontsize32;
            color: @color;
            background-color: @bgcolor;
            position: relative;
            border-bottom: 1px solid #191A22;
            .icon {
                position: absolute;
                top: 0.3rem;
                width: 0.64rem;
            }
            span {
                margin-left: 1rem;
            }
            .rIcon {
                width: 0.48rem;
                position: absolute;
                right: 0.32rem;
                top: 0.44rem;
            }
        }
    }
}
</style>
