<template>
    <div class="comPersonList">
        <div class="lists" v-for="(list,index) in personLists" :key="index" @click="toNext(list)">
            <div class="aboutNames">
                <img :src="list.avatar" alt="">
                <div class="name">
                    <div>{{list.name}}</div>
                    <div class="code">{{list.code}}</div>
                </div>
            </div>
            <div class="aboutPrices">
                {{list.price}}
            </div>
            <div class="aboutPercent" :class="{'isUP':list.isUP}">
                {{list.percent}}
            </div>
        </div>
    </div>
 
</template>

<script>
export default {
    props:{
        personLists:{
            type:Array
        }
    },
    methods:{
        toNext(payload){
            this.$emit('toNext',payload)
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
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 0.4rem;
        img {
            width: 1.04rem;
        }
        .name {
            line-height: 1.9;
            margin-left: 0.29333rem;
            .code {
                font-size: 0.293333rem;
                color: #999;
            }
        }
    }
    .aboutPrices {
        padding-left: 0.2rem;
        font-size: 0.426667rem;
    }
    .aboutPercent {
        flex: 0 0 1.5rem;
        text-align: right;
        font-size: 0.426667rem;
        color: #4affa5;
    }
    .isUP {
        color: #f20642;
    }
}
</style>
