<template>
    <div class="dayTransactionWrap">
        <div class="timeSelectWrap">
            <div class="left">
                <DateTimePicker :parentvalue='bgTime' @change='bgchange'></DateTimePicker>
            </div>
            <div class="right">
                <DateTimePicker title='截至日期' :parentvalue='edTime' @change='edchange'></DateTimePicker>
            </div>
        </div>
        <div class="topWrap">
            <span>名称/代码</span>
            <span>成交时间</span>
            <span>成交价/成交量</span>
            <span style="text-align:right;flex:0 0 1.92rem;">成交额</span>
        </div>
        <div class="orderContent">
            <div class="scrollWrap">
                <div class="orderList" v-for="(order,index) in historicalTransactionLists" :key="index">
                    <div class="up">
                        <span>{{order.publisherName}}</span>
                        <span>{{order.dealTime | formateTimeStart}}</span>
                        <span>{{order.price | formateNumber2}}</span>
                        <span style="text-align:right;flex:0 0 1.92rem;">{{order.price*order.number | formateNumber0}}</span>
                    </div>
                    <div class="down">
                        <span>{{order.publisherCode}}</span>
                        <span class="time">{{order.dealTime | formateTimeEnd}}</span>
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
import { toast } from '@/util/index'
import DateTimePicker from '@/components/DateTimePicker/DateTimePicker'
export default {
    data() {
        return {
            page: 1,
            rows: 10,
            historicalTransactionLists: [],
            isShowShort: false,
            isNomoreShow: false,
            bgTime: '',
            edTime: '',
            loading: false
        }
    },
    methods: {
        loadhistoricalTransactionLists() {
            console.log('loadhistoricalTransactionLists')
            this.loading = true
            let sendData = {
                page: this.page,
                rows: this.rows
            }
            deal.transactionshistory(sendData).then(data => {
                let that = this
                if (data.data.code == 200) {
                    this.loading = false
                    if (!data.data.data.rows) return
                    data.data.data.rows.forEach(function (element) {
                        this.historicalTransactionLists.push(element)
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
                this.loadhistoricalTransactionLists();
            }
        },
        bgchange(v) {
            console.log('bgchange')
            this.edTime = ''
            this.bgTime = v
        },
        edchange(e) {
            console.log('edchange')
            this.edTime = ''
            if (this.formateTime(this.bgTime) > this.formateTime(e)) {
                toast('起始时间不能大于截至时间')
                this.edTime = this.bgTime
                return
            }
            this.edTime = e
            this.page = 1
            let sendData = {
                startTime: this.bgTime,
                endTime: this.edTime,
                page: this.page,
                rows: this.rows
            }
            deal.transactionshistory(sendData).then(data => {
                let that = this
                if (data.data.code == 200) {
                    if (!data.data.data.rows) return
                    this.historicalTransactionLists = []
                    data.data.data.rows.forEach(function (element) {
                        this.historicalTransactionLists.push(element)
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
        formateTime(v) {
            if (!v) return
            return v.replace(/\-/g, "\/")
        }
    },
    filters: {
        formateNumber0(v) {
            if (!v) return
            return v.toFixed(0)
        },
        formateNumber2(v) {
            if (!v) return
            return v.toFixed(2)
        },
        formateTimeStart(v) {
            if (!v) return
            return v.substring(0, 10)
        },
        formateTimeEnd(v) {
            if (!v) return
            return v.substring(10)
        },
    },
    mounted() {
        let that = this
        if (this.page == 1) {
            this.loadhistoricalTransactionLists()
            document.querySelector('.orderContent').addEventListener('scroll', that.handleScroll)
        }
    },
    beforeRouteEnter(to, from, next) {
        document.querySelector('title').innerText = '历史成交'
        next()
    },
    components: {
        Nomore,
        DateTimePicker
    }
}
</script>
<style lang="less" scoped>
@import '../../less/config.less';
.dayTransactionWrap {
    .timeSelectWrap {
        height: 1.7333rem;
        color: #999;
        font-size: 0;
        margin-bottom: 0.26667rem;
        background-color: #20212a;
        .left {
            display: inline-block;
            width: 50%;
            font-size: 0.37333rem;
            text-align: center;
            padding: @p30;
        }
        .right {
            display: inline-block;
            width: 50%;
            font-size: 0.37333rem;
            text-align: center;
            padding: @p30;
        }
    }
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
        top: 3.06667rem;
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
                margin-bottom: 0.2rem; // .buyTypes {
                //     color: #999;
                // }
            }
            .down {
                color: #999;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .time {
                    color: #eee;
                    font-size: 0.373333rem;
                }
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
