<template>
    <div class="comPersonList">
        <div class="lists" v-for="(list,index) in personLists" :key="index" @click="toNext(list)">
            <div class="aboutNames">
                <img :src="baseImgUrl+list.avatarPath" alt="">
                <div class="name">
                    <div class="upname">{{list.name}}</div>
                    <div class="code">{{list.code}}</div>
                </div>
            </div>
            <div class="aboutPrices">
                {{list.lastPrice*3600 | toFixed}}
            </div>
            <div class="aboutPercent" :class="{'isUP':list.growthRatio>0}">
                {{list.growthRatio
                <0? '': ''}}{{Math.round(list.growthRatio*100)}}% </div>
            </div>
        </div>
</template>

<script>
export default {
    data() {
        return {
            baseImgUrl: this.$store.state.baseImgUrl,
        }
    },
    props: {
        personLists: {
            type: Array
        }
    },
    methods: {
        toNext(payload) {
            this.$emit('toNext', payload)
        }
    },
    filters: {
        toFixed(prices) {
            if (!prices) return
            return prices.toFixed(0)
        }
    }
}
</script>

<style lang="less" scoped>
@import '../../less/config.less';
.lists {
    height: 1.8667rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 @p30;
    color: @color;
    background-color: @bgcolor;
    border-bottom: 1px solid @bordercolor;
    .aboutNames {
        flex: 0 0 4rem;
        display: flex;
        align-items: center;
        font-size: 0.4rem;
        img {
            width: 1.04rem;
            height: 1.04rem;
        }
        .name {
            line-height: 1.9;
            margin-left: 0.29333rem;
            .upname {
                width: 3rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
            .code {
                font-size: 0.293333rem;
                color: #999;
            }
        }
    }
    .aboutPrices {
        flex: 0 0 3rem;
        text-align: right;
        font-size: 0.426667rem;
    }
    .aboutPercent {
        flex: 1 1 2.2rem;
        text-align: right;
        font-size: 0.426667rem;
        color: #4affa5;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    .isUP {
        color: #f20642;
    }
}
</style>
