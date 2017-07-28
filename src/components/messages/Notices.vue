<template>
    <div class="msgList" @click="toNext()">
        <div class="imgs">
            <img src="../../assets/message_notice_icon_tk.png" alt="">
        </div>
        <div class="informations">
            <div class="left">
                <h3>淘刻官方</h3>
                <span v-html='content'></span>
            </div>
            <div class="right">
                <span>{{createTime | formateDate}}</span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        // src: {
        //     type: String
        // },
        // title: {
        //     type: String
        // },
        content: {
            typs: String,
        },
        createTime: {
            type: String
        }
    },
    methods: {
        toNext() {
            this.$emit('toNext')
        }
    },
    filters: {
        formateDate(v) {
            if (!v) return
            let date = new Date()
            let month = (date.getMonth() + 1) >= 10 ? (date.getMonth() + 1) : `0${date.getMonth() + 1}`
            let day = date.getDate() >= 10 ? date.getDate() : `0${date.getDate()}`
            let today = `${date.getFullYear()}-${month}-${day}`
            let yesterday = `${date.getFullYear()}-${month}-${day - 1}`
            let istoday = v.substring(0, 10)
            if (istoday == today) {
                return `今天 ${v.substring(11, 16)}`
            } else if (istoday == yesterday) {
                return `昨天 ${v.substring(11, 16)}`
            } else {
                return v.substring(5, 16)
            }
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
@contentColor: #999;
@contentFontSize: 0.32rem;
@countBgColor: #ff0000;
@countHeight: 0.42667rem;
.msgList {
    width: 100%;
    height: @height;
    padding: 0.3rem @p30 0;
    color: @color;
    background-color: @background;
    border-bottom: 1px solid @bordercolor;
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
                color: @contentColor;
                font-size: @contentFontSize;
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
            color: @contentColor;
            font-size: @contentFontSize;
        }
    }
}
</style>
