<template>
    <div class="HotListWrap">
        <div class="title">
            <span>全部</span>
            <span>
                {{titlename}}
                <span class="sub">
                    元 / 小时
                </span>
            </span>
        </div>
        <div class="contentWrap">
            <div class="details" v-for="(list,index) in hotlists" @click="toNext(list)" :key="index">
                <div class="avatar">
                    <img :src="baseImgUrl+list.avatarPath" alt="">
                    <img class="icon" src="../../assets/quotes_hot_label_notice.png" alt="">
                </div>
                <div class="informations">
                    <div class="aboutNames">
                        <div class="nametitle">{{list.name}}</div>
                        <div class="nameCode">{{list.code}}</div>
                        <div v-show="list.status==1" class="times" v-html="list.purchaseStart">
                        </div>
                        <div v-show="list.status==2" class="times">
                            <span class="sale">申购中</span>
                        </div>
                        <div v-show="list.status==3" class="times">
                            <span class="sale">申购结束</span>
                        </div>
                    </div>
                    <div class="aboutPrices">
                        <div class="prices">{{list.purchasePrice | toFixed}}</div>
                        <div v-show="list.status==2" class="button" @click="applyPurchase(list.productId)">申购</div>
                        <div v-show="list.status==3" class="nobutton">- -</div>
                    </div>
                </div>
            </div>
            <div style="color:#acacac;padding: 0.4rem;
                      text-align: center;
                      font-size: 0.4rem;" v-show="hotlists.length==0">
                暂无数据
            </div>
        </div>
    </div>
</template>

