<template>
    <div class="pricePersonDetailWrap">
        <div class="content">
            <div class="top">
                <div class="rule" @click="rule">
                    升值规则
                </div>
                <BarChart :isBarChartShow="isBarChartShow" @cancel="cancel"></BarChart>
                <div class="shop" @click="shop">
                    <img src="../../assets/icon_mall.png" alt=""> 商城
                </div>
                <div class="big">
                    {{lastPrice | toFiexed}}
                    <img :src="growth>=0?require('../../assets/quotes_details_arrow_up.png'):require('../../assets/quotes_details_arrow_down.png')" alt="">
                </div>
                <span class="first">{{growth | toFiexed}}</span>
                <span>{{growthRatio*100 | toFiexed}}%</span>
                <div class="count">
                    <div class="scount">
                        <span>0</span>
                        <br>
                        <span class="sign">阅读量</span>
                    </div>
                    <div class="scount">
                        <span>0</span>
                        <br>
                        <span class="sign">注册量</span>
                    </div>
                    <div class="scount">
                        <span>0</span>
                        <br>
                        <span class="sign">贡献量</span>
                    </div>
                </div>
            </div>
            <div class="charts">
                <!-- <img src="../../assets/echats.png" alt=""> -->
                <TabChart></TabChart>
                <div class="aboutsPrices">
                    <div class="chartstop">
                        <div class="box">
                            <span style="margin-right: 0.1rem;">最&nbsp;&nbsp;高</span>
                            <span class="num">{{topPrice | toFiexed}}</span>
                        </div>
                        <div class="box" style="text-align:right">
                            <span style="margin-right: 0.1rem;">今&nbsp;&nbsp;开</span>
                            <span class="num">{{openPrice | toFiexed}}</span>
                        </div>
                        <div class="box">
                            <span style="margin-right: 0.1rem;">最&nbsp;&nbsp;低</span>
                            <span class="num">{{bottomPrice | toFiexed}}</span>
                        </div>
                        <div class="box" style="text-align:right">
                            <span style="margin-right: 0.1rem;">换&nbsp;&nbsp;手</span>
                            <span class="num">{{exchangeRate*100 | toFiexed}}%</span>
                        </div>
                    </div>
                    <div class="bottom">
                        <div class="box">
                            <span>均&nbsp;&nbsp;价</span>
                            <span class="active">{{averagePrice | toFiexed}}元/秒</span>
                        </div>
                        <div class="box">
                            <span>最&nbsp;&nbsp;新</span>
                            <span class="num">{{lastPrice*3600 | toFiexed}}元/时</span>
                        </div>
                        <div class="box">
                            <span>总&nbsp;&nbsp;额</span>
                            <span class="num">{{tradeAmount/10000 | toFiexed}}万元</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="mainTabs">
                <div class="mainToptabs">
                    <span v-for="(mainToptab,index) in mainToptabs" :key="index" @click="toCurrentView(mainToptab)" :class="{'active':currentView==mainToptab.component}">
                        {{mainToptab.title}}
                    </span>
                </div>
                <component class="currentView" :is="currentView"></component>
            </div>
        </div>
        <div class="footer">
            <div v-for="item in list" :key="item.index" @click="item.fun">
                <div v-if="item.title!='自选'">
                    <img :src="item.src" alt="">
                    <p>{{item.title}}</p>
                </div>
                <div v-else>
                    <img :src="optional ? require('../../assets/quotes_tab_optional_s.png') : require('../../assets/quotes_tab_optional_n.png')" alt="">
                    <p :class="{'active':optional}">{{item.title}}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BarChart from '@/components/market/BarChart'
