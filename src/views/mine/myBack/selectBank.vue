<template>
    <div class="selectBankWrap">
        <div class="list" @click="toSelect(bank)" v-for="(bank,index) in bankLists" :key="index">
            <img class="icon" :src="baseImgUrl+bank.icon" alt="">
            <span>{{bank.name}}</span>
            <img class="rIcon" v-show="SelectBank==bank.name" src="../../../assets/pay_select_s.png" alt="">
        </div>
    </div>
</template>

<script>
import mine from '@/api/mine/index'

export default {
    data(){
        return {
            baseImgUrl:this.$store.state.baseImgUrl,
            bankLists:[]
        }
    },
    computed:{
        SelectBank(){
            return this.$store.state.SelectBank
        }
    },
    methods:{
        toSelect(bank){
            console.log('toSelect')
            this.$store.dispatch('SelectBank',bank.name)
        }
    },
    mounted(){
        mine.bankList().then(data=>{
            console.log(data)
            this.bankLists=data.data.data
        })
    },
    beforeRouteEnter(to, from, next) {
        document.querySelector('title').innerText = '选择支付银行'
        next()
    },
}
</script>

<style lang="less" scoped>
@import '../../../less/config.less';
.selectBankWrap {
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
</style>
