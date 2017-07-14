<template>
    <div class="WithdrawalsWrap">
        <v-PayPwToast :isShow="isShow" :amount="amount" :userBankId="userBankId" @cancelToast="cancelToast"></v-PayPwToast>
        <v-BankLists :banks="banks" :bankListShow="bankListShow" @selectBank="selectBank" @cancelLists="cancelLists"></v-BankLists>
        <div class="form">
            <div class="list" style="margin:0.266667rem 0" @click="showBankLists">
                <span>银行卡&nbsp;&nbsp;&nbsp;</span>
                <span class="bankName" :sytle="{'activeColor':activeColor}">{{SelectBank}}</span>
                <img class="rIcon" src="../../../assets/arrow_right.png" alt="">
            </div>
            <div class="list" style="margin:0.266667rem 0">
                <span>充值金额</span>
                <input type="tel" v-model="amount" placeholder="请输入提现金额">
            </div>
            <div class="end">
                可用余额&nbsp;
                <span>{{assets}} </span>元
            </div>
        </div>
        <div class="button">
            <v-Button title='完成' :isActive='isActive' topNum='0.6667rem' @toNext='toNext'></v-Button>
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
            banks: [
                // {
                //     icon:require('../../../assets/pay_logo_ABC.png'),
                //     name:'农业银行',
                //     cardend:'2118',

                // },
                //  {
                //     icon:require('../../../assets/pay_logo_ABC.png'),
                //     name:'建设银行',
                //     cardend:'2118',

                // },
                //  {
                //     icon:require('../../../assets/pay_logo_ABC.png'),
                //     name:'商业银行',
                //     cardend:'2118',
                // }
            ],
            SelectBank: '请选择银行卡',
            userBankId: '',
            amount: '',
            sendData: {},
            isActive: true
        }
    },
    computed: {
        activeColor() {
            return this.SelectBank != '请选择银行卡'
        },
        assets() {
            return this.$store.state.userInfor.assets || this.$store.state.userInfor.assets == 0 ? this.$store.state.userInfor.assets.toFixed(2) : ''
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
            this.SelectBank = `${bank.bankName} (尾号${bank.bankNo.slice(-4)})`
            this.userBankId = bank.id.toString();
        },
        toNext() {
            console.log('toNext---pay')
            if (this.amount && this.userBankId) {
                this.isShow = true
            } else {
                toast('请选择银行并输入金额')
            }
        },
        cancelToast() {
            this.isShow = false
        }
    },
    mounted() {
        mine.getUserInforPost().then((data) => {
            this.$store.dispatch('userInfor', data.data.data)
        })
        let sendData={
            status:2
        }
        mine.userBank(sendData).then(data => {
            this.banks = data.data.data
        })
    },
    beforeRouteEnter(to, from, next) {
        document.querySelector('title').innerText = '提现'
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
.WithdrawalsWrap {
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
        .end {
            padding: 0 @p30;
            color: @placeColor;
            span {
                color: @yellow;
            }
        }
    }
    .button {
        padding: 0 @p30;
    }
}
</style>
