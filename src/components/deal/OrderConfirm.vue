<template>
    <div class="toastWrap" v-show="isShow">
        <div class="mask">
        </div>
        <div class="whiteToast">
            <div class="title">确认订单</div>
            <div class="content">
                <div class="orderInfor">
                    <span class="orderType">订单类型：</span>
                    <span>{{orderTypeString}}</span>
                </div>
                <div class="orderInfor">
                    <span class="orderType">订单信息：</span>
                    <span>{{msg}}</span>
                </div>
                <div class="orderInfor">
                    <span class="orderType">订单价格：</span>
                    <span>{{price}}元/秒</span>
                </div>
                <div class="orderInfor">
                    <span class="orderType">购买时间：</span>
                    <span>{{number}}秒</span>
                </div>
                <div class="orderInfor">
                    <span class="orderType">{{payType}}：</span>
                    <span>{{sum}}元</span>
                </div>
                <div class="orderInfor">
                    <img class="agree" @click="isAgree" :src="isAgreeSrc" alt=""> 我已经阅读并同意
                    <span class="blue">《风险提示书》</span>
                </div>
            </div>
            <div class="buttons">
                <span @click="toastLeft" v-text="leftText">取消</span>
                <span class="confirm" @click="toastRight" v-text="rightText">确认</span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isShow: {
            type: Boolean
        },
        msg: {
            type: String
        },
        leftText: {
            type: String
        },
        rightText: {
            type: String
        },
        payType:{
            type:String,
            default:'支付金额'
        },
        orderType:'',
        msg: '',
        price:'',
        number:'',
        sum:'',
        agree:{
            type:Boolean,
            default:true
        }
    },
    computed: {
        orderTypeString() {
            return this.orderType == 1 ? '购买' : '转让'
        },
        isAgreeSrc() {
            return this.agree ? require('../../assets/trade_xieyi_s.png') : require('../../assets/trade_xieyi_un.png')
        }
    },
    methods: {
        isAgree() {
            this.$emit('isAgree')
        },
        toastLeft() {
            this.$emit('toastLeft')
        },
        toastRight() {
            this.$emit('toastRight')
        },

    }
}
</script>

<style lang="less" scoped>
@msgColor: #333;
@buttonColor: #007aff;
@buttonsHeight: 1.2rem;
@fontSize: 0.45333rem;
@borderColor: #ddd;
@borderRadius: 0.32rem;
.mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    height: 100%;
    width: 100%;
    background-color: #000;
    opacity: 0.5;
}

.whiteToast {
    width: 8rem;
    height: 7.3333rem;
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -40%);
    z-index: 1000;
    background-color: #fff;
    font-size: @fontSize;
    border-radius: @borderRadius;
    .title {
        height: 1.06667rem;
        line-height: 1.06667rem;
        text-align: center;
        border-bottom: 1px solid #ddd;
    }
    .content {
        height: 5.06667rem;
        border-bottom: 1px solid @borderColor;
        line-height: 1.5;
        .orderInfor {
            padding: 0 0.4rem;
            height: 0.84444rem;
            line-height: 0.84444rem;
            font-size: 0.37333rem;
            .orderType {
                display: inline-block;
                width:1.86667rem;
                color: #999;
            }
            .agree {
                width: 0.34667rem;
                height: 0.34667rem;
                vertical-align: middle;
            }
            .blue {
                color: #007aff
            }
        }
    }
    .buttons {
        height: @buttonsHeight;
        line-height: @buttonsHeight;
        color: @buttonColor;
        font-size: 0;
        span {
            display: inline-block;
            width: 50%;
            font-size: @fontSize;
            text-align: center;
        }
        .confirm {
            border-left: 1px solid #ddd;
        }
    }
}
</style>
