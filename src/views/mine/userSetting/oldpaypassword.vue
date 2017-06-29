<template>
    <div class="oldpaypasswordWrap">
        <div class="title">请输入原支付密码，完成身份验证</div>
        <label for="paywordinput">
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
                <input type="tel" id="paywordinput" maxlength="6" v-model="payword">
            </div>
        </label>
        <div class="bottom">
            忘记密码，
            <router-link class="active" to="/paypassword">换种方式验证</router-link>
        </div>
        <v-Button :title='titleText' :isActive='isActive' topNum='0.6667rem' @toNext='toNext'></v-Button>
    </div>
</template>

<script>
import login from '@/api/login/index'
import Button from '@/components/buttons/Button690'
import Toast from '@/components/Toast'
import mine from '@/api/mine/index'
import { toast, isPhone, isPassWord } from '@/util/index'
export default {
    data() {
        return {
            payword: '',
            titleText: '确定',
            isActive: true
        }
    },
    computed: {
        title() {
            return this.isAgain ? '请输入6位支付密码' : '请再次输入支付密码'
        }
    },
    components: {
        'v-Button': Button,
        'v-Toast': Toast
    },
    methods: {
        toNext() {
            console.log('oldpaypasswordWrap')
            if (this.payword.length == 6) {
                let encrypt = new JSEncrypt();
                encrypt.setPublicKey(this.$store.state.pubkey);
                let sendData = {
                    payPassword:encrypt.encrypt(this.payword),
               }
                mine.verifyOldPayPassword(sendData).then(data=>{
                    if(data.data.code==200){
                        this.$store.dispatch('payPassword',encrypt.encrypt(this.payword))
                        this.$router.replace('/paypassword1')
                    }else{
                        toast(data.data.message)
                    }
                })
            }
        }
    },
    beforeRouteEnter(to, from, next) {
        document.querySelector('title').innerText = '重置支付密码'
        next()
    }
}
</script>

<style lang="less" scoped>
@import '../../../less/config.less';
.oldpaypasswordWrap {
    margin-top: 0.746667rem;
    padding: 0 @p30;
    color: @placeColor;
    font-size: 0.4266667rem;
    text-align: center;
    .title {
        margin-bottom: 0.53333rem;
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
    .bottom {
        margin-top: 0.5rem;
        .active {
            color: @yellow;
        }
    }
}
</style>
