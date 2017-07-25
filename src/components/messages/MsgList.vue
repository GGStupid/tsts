<template>
    <div class="msgList" @click="toNext(path)">
        <div class="imgs">
            <img :src="src" alt="">
            <span class="count" v-show='count>0'>{{count}}</span>
        </div>
        <div class="informations">
            <div class="left">
                <h3>{{title}}</h3>
                <span v-if="subtitle" v-html="subtitle"></span>
                <span v-else>暂无</span>
            </div>
            <div class="right">
                <span>{{time | formateDate}}</span>
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
        count: {
            type: Number
        },
        title: {
            type: String
        },
        subtitle: {
            typs: String,
            default: '暂无通知'
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
@height: 1.70667rem;
@marginTop: 0.26667rem;
@p30: 0.4rem;
@background: #20212a;
@color: #eee;
@fintSize: 0.42667rem;
@subTitleColor: #999;
@subTitleFontSize: 0.32rem;
@countBgColor: #ff0000;
@countHeight: 0.42667rem;
.msgList {
    width: 100%;
    height: @height;
    margin-top: @marginTop;
    padding: 0 @p30;
    color: @color;
    background-color: @background;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .imgs {
        position: relative;
        img {
            width: 1.12rem;
        }
        .count {
            width: @countHeight;
            height: @countHeight;
            line-height: @countHeight;
            text-align: center;
            position: absolute;
            top: -0.21335rem;
            right: -0.21335rem;
            background-color: @countBgColor;
            border-radius: 50%;
        }
    }
    .informations {
        flex: 0 0 7.7rem;
        height: @height;
        position: relative;
        .left {
            position: absolute;
            top: 0.3rem;
            font-size: @fintSize;
            span {
                display: inline-block;
                width: 5.5rem;
                color: @subTitleColor;
                font-size: @subTitleFontSize;
                margin-top: 0.24rem;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }
        }
        .right {
            position: absolute;
            top: 0.3rem;
            right: 0;
            color: @subTitleColor;
            font-size: @subTitleFontSize;
        }
    }
}
</style>
