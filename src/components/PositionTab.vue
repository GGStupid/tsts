<template>
    <div class="PositionTab">
        <div class="tabWrap" v-for="(item,index) in tabTitles" @click='toActive(index,item)'>
            <span :class="{'active':flag==index}">{{item.title}}</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            flag: 0
        }
    },
    props: {
        tabTitles: {
            type: Array
        }
    },
    computed: {
        indexFlag() {
            return this.$store.state.indexFlag
        }
    },
    methods: {
        toActive(index, item) {
            this.flag = index
            this.$emit('toNext', item)
        }
    }
}
</script>

<style lang="less" scoped>
@height: 1.06667rem;
@actColor: #F8CC00;
@color: #ddd;
@fontSize: 0.373333rem;
@bgcolor: #20212a;
.PositionTab {
    width: 9.46667rem;
    height: @height;
    white-space: nowrap;
    background-color: @bgcolor;
    .tabWrap {
        display: inline-block;
        padding: 0 0.5rem;
        height: @height;
        background-color: @bgcolor;
        color: @color;
        font-size: @fontSize;
        span {
            display: inline-block;
            height: @height;
            line-height: @height;
        }
        .active {
            border-bottom: 0.0667rem solid @actColor;
            color: @actColor;
        }
    }
}
</style>
