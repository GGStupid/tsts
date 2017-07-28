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
            <div class="list" style="marginTop:0.266667rem;height:3rem;paddingTop:0.4rem;">
                <span>证件照片</span>
                <label for="upBankImg">
                    <img :src="bankImg" alt="">
                    <br>
                    <span>银行卡正面（图片大小不大于5M）</span>
                </label>
                <input ref="upBankImg" id="upBankImg" type="file" accept="*.jpg,*.gif,*.png" @change="uploadHandler">
            </div>
        </div>
        <div class="button">
            <v-Button title='提交审核' :isActive='isActive' topNum='0.6667rem' @toNext='toNext'></v-Button>
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
            baseImgUrl: this.$store.state.baseImgUrl,
            bankCode: '',
            bankName: '请选择开户银行',
            bankNo: '',
            mobilePhone: '',
            bankImg: require('../../../assets/bank card_add_pic.png'),
            bankPicUrl: '',
            isActive: true,
            isSelectBanks: false,
            bankLists: []
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
    components: {
        'v-Button': Button,
        'v-WhiteToastButton1': WhiteToastButton1
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

        uploadHandler(e) {
            var that = this;
            var file = e.target.files[0];
            if (file) {
                if (file.size > 1024 * 1024 * 5) {
                    console.log("图片大小最大不能超过5M")
                }
                else {
                    lrz(file, { width: 512, quality: 0.9 }, function (rst) {
                        that.bankImg = rst.base64;
                        let sendData = {
                            picBase64Str: that.bankImg
                        }
                        mine.upload(sendData).then(data => {
                            if (data.data.code == 200) {
                                that.bankPicUrl = data.data.data
                            } else {
                                toast(data.data.message)
                            }
                        })
                    });
                }
            }
        },
        toNext() {
            console.log('toNext---bankPerson')
            if (!isBankNumber(this.bankNo)) return toast('请输入正确的银行卡号')
            if (!isPhone(this.mobilePhone)) return toast('请输入正确的手机号')
            if (!this.bankCode) return toast('请选择银行类型')
            if (!this.bankPicUrl) return toast('请上传银行卡照片')
            // if (this.bankNo.length > 16 && isPhone(this.mobilePhone) && this.bankCode && this.bankName && this.bankPicUrl) {
            let senddata = {
                bankCode: this.bankCode,
                bankName: this.bankName,
                bankNo: this.bankNo,
                mobilePhone: this.mobilePhone,
                bankPicUrl: this.bankPicUrl
            }
            mine.bank(senddata).then((data) => {
                if (data.data.code == 200) {
                    this.realFailCount = data.data.data
                    this.isShow = true
                    this.msg = data.data.message
                } else {
                    this.realFailCount = data.data.data
                    this.isShow = true
                    this.msg = data.data.message
                    // toast(data.data.message)
                }
            })

        },
        toastConfirm() {
            console.log('toastConfirm')
            this.$router.go(-1)
        }
    },
    mounted() {
        mine.getUserInforPost().then((data) => {
            this.$store.dispatch('userInfor', data.data.data)
        }),
            mine.bankList().then(data => {
                this.bankLists = data.data.data
            })
    },
    beforeRouteEnter(to, from, next) {
        document.querySelector('title').innerText = '添加银行卡-人工审核'
        next()
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
            label {
                position: absolute;
                left: 3rem;
                color: @placeColor;
                font-size: 0.373333rem;
                img {
                    width: 1.6rem;
                    height: 1.6rem;
                    margin-bottom: 0.3466667rem;
                }
            }
            #upBankImg {
                position: absolute;
                left: -9999px;
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
