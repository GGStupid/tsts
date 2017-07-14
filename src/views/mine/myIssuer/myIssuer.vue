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
                    <span>{{issuer.publisherName}}</span>
                    <span>{{issuer.publisherCode}}</span>
                    <span>{{issuer.availableQuantity}}秒</span>
                </div>
                <div class="right">
                    <span class="delivery" v-show="issuer.availableQuantity>issuer.deliveryLimit" @click="delivery(issuer)">
                        交割
                    </span>
                    <span v-show="!issuer.isDone">
                        - -
                    </span>
                </div>
            </div>
            <Nomore :isNomoreShow='isNomoreShow'></Nomore>
        </div>
    </div>
</template>

<script>
import IconTextArrow from '@/components/mine/IconTextArrow'
import Nomore from '@/components/Nomore'
import mine from '@/api/mine/index'
import { toast } from '@/util/index'
export default {
    data() {
        return {
             page: 1,
             rows: 12,
            transactionRecordIcon: require('../../../assets/issuer_icon_record.png'),
            issuersLists: [],
            isNomoreShow: false,
            loading:false
        }
    },
    methods: {
        loadPositions() {
      var that = this
      this.loading=true
      let sendData = {
        page: this.page,
        rows: this.rows
      }
      mine.positions(sendData).then(data => {
        if (data.data.code == 200) {
          this.loading=false
          if (!data.data.data.rows) return
          data.data.data.rows.forEach(function (element) {
            that.issuersLists.push(element)
          }, this);
          if (data.data.data.rows.length == 0) {
            this.isNomoreShow = true
            document.querySelector('#app').removeEventListener('scroll', that.handleScroll)
          }
          this.page++
        } else {
          toast(data.data.message)
        }
      })
    },
     handleScroll() {
      let scrollTop = Math.round(document.querySelector('#app').scrollTop)
      let pageHeight = Math.round(document.querySelector('#app').offsetHeight)
      let allHeight = Math.round(document.querySelector('.myIssuerWrap').scrollHeight);
      let a=allHeight-scrollTop-pageHeight
      if (a>=0 && a<=50){
        if(this.loading)return
        this.loadPositions();
      }
    },
        toTransactionRecord() {
            console.log('toTransactionRecord')
            this.$router.push('/transactionRecord')
        },
        delivery(issuer){
            console.log('delivery')
            console.log(issuer)
            this.$router.push('/delivery/'+issuer.id)
        }
    },
    mounted(){
        let that=this
        if (that.page === 1) {
      that.loadPositions();
      document.querySelector('#app').addEventListener('scroll', that.handleScroll);
    }
    },
    beforeRouteEnter(to,from,next){
        document.querySelector('title').innerText='我投资的发行人'
        next()
    },
    components: {
        'v-IconTextArrow': IconTextArrow,
         Nomore
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

