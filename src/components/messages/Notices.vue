<template>
    <div class="msgList" @click="toNext(path)">
        <div class="imgs">
            <img src="../../assets/message_notice_icon_tk.png" alt="">
        </div>
        <div class="informations">
            <div class="left">
                <h3>淘刻官方</h3>
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
@bordercolor:#191A22;
@fintSize: 0.42667rem;
@subTitleColor: #999;
@subTitleFontSize: 0.32rem;
@countBgColor: #ff0000;
@countHeight: 0.42667rem;
.msgList {
    width: 100%;
    height: @height;
    padding: 0.3rem @p30 0;
    color: @color;
    background-color: @background;
    border-bottom:1px solid @bordercolor;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    .imgs {
        img {
            width: 1.12rem;
        }
    }
    .informations {
        flex: 0 0 7.7rem;
        height: @height;
        position: relative;
        .left {
            position: absolute;
            font-size: @fintSize;
            span {
                display: inline-block;
                color: @subTitleColor;
                font-size: @subTitleFontSize;
                margin-top: 0.24rem;
                line-height: 1.8;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-line-clamp: 2;
                -webkit-box-orient: vertical;
            }
        }
        .right {
            position: absolute;
            right: 0;
            color: @subTitleColor;
            font-size: @subTitleFontSize;
        }
    }
}
</style>
