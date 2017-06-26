<template>
    <div class="personList">
        <div class="title">
            <span>全部</span>
            <span class="priceSort">
                最新价
                <span class="per">元 / 小时</span>
                <span class="sort">
                    <img src="../../assets/quotes_btn_nor.png" alt="">
                </span>
            </span>
            <span class="percentSort">
                涨跌幅
                <img src="../../assets/quotes_btn_nor.png" alt="">
            </span>
        </div>
        <div class="perlistWrap">
            <v-ComPersonList :personLists="personLists" @toNext="toNext"></v-ComPersonList>
        </div>
    </div>
</template>

<script>
import ComPersonList from '@/components/market/ComPersonList'

export default {
    data() {
        return {
            personLists: [
                {
                    avatar: require('../../assets/quotes_actor_avatar.png'),
                    name: '阿道夫',
                    code: '54646',
                    price: '765',
                    percent: '30%',
                    isUP:true
                },
                {
                    avatar: require('../../assets/quotes_actor_avatar.png'),
                    name: '阿道夫',
                    code: '54646',
                    price: '765',
                    percent: '- 30%',
                    isUP:false
                },
                {
                    avatar: require('../../assets/quotes_actor_avatar.png'),
                    name: '阿道夫',
                    code: '54646',
                    price: '765',
                    percent: '30%',
                    isUP:true
                },
                {
                    avatar: require('../../assets/quotes_actor_avatar.png'),
                    name: '阿道夫',
                    code: '54646',
                    price: '765',
                    percent: '30%',
                    isUP:false
                },
                {
                    avatar: require('../../assets/quotes_actor_avatar.png'),
                    name: '阿道夫',
                    code: '54646',
                    price: '765',
                    percent: '30%',
                    isUP:true
                },
                {
                    avatar: require('../../assets/quotes_actor_avatar.png'),
                    name: '阿道夫',
                    code: '54646',
                    price: '765',
                    percent: '30%',
                    isUP:false
                },
                {
                    avatar: require('../../assets/quotes_actor_avatar.png'),
                    name: '阿道夫',
                    code: '54646',
                    price: '765',
                    percent: '30%',
                    isUP:true
                },
                {
                    avatar: require('../../assets/quotes_actor_avatar.png'),
                    name: '阿道夫',
                    code: '54646',
                    price: '765',
                    percent: '30%',
                    isUP:false
                },
                {
                    avatar: require('../../assets/quotes_actor_avatar.png'),
                    name: '阿道夫',
                    code: '54646',
                    price: '765',
                    percent: '30%',
                    isUP:true
                },
                {
                    avatar: require('../../assets/quotes_actor_avatar.png'),
                    name: '阿道夫',
                    code: '54646',
                    price: '765',
                    percent: '30%',
                    isUP:true
                },
                {
                    avatar: require('../../assets/quotes_actor_avatar.png'),
                    name: '阿道夫',
                    code: '54646',
                    price: '765',
                    percent: '30%',
                    isUP:true
                },
                {
                    avatar: require('../../assets/quotes_actor_avatar.png'),
                    name: '阿道夫',
                    code: '54646',
                    price: '765',
                    percent: '30%',
                    isUP:true
                },
            ]

        }
    },
    methods:{
        toNext(payload){
            console.log(payload)
            this.$router.push('/pricePersonDetail')
        }
    },
    components: {
        'v-ComPersonList': ComPersonList
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
    }
}
</style>
