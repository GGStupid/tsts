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
        <div class="from" v-show="realNameFailCount">
            <label for="cardOppositePic">
                <div class="upimg">
                    <img :src="cardOppositeUp" alt="">
                    <br>
                    <span>上传身份证正面（图片大小不大于1M）</span>
                </div>
            </label>
            <input ref="cardOppositePic" id="cardOppositePic" type="file" accept="*.jpg,*.gif,*.png" @change="uploadcardOppositePicHandler" >
        </div>
        <div class="from" v-show="realNameFailCount">
            <label for="cardPositivePic">
                <div class="upimg">
                    <img :src="cardPositiveUp" alt="">
                    <br>
                    <span>上传身份证反面（图片大小不大于1M）</span>
                </div>
            </label>
            <input ref="cardPositivePic" id="cardPositivePic" type="file" accept="*.jpg,*.gif,*.png" @change="uploadcardPositivePicHandler" >
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
            realFailCount: 0,
            isUpImg: false,
            cardOppositePic: '',
            cardOppositeUp: require('../../../assets/bank card_add_pic.png'),
            cardPositivePic: '',
            cardPositiveUp: require('../../../assets/bank card_add_pic.png'),
            isActive: true,
        }
    },
    computed: {
        realNameFailCount() {
            return this.realFailCount >= 3
        },
        buttonTitle() {
            return this.realNameFailCount ? '提交审核' : '确定'
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
        uploadcardOppositePicHandler(e) {
            var that = this;
            var file = e.target.files[0];
            var formdata = new FormData();
            formdata.append("file", file)
            if (file) {
                if (file.size > 1024 * 1024 * 1) {
                    toast("图片大小最大不能超过1M")
                }
                else {
                    lrz(file, { width: 512, quality: 0.9 }, function (rst) {
                        that.cardOppositeUp = rst.base64;
                        let sendData = {
                            picBase64Str: that.cardOppositeUp
                        }
                        mine.upload(sendData).then(data => {
                            if (data.data.code == 200) {
                                that.cardOppositePic = data.data.data
                            } else {
                                toast(data.data.message)
                            }
                        })
                    });
                }
            }
        },
        uploadcardPositivePicHandler(e) {
            var that = this;
            var file = e.target.files[0];
            var formdata = new FormData();
            formdata.append("file", file)
            if (file) {
                if (file.size > 1024 * 1024 * 1) {
                    toast("图片大小最大不能超过1M")
                }
                else {
                    lrz(file, { width: 512, quality: 0.9 }, function (rst) {
                        that.cardPositiveUp = rst.base64;
                        let sendData = {
                            picBase64Str: that.cardPositiveUp
                        }
                        mine.upload(sendData).then(data => {
                            if (data.data.code == 200) {
                                that.cardPositivePic = data.data.data
                            } else {
                                toast(data.data.message)
                            }
                        })
                    });
                }
            }
        },
        toConfirm() {
            console.log('toConfirm')
            if (this.realFailCount >= 3) {
                if (isRealName(this.name) && isIdCard(this.cardId) && this.cardOppositePic && this.cardPositivePic) {
                    let senddata = {
                        realName: this.name,
                        idCard: this.cardId,
                        cardOppositePic: this.cardOppositePic,
                        cardPositivePic: this.cardPositivePic
                    }
                    mine.userVerified(senddata).then((data) => {
                        if (data.data.code == 200) {
                            this.realFailCount = 4
                            this.isShow = true
                            this.msg = data.data.message
                        } else {
                            this.realFailCount = data.data.data
                            this.isShow = true
                            this.msg = data.data.message
                            // toast(data.data.message)
                        }
                    })
                }else{
                    toast('请输入正确的姓名和身份证号并上传身份证照片')
                }
            } else {
                if (isRealName(this.name) && isIdCard(this.cardId)) {
                    let senddata = {
                        realName: this.name,
                        idCard: this.cardId,
                        cardOppositePic: this.cardOppositePic,
                        cardPositivePic: this.cardPositivePic
                    }
                    mine.userVerified(senddata).then((data) => {
                        if (data.data.code == 200) {
                            this.realFailCount = 4
                            this.isShow = true
                            this.msg = data.data.message
                        } else {
                            this.realFailCount = data.data.data
                            this.isShow = true
                            this.msg = data.data.message
                            // toast(data.data.message)
                        }
                    })
                }else{
                    toast('请输入正确的姓名和身份证号')
                }
            }

        },
        toastConfirm() {
            console.log('toastConfirm')
            if (this.realFailCount <= 3) {
                this.isShow = false
                return
            } else {
                this.$router.go(-1)
            }
        }
    },
    mounted() {
        mine.getUserInforPost().then((data) => {
            this.realFailCount = data.data.data.realNameFailCount
        })
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
    #cardOppositePic {
        position: absolute;
        left: -9999px;
    }
    #cardPositivePic {
        position: absolute;
        left: -9999px;
    }
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
        height: 2.1333rem;
    }
}
</style>
