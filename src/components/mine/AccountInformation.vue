<template>
    <div class="AccountInformation">
        <v-WhiteToastButton2 :isShow="isShow" msg="为了保障您的账户安全，请先进行实名认证" leftText="去认证" @toastLeft="toastLeft" rightText="取消" @toastRight="toastRight"></v-WhiteToastButton2>
        <div class="wrap">
            <div>{{assets}}</div>
            <div class="sub">账户余额</div>
            <v-Button240 :title="Recharge" @toNext="toRecharge"></v-Button240>
        </div>
        <div class="wrap">
            <div>{{available}}</div>
            <div class="sub">资产总额</div>
            <v-Button240 :title="Withdrawals" @toNext="toWithdrawals"></v-Button240>
        </div>
    </div>
</template>

<script>
import mine from '@/api/mine/index'
import Button240 from '../buttons/Button240'
import WhiteToastButton2 from '@/components/WhiteToastButton2'
import { toast } from '@/util/index'
export default {
    data() {
        return {
            isShow: false,
            realnameStatus: '',
            Recharge: '充值',
            Withdrawals: '提现'
        }
    },
    computed: {
        assets() {
            return this.$store.state.userInfor.assets
        },
        available() {
            return this.$store.state.userInfor.available
        }
    },
    methods: {
        toastLeft() {
            console.log('toastLeft')
            this.$router.push('/authentication')
        },
        toastRight() {
            console.log('toastRight')
            this.isShow = false
        },
        toRecharge() {
            console.log('Recharge')
            if (this.realnameStatus == 2) {
                toast('您的实名认证正在审核中')
                return
            }
            if (this.realnameStatus == 1 || this.realnameStatus == 4) {
                this.isShow = true
                return
            }
            this.$router.push('/Recharge')
        },
        toWithdrawals() {
            console.log('Withdrawals')
            if (this.realnameStatus == 2) {
                toast('您的实名认证正在审核中')
                return
            }
            if (this.realnameStatus == 1 || this.realnameStatus == 4) {
                this.isShow = true
                return
            }
            this.$router.push('/Withdrawals')
        }
    },
    mounted() {
        mine.getUserInforPost().then((data) => {
            this.$store.dispatch('userInfor', data.data.data)
            this.realnameStatus = data.data.data.userIdentify.realnameStatus
        })
    },
    components: {
        'v-Button240': Button240,
        'v-WhiteToastButton2': WhiteToastButton2
    }
}
</script>

<style lang="less">
@width: 50%;
@height: 3.2rem;
@p30: 0.4rem;
@background: #20212a;
@bordercolor: #191A22;
@color: #eee;
@fontSize: 0.48rem;
@subColor: #999;
@subFontSize: 0.32rem;
.AccountInformation {
    background-color: @background;
    font-size: 0;
    margin-bottom: 0.26667rem;
    .wrap {
        display: inline-block;
        width: @width;
        height: @height;
        padding-top: @p30;
        background-color: @background;
        text-align: center;
        color: @color;
        font-size: @fontSize;
        .sub {
            margin: 0.19333rem 0 0.40667rem;
            color: @subColor;
            font-size: @subFontSize;
        }
    }
}
</style>
