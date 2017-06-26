<template>
    <div class="myIssuerWrap">
        <v-IconTextArrow :icon="transactionRecordIcon" title="交割记录" @toNext="toTransactionRecord"></v-IconTextArrow>
        <div class="issuersWrap">
            <div class="title">
                <div class="left">
                    <span>名称</span>
                    <span>代码</span>
                    <span>时间总量</span>
                </div>
                <div class="right">
                    操作
                </div>
            </div>
            <div class="issuerList" v-for="(issuer,index) in issuersLists" :key="index">
                <div class="left">
                    <span>{{issuer.name}}</span>
                    <span>{{issuer.code}}</span>
                    <span>{{issuer.time}}秒</span>
                </div>
                <div class="right">
                    <span class="delivery" v-show="issuer.isDone" @click="delivery">
                        交割
                    </span>
                    <span v-show="!issuer.isDone">
                        - -
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import IconTextArrow from '@/components/mine/IconTextArrow'
import mine from '@/api/mine/index'
export default {
    data() {
        return {
            transactionRecordIcon: require('../../../assets/issuer_icon_record.png'),
            issuersLists: [
                // {
                //     name: '阿斗',
                //     code: '800001',
                //     time: 36046,
                //     isDone: false
                // },
                // {
                //     name: '阿斗',
                //     code: '800001',
                //     time: 36046,
                //     isDone: true
                // },
                // {
                //     name: '阿斗',
                //     code: '800001',
                //     time: 36046,
                //     isDone: false
                // },
                // {
                //     name: '阿斗',
                //     code: '800001',
                //     time: 36046,
                //     isDone: true
                // },
            ]
        }
    },
    methods: {
        toTransactionRecord() {
            console.log('toTransactionRecord')
            this.$router.push('/transactionRecord')
        },
        delivery(){
            console.log('delivery')
            this.$router.push('/delivery')
        }
    },
    mounted(){
        mine.positions().then(data=>{
            console.log(data)
            this.issuersLists=data.data.data.rows
        })
    },
    beforeRouteEnter(to,from,next){
        document.querySelector('title').innerText='我投资的发行人'
        next()
    },
    components: {
        'v-IconTextArrow': IconTextArrow
    }
}
</script>

<style lang="less" scoped>
@import '../../../less/config.less';
.myIssuerWrap {
    .issuersWrap {
        margin-top: 0.26667rem;
        color: @color;
        .title {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 1.06667rem;
            padding: 0 @p30;
            font-size: 0.32rem;
            background-color: @bgcolor;
            border-bottom: 1px solid @bordercolor;
            .left {
                flex: 1 1 7.3333rem;
                span {
                    display: inline-block;
                    width: 2rem;
                }
            }
            .right {
                flex: 0 0 1.86667rem;
                text-align: center;
            }
        }
        .issuerList {
            display: flex;
            justify-content: space-between;
            align-items: center;
            height: 1.6rem;
            padding: 0 @p30;
            font-size: 0.37333rem;
            background-color: @bgcolor;
            border-bottom: 1px solid @bordercolor;
            .left {
                flex: 1 1 7.3333rem;
                span {
                    display: inline-block;
                    width: 2rem;
                }
            }
            .right {
                flex: 0 0 1.86667rem;
                text-align: center;
                .delivery{
                    display: inline-block;
                    width: 1.86667rem;
                    height: 0.72rem;
                    line-height:0.72rem;
                    border-radius:0.08rem;
                    color: #000;
                    background-color: @yellow;
                }
            }
        }
    }
}
</style>

