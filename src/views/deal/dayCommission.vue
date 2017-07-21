<template>
    <div class="dayCommissionWrap">
        <div class="topWrap">
            <span>名称/代码</span>
            <span>委托价/时间</span>
            <span>委托量/成交量</span>
            <span style="text-align:right;flex:0 0 1.92rem;">状态</span>
        </div>
        <div class="orderContent">
            <div class="scrollWrap">
                <div class="orderList" v-for="(order,index) in dayCommissionLists" :key="index">
                    <div class="up">
                        <span>{{order.publisherName}}</span>
                        <span>{{order.price}}</span>
                        <span>{{order.number}}</span>
                        <span class="buyTypes" style="text-align:right;flex:0 0 1.92rem;">{{order.statusMap.statusStr}}</span>
                    </div>
                    <div class="down">
                        <span>{{order.publisherCode}}</span>
                        <span>{{order.createTime | formateTime}}</span>
                        <span>{{order.dealNumber}}</span>
                        <span style="text-align:right;flex:0 0 1.92rem;" class="buyTypes" :class="{'active':order.boolean}"></span>
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
            dayCommissionLists: [],
            isShowShort: false,
            isNomoreShow: false,
            loading: false
        }
    },
    methods: {
        loaddayCommissionLists() {
            console.log('loaddayCommissionLists')
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
                        this.dayCommissionLists.push(element)
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
                this.loaddayCommissionLists();
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
            this.loaddayCommissionLists()
            document.querySelector('.orderContent').addEventListener('scroll', that.handleScroll)
        }
    },
    beforeRouteEnter(to, from, next) {
        document.querySelector('title').innerText = '当日委托'
        next()
    },
    components: {
        Nomore
    }
}
</script>
<style lang="less" scoped>
@import '../../less/config.less';
.dayCommissionWrap {
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
                .buyTypes {
                    font-size: 0.373333rem;
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
