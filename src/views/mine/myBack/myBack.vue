<template>
    <div class="myBackWrap">
        <div class="listWrap">
            <div class="list" v-for="(bank,index) in bankLists" :key="index" :style="{backgroundColor:bank.status==2?'#578cce':'#ef6d74'}">
                <div class="bankInfor">
                    <span class="icon">
                        <img :src="baseImgUrl+bank.bankPicUrl" alt="">
                    </span>
                    <div class="bankDetails">
                        <div class="name">{{bank.bankName}}</div>
                        <div class="type"></div>
                        <div class="code">
                            <span>{{bank.bankNo | bankStart}}</span>
                            <span>****</span>
                            <span>****</span>
                            <span>{{bank.bankNo | bankEnd}}</span>
                        </div>
                    </div>
                </div>
                <div class="bankState">
                    <!-- <span class="stateButton" :class="{'review':bank.status!=2}" @click="deleteBank(bank)">{{bank.status==2?'删除':'审核中'}}</span> -->
                    <span v-if="bank.status==1" class="stateButton" :class="{'review':bank.status==1}" @click="deleteBank(bank)">审核中</span>
                    <span v-if="bank.status==2" class="stateButton" @click="deleteBank(bank)">删除</span>
                    <span v-if="bank.status==3" class="stateButton" :class="{'review':bank.status==3}" @click="deleteBank(bank)">未通过</span>
                </div>
            </div>
        </div>
        <div class="addBack" v-show="add" @click="addBack">
            <label for="addBack">
                <img src="../../../assets/bank card_add.png" alt="">
                <br>
                <span>添加银行卡</span>
            </label>
        </div>
    </div>
</template>

<script>
import mine from '@/api/mine/index'
import { toast } from '@/util/index'
export default {
    data() {
        return {
            baseImgUrl: this.$store.state.baseImgUrl,
            add: '',
            bankFailCount: '',
            auto: '',
            bankLists: []
        }
    },
    methods: {
        deleteBank(bank) {
            console.log('deleteBank')
            console.log(bank)
            if (bank.status == 2 || bank.status==3) {
                console.log('删除')
                let sendData = {
                    id: bank.id
                }
                mine.delBank(sendData).then(data => {
                    console.log(data)
                    if (data.data.code == 200) {
                        toast('删除银行卡成功')
                        mine.userBank().then(data => {
                            console.log(data.data)
                            this.bankLists=data.data.data
                        })
                    } else {
                        toast(data.data.data.message)
                    }
                })
            } else {
                console.log('审核中---------')
                return
            }
        },
        addBack() {
            console.log('addBack')
            if (this.auto == 1) {
                this.$router.replace('/addBackByPerson')
                return
            }
            this.$router.replace('/addBack')
        }
    },
    filters: {
        bankStart(el) {
            return el.substr(0, 4)
        },
        bankEnd(el) {
            return el.substr(-4)
        },
    },
    mounted() {
        mine.userBank().then(data => {
            this.bankLists=data.data.data
        })
        mine.verifyBank().then((data) => {
            this.add = data.data.data.add
            this.bankFailCount = data.data.data.bankFailCount
            this.auto = data.data.data.auto
        })
    },
    beforeRouteEnter(to, from, next) {
        document.querySelector('title').innerText = '我的银行卡'
        next()
    }
}
</script>

<style lang="less" scoped>
@import '../../../less/config.less';
.myBackWrap {
    padding: 0 @p30;
    .listWrap {
        padding-top: @p30;
        .list {
            width: 9.2rem;
            height: 3.2rem;
            margin-bottom: @p30;
            background-color: #578cce;
            border-radius: 0.2667rem;
            color: #fff;
            font-size: 0.48rem;
            padding: 0.53333rem;
            display: flex;
            justify-content: space-between;
            .bankInfor {
                display: flex;
                justify-content: space-between;
                .icon {
                    display: inline-block;
                    width: 1.12rem;
                    height: 1.12rem;
                    border-radius: 50%;
                    overflow: hidden;
                    text-align: center;
                    line-height: 1.12rem;
                    margin-right: 0.53333rem;
                    img {
                        width: 1.12rem;
                        height: 1.12rem;
                    }
                }
                .bankDetails {
                    .type {
                        font-size: 0.32rem;
                        margin: 0.21333rem 0 0.64rem;
                    }
                }
            }
            .bankState {
                .stateButton {
                    display: inline-block;
                    width: 1.6rem;
                    height: 0.66667rem;
                    line-height: 0.66667rem;
                    text-align: center;
                    font-size: 0.37333rem;
                    border: solid 0.026667rem #fff;
                    border-radius: 0.53333rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .review {
                    background-color: #f8cc00;
                    border: none;
                    color: #a98b10;
                }
                .unreview{
                    background-color: #f8cc00;
                    border: none;
                    color: #a98b10;
                    width: 2.5rem;
                }
            }
        }
    }
    .addBack {
        width: 9.2rem;
        height: 3.2rem;
        background-color: #191922;
        color: #999;
        font-size: 0.48rem;
        border: dotted 0.026667rem #333;
        border-radius: 0.2667rem;
        text-align: center;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
            width: 0.8rem;
            height: 0.8rem;
        }
    }
}
</style>
