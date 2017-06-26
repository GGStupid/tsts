<template>
    <div class="newList" @click="toNewDetail">
        <span>{{title}}</span>
        <img :src="picPath" alt="">
    </div>
</template>
<script>
export default {
    props:{
        title:{
            type:String
        },
        picPath:{
            type:String
        },
        id:{
            type:Number
        }
    },
    methods:{
        toNewDetail(){
            console.log('list')
            this.$emit('toNewDetail')
        }
    }
}
</script>

<style lang="less" scoped>
@color: #eee;
@fontSize: 0.4rem;
@imgSize: 1.70667rem;
@p30: 0.4rem;
@height: 2.4rem;
@background: #20212a;
@bordercolor:#191A22;
.newList {
    width: 100%;
    height: @height;
    background: @background;
    color: @color;
    font-size: @fontSize;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 @p30;
    border-bottom:1px solid @bordercolor;
    span {
        flex:0 0 6.3733rem;
        line-height: 1.5;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    img {
        height: @imgSize;
    }
}
</style>
