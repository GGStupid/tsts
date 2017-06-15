<template>
    <div class="msgList" @click="toNext(path)">
        <div class="informations">
            <div class="left">
                <h3>{{title}}</h3>
                <span>{{subtitle}}</span>
            </div>
            <div class="right">
                <span>{{time}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        src: {
            type: String
        },
        title: {
            type: String
        },
        subtitle: {
            typs: String
        },
        time: {
            type: String
        },
        path: {
            type: String
        }
    },
    methods: {
        toNext() {
            this.$emit('toNext')
        }
    }
}
</script>
<style lang="less" scoped>
@height: 2.4rem;
@marginTop: 0.26667rem;
@p30: 0.4rem;
@background: #20212a;
@color: #eee;
@bordercolor: #191A22;
@fintSize: 0.42667rem;
@subTitleColor: #999;
@subTitleFontSize: 0.32rem;
@countBgColor: #ff0000;
@countHeight: 0.42667rem;
.msgList {
    width: 100%;
    padding: 0.3rem @p30;
    margin-bottom: @marginTop;
    color: @color;
    background-color: @background;
    border-bottom: 1px solid @bordercolor;
    .informations {
        width: 100%;
        position: relative;
        .left {
            font-size: @fintSize;
            span {
                display: inline-block;
                color: @subTitleColor;
                font-size: @subTitleFontSize;
                margin-top: 0.24rem;
                line-height: 1.6;
            }
        }
        .right {
            position: absolute;
            top:0.1rem;
            right: 0;
            color: @subTitleColor;
            font-size: @subTitleFontSize;
        }
    }
}
</style>
