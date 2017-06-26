<template>
    <div class="toastWrapButton1" v-show="bankListShow">
        <div class="mask">
        </div>
        <div class="whiteToast">
            <div class="title">
                选择我的银行卡
            </div>
            <div class="list" v-for="(bank,index) in banks" :key="index" @click="selectBank(bank)">
                <div class="bankinfor">
                    <img :src="bank.bankPicUrl" alt="">
                    <div class="bank">
                        <div>{{bank.bankName}}</div>
                        <span>****</span>
                        <span>****</span>
                        <span>****&nbsp;{{bank.bankNo | bankEnd}}</span>
                    </div>
                </div>
                <div class="select" v-show="selectBankName==bank.bankName">
                    <img src="../../assets/select card_s.png" alt="">
                </div>
            </div>
            <div class="list" v-if="banks.length<3" @click="addBank">
                <div class="bankinfor">
                    <img src="../../assets/select card_add.png" alt="">
                    <div class="bank">
                        添加银行卡
                    </div>
                </div>
            </div>
            <div class="buttons" @click="cancelLists">
                取消
            </div>
        </div>
    </div>
</template>

<script>
// bankPicUrl 银行图标  bankName 银行名 bankNo 银行卡号
export default {
    data() {
        return {
            selectBankName: ''
        }
    },
    props: {
        bankListShow: {
            type: Boolean
        },
        banks: {
            type: Array
        }
    },
    methods: {
        selectBank(bank) {
            this.$emit('selectBank', bank)
            this.selectBankName = bank.bankName
            this.$emit('cancelLists')
        },
        cancelLists() {
            this.$emit('cancelLists')
        },
        addBank(){
            console.log('addBank')
            this.$router.push('/myBack')
        }
    },
    filters:{
        bankEnd(id){
           return id?id.slice(-4):''
        }
    }
}
</script>

<style lang="less" scoped>
@msgColor: #333;
@buttonColor: #007aff;
@buttonsHeight: 1.2rem;
@fontSize: 0.45333rem;
@borderColor: #ddd;
@borderRadius: 0.32rem;
.mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    height: 100%;
    width: 100%;
    background-color: #000;
    opacity: 0.5;
}

.whiteToast {
    width: 7.2rem;
    position: fixed;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -40%);
    z-index: 1000;
    background-color: #fff;
    font-size: @fontSize;
    border-radius: @borderRadius;
    .title {
        height: 1.36rem;
        line-height: 1.36rem;
        text-align: center;
        color: #333;
        border-bottom: 1px solid @borderColor;
    }
    .list {
        height: 1.78666rem;
        padding-right: 0.4rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid @borderColor;

        text-align: center;
        .bankinfor {
            display: flex;
            justify-content: space-between;
            align-items: center;
            text-align: left;
            img {
                width: 0.64rem;
                margin: 0 0.45333rem;
            }
            .bank {
                span {
                    font-size: 0.32rem;
                }
            }
        }
    }
    .buttons {
        height: @buttonsHeight;
        line-height: @buttonsHeight;
        color: @buttonColor;
        font-size: @fontSize;
        text-align: center;
    }
}
</style>
