<template>
    <div class="RankList">
        <div class="title">{{title}}</div>
        <div class="list" v-for="(list,index) in lists" :key='index' @click="toDetails(list)">
            <div class="left">
                <span class="count" v-if="index<3">
                    <img v-show="index==0" :src="firstImg" alt="">
                    <img v-show="index==1" :src="secondeImg" alt="">
                    <img v-show="index==2" :src="thirdImg" alt="">
                </span>
                <span class="count" v-else>{{index+1}}</span>
                <span class="headImg">
                    <img :src="baseImgUrl+list.avatarPath" alt="">
                </span>
                {{list.name}}
            </div>
            <div class="right">
                {{list.dataStr}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            baseImgUrl:this.$store.state.baseImgUrl,
            firstImg:require('../../assets/quotes_hot_icon_NO1.png'),
            secondeImg:require('../../assets/quotes_hot_icon_NO2.png'),
            thirdImg:require('../../assets/quotes_hot_icon_NO3.png')
        }
    },
    props: {
        title: {
            type: String
        },
        lists: {
            type: Array
        }
    },
    methods:{
        toDetails(data){
            this.$emit('toDetails',data)
        }
    }
}
</script>

<style lang="less" scoped>
@titleColor: #F8CC00;
@titleFontSize: 0.373333rem;
@listImgWidth: 0.986667rem;
@listFontSize: 0.346667rem;
@listNameColor: #eee;
@listSubColor: #999999;
.RankList {
    width: 7.44rem;
    height: 8rem;
    .title {
        text-align: center;
        height: 1.3333rem;
        line-height: 1.3333rem;
        background-color: #191A22;
        color: @titleColor;
        font-size: @titleFontSize;
    }
    .list {
        padding: 0 0.26667rem;
        height: 1.3333rem;
        background-color: #20212a;
        border-bottom: 1px solid #191A22;
        color: @listNameColor;
        font-size: @listFontSize;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
            display: flex;
            align-items: center;
            .count {
                display: inline-block;
                width: 0.48rem;
                height: 0.613333rem;
                line-height: 0.613333rem;
                margin-right: 0.26667rem;
                text-align: center;
                color: @listSubColor;
                font-size: 0.4rem;
                img {
                    width: 0.48rem;
                    height: 0.613333rem;
                }
            }
            .headImg {
                display: inline-block;
                width: @listImgWidth;
                height: @listImgWidth;
                text-align: center;
                line-height: @listImgWidth;
                margin-right: 0.16rem;
                overflow: hidden;
                border-radius: 50%;
                border: 0.02667rem solid #333;
                img {
                    width: @listImgWidth;
                    height: @listImgWidth;
                }
            }
        }
        .right {
            color: @listSubColor;
        }
    }
}
</style>
