<template>
    <div class="purchasedWrap">
        <div class="top">
            <div class="up">
                <span>持仓市值（元）</span>
                <span>可用余额（元）</span>
                <span>亏盈总额（元）</span>
            </div>
            <div class="down">
                <span>53.00</span>
                <span>{{availableBalance?availableBalance.toFixed(2):'0.00'}}</span>
                <span class="red">+100</span>
            </div>
        </div>
        <div class="listTitle">
            <span>名称/市值(元)</span>
            <span>持有/可转(秒)</span>
            <span>现价/成本(元)</span>
            <span>盈亏(元)</span>
        </div>
        <div class="purchasedContentWrap">
            <div class="scrollWrap">
                <div class="purchasedList" v-for="(purchased,index) in PurchasedLists" :key="index">
                    <div class="up">
                        <span>{{purchased.publisherName}}</span>
                        <span>{{purchased.quantity}}</span>
                        <span>5.3</span>
                        <span class="red" style="text-align:right;flex:0 0 1.1733rem;">+1</span>
                    </div>
                    <div class="down">
                        <span>{{purchased.publisherCode}}</span>
                        <span>{{purchased.availableQuantity}}</span>
                        <span>{{purchased.costPrice}}</span>
                        <span class="buyTypes" style="text-align:right;flex:0 0 1.1733rem;"></span>
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
export default {
    data() {
        return {
            availableBalance: '',
            page: 1,
            rows: 10,
            PurchasedLists: [],
            isNomoreShow: false,
            loading: false
        }
    },
    methods: {
        loadNewsPrices() {
            deal.latestPrice().then(data => {
                console.log(data)
            })
        },
        loadPurchasedLists() {
            this.loading = true
            let sendData = {
                page: this.page,
                rows: this.rows
            }
            deal.positions(sendData).then(data => {
                let that = this
                if (data.data.code == 200) {
                    this.loading = false
                    if (!data.data.data.rows) return
                    data.data.data.rows.forEach(function (element) {
                        this.PurchasedLists.push(element)
                    }, this);
                    if (data.data.data.rows.length == 0) {
                        document.querySelector('.purchasedContentWrap').removeEventListener('scroll', that.handleScroll)
                    }
                    this.page++
                } else {
                    toast(data.data.message)
                }
            })
        },
        handleScroll() {
            let scrollTop = Math.round(document.querySelector('.purchasedContentWrap').scrollTop)
            let pageHeight = Math.round(document.querySelector('.purchasedContentWrap').offsetHeight)
            let allHeight = Math.round(document.querySelector('.scrollWrap').scrollHeight);
            let a = allHeight - scrollTop - pageHeight
            if (a >= 0 && a <= 50) {
                if (this.loading) return
                this.loadPurchasedLists();
            }
        }
    },
    mounted() {
        let that = this
        if (this.page == 1) {
            this.loadPurchasedLists()
            this.loadNewsPrices()
            document.querySelector('.purchasedContentWrap').addEventListener('scroll', that.handleScroll)
        }
        deal.available().then(data => {
            this.availableBalance = data.data.data.available
        })
    },
    components: {
        Nomore
    }
}
</script>

<style lang="less" scoped>
@import '../../less/config.less';
.purchasedWrap {
    .top {
        height: 1.8rem;
        padding: 0.5rem 0;
        background-color: #20212a;
        margin-bottom: 0.2667rem;
        .up {
            color: #999;
            display: flex;
            justify-content: space-around;
            margin-bottom: 0.2rem;
        }
        .down {
            color: #eee;
            display: flex;
            justify-content: space-around;
            .red {
                color: #f20624;
            }
        }
    }
    .listTitle {
        height: 1.06667rem;
        color: #eee;
        background-color: #20212a;
        padding: 0 0.26667rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: solid 1px @bordercolor;
    }
    .purchasedContentWrap {
        position: absolute;
        top: 3.13333rem;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 13;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        background-color: #191a22;
        .purchasedList {
            height: 2.13333rem;
            background-color: #20212a;
            padding: 0.5rem 0.26667rem;
            border-bottom: solid 1px @bordercolor;
            span {
                flex: 1 1 1.90667rem;
            }
            .up {
                color: #eee;
                font-size: 0.373333rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 0.3rem;
                .red {
                    color: #f20624;
                }
            }
            .down {
                color: #999;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
        }
    }
}
</style>

