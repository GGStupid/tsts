<template>
    <div class="paypassword1">
        <div class="title" v-text="title"></div>
        <label for="paywordinput" v-show="!isAgain">
            <div class="pwWrap">
                <div class="payWord">
                    <span v-show="payword.length>=1"></span>
                </div>
                <div class="payWord">
                    <span v-show="payword.length>=2"></span>
                </div>
                <div class="payWord">
                    <span v-show="payword.length>=3"></span>
                </div>
                <div class="payWord">
                    <span v-show="payword.length>=4"></span>
                </div>
                <div class="payWord">
                    <span v-show="payword.length>=5"></span>
                </div>
                <div class="payWord">
                    <span v-show="payword.length>=6"></span>
                </div>
                <input type="tel" autofocus="autofocus" id="paywordinput" maxlength="6" v-model="payword">
            </div>
        </label>
        <label for="repatpaywordinput" v-show="isAgain">
            <div class="repatWrap">
                <div class="repatpayword">
                    <span v-show="repatpayword.length>=1"></span>
                </div>
                <div class="repatpayword">
                    <span v-show="repatpayword.length>=2"></span>
                </div>
                <div class="repatpayword">
                    <span v-show="repatpayword.length>=3"></span>
                </div>
                <div class="repatpayword">
                    <span v-show="repatpayword.length>=4"></span>
                </div>
                <div class="repatpayword">
                    <span v-show="repatpayword.length>=5"></span>
                </div>
                <div class="repatpayword">
                    <span v-show="repatpayword.length>=6"></span>
                </div>
                <input type="tel" id="repatpaywordinput" maxlength="6" v-model="repatpayword">
            </div>
        </label>
        <!--<v-Button :title='titleText' :isActive='isActive' topNum='0.6667rem' @toNext='toNext'></v-Button>-->
    </div>
</template>

<script>
import mine from '@/api/mine/index'
import Button from '@/components/buttons/Button690'
import Toast from '@/components/Toast'
import { toast, isPhone, isPassWord } from '@/util/index'
export default {
    data() {
        return {
            isOldPayType: false,
            isAgain: false,
            // title: '请输入6位支付密码',
            payword: '',
            repatpayword: '',
            titleText: '确定',
            isActive: true
        }
    },
    computed: {
        title() {
            return this.isAgain ? '请再次输入支付密码' : '请输入6位支付密码'
        }
    },
    watch: {
        payword: `change`,
        repatpayword:`toNext`
    },
    methods: {
        change() {
            if (this.payword.length == 6) {
                this.isAgain = true
            }
        },
        toNext() {
            console.log('paypassword1')
            if (this.repatpayword.length == 6 && this.repatpayword == this.payword) {
                let encrypt = new JSEncrypt();
                encrypt.setPublicKey(this.$store.state.pubkey);
                let sendData;
                if (this.isOldPayType) {
                    sendData = {
                        newPayPassword: encrypt.encrypt(this.repatpayword),
                        payPassword: this.$store.state.payPassword,
                    }
                    mine.oldPayPassword(sendData).then(data => {
                        if (data.data.code == 200) {
                            toast('支付密码设置成功')
                            this.$router.replace('/userSetting')
                        } else {
                            toast(data.data.message)
                        }
                    })
                } else {
                    sendData = {
                        phoneCode: this.$store.state.phoneCode,
                        payPassword: encrypt.encrypt(this.repatpayword),
                    }
                    mine.payPassword(sendData).then(data => {
                        if (data.data.code == 200) {
                            toast('支付密码设置成功')
                            this.$router.replace('/userSetting')
                        } else {
                            toast(data.data.message)
                        }
                    })
                }
            }
             if (this.repatpayword.length == 6 && this.repatpayword != this.payword){
                 toast('请输入2次一样的密码')
                 setTimeout(()=>{
                     this.$router.go(-1)
                 },2000)
             }
        }
    },
    beforeRouteEnter(to, from, next) {
        document.querySelector('title').innerText = '设置支付密码'
        next(vm => {
            if (from.path == '/oldpaypassword') {
                vm.isOldPayType = true
            } else {
                vm.isOldPayType = false
            }
        })
    },
    components: {
        'v-Button': Button,
        'v-Toast': Toast
    },
}
</script>

<style lang="less" scoped>
@import '../../../less/config.less';
.paypassword1 {
    margin-top: 0.746667rem;
    padding: 0 @p30;
    color: @placeColor;
    font-size: 0.4266667rem;
    text-align: center;
    .title {
        margin-bottom: 0.93333rem;
    }
    .pwWrap {
        display: flex;
        justify-content: space-between;
        border: 0.026667rem solid #333333;
        height: 1.253333rem;
        position: relative;
        .payWord {
            border-right: 0.026667rem solid #333333;
            flex: 1 1 1.53333rem;
            display: flex;
            justify-content: center;
            align-items: center;
            span {
                display: inline-block;
                width: 0.18666rem;
                height: 0.18666rem;
                border-radius: 50%;
                background-color: #eee;
            }
        }
        #paywordinput {
            position: absolute;
            left: -9999px;
        }
    }

    .repatWrap {
        display: flex;
        justify-content: space-between;
        border: 0.026667rem solid #333333;
        height: 1.253333rem;
        position: relative;
        .repatpayword {
            border-right: 0.026667rem solid #333333;
            flex: 1 1 1.53333rem;
            display: flex;
            justify-content: center;
            align-items: center;
            span {
                display: inline-block;
                width: 0.18666rem;
                height: 0.18666rem;
                border-radius: 50%;
                background-color: #eee;
            }
        }
        #repatpaywordinput {
            position: absolute;
            left: -9999px;
        }
    }
}
</style>
