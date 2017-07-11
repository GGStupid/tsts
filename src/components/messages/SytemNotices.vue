<template>
    <div class="msgList" @click="toNext()">
        <div class="informations">
            <div class="left">
                <h3>{{title}}</h3>
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
        title: {
            type: String
        },
        content: {
            typs: String
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
            let istoday = v.substring(0, 10)
            if (istoday == today) {
                return `今天 ${v.substring(11, 16)}`
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
            top: 0.1rem;
            right: 0;
            color: @subTitleColor;
            font-size: @subTitleFontSize;
        }
    }
}
</style>
