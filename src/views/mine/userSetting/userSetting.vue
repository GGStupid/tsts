<template>
    <div class="userSetting">
        <div class="headIcon">
            <span>我的头像</span>
            <label for="avatarImg">
                <div class="right">
                    <span class="icon">
                        <img :src="avatarImg" alt="">
                    </span>
                    <img class="arrow" src="../../../assets/arrow_right.png" alt="">
                </div>
            </label>
            <input ref="avatarImg" id="avatarImg" type="file" accept="*.jpg,*.gif,*.png" @change="uploadHandler" />
        </div>
        <div class="list">
            <div class="wrap" @click="nickname">
                <span>昵称</span>
                <div class="right">
                    <span>{{nickName}}</span>
                    <img class="arrow" src="../../../assets/arrow_right.png" alt="">
                </div>
            </div>
            <div class="wrap" @click="loginpw">
                <span>登录密码</span>
                <div class="right">
                    <span style="color:#999">修改</span>
                    <img class="arrow" src="../../../assets/arrow_right.png" alt="">
                </div>
            </div>
            <div class="wrap" @click="paypassword">
                <span>支付密码</span>
                <div class="right">
                    <span style="color:#F8CC00" v-show="isPaypassword">重置</span>
                    <span style="color:#999" v-show="!isPaypassword">设置</span>
                    <img class="arrow" src="../../../assets/arrow_right.png" alt="">
                </div>
            </div>
            <div class="wrap" @click="authentication">
                <span>实名认证</span>
                <div class="right">
                    <span v-show="isAuthentication">{{authenticationTitle}}</span>
                    <span style="color:#999" v-show="!isAuthentication">去认证</span>
                    <img v-show="!isAuthentication" class="arrow" src="../../../assets/arrow_right.png" alt="">
                </div>
            </div>
        </div>
        <div class="logout" @click='logout'>
            退出登录
        </div>
    </div>
</template>
<script>
import mine from '@/api/mine/index'
import { toast } from '@/util/index'
export default {
    data() {
        return {
            isPaypassword: true,
            authenticationTitle: '',
            userIdentify:'',
            avatarImg: require('../../../assets/mine_avatar_default.png')
        }
    },
    computed: {
        avatarUrl() {
            return this.$store.state.userInfor.avatarUrl ? this.$store.state.userInfor.avatarUrl : require('../../../assets/mine_avatar_default.png')
        },
        nickName() {
            return this.$store.state.userInfor.nickName ? this.$store.state.userInfor.nickName : '用户昵称'
        },
        isAuthentication(){
            if(this.userIdentify.realnameStatus == 2){
                return true
            }
            if(this.userIdentify.realnameStatus == 3){
                return true
            }
        }
    },
    methods: {
        uploadHandler(e) {
            var that = this;
            var file = e.target.files[0];
            var formdata = new FormData();
            formdata.append("file", file)
            if (file) {
                if (file.size > 1024 * 1024 * 10) {
                    toast("图片大小最大不能超过1M")
                }
                else {
                    lrz(file, { width: 512, quality: 0.9 }, function (rst) {
                        that.avatarImg = rst.base64;
                        let sendData = {
                            picBase64Str: that.avatarImg
                        }
                        mine.upload(sendData).then(data => {
                            if (data.data.code == 200) {
                                let sendData = {
                                    avavtarUrl: data.data.data
                                }
                                mine.avatarUrl(sendData).then(data => {
                                    console.log(data)
                                    if (data.data.code == 200) {
                                        toast('头像更新成功')
                                    } else {
                                        toast(data.data.message)
                                    }
                                })
                            } else {
                                toast(data.data.message)
                            }
                        })
                    });
                }
            }
        },
        nickname() {
            console.log('nickname----')
            this.$router.push('/nickname')
        },
        loginpw() {
            console.log('loginpw')
            this.$router.push('/loginpw')
        },
        paypassword() {
            console.log('paypassword')
            if (this.isPaypassword) {
                this.$router.push('/oldpaypassword')
                return
            }
            this.$router.push('/paypassword')
        },
        authentication() {
            console.log('authentication')
            if(this.userIdentify.realnameStatus == 2){
                return 
            }
            if(this.userIdentify.realnameStatus == 3){
                return 
            }
            this.$router.push('/authentication')
        },
        logout() {
            console.log('logout')
            this.$router.push('/')
        }
    },
    mounted() {
        mine.getUserInforPost().then((data) => {
            if (data.data.data.userIdentify != 3) {
                this.isAuthentication = false
            }
            this.$store.dispatch('userInfor', data.data.data)
            this.userIdentify=data.data.data.userIdentify
            if(this.userIdentify.realnameStatus == 2){
                this.authenticationTitle='审核中'
            }
            if(this.userIdentify.realnameStatus == 3){
                 this.authenticationTitle=`${data.data.data.realName} (${data.data.data.idCard})`
            }
            this.avatarImg = this.$store.state.userInfor.avatarUrl ? this.$store.state.userInfor.avatarUrl : require('../../../assets/mine_avatar_default.png')
        }),
            mine.ispayPassword().then(data => {
                if (data.data.code != 200) {
                    this.isPaypassword = false
                }
            })
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
            .icon {
                display: inline-block;
                width: @imgWidth;
                height: @imgWidth;
                text-align: center;
                line-height: @imgWidth;
                overflow: hidden;
                border-radius: 50%;
                img {
                    width: @imgWidth;
                    height: @imgWidth;
                }
            }
            .arrow {
                width: @rightImgWidth;
                height: @rightImgHeight;
                margin-left: 0.26667rem;
            }
        }
        #avatarImg {
            position: absolute;
            left: -9999px;
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
