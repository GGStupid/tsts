<template>
    <div class="personList">
        <div class="title">
            <span style="flex:0 0 4rem;">全部</span>
            <span class="priceSort" @click='sortByPrices' style="text-align: right;flex:0 0 3.1rem;">
                最新价
                <span class="per">元 / 小时</span>
                <span class="sort">
                    <img :src="pricesImg" alt="">
                </span>
            </span>
            <span class="percentSort" @click="sortByHour" style="text-align: right;">
                涨幅
                <img :src="hourImg" alt="">
            </span>
        </div>
        <div class="perlistWrap">
            <v-ComPersonList :personLists="personLists" @toNext="toNext"></v-ComPersonList>
            <Nomore :isNomoreShow='isNomoreShow'></Nomore>
            <div class="nodata" v-show="personLists.length==0">
                <img src="../../assets/nodata.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import ComPersonList from '@/components/market/ComPersonList'
import Nomore from '@/components/Nomore'
import market from '@/api/market/index'
import { toast } from '@/util/index'
export default {
    data() {
        return {
            page: 1,
            rows: 22,
            isUpSrot: 'default',
            isHourUpSrot: 'default',
            byPrices: true,
            personLists: [],
            isNomoreShow: false,
            loading: false

        }
    },
    computed: {
        order() {
            if (this.isUpSrot == 'default') {
                return ''
            }
            return this.isUpSrot ? 'asc' : 'desc'
        },
        pricesImg() {
            if (this.isUpSrot == 'default') {
                return require('../../assets/quotes_btn_nor.png')
            }
            return this.isUpSrot ? require('../../assets/quotes_btn_up.png') : require('../../assets/quotes_btn_down.png')
        },
        hourOrder() {
            if (this.isHourUpSrot == 'default') {
                return ''
            }
            return this.isHourUpSrot ? 'lastPrice' : 'growthRatio'
        },
        hourImg() {
            if (this.isHourUpSrot == 'default') {
                return require('../../assets/quotes_btn_nor.png')
            }
            return this.isHourUpSrot ? require('../../assets/quotes_btn_up.png') : require('../../assets/quotes_btn_down.png')
        },
    },
    props: {
        id: {
            type: String
        }
    },
    methods: {
        loadPersonLists() {
            var that = this
            if (this.id == '热门') return
            if (this.id == '自选') {
                market.my(sendData).then(data => {
                    if (data.data.code == 200) {
                        if (!data.data.data.rows) return
                        if (data.data.data.rows.length == 0) {
                            this.isNomoreShow=true
                            document.querySelector('.perlistWrap').removeEventListener('scroll', that.handleScroll)
                            return
                        }
                        data.data.data.rows.forEach(function (element) {
                            if (!element) return
                            that.personLists.push(element)
                        }, this);
                        this.page++
                    } else {
                        toast(data.data.message)
                    }
                })
                return
            }
            let sendData;
            if (this.byPrices) {
                if (this.isUpSrot == 'default') {
                    sendData = {
                        categoryId: this.id,
                        page: this.page,
                        rows: this.rows
                    }
                } else {
                    sendData = {
                        categoryId: this.id,
                        order: this.order,
                        page: this.page,
                        rows: this.rows
                    }
                }
            } else {
                if (this.isUpSrot == 'default') {
                    sendData = {
                        categoryId: this.id,
                        page: this.page,
                        rows: this.rows
                    }
                } else {
                    sendData = {
                        categoryId: this.id,
                        sort: this.hourOrder,
                        page: this.page,
                        rows: this.rows
                    }
                }
            }
            this.loading = true
            market.list(sendData).then(data => {
                if (data.data.code == 200) {
                    this.loading = false
                    if (!data.data.data.rows) return
                    if (data.data.data.rows.length == 0) {
                         this.isNomoreShow=true
                        document.querySelector('.perlistWrap').removeEventListener('scroll', that.handleScroll)
                        return
                    }
                    data.data.data.rows.forEach(function (element) {
                        that.personLists.push(element)
                    }, this);
                    this.page++
                } else {
                    toast(data.data.message)
                }

            })
        },
        handleScroll() {
            let scrollTop = Math.round(document.querySelector('.perlistWrap').scrollTop)
            let pageHeight = Math.round(document.querySelector('.perlistWrap').offsetHeight)
            let allHeight = Math.round(document.querySelector('.comPersonList').scrollHeight);
            let a = allHeight - scrollTop - pageHeight
            if (a >= 0 && a <= 50) {
                if (this.loading) return
                this.loadPersonLists();
            }
        },
        sortByPrices() {
            console.log('sortByPrices')
            if (this.isUpSrot == ' default') {
                this.isUpSrot = true
            } else {
                this.isUpSrot = !this.isUpSrot
            }
            this.byPrices = true
            let that = this;
            that.page = 1;
            that.personLists = []
            if (that.page == 1) {
                document.querySelector('.perlistWrap').removeEventListener('scroll', that.handleScroll)
                that.loadPersonLists();
                document.querySelector('.perlistWrap').addEventListener('scroll', that.handleScroll);
            }
        },
        sortByHour() {
            console.log('sortByHour')
            if (this.isHourUpSrot == ' default') {
                this.isHourUpSrot = true
            } else {
                this.isHourUpSrot = !this.isHourUpSrot
            }
            this.byPrices = false
            let that = this;
            that.page = 1;
            that.personLists = []
            if (that.page == 1) {
                document.querySelector('.perlistWrap').removeEventListener('scroll', that.handleScroll)
                that.loadPersonLists();
                document.querySelector('.perlistWrap').addEventListener('scroll', that.handleScroll);
            }
        },
        toNext(payload) {
            console.log('topricePersonDetail')
            console.log(payload)
            this.$store.dispatch('code', payload.code)
            this.$router.push('/pricePersonDetail/' + payload.productId)
        }
    },
    watch: {
        id() {
            let that = this;
            that.page = 1;
            that.personLists = []
            if (that.page == 1) {
                document.querySelector('.perlistWrap').removeEventListener('scroll', that.handleScroll)
                that.loadPersonLists();
                document.querySelector('.perlistWrap').addEventListener('scroll', that.handleScroll);
            }
        }
    },
    // mounted() {
    //     let that = this;
    //     if (that.page === 1) {
    //         that.loadPersonLists();
    //         document.querySelector('.perlistWrap').addEventListener('scroll', that.handleScroll);
    //     }
    // },
    components: {
        'v-ComPersonList': ComPersonList,
        Nomore
    }
}
</script>

<style lang="less">
@import '../../less/config.less';
.personList {
    color: @yellow;
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: @bgcolor;
        height: 0.8rem;
        padding: 0 @p30;
        color: @placeColor;
        font-size: 0.373333rem;
        border-bottom: 1px solid @bordercolor;
        span {
            flex: 1 1 2.2rem;
        }
        img {
            width: 0.16rem;
        }
        .per {
            font-size: 0.29333rem;
        }
        .sort {
            display: inline-block;
            height: 0.42667rem;
            margin-left: 0.26667rem;
            border-left: 1px solid @bordercolor;
        }
        .percentSort {
            img {
                margin-left: 0.186667rem;
            }
        }
    }
    .perlistWrap {
        position: absolute;
        top: 0.8rem;
        right: 0;
        left: 0;
        bottom: 0;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        .nodata {
            text-align: center;
            margin-top: 2.133333rem;
            img {
                width: 5.706667rem;
                height: 4.76rem;
            }
        }
    }
}
</style>
