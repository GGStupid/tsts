<template>
    <div class="RechargeWrap">
        <!--<div class="list" @click="toSelect">
            <img class="icon" src="../../../assets/mine_cz_icon_wechat.png" alt="">
            <span>微信支付</span>
            <img class="rIcon"  src="../../../assets/arrow_right.png" alt="">
        </div>
        <div class="list" @click="toSelect">
            <img class="icon" src="../../../assets/mine_cz_icon_zhi.png" alt="">
            <span>支付宝</span>
            <img class="rIcon"  src="../../../assets/arrow_right.png" alt="">
        </div>-->
        <div class="list" @click="toquickPay">
            <img class="icon" src="../../../assets/mine_cz_icon_kjzf.png" alt="">
            <span>快捷支付</span>
            <img class="rIcon" src="../../../assets/arrow_right.png" alt="">
        </div>
        <div class="list" @click="toBankPay">
            <img class="icon" src="../../../assets/mine_cz_icon_bank card.png" alt="">
            <span>银行卡</span>
            <img class="rIcon"  src="../../../assets/arrow_right.png" alt="">
        </div>
    </div>
</template>

<script>
import Button from '@/components/buttons/Button690'
export default {
    data(){
        return {isActive:true}
    },
    components:{
        'v-Button': Button,
    },
    computed:{
        SelectBank(){
            return this.$store.state.SelectBank
        }
    },
    methods:{
        toquickPay(){
            console.log('quickPay')
            this.$router.push('/quickPay')
        },
        toBankPay(){
            console.log('toBankPay')
            this.$router.push('/BankPay')
        }
    },
    beforeRouteEnter(to, from, next) {
        document.querySelector('title').innerText = '充值'
        next()
    },
}
</script>

<style lang="less" scoped>
@import '../../../less/config.less';
.RechargeWrap {
    margin-top: 0.26667rem;
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
            width: 0.61333rem;
        }
        span {
            margin-left: 1rem;
        }
        .rIcon {
            width: 0.16rem;
            height: 0.29333rem;
            position: absolute;
            right: 0.32rem;
            top: 0.44rem;
        }
    }
    .button{
        padding: 0 @p30;
    }
}
</style>