<script>
import market from '@/api/market/index'
import { toast } from '@/util/index'
export default {
    data() {
        return {
            baseImgUrl: this.$store.state.baseImgUrl,
            page: 1,
            rows: 4,
            hotlists: [],
            timer: '',
            loading: false
        }
    },
    computed:{
        titlename(){
            return this.isNews ? '申购价' :'增发价'
        }
    },
    props: {
        isNews: {
            type: Boolean
        }
    },
    methods: {
        loadHotlists() {
            var that = this
            this.loading = true
            let sendData = {
                page: this.page,
                rows: this.rows
            }
            if (this.isNews) {
                market.new(sendData).then(data => {
                    if (data.data.code == 200) {
                         this.loading = false
                        if (!data.data.data.rows) return
                        if (data.data.data.rows.length == 0) {
                            document.querySelector('.routeWrap').removeEventListener('scroll', that.handleScroll)
                            return
                        }
                        data.data.data.rows.forEach(function (element) {
                            that.hotlists.push(element)
                        }, this);
                        this.timer = setInterval(() => {
                            console.log('time-----------news')
                            this.hotlists.forEach((ele) => {
                                if (!ele.reTime) {
                                    ele.reTime = ele.purchaseStart
                                }
                                if (ele.reTime) {
                                    ele.purchaseStart = this.formateTime(ele.reTime)
                                }
                            })
                        }, 1000)
                        this.page++
                    } else {
                        toast(data.data.message)
                    }
                })
                return
            } else {
                market.inc(sendData).then(data => {
                    // this.hotlists = data.data.data.rows
                    if (data.data.code == 200) {
                          this.loading = false
                        if (!data.data.data.rows) return
                        if (data.data.data.rows.length == 0) {
                            document.querySelector('.routeWrap').removeEventListener('scroll', that.handleScroll)
                            return
                        }
                        data.data.data.rows.forEach(function (element) {
                            that.hotlists.push(element)
                        }, this);
                        this.timer = setInterval(() => {
                            console.log('time-----------indc')
                            this.hotlists.forEach((ele) => {
                                if (!ele.reTime) {
                                    ele.reTime = ele.purchaseStart
                                }
                                if (ele.reTime) {
                                    ele.purchaseStart = this.formateTime(ele.reTime)
                                }
                            })
                        }, 1000)
                        this.page++
                    } else {
                        toast(data.data.message)
                    }
                })
                return
            }
        },
        handleScroll() {
            let scrollTop = document.querySelector('.routeWrap').scrollTop;
            let pageHeight = document.querySelector('.routeWrap').offsetHeight;
            let allHeight = document.querySelector('.hotWrap').offsetHeight;
            let a = allHeight - scrollTop - pageHeight
            if (a >= 0 && a <= 50) {
                if (this.loading) return
                this.loadHotlists();
            }
        },
        formateTime(purchaseStart) {
            var that = this
            // element.purchaseStart
            let time_end = purchaseStart
            let time_now = new Date();  // 获取当前时间
            time_now = time_now.getTime();
            let time_distance = time_end - time_now;
            if (time_distance >= 0) {
                // 相减的差数换算成天数  
                var int_day = Math.floor(time_distance / 86400000)
                time_distance -= int_day * 86400000;
                // 相减的差数换算成小时
                var int_hour = Math.floor(time_distance / 3600000)
                time_distance -= int_hour * 3600000;
                // 相减的差数换算成分钟  
                var int_minute = Math.floor(time_distance / 60000)
                time_distance -= int_minute * 60000;
                // 相减的差数换算成秒数 
                var int_second = Math.floor(time_distance / 1000)
                if (int_day < 10)
                    int_day = "0" + int_day
                // 判断小时小于10时，前面加0进行占位
                if (int_hour < 10)
                    int_hour = "0" + int_hour;
                // 判断分钟小于10时，前面加0进行占位     
                if (int_minute < 10)
                    int_minute = "0" + int_minute;
                // 判断秒数小于10时，前面加0进行占位
                if (int_second < 10)
                    int_second = "0" + int_second;
                purchaseStart = `<span class="timeNumber" style="color:#F8CC00">${int_day}</span>天<span class="timeNumber" style="color:#F8CC00">${int_hour}</span>时<span class="timeNumber" style="color:#F8CC00">${int_minute}</span>分<span class="timeNumber" style="color:#F8CC00">${int_second}</span>秒`
                return purchaseStart
            }
        },
        applyPurchase(id) {
            console.log('applayPurchase')
            this.$router.push('/applyPurchase/' + id)
        },
        toNext(e) {
            this.$emit('toNext', e)
        }
    },
    watch: {
        isNews() {
            let that = this;
            that.page = 1;
            that.hotlists = []
            if (that.page === 1) {
                clearInterval(this.timer)
                document.querySelector('.routeWrap').removeEventListener('scroll', that.handleScroll)
                that.loadHotlists();
                document.querySelector('.routeWrap').addEventListener('scroll', that.handleScroll);
            }
        }
    },
    mounted() {
        let that = this;
        that.page = 1;
        that.hotlists = []
        clearInterval(this.timer)
        if (that.page === 1) {
            document.querySelector('.routeWrap').removeEventListener('scroll', that.handleScroll)
            that.loadHotlists();
            document.querySelector('.routeWrap').addEventListener('scroll', that.handleScroll);
        }
    },
    beforeDestroy() {
        clearInterval(this.timer)
    },
    filters: {
        toFixed(prices) {
            if (!prices) return
            return prices.toFixed(2)
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../less/config.less';
.HotListWrap {
    background-color: @bgcolor;
    .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1.0667rem;
        padding: 0 @p30;
        font-size: 0.37333rem;
        color: #acacac;
        .sub {
            font-size: 0.29333rem;
        }
    }
    .details {
        padding: 0 @p30;
        height: 2.586667rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: @p30;
        color: @color;
        .avatar {
            position: relative;
            img {
                width: 1.6rem;
                height: 1.6rem;
            }
            .icon {
                position: absolute;
                top: 0;
                left: 0;
                width: 0.8rem;
                height: 0.8rem;
            }
        }
        .informations {
            flex: 0 0 7.06667rem;
            position: relative;
            .nametitle {
                width: 4rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .nameCode {
                font-size: 0.32rem;
                color: #999;
                margin: 0.1rem 0 0.26rem;
            }
            .times {
                font-size: 0.346667rem;
                .timeNumber {
                    color: @yellow;
                }
                .sale {
                    color: #999;
                }
            }
            .aboutPrices {
                position: absolute;
                top: 0;
                right: 0;
                .prices {
                    width: 1.86667rem;
                    text-align: end;
                }
                .button {
                    width: 1.86667rem;
                    height: 0.7733rem;
                    margin-top: 0.32rem;
                    background-color: @yellow;
                    border-radius: 0.08rem;
                    color: #191a22;
                    font-size: 0.37333rem;
                    text-align: center;
                    line-height: 0.7733rem;
                }
                .nobutton {
                    width: 1.86667rem;
                    height: 0.7733rem;
                    margin-top: 0.32rem; // background-color: @yellow;
                    border-radius: 0.08rem;
                    color: #eee;
                    font-size: 0.37333rem;
                    text-align: center;
                    line-height: 0.7733rem;
                }
            }
        }
    }
}
</style>
