<template>
    <div class="myBackWrap">
        <div class="listWrap">
            <div class="list" v-for="(bank,index) in bankLists" :key="index" :style="{backgroundColor:bank.state?'#578cce':'#ef6d74'}">
                <div class="bankInfor">
                    <img class="icon" :src="bank.bankSrc" alt="">
                    <div class="bankDetails">
                        <div class="name">{{bank.name}}</div>
                        <div class="type">{{bank.type}}</div>
                        <div class="code">
                            <span>{{bank.start}}</span>
                            <span>****</span>
                            <span>****</span>
                            <span>{{bank.end}}</span>
                        </div>
                    </div>
                </div>
                <div class="bankState">
                    <span class="stateButton" :class="{'review':!bank.state}" @click="deleteBank(bank)" v-text="bank.state?'删除':'审核中'"></span>
                </div>
            </div>
        </div>
        <div class="addBack"  @click="addBack">
            <label for="addBack">
                <img src="../../../assets/bank card_add.png" alt="">
                <br>
                <span>添加银行卡</span>
            </label>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            bankLists:[
                {
                    bankSrc:require('../../../assets/bank card_logo_CCB.png'),
                    name:'中国建设银行',
                    type:'储蓄卡',
                    start:'6222',
                    end:'3278',
                    state:true
                },
                 {
                    bankSrc:require('../../../assets/bank card_logo_MB.png'),
                    name:'招商银行',
                    type:'储蓄卡',
                    start:'6222',
                    end:'3278',
                    state:false
                },
                
            ]
        }
    },
    methods: {
        deleteBank(bank){
            console.log('deleteBank')
            console.log(bank)
            if(bank.state){
                console.log('删除')
            }else{
                console.log('审核中---------')
            }    

        },
        addBack() {
            console.log('addBack')
            this.$router.push('/addBack')
        }
    },
    beforeRouteEnter(to,from,next){
        document.querySelector('title').innerText='我的银行卡'
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
                    width: 1.12rem;
                    height: 1.12rem;
                    margin-right: 0.53333rem
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
                .review{
                    background-color: #f8cc00;
                    border: none;
                    color: #a98b10;
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
