<template>
    <div class="authentication">
        <div class="from">
            <div class="list">
                <span>当前密码</span>
                <input type="password" maxlength="16" v-model="currenPw" placeholder='请输入当前密码' @keyup="isCleanCurrenPw">
                <img class="rIcon" v-show="iscurrenPw" src="../../../assets/icon_clean.png" alt="" @click="cleanCurrenPw">
            </div>
        </div>
        <div class="from">
            <div class="list">
                <span>登录密码</span>
                <input type="password" maxlength="16" v-model="newPw1" placeholder='请输入新密码' @keyup="isNewPw1Clean">
                <img class="rIcon" v-show="isnewPw1" src="../../../assets/icon_clean.png" alt="" @click="cleanNewPw1">
            </div>
            <div class="list">
                <span>确认密码</span>
                <input type="password" maxlength="16" v-model="newPw2" placeholder='确认密码' @keyup="isCleanNewPw2">
                <img class="rIcon" v-show="isnewPw2" src="../../../assets/icon_clean.png" alt="" @click="cleanNewPw2">
            </div>
        </div>
        <v-Button title='确定' :isActive='isActive' topNum='0.6667rem' @toNext='toConfirm'></v-Button>
    </div>
</template>

<script>

import Button from '@/components/buttons/Button690'
import WhiteToastButton1 from '@/components/WhiteToastButton1'
import mine from '@/api/mine/index'
import { toast, isPassWord } from '@/util/index'

export default {
    data() {
        return {
            currenPw: '',
            iscurrenPw: false,
            newPw1: '',
            isnewPw1: false,
            newPw2: '',
            isnewPw2: false,
            isActive: true,
            isShow: false,
        }
    },
    methods: {
        isCleanCurrenPw() {
            if (this.currenPw != '') {
                this.iscurrenPw = true
            } else {
                this.iscurrenPw = false
            }
        },
        cleanCurrenPw() {
            this.currenPw = ''
            this.iscurrenPw = false
        },
        isNewPw1Clean() {
            if (this.newPw1 != '') {
                this.isnewPw1 = true
            } else {
                this.isnewPw1 = false
            }
        },
        cleanNewPw1() {
            this.newPw1 = ''
            this.isnewPw1 = false
        },
        isCleanNewPw2() {
            if (this.newPw2 != '') {
                this.isnewPw2 = true
            } else {
                this.isnewPw2 = false
            }
        },
        cleanNewPw2() {
            this.newPw2 = ''
            this.isnewPw2 = false
        },
        toConfirm() {
            console.log('toConfirm')
            if (!isPassWord(this.currenPw)) {
                toast('请输入正确的当前密码')
                return
            }
            if (!isPassWord(this.newPw2) || this.newPw1 != this.newPw2) {
                toast('请输入2次正确的新密码')
                return
            }
            if (isPassWord(this.currenPw) && isPassWord(this.newPw2) && this.newPw1 == this.newPw2) {
                let encrypt = new JSEncrypt();
                encrypt.setPublicKey(this.$store.state.pubkey);
                let sendData = {
                    password: encrypt.encrypt(this.currenPw),
                    newPassword: encrypt.encrypt(this.newPw2),
                }
                mine.password(sendData).then(data => {
                    if (data.data.code == 200) {
                        toast('登录密码修改成功,请重新登录')
                        this.$router.push('/')
                        localStorage.clear()
                    } else {
                        toast(data.data.message)
                    }
                })
            }
        },
        // toastConfirm() {
        //     console.log('toastConfirm')
        //     this.isShow = false
        // }
    },
    beforeRouteEnter(to, from, next) {
        document.querySelector('title').innerText = '修改登录密码'
        next()
    },
    components: {
        'v-Button': Button,
        'v-WhiteToastButton1': WhiteToastButton1
    }
}
</script>
<style lang="less" scoped>
@import '../../../less/config.less';
.authentication {
    margin: 0.26667rem 0;
    padding: 0 @p30;
}

.from {
    border-radius: 0.08rem;
    background-color: #353641;
    margin-bottom: 0.26667rem;
}

.list {
    height: 1.30667rem;
    padding: 0 0.32rem;
    position: relative;
    font-size: @fontsize32;
    color: @color;
    border-bottom: 1px solid #191A22;
    span {
        display: inline-block;
        width: 1.8rem;
    }
    img {
        width: 0.42667rem;
        line-height: 1.1733rem;
        vertical-align: middle
    }
    .rIcon {
        position: absolute;
        right: 0.32rem;
        top: 0.45rem;
    }
    .rclean {
        position: absolute;
        top: 0.45rem;
        right: 1.28rem;
    }
    input {
        width: 5rem;
        color: @placeColor;
        line-height: 1.1733rem;
    }
    input::-webkit-input-placeholder {
        /* WebKit browsers*/
        color: @placeColor;
    }
    input::-moz-placeholder {
        /* Mozilla Firefox 4 to 18*/
        color: @placeColor;
    }
    input::-moz-placeholder {
        /* Mozilla Firefox 19+*/
        color: @placeColor;
    }
    input:-ms-input-placeholder {
        /* Internet Explorer 10+*/
        color: @placeColor;
    }
}
</style>
