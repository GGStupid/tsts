<template>
    <div class="HotListWrap">
        <div class="title">
            <span>全部</span>
            <span>
                发行价
                <span class="sub">
                    元 / 小时
                </span>
            </span>
        </div>
        <div class="details" v-for="(list,index) in lists" @click="toNext" :key="index">
            <div class="avatar">
                <img :src="list.avatar" alt="">
                <img class="icon" src="../../assets/quotes_hot_label_notice.png" alt="">
            </div>
            <div class="informations">
                <div class="aboutNames">
                    <div>{{list.name}}</div>
                    <div class="nameCode">{{list.code}}</div>
                    <div v-show="list.isTimes" class="times">
                        <span class="timeNumber">{{list.day}}</span>天
                        <span class="timeNumber">{{list.hour}}</span>时
                        <span class="timeNumber">{{list.minute}}</span>分
                        <span class="timeNumber">{{list.second}}</span>秒
                    </div>
                    <div v-show="list.isSaleShow" class="times">
                        <span class="sale" v-text="list.isSale ? '申购中' : '销售中'"></span>
                    </div>
                </div>
                <div class="aboutPrices">
                    <div class="prices">{{list.prices}}</div>
                    <div v-show="list.isSaleShow" class="button" v-text="list.isSale ? '申购' : '销售'"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:{
        lists:{
            type:Array
        }
    },
    methods:{
        toNext(){
            this.$emit('toNext')
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
            }
        }
    }
}
</style>
