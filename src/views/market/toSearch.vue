<template>
    <div class="searchWrap">
        <div class="search">
            <img src="../../assets/quotes_nav_icon_search.png" alt="">
            <input type="text" @input="searchContent" v-model="searchName" placeholder="输入发行人/代码">
            <span @click="cancelSearch">{{searchTitle}}</span>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            searchName:'',
        }
    },
    computed:{
        searchTitle(){
            return this.searchName ? '取消' :'搜索'
        }
    },
    methods:{
        searchContent(){
            console.log('searchContent')
        },
        cancelSearch(){
            console.log('cancelSearch')
            this.searchName=''
        }
    },
    beforeRouteEnter(to,from,next){
        document.querySelector('title').innerText='搜索'
        next()
    }
}
</script>

<style lang="less" scoped>
@import '../../less/config.less';
.searchWrap {
    .search {
        position: relative;
        height: 1.17333rem;
        line-height: 1.17333rem;
        background-color: @bgcolor;
        margin-bottom: 0.2667rem;
        text-align: center;
        font-size: 0.37333rem;
        img {
            position: absolute;
            top: 0.38667rem;
            left: .6rem;
            width: 0.34667rem;
            height: 0.34667rem;
        }
        input {
            width: 8.1333rem;
            height: 0.77333rem;
            line-height: 0.77333rem;
            border-radius: 0.8rem;
            padding: 0 0.8rem;
            margin-right: @p30;
            background-color: #eee;
        }
        input::-webkit-input-placeholder {
            /* WebKit browsers*/
            color: @placeColor;
        }
        input::-moz-placeholder {
            /* Mozilla Firefox 4 to 18*/
            color: @placeColor;
        }
        input::-moz-placeholder {
            /* Mozilla Firefox 19+*/
            color: @placeColor;
        }
        input:-ms-input-placeholder {
            /* Internet Explorer 10+*/
            color: @placeColor;
        }
        span {
            color: #eee;
        }
    }
}
</style>