import Tribune from '@/components/market/Tribune'
import TabChart from '@/components/market/TabChart'
import BriefIntroduction from '@/components/market/BriefIntroduction'
import News from '@/components/market/News'
import Notice from '@/components/market/Notice'
import market from '@/api/market/index'
import { toast } from '@/util/index'
export default {
    data() {
        return {
            isBarChartShow:false,
            lastPrice: '',
            growth: '',
            growthRatio: '',
            topPrice: '',
            openPrice: '',
            bottomPrice: '',
            exchangeRate: '',
            averagePrice: '',
            lastPrice: '',
            tradeAmount: '',
            optional: false,
            list: [
                {
                    title: '购买',
                    src: require('../../assets/quotes_tab_buy.png'),
                    fun: this.toBuy
                },
                {
                    title: '转让',
                    src: require('../../assets/quotes_tab_sell.png'),
                    fun: this.toTransfer
                },
                {
                    title: '自选',
                    src: require('../../assets/quotes_tab_optional_n.png'),
                    fun: this.Collection
                },
                {
                    title: '论坛',
                    src: require('../../assets/quotes_tab_forum.png'),
                    fun: this.toTribune
                },
                {
                    title: '分享',
                    src: require('../../assets/quotes_tab_share.png'),
                    fun: this.toShare
                }
            ],
            mainToptabs: [
                {
                    title: '论坛',
                    component: 'Tribune'
                },
                {
                    title: '简介',
                    component: 'BriefIntroduction'
                },
                {
                    title: '新闻',
                    component: 'News'
                },
                {
                    title: '公告',
                    component: 'Notice'
                }
            ],
            publisherId: '',
            currentView: 'Tribune',
            shopUrl:''
        }
    },
    methods: {
        rule() {
            console.log('rule')
            this.isBarChartShow=true
        },
        cancel(){
            this.isBarChartShow=false
        },
        shop() {
            console.log('shop')
            window.location.href = this.shopUrl
        },
        toBuy() {
            console.log('购买')
            this.$store.dispatch('currentView', 'Buy')
            this.$router.push('/home/deal')
        },
        toTransfer() {
            console.log('转让')
            this.$store.dispatch('currentView', 'Attorn')
            this.$router.push('/home/deal')
        },
        Collection() {
            console.log('自选')
            let sendData = {
                productId: this.$route.params.productId
            }
            market.optional(sendData).then(data => {
                console.log(data)
            })
            this.optional = !this.optional
        },
        toTribune() {
            console.log('论坛')
            this.$router.push('/detailsTribune')
        },
        toShare() {
            console.log('分享')
            alert('该功能暂未开放')
        },
        toCurrentView(mainToptab) {
            this.currentView = mainToptab.component
        }
    },
    mounted() {
        let sendData = {
            productId: this.$route.params.productId,
        }
        market.quotation(sendData).then(data => {
            if (data.data.code == 200) {
                let title = `${data.data.data.name} (${data.data.data.code})`
                this.$store.dispatch('title', title)
                document.querySelector('title').innerText = `${data.data.data.name} (${data.data.data.code})`
                this.optional = data.data.data.optional
                this.lastPrice = data.data.data.lastPrice
                this.growth = data.data.data.growth
                this.growthRatio = data.data.data.growthRatio
                this.topPrice = data.data.data.topPrice
                this.openPrice = data.data.data.openPrice
                this.bottomPrice = data.data.data.bottomPrice
                this.exchangeRate = data.data.data.exchangeRate
                this.averagePrice = data.data.data.averagePrice
                this.tradeAmount = data.data.data.tradeAmount
                this.shopUrl=data.data.data.shopUrl
                this.$store.dispatch('productId', data.data.data.productId)
                this.$store.dispatch('code', data.data.data.code)
                this.$store.dispatch('attorncode', data.data.data.code)
            } else {
                toast(data.data.message)
            }
        })
    },
    filters: {
        toFiexed(t) {
            if (t == 0) return '0.00'
            if (!t) return
            return t.toFixed(2)
        }
    },
    // beforeDestroy() {
    //     this.$store.dispatch('code', '')
    //     this.$store.dispatch('attorncode', '')
    // },
    beforeRouteEnter(to, from, next) {
        next()
    },
    components: {
        BarChart,
        Tribune,
        BriefIntroduction,
        News,
        Notice,
        TabChart
    }
}
</script>

