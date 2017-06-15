<template>
    <div class="toastWrapButton1" v-show="isShow">
        <div class="mask">
        </div>
        <div class="whiteToast">
            <div class="msgwrap">
                <span class="msg">
                   {{msg}}
                </span>
            </div>
            <div class="buttons" @click="toastConfirm">
                确认
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        isShow: {
            type: Boolean
        },
        msg:{
            type:String
        }
    },
    methods: {
        toastConfirm() {
            this.$emit('toastConfirm')
        }
    }
}
</script>

<style lang="less" scoped>
@msgColor: #333;
@buttonColor: #007aff;
@buttonsHeight: 1.2rem;
@fontSize: 0.45333rem;
@borderColor: #ddd;
@borderRadius: 0.32rem;
.mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    height: 100%;
    width: 100%;
    background-color: #000;
    opacity: 0.5;
}

.whiteToast {
    width: 7.2rem;
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -40%);
    z-index: 1000;
    background-color: #fff;
    font-size: @fontSize;
    border-radius: @borderRadius;
    .msgwrap {
        padding: 0.4rem 0.6rem;
        border-bottom: 1px solid @borderColor;
        line-height: 1.5;
        text-align: center;
        .msg {
            display: inline-block;
            text-align: left;
        }
    }
    .buttons {
        height: @buttonsHeight;
        line-height: @buttonsHeight;
        color: @buttonColor;
        font-size: @fontSize;
        text-align: center;
    }
}
</style>
