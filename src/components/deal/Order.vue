<template>
    <div class="orderWrap">
        <WhiteToastButton2 :isShow='isShow2Button' :leftText='leftText' @toastLeft='toastLeft' :msg='msg' rightText='取消' @toastRight='toastRight'></WhiteToastButton2>
        <WhiteToastButton1 :isShow='isShow1Button' msg='订单已成交，无法撤单' @toastConfirm='toastConfirm'></WhiteToastButton1>
        <div class="topWrap">
            <span>名称/代码</span>
            <span>委托价/时间</span>
            <span>委托量/成交量</span>
            <span style="text-align:right;flex:0 0 1.92rem;">状态</span>
        </div>
        <div class="orderContent">
            <div class="scrollWrap">
                <div class="orderList" v-for="(order,index) in orderLists" :key="index">
                    <div class="up">
                        <span>{{order.publisherName}}</span>
                        <span>{{order.price}}</span>
                        <span>{{order.number}}</span>
                        <span class="buyTypes" style="text-align:right;flex:0 0 1.92rem;">{{order.orderType | orderType}}</span>
                    </div>
                    <div class="down">
                        <span>{{order.publisherCode}}</span>
                        <span>{{order.createTime | formateTime}}</span>
                        <span>{{order.dealNumber}}</span>
                        <span v-if="order.cancel" class="button" @click="killOrder(order)" :class="{'active':order.cancel}" style="flex:0 0 1.92rem;">撤单</span>
                        <span v-else class="button" :class="{'active':order.cancel}" style="flex:0 0 1.92rem;">{{order.statusMap.statusStr}}</span>
                    </div>
                </div>
                <Nomore :isNomoreShow='isNomoreShow'></Nomore>
            </div>
        </div>
    </div>
</template>

<script>
import WhiteToastButton2 from '@/components/WhiteToastButton2'
import WhiteToastButton1 from '@/components/WhiteToastButton1'
import Nomore from '@/components/Nomore'
import deal from '@/api/deal'
import { toast } from '@/util/index'
export default {
    data() {
        return {
            page: 1,
            rows: 10,
            orderLists: [],
            isShow2Button: false,
            isShow1Button: false,
            entrustId: '',
            msg: '是否确认撤单',
            leftText: '确定',
            isNomoreShow: false,
            loading: false
        }
    },
    methods: {
        loadOrderLists() {
            console.log('loadOrderLists')
            this.loading = true
            let sendData = {
                page: this.page,
                rows: this.rows
            }
            deal.entrusts(sendData).then(data => {
                let that = this
                if (data.data.code == 200) {
                    this.loading = false
                    if (!data.data.data.rows) return
                    data.data.data.rows.forEach(function (element) {
                        this.orderLists.push(element)
                    }, this);
                    if (data.data.data.rows.length == 0) {
                        this.isNomoreShow = true
                        document.querySelector('.orderContent').removeEventListener('scroll', that.handleScroll)
                    }
                    this.page++
                } else {
                    toast(data.data.message)
                }
            })
        },
        handleScroll() {
            let scrollTop = Math.round(document.querySelector('.orderContent').scrollTop)
            let pageHeight = Math.round(document.querySelector('.orderContent').offsetHeight)
            let allHeight = Math.round(document.querySelector('.scrollWrap').scrollHeight);
            let a = allHeight - scrollTop - pageHeight
            if (a >= 0 && a <= 50) {
                if (this.loading) return
                this.loadOrderLists();
            }
        },
        //是否确认撤单
        toastLeft() {
            console.log('toastLeft')
            let sendData = {
                entrustId: this.entrustId
            }
            deal.back(sendData).then(data => {
                if (data.data.code == 200) {
                    toast(data.data.message)
                    this.isShow2Button = false
                } else {
                    toast(data.data.message)
                    this.isShow2Button = false
                }
            })
        },
        toastRight() {
            console.log('toastRight')
            this.isShow2Button = false
        },
        toastConfirm() {
            console.log('toastConfirm')
            this.isShow1Button = false
        },
        killOrder(i) {
            console.log('killOrder')
            console.log(i)
            this.entrustId = i.id
            if (i.dealNumber == 0) {
                this.isShow2Button = true
            } else if (i.dealNumber < i.number) {
                this.msg = '您已成功成交部分产品，仅可对剩余部分进行撤单，是否确认'
                this.leftText = '撤单'
                this.isShow2Button = true
            } else if (i.dealNumber == i.number) {
                this.isShow1Button = true
                return
            }
        }
    },
    filters: {
        orderType(v) {
            if (!v) return
            if (v == 1) return '购买委托'
            if (v == 2) return '转让委托'
            if (v == 3) return '撤单'
        },
        formateTime(v) {
            if (!v) return
            return v.substring(10)
        }
    },
    mounted() {
        let that = this
        if (this.page == 1) {
            this.loadOrderLists()
            document.querySelector('.orderContent').addEventListener('scroll', that.handleScroll)
        }
    },
    components: {
        WhiteToastButton2,
        WhiteToastButton1,
        Nomore
    }
}
</script>

<style lang="less" scoped>
@import '../../less/config.less';
.orderWrap {
    padding-top: 0.2667rem;
    .topWrap {
        height: 1.06667rem;
        padding: 0 0.26667rem;
        color: #eee;
        background-color: #20212a;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: solid 1px @bordercolor;
        span {
            flex: 1 1 2rem;
        }
    }
    .orderContent {
        position: absolute;
        top: 1.33333rem;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 12;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        background-color: #191a22;
        .orderList {
            height: 2.13333rem;
            background-color: #20212a;
            padding: 0.6rem 0.26667rem;
            border-bottom: solid 1px @bordercolor;
            span {
                flex: 1 1 2rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .up {
                color: #eee;
                font-size: 0.373333rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 0.2rem;
                .buyTypes {
                    color: #999;
                }
            }
            .down {
                color: #999;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .button {
                    width: 1.86667rem;
                    height: 0.72rem;
                    line-height: 0.72rem;
                    text-align: center;
                    background-color: #999;
                    font-size: 0.37333rem;
                    color: #eee;
                    border-radius: 0.08rem;
                }
                .active {
                    color: #191a22;
                    background-color: @yellow;
                }
            }
        }
    }
}
</style>

