<template>
    <div class="pricePersonDetailWrap">
        <div class="content">
            <div class="top">
                <div class="big">
                    0.13
                    <img src="../../assets/quotes_details_arrow_up.png" alt="">
                </div>
    
                <span class="first">0.03</span>
                <span>30.00%</span>
            </div>
            <div class="charts">
    
            </div>
            <div class="mainTabs">
                <div class="mainToptabs">
                    <span v-for="(mainToptab,index) in mainToptabs" :key="index" @click="currentView=mainToptab.component" :class="{'active':currentView==mainToptab.component}">
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
                    <img :src="isCollection ? require('../../assets/quotes_tab_optional_s.png') : require('../../assets/quotes_tab_optional_n.png')" alt="">
                    <p :class="{'active':isCollection}">{{item.title}}</p>
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
export default {
    data() {
        return {
            title: '胡灵（500060）',
            isCollection: false,
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
                    title: '公共',
                    component: 'Notice'
                }
            ],
            currentView: 'Tribune'
        }
    },
    methods: {
        toBuy() {
            console.log('购买')
        },
        toTransfer(){
            console.log('转让')
        },
        Collection() {
            console.log('自选')
            this.isCollection = !this.isCollection
        },
        toTribune(){
            console.log('论坛')
            this.$router.push('/detailsTribune')
        },
        toShare(){
            console.log('分享')
            alert('该功能暂未开放')
        }
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => document.querySelector('title').innerText = vm.title)
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
