<template>
    <div class="userSetting">
        <div class="headIcon">
            <span>我的头像</span>
            <div class="right">
                <img src="../../../assets/mine_avatar_default.png" alt="">
                <img class="arrow" src="../../../assets/arrow_right.png" alt="">
            </div>
        </div>
        <div class="list">
            <div class="wrap" @click="nickname">
                <span>昵称</span>
                <div class="right">
                    <span>尼克</span>
                    <img class="arrow" src="../../../assets/arrow_right.png" alt="">
                </div>
            </div>
            <div class="wrap">
                <span>登录密码</span>
                <div class="right">
                    <span style="color:#999">修改</span>
                    <img class="arrow" src="../../../assets/arrow_right.png" alt="">
                </div>
            </div>
            <div class="wrap" @click="paypassword">
                <span>支付密码</span>
                <div class="right">
                    <span style="color:#F8CC00">重置</span>
                    <img class="arrow" src="../../../assets/arrow_right.png" alt="">
                </div>
            </div>
            <div class="wrap" @click="authentication">
                <span>实名认证</span>
                <div class="right">
                    <span>毛*(34********48)</span>
                </div>
            </div>
        </div>
        <div class="logout" @click='logout'>
            退出登录
        </div>
    </div>
</template>
<script>
export default {
    methods:{
        nickname(){
            console.log('nickname----')
            this.$router.push('/nickname')
        },
        paypassword(){
            console.log('paypassword')
            this.$router.push('/paypassword')
        },
        authentication(){
            console.log('authentication')
            this.$router.push('/authentication')
        },
        logout(){
            console.log('logout')
            this.$router.push('/')
        }
    },
    beforeRouteEnter(to, from, next) {
        document.querySelector('title').innerText = '设置'
        next()
    }
}
</script>

<style lang="less" scoped>
@import '../../../less/config.less';
@margin20: 0.26667rem;
@imgWidth: 1.3333rem;
@rightImgWidth: 0.16rem;
@rightImgHeight: 0.29333rem;
.userSetting {
    padding-top: @margin20;
    color: @color;
    font-size: @fontsize32;
    .headIcon {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1.86667rem;
        padding: 0 @p30;
        background-color: @bgcolor;
        .right {
            display: flex;
            justify-content: space-between;
            align-items: center;
            img {
                width: @imgWidth;
            }
            .arrow {
                width: @rightImgWidth;
                height: @rightImgHeight;
                margin-left: 0.26667rem;
            }
        }
    }
    .list {
        margin: @margin20 0;
        .wrap {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 1.30667rem;
            padding: 0 @p30;
            background-color: @bgcolor;
            border-bottom: 1px solid @bordercolor;
            .right {
                display: flex;
                justify-content: space-between;
                align-items: center;
                span {
                    font-size: 0.37333rem;
                }
                .arrow {
                    width: @rightImgWidth;
                    height: @rightImgHeight;
                    margin-left: 0.26667rem;
                }
            }
        }
    }
    .logout {
        height: 1.30667rem;
        line-height: 1.30667rem;
        background-color: @bgcolor;
        text-align: center;
        color: @yellow;
        font-size: 0.48rem;
    }
}
</style>
