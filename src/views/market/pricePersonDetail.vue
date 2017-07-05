<template>
    <div class="pricePersonDetailWrap">
        <div class="content">
            <div class="top">
                <div class="big">
                  {{lastPrice | toFiexed}}
                    <img :src="growth>=0?require('../../assets/quotes_details_arrow_up.png'):require('../../assets/quotes_details_arrow_down.png')" alt="">
                </div>
                <span class="first">{{growth | toFiexed}}</span>
                <span>{{growthRatio*100 | toFiexed}}%</span>
            </div>
            <div class="charts">
                <img src="../../assets/echats.png" alt="">
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
                <component :is="currentView"></component>
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
import Tribune from '@/components/market/Tribune'
import BriefIntroduction from '@/components/market/BriefIntroduction'
import News from '@/components/market/News'
import Notice from '@/components/market/Notice'
import market from '@/api/market/index'
export default {
    data() {
        return {
            lastPrice:'',
            growth:'',
            growthRatio:'',
            topPrice:'',
            openPrice:'',
            bottomPrice:'',
            exchangeRate:'',
            averagePrice:'',
            lastPrice:'',
            tradeAmount:'',
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
            publisherId:'',
            currentView: 'Tribune'
        }
    },
    methods: {
        toBuy() {
            console.log('购买')
        },
        toTransfer() {
            console.log('转让')
        },
        Collection() {
            console.log('自选')
            let sendData = {
                productId: this.$route.params.product_id
            }
            market.optional(sendData).then(data=>{
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
        toCurrentView(mainToptab){
            this.currentView=mainToptab.component
        }
    },
    mounted() {
        console.log(this.$route.params.productId)
        let sendData = {
            productId: this.$route.params.productId,
        }
        market.quotation(sendData).then(data => {
            let title= `${data.data.data.name} (${data.data.data.code})`
            this.$store.dispatch('title',title)
            document.querySelector('title').innerText = `${data.data.data.name} (${data.data.data.code})`
            this.optional = data.data.data.optional
              this.lastPrice=data.data.data.lastPrice
              this.growth=data.data.data.growth
              this.growthRatio=data.data.data.growthRatio
              this.topPrice=data.data.data.topPrice
              this.openPrice=data.data.data.openPrice
              this.bottomPrice=data.data.data.bottomPrice
              this.exchangeRate=data.data.data.exchangeRate
              this.averagePrice=data.data.data.averagePrice
              this.tradeAmount=data.data.data.tradeAmount
            this.$store.dispatch('productId',data.data.data.productId)
        })
    },
    filters:{
        toFiexed(t){
            if(t==0)return '0.00'
            if(!t)return
            return t.toFixed(2)
        }
    },
    beforeRouteEnter(to, from, next) {
        next()
    },
    components: {
        Tribune,
        BriefIntroduction,
        News,
        Notice
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
            width: 100%;
            height: 3.2rem;
            background-color: #202129;
            color: #f20624;
            text-align: center;
            padding: 0.8rem 0;
            margin-bottom: 0.26667rem;
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
                height: 3.28rem;
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
