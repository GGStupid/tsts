<template>
    <div class="deliveryWrap">
        <div class="countWrap">
            <span class="button" @click="reduce">-</span>
            <span>{{totalNum}}</span>
            <span class="button" @click="add">+</span>
        </div>
        <div class="tips">
            注:交割数量为<span>{{baseNum}}</span>秒或其正数倍
        </div>
        <div class="confirButton" @click="confirmDelivery">
            确定交割
        </div>
        <div class="deliveryagreement">
            点击“确定交割”,即表示同意
            <router-link class="todeliveryagreement" to="/deliveryagreement">《交割协议》</router-link>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            baseNum: 10,
            totalNum: 0
        }
    },
    methods: {
        reduce() {
            console.log('reduce')
            if (this.totalNum == 0) return
            this.totalNum -= this.baseNum
        },
        add() {
            console.log('add')
            this.totalNum += this.baseNum
        },
        confirmDelivery() {
            console.log('confirmDelivery')

        }
    },
    beforeRouteEnter(to, from, next) {
        document.querySelector('title').innerText = '交割'
        next()
    }
}
</script>

<style lang="less" scoped>
@import '../../../less/config.less';
.deliveryWrap {
    padding-top: @p30;
    background-color: @bgcolor;
    .countWrap {
        margin: 0 auto;
        width: 8rem;
        height: 1.12rem;
        border: 0.026667rem solid #333;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #eee;
        font-size: 0.4rem;
        .button {
            display: inline-block;
            font-size: 1rem;
            color: @yellow;
            width: 1.12rem;
            height: 1.12rem;
            line-height: 1.12rem;
            text-align: center;
            background-color: #333;
        }
    }
    .tips {
        margin: 0.50667rem auto 0.6667rem;
        width: 8rem;
        color: #999;
        font-size: 0.346667rem;
        span{
            color: @yellow;
        }
    }
    .confirButton {
        width: 8rem;
        height: 1.17333rem;
        line-height: 1.17333rem;
        margin: 0 auto;
        border-radius: 0.08rem;
        background-color: @yellow;
        font-size: 0.453333rem;
        color: #191a22;
        text-align: center;
    }
    .deliveryagreement {
        width: 8rem;
        margin: 0.50667rem auto;
        padding-bottom: 0.6667rem;
        color: #eee;
        text-align: center;
        font-size: 0.346667rem;
        .todeliveryagreement {
            color: @yellow;
        }
    }
}
</style>
