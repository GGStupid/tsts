<template>
    <div class="deliveryWrap">
        <div class="countWrap">
            <span class="button" @click="reduce">-</span>
            <span>{{deliveryNum}}</span>
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
            <span class="todeliveryagreement" >《交割协议》</span>
        </div>
    </div>
</template>
<script>
import mine from '@/api/mine/index'
import { toast } from '@/util/index'
export default {
    data() {
        return {
            baseNum: 10,
            deliveryNum: 0,
            positionId:this.$route.params.positionId
        }
    },
    methods: {
        reduce() {
            console.log('reduce')
            if (this.deliveryNum == 0) return
            this.deliveryNum -= this.baseNum
        },
        add() {
            console.log('add')
            this.deliveryNum += this.baseNum
        },
        confirmDelivery() {
            console.log('confirmDelivery')
            if(this.deliveryNum==0)return toast('交割数量必须大于零')
            let sendData={
                positionId:this.positionId,
                deliveryNum:this.deliveryNum
            }
            mine.delivery(sendData).then(data=>{
                if(data.data.code==200){
                    toast(data.data.message)
                    this.$router.go(-1)
                }else{
                    toast(data.data.message)
                }
            })
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
