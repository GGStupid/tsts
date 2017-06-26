<template>
    <div class="addBackWrap">
        <div class="tips">
            温馨提示：为确保资金安全，只能添加“招子*”的银行卡
        </div>
        <div class="form">
            <div class="list">
                <span>真实姓名</span>
                <input type="text" v-model="bankName" readonly>
            </div>
            <div class="list" @click="showBankLists">
                <span>开户银行</span>
                <input type="text" v-model="SelectBank" placeholder="请选择开户银行" readonly>
                <img class="rIcon" src="../../../assets/arrow_right.png" alt="">
            </div>
            <div class="list">
                <span>银行卡号</span>
                <input type="tel" v-model="bankNum" placeholder="请输入银行卡号">
            </div>
            <div class="list">
                <span>手机号码</span>
                <input type="tel" v-model="tel" maxlength="11" placeholder="请输入银行预留手机号">
            </div>
            <div class="list" style="marginTop:0.266667rem;height:3rem;paddingTop:0.4rem;">
                <span>证件照片</span>
                <label for="upBankImg">
                    <img :src="bankImg" alt="">
                    <br>
                    <span>银行卡正面（图片大小不大于1M）</span>
                </label>
                <input ref="upBankImg" id="upBankImg" type="file" accept="*.jpg,*.gif,*.png" @change="uploadHandler" />
            </div>
        </div>
        <div class="button">
            <v-Button title='提交审核' :isActive='isActive' topNum='0.6667rem' @toNext='toNext'></v-Button>
        </div>
    </div>
</template>

<script>

import Button from '@/components/buttons/Button690'
import { isPhone } from '@/util/index'
export default {
    data() {
        return {
            bankName: '招子*',
            bankNum: '',
            tel: '',
            bankImg: require('../../../assets/bank card_add_pic.png'),
            isActive: true
        }
    },
    computed: {
        SelectBank() {
            return this.$store.state.SelectBank
        }
    },
    components: {
        'v-Button': Button,
    },
    methods: {
        showBankLists() {
            console.log('showBankLists')
            this.$router.push('/selectBank')
        },
        uploadHandler(e) {
            var that = this;
            var file = e.target.files[0];
            if (file) {
                if (file.size > 1024 * 1024 * 10) {
                    console.log("图片大小最大不能超过10M")
                }
                else {
                    lrz(file, { width: 512, quality: 0.9 }, function (rst) {
                        that.bankImg = rst.base64;
                    });
                }
            }
        },
        toNext() {
            console.log('toNext---bankPerson')
        }
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
            input {
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
}
</style>
