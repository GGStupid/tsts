<template>
    <div class="AccountInformation">
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
import Button240 from '../buttons/Button240'
export default {
    data() {
        return {
            Recharge: '充值',
            Withdrawals: '提现'
        }
    },
    computed:{
        assets(){
            return this.$store.state.userInfor.assets
        },
        available(){
            return this.$store.state.userInfor.available
        }
    },
    methods:{
        toRecharge(){
            console.log('Recharge')
            this.$router.push('/Recharge')
        },
        toWithdrawals(){
            console.log('Withdrawals')
            this.$router.push('/Withdrawals')
        }
    },
    components: {
        'v-Button240': Button240
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
    margin-bottom:0.26667rem;
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