<style lang="less" scoped>
@import '../../less/config.less';
.pricePersonDetailWrap {
    .content {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 1.386667rem;
        z-index: 10;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        background-color: #191a22;
        .top {
            width: 100%; // height: 3.2rem;
            background-color: #202129;
            color: #f20624;
            text-align: center;
            padding: .4rem 0 0.2rem;
            margin-bottom: 0.26667rem;
            position: relative;
            .rule {
                position: absolute;
                left: 0;
                top: .666667rem;
                width: 2rem;
                height: .773333rem;
                line-height: .773333rem;
                background-color: #353641;
                color: #eee;
                font-size: .373333rem;
                text-align: left;
                padding-left: .16rem;
                border-top-right-radius: .533333rem;
                border-bottom-right-radius: .533333rem;
            }
            .shop {
                position: absolute;
                right: 0;
                top: .666667rem;
                width: 2rem;
                height: .773333rem;
                line-height: .773333rem;
                background-color: #353641;
                color: #eee;
                font-size: .373333rem;
                text-align: right;
                padding-right: .16rem;
                border-top-left-radius: .533333rem;
                border-bottom-left-radius: .533333rem;
                img {
                    width: .426667rem;
                    height: .426667rem;
                    vertical-align: text-bottom;
                }
            }
            .big {
                font-size: 1.06667rem;
                img {
                    width: 0.53333rem;
                    height: 0.693333rem;
                }
            }
            span {
                font-size: 0.48rem;
            }
            .first {
                margin-right: 0.3rem;
            }
            .count {
                margin-top: 0.2rem;
                display: flex;
                justify-content: space-around;
                align-items: center;
                color: #eee;
                .scount {
                    .sign {
                        line-height: 1.8;
                        color: #acacac;
                        font-size: 0.32rem;
                    }
                }
            }
        }
        .charts {
            width: 100%;
            height: 8.53333rem;
            background-color: #202129;
            margin-bottom: 0.26667rem;
            img {
                width: 100%;
                height: 5.12rem;
            }
            .aboutsPrices {
                padding: 0 @p30;
                color: #999;
                .chartstop {
                    height: 1.81333rem;
                    border-bottom: 1px solid @bordercolor;
                    font-size: 0;
                    .box {
                        display: inline-block;
                        width: 50%;
                        height: 0.90667rem;
                        font-size: 0.32rem;
                        .num {
                            display: inline-block;
                            width: 1.5rem;
                            color: @color;
                        }
                    }
                }
                .bottom {
                    height: 0.77333rem;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    .box {
                        span {
                            margin-right: 0.1rem;
                        }
                        .active {
                            color: @yellow;
                        }
                        .num {
                            color: @color;
                        }
                    }
                }
            }
        }
        .mainTabs {
            background-color: #191a22;
            width: 100%;
            height: 16.4rem;
            overflow: auto;
            -webkit-overflow-scrolling: touch;
            .mainToptabs {
                width: 100%;
                height: 0.93333rem;
                background-color: #20212a;
                border-bottom: 1px solid @bordercolor;
                display: flex;
                justify-content: space-around;
                align-items: center;
                color: #eee;
                font-size: 0.4rem;
                span {
                    flex: 1 1 2rem;
                    text-align: center;
                    height: 0.93333rem;
                    line-height: 0.93333rem;
                }
                .active {
                    color: @yellow;
                }
            }
            .currentView {
                background-color: #191a22;
                width: 100%;
                height: 15.46667rem;
                overflow: auto;
                -webkit-overflow-scrolling: touch;
            }
        }
    }
    .footer {
        width: 100%;
        height: 1.386667rem;
        border-top: 1px solid #2a2a34;
        position: absolute;
        bottom: 0;
        font-size: 0.32rem;
        line-height: 1.2;
        color: #ddd;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: #202129;
        div {
            flex: 1 1 20%;
            text-align: center;
        }
        img {
            width: 0.53333rem;
        }
        .active {
            color: @yellow;
        }
    }
}
</style>
