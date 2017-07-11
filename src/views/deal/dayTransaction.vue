<template>
    <div class="dayTransactionWrap">
        <div class="topWrap">
            <span>名称/代码</span>
            <span>成交时间</span>
            <span>成交价/成交量</span>
            <span style="text-align:right;flex:0 0 1.92rem;">成交额/类型</span>
        </div>
        <div class="orderContent">
            <div class="scrollWrap">
                <div class="orderList" v-for="(order,index) in dayTransactionLists" :key="index">
                    <div class="up">
                        <span>{{order.publisherName}}</span>
                        <span>{{order.createTime | formateTime}}</span>
                        <span>{{order.price | formateNumber2}}</span>
                        <span  style="text-align:right;flex:0 0 1.92rem;">{{order.price*order.number | formateNumber0}}</span>
                    </div>
                    <div class="down">
                        <span>{{order.publisherCode}}</span>
                        <span></span>
                        <span>{{order.number}}</span>
                        <span class="button" :class="{'active':order.orderType==1?true:false}" style="flex:0 0 1.92rem;">{{order.orderType==1?'购买':'转让'}}</span>
                    </div>
                </div>
                <Nomore :isNomoreShow='isNomoreShow'></Nomore>
            </div>
        </div>
    </div>
</template>
<script>
import deal from '@/api/deal'
import Nomore from '@/components/Nomore'
export default {
    data() {
        return {
            page: 1,
            rows: 10,
            dayTransactionLists: [],
            isShowShort: false,
            isNomoreShow:false
        }
    },
    methods: {
        loaddayTransactionLists() {
            console.log('loaddayTransactionLists')
            let sendData = {
                page: this.page,
                rows: this.rows
            }
            deal.transactions(sendData).then(data => {
                let that = this
                if (data.data.code == 200) {
                    if (!data.data.data.rows) return
                    data.data.data.rows.forEach(function (element) {
                        this.dayTransactionLists.push(element)
                    }, this);
                    if (data.data.data.rows.length == 0) {
                        this.isNomoreShow=true
                        document.querySelector('.orderContent').removeEventListener('scroll', that.handleScroll)
                    }
                    this.page++
                } else {
                    toast(data.data.message)
                }
            })
        },
        handleScroll() {
            let scrollTop = document.querySelector('.orderContent').scrollTop;
            let pageHeight = document.querySelector('.orderContent').offsetHeight;
            let allHeight = document.querySelector('.scrollWrap').offsetHeight;
            if (scrollTop + pageHeight == allHeight) {
                this.loaddayTransactionLists()
            }
        },
        //是否确认撤单
        toastLeft() {
            console.log('toastLeft')

        },
        toastRight() {
            console.log('toastRight')
            this.isShowShort = false
        }
    },
    filters: {
        formateNumber0(v) {
            if (!v) return
            return v.toFixed(0)
        },
        formateNumber2(v){
            if (!v) return
            return v.toFixed(2)
        },
        formateTime(v) {
            if (!v) return
            return v.substring(10)
        }
    },
    mounted() {
        let that = this
        if (this.page == 1) {
            this.loaddayTransactionLists()
            document.querySelector('.orderContent').addEventListener('scroll', that.handleScroll)
        }
    },
    beforeRouteEnter(to,from,next){
        document.querySelector('title').innerText='当日成交'
        next()
    },
    components:{
        Nomore
    }
}
</script>
<style lang="less" scoped>
@import '../../less/config.less';
.dayTransactionWrap {
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
        top: 1.06667rem;
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
            }
            .up {
                color: #eee;
                font-size: 0.373333rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 0.2rem;
                // .buyTypes {
                //     color: #999;
                // }
            }
            .down {
                color: #999;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .button {
                    text-align: right;
                   color: #007aff;
                }
                .active {
                    color: @yellow;
                }
            }
        }
    }
}
</style>
