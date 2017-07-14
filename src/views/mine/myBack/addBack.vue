<template>
    <div class="addBackWrap">
        <v-WhiteToastButton1 :isShow="isShow" :msg="msg" @toastConfirm="toastConfirm"></v-WhiteToastButton1>
        <div class="tips">
            温馨提示：为确保资金安全，只能添加"{{realName}}"的银行卡
        </div>
        <div class="form">
            <div class="list">
                <span>真实姓名</span>
                <input type="text" v-model="realName" readonly>
            </div>
            <div class="list" @click="showBankLists">
                <span>开户银行</span>
                <span class="bankName" :class="{'activeColor':activeColor}">{{bankName}}</span>
                <img class="rIcon" src="../../../assets/arrow_right.png" alt="">
            </div>
            <div class="list">
                <span>银行卡号</span>
                <input type="tel" maxlength="20" v-model="bankNo" placeholder="请输入银行卡号">
            </div>
            <div class="list">
                <span>手机号码</span>
                <input type="tel" v-model="mobilePhone" maxlength="11" placeholder="请输入银行预留手机号">
            </div>
            <div class="list">
                <span>验证码&nbsp;&nbsp;&nbsp;&nbsp;</span>
                <input type="tel" maxlength="6" v-model='phoneCode' placeholder='请输入验证码'>
                <span @click='getphoneCode' v-text='phoneCodetitle' class="rIcon cdspan" :class="{unactive:iscount}"></span>
            </div>
        </div>
        <div class="button">
            <v-Button title='确定' :isActive='isActive' topNum='0.6667rem' @toNext='toNext'></v-Button>
        </div>
        <div class="selectBankWrap" v-show="isSelectBanks">
            <div class="list" @click="toSelect(bank)" v-for="(bank,index) in bankLists" :key="index">
                <img class="icon" :src="baseImgUrl+bank.icon" alt="">
                <span>{{bank.name}}</span>
                <img class="rIcon" v-show="bankName==bank.name" src="../../../assets/pay_select_s.png" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import mine from '@/api/mine/index'
import Button from '@/components/buttons/Button690'
import WhiteToastButton1 from '@/components/WhiteToastButton1'
import { toast, isBankNumber, isPhone } from '@/util/index'
export default {
    data() {
        return {
            isShow: false,
            msg: '',
            realFailCount: 0,
            baseImgUrl: this.$store.state.baseImgUrl,
            bankCode: '',
            bankName: '请选择开户银行',
            bankNo: '',
            mobilePhone: '',
            phoneCode: '',
            phoneCodetitle: '获取验证码',
            count: 60,
            iscount: false,
            isActive: true,
            isSelectBanks: false,
            bankLists: [],
            add: '',
            bankFailCount: '',
            auto: ''
        }
    },
    computed: {
        realName() {
            return this.$store.state.userInfor.realName
        },
        activeColor() {
            return this.bankName != '请选择开户银行'
        }
    },
    methods: {
        showBankLists() {
            console.log('showBankLists')
            // this.$router.push('/selectBank')
            this.isSelectBanks = true
            document.querySelector('title').innerText = '选择支付银行'
        },
        toSelect(bank) {
            this.bankCode = bank.insideCode
            this.bankName = bank.name
            this.isSelectBanks = false
            document.querySelector('title').innerText = '添加银行卡'
        },
        getphoneCode() {
            if (isPhone(this.mobilePhone)) {
                let sendData = {
                    code: 'userBank'
                }
                if (this.count != 60) {
                    return false
                }
                mine.phoneCode(sendData).then(data => {
                    if (data.data.code == 200) {
                        toast('手机验证码已发送请注意查收')
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
                    } else {
                        toast(data.data.message)
                    }
                })
            } else {
                toast('请输入正确的手机号')
            }
        },
        toNext() {
            console.log('toNext---bank')
            if (this.bankNo.length < 16 || this.bankNo.length > 30) return toast('请输入正确的银行卡号')
            if (!isPhone(this.mobilePhone)) return toast('请输入正确的手机号')
            if (!this.bankCode) return toast('请选择银行类型')
            if (this.phoneCode.length != 6) return toast('请输入验证码')
            let senddata = {
                bankCode: this.bankCode,
                bankName: this.bankName,
                bankNo: this.bankNo,
                mobilePhone: this.mobilePhone,
                phoneCode: this.phoneCode
            }
            mine.bank(senddata).then((data) => {
                if (data.data.code == 200) {
                    this.auto = data.data.data
                    this.isShow = true
                    this.msg = data.data.message
                } else {
                    this.auto = data.data.data
                    this.isShow = true
                    this.msg = data.data.message
                    // toast(data.data.message)
                }
            })
        },
        toastConfirm() {
            console.log('toastConfirm')
            if (this.auto == 0) {
                this.isShow = false
                return
            } else {
                this.$router.replace('/addBackByPerson')
            }
        }
    },
    mounted() {
        mine.getUserInforPost().then((data) => {
            this.$store.dispatch('userInfor', data.data.data)
        }),
            mine.verifyBank().then((data) => {
                this.add = data.data.data.add
                this.bankFailCount = data.data.data.bankFailCount
                this.auto = data.data.data.auto
            })
        mine.bankList().then(data => {
            this.bankLists = data.data.data
        })
    },
    beforeRouteEnter(to, from, next) {
        document.querySelector('title').innerText = '添加银行卡'
        next()
    },
    components: {
        'v-Button': Button,
        'v-WhiteToastButton1': WhiteToastButton1
    },
}
</script>

<style lang="less" scoped>
@import '../../../less/config.less';
.addBackWrap {
    .tips {
        color: @yellow;
        padding: @p30;
        font-size: 0.32rem;
    }
    .form {
        .list {
            height: 1.30667rem;
            padding: 0 0.32rem;
            position: relative;
            font-size: @fontsize32;
            color: @color;
            background-color: @bgcolor;
            border-bottom: 1px solid #191A22;
            img {
                width: 0.16rem;
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
            .bankName {
                display: inline-block;
                color: #999999;
                height: 1.30667rem;
                line-height: 1.30667rem;
                margin-left: 1.06667rem;
            }
            .activeColor {
                color: #ffffff;
            }
            input {
                width: 5.5rem;
                color: #ffffff;
                line-height: 1.1733rem;
                margin-left: 1.06667rem;
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
    .button {
        padding: 0 @p30;
    }
    .selectBankWrap {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        z-index: 10;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        width: 100%;
        height: 100%;
        .list {
            height: 1.30667rem;
            line-height: 1.30667rem;
            padding: 0 @p30;
            font-size: @fontsize32;
            color: @color;
            background-color: @bgcolor;
            position: relative;
            border-bottom: 1px solid #191A22;
            .icon {
                position: absolute;
                top: 0.3rem;
                width: 0.64rem;
            }
            span {
                margin-left: 1rem;
            }
            .rIcon {
                width: 0.48rem;
                position: absolute;
                right: 0.32rem;
                top: 0.44rem;
            }
        }
    }
}
</style>
