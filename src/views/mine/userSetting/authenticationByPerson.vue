<template>
    <div class="authentication">
        <v-WhiteToastButton1 :isShow="isShow" :msg="msg" @toastConfirm="toastConfirm"></v-WhiteToastButton1>
        <div class="from">
            <div class="list">
                <span>真实姓名</span>
                <input type="text" maxlength="30" v-model="name" placeholder='请输入您的真实姓名' @keyup="isNameClean">
                <img class="rIcon" v-show="isname" src="../../../assets/icon_clean.png" alt="" @click="cleanName">
            </div>
            <div class="list">
                <span>身份证号</span>
                <input type="tel" maxlength="18" v-model="cardId" placeholder='请输入您的身份证号码' @keyup="isCardIdClean">
                <img class="rIcon" v-show="isCardId" src="../../../assets/icon_clean.png" alt="" @click="cleanCardId">
            </div>
        </div>
        <div class="from" v-show="above3">
            <div class="upimg">
                <img src="../../../assets/bank card_add_pic.png" alt="">
                <br>
                <span>上传身份证正面（图片大小不大于10M）</span>
            </div>
        </div>
        <div class="from" v-show="above3">
            <div class="upimg">
                <img src="../../../assets/bank card_add_pic.png" alt="">
                <br>
                <span>上传身份证反面（图片大小不大于10M）</span>
            </div>
        </div>
        <v-Button :title='buttonTitle' :isActive='isActive' topNum='0.6667rem' @toNext='toConfirm'></v-Button>
    </div>
</template>

<script>

import Button from '@/components/buttons/Button690'
import WhiteToastButton1 from '@/components/WhiteToastButton1'
import mine from '@/api/mine/index'
import { toast, isRealName, isIdCard } from '@/util/index'

export default {
    data() {
        return {
            isShow: false,
            msg: '',
            name: '',
            isname: false,
            cardId: '',
            isCardId: false,
            above3: false,
            isActive: true,
            buttonTitle: '确定'
        }
    },
    methods: {
        isNameClean() {
            if (this.name != '') {
                this.isname = true
            } else {
                this.isname = false
            }
        },
        cleanName() {
            this.name = ''
            this.isname = false
        },
        isCardIdClean() {
            if (this.cardId != '') {
                this.isCardId = true
            } else {
                this.isCardId = false
            }
        },
        cleanCardId() {
            this.cardId = ''
            this.isCardId = false
        },
        toConfirm() {
            console.log('toConfirm')
            if (isRealName(this.name) && isIdCard(this.cardId)) {
                let senddata = {
                    realName: this.name,
                    idCard: this.cardId
                }
                mine.userVerified(senddata).then((data) => {
                    if (data.data.code == 200) {
                        this.isShow = true
                        this.msg = data.data.message
                    } else {
                        this.isShow = true
                        this.msg = data.data.message
                        // toast(data.data.message)
                    }
                })
            }
        },
        toastConfirm() {
            console.log('toastConfirm')
            this.isShow = false
        }
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

.upimg {
    height: 4.4rem;
    color: @placeColor;
    text-align: center;
    font-size: 0.37333rem;
    img {
        margin: 0.64rem @m50;
    }
}
</style>
