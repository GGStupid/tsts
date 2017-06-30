<template>
    <div class="paypassword">
        <div class="phone">
            <span>手机号码</span>
            <span>{{mobilePhone}}</span>
        </div>
        <div class="form">
            <div class="list">
                <span>验证码</span>
                <input type="tel" maxlength="6" v-model='phoneCode' placeholder='请输入验证码'>
                <span @click='getphoneCode' v-text='phoneCodetitle' class="rIcon cdspan" :class="{unactive:iscount}"></span>
            </div>
        </div>
        <v-Button title='下一步' :isActive='isActive' topNum='0.6667rem' @toNext='toNext'></v-Button>
        <v-Toast msg="三大发射点发分身乏术打发打发三大发射点发分身乏术打发打发" :isToastShow='isToastShow'></v-Toast>
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
            phone: '13564654789',
            phoneCodetitle: '获取验证码',
            isphone: false,
            count: 60,
            iscount: false,
            phoneCode: '',
            isActive: true,
            isToastShow: false
        }
    },
    computed: {
        mobilePhone() {
            return this.$store.state.userInfor.mobilePhone
        }
    },
    components: {
        'v-Button': Button,
        'v-Toast': Toast
    },
    methods: {
        getphoneCode() {
            let sendData = {
                code: 'payPassword'
            }
            if (this.count != 60) {
                return false
            }
            mine.phoneCode(sendData).then(data => {
                if (data.data.code == 200) {
                    let timer = setInterval(() => {
                        this.iscount = true
                        this.count--
                        this.phoneCodetitle = `${this.count}s`
                        if (this.count == 0) {
                            clearInterval(timer)
                            this.phoneCodetitle = '重新获取验证码'
                            this.count = 60
                            this.iscount = false
                        }
                    }, 1000)
                    toast('手机验证码已发送请注意查收')
                } else {
                    toast(data.data.message)
                }
            })
        },
        toNext() {
            if (this.phoneCode.length == 6) {
                console.log('tonext')
                let sendData = {
                    phoneCode: this.phoneCode
                }
                mine.verifyPayPasswordCode(sendData).then(data => {
                    if (data.data.code == 200) {
                        this.$router.replace({ path: '/paypassword1' })
                        this.$store.dispatch('phoneCode', this.phoneCode)
                    } else {
                        toast(data.data.message)
                    }
                })
            }else{
                toast('请输入正确的验证码')
            }
        }
    },
    mounted() {
    mine.getUserInforPost().then((data) => {
      this.$store.dispatch('userInfor',data.data.data)   
    })
  },
}
</script>

<style lang="less" scoped>
@import '../../../less/config.less';
.paypassword {
    padding: 0 @p30;
    .form {
        border-radius: 0.08rem;
        background-color: #353641;
    }
    .phone {
        color: @placeColor;
        font-size: 0.37333rem;
        margin: 0.45333rem 0 0.4rem;
    }
    .list {
        height: 1.30667rem;
        padding: 0 0.32rem;
        position: relative;
        font-size: @fontsize32;
        color: @color;
        border-bottom: 1px solid #191A22;
        img {
            width: 0.42667rem;
            line-height: 1.1733rem;
            vertical-align: middle
        }
        .cdspan {
            color: @yellow;
            padding: 0 0 0 0.2667rem;
            text-align: center;
            border-left: 1px solid #191A22;
        }
        .unactive {
            color: @placeColor
        }
        .rIcon {
            position: absolute;
            right: 0.32rem;
            top: 0.44rem;
        }
        input {
            color: #ffffff;
            line-height: 1.1733rem;
            margin-left: 0.3rem;
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
}
</style>
