<template>
    <div class="paypassword1">
        <div class="title" v-text="title"></div>
        <label for="paywordinput" v-show="isAgain">
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
        <label for="repatpaywordinput" v-show="!isAgain">
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
        <v-Button :title='titleText' :isActive='isActive' topNum='0.6667rem' @toNext='toNext'></v-Button>
    </div>
</template>

<script>
import login from '@/api/login/index'
import Button from '@/components/buttons/Button690'
import Toast from '@/components/Toast'
import { isPhone, isPassWord } from '@/util/index'
export default {
    data() {
        return {
            isAgain:true,
            // title: '请输入6位支付密码',
            payword: '',
            repatpayword: '',
            titleText: '确定',
            isActive: true
        }
    },
    computed:{
        title(){
            return this.isAgain?'请输入6位支付密码':'请再次输入支付密码'
        }
    },
    components: {
        'v-Button': Button,
        'v-Toast': Toast
    },
    methods: {
        toNext() {
            console.log('paypassword1')
            if (this.payword.length == 6) {
               this.isAgain=false
            }
        }
    },
    beforeRouteEnter(to, from, next) {
        document.querySelector('title').innerText = '设置支付密码'
        next()
    }
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
