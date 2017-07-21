<template>
  <div class="buyWrap">
    <OrderConfirm :isShow='isOrderConfirm' :orderType='orderType' :msg='msg' :price='price' :number='number' :sum='sum' :agree='agree' @isAgree='isAgree' :leftText="leftText" @toastLeft="toastLeft" :rightText='rightText' @toastRight='toastRight'></OrderConfirm>
    <DealPayToast :isShow="isPayToast" :number='number' :price='price' :productId='productId' @isPayToastHide='isPayToastHide' @cancelToast='cancelToast'></DealPayToast>
    <div class="buyBoxWrap">
      <div class="left">
        <div class="inputBOx">
          <input type="text" placeholder="发行人姓名/代码" :class="{'active':searchName.length>0}" v-model="searchName" @focus="focus" @keyup="search(searchName)">
          <div class="searchLists" v-show="searchLists.length>0">
            <div class="listItem" v-for="(item,index) in searchLists" :key="index" @click="selectCode(item)">
              <span class="listName">{{item.name}}</span>
              <div class="listCode" v-html="formatCode(item.code)"></div>
            </div>
          </div>
        </div>
        <div class="aboutBox">
          <span class="button" @click="reducePrices">-</span>
          <span>{{pricesNum}}</span>
          <span class="button" @click="addPrices">+</span>
        </div>
        <div class="bottomTips">
          <span class="tipleft" v-html="topStopPrice"></span>
          <span class="tipleft" v-html="bottomStopPrice"></span>
        </div>
        <div class="aboutBox">
          <span class="button" @click="reduceTimes">-</span>
          <input type="tel" v-model="timeNum" placeholder="购买时间(秒)" @keyup="enterTime">
          <span class="button" @click="addTimes">+</span>
        </div>
        <div class="bottomTips">
          <span class="tipleft" v-html="availableCountFormat">
  
          </span>
          <span class="tipleft" v-html="availableBalanceFormat">
  
          </span>
        </div>
        <div class="button432" @click="buyOrder">
          买入
        </div>
      </div>
      <div class="right">
        <div class="rightBox">
          <div class="list" v-for="(l,index) in slist" :key="index">
            <span>{{l.name}}</span>
            <span style="width:0.8rem;text-align:right">{{l.p}}</span>
            <span style="width:1.186667rem;text-align:right">{{l.q}}</span>
          </div>
        </div>
        <div class="rightBox">
          <div class="list" v-for="(l,index) in blist" :key="index">
            <span>{{l.name}}</span>
            <span style="width:0.8rem;text-align:right">{{l.p}}</span>
            <span style="width:1.186667rem;text-align:right">{{l.q}}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="historyBoxWrap">
      <div class="historyTitle">
        <span>名称/代码</span>
        <span>持有/可转(秒)</span>
        <span>现价/成本(元)</span>
        <span style="text-align:right;flex:0 0 1.92rem;">盈亏(元)</span>
      </div>
      <div class="historyList" v-for="(purchased,index) in PurchasedLists" :key="index">
        <div class="up">
          <span>{{purchased.publisherName}}</span>
          <span>{{purchased.quantity}}</span>
          <span>5.3</span>
          <span class="red" style="text-align:right;flex:0 0 1.1733rem;">+1</span>
        </div>
        <div class="down">
          <span>{{purchased.publisherCode}}</span>
          <span>{{purchased.availableQuantity}}</span>
          <span>{{purchased.costPrice}}</span>
          <span class="buyTypes" style="text-align:right;flex:0 0 1.1733rem;"></span>
        </div>
      </div>
      <Nomore :isNomoreShow='isNomoreShow'></Nomore>
    </div>
  </div>
</template>

<script>
import deal from '@/api/deal'
import OrderConfirm from './OrderConfirm'
import Nomore from '@/components/Nomore'
import DealPayToast from './DealPayToast'
import { toast } from '@/util/index'
export default {
  data() {
    return {
      searchName: '',
      searchLists: '',
      productId: '',
      baseNum: 10,
      pricesNum: '购买价格(元)',
      code: '',
      timer10: '',
      topPrice: '',
      bottomPrice: '',
      timeNum: '',
      slist: [
        { name: '卖5', p: '--', q: '--' },
        { name: '卖4', p: '--', q: '--' },
        { name: '卖3', p: '--', q: '--' },
        { name: '卖2', p: '--', q: '--' },
        { name: '卖1', p: '--', q: '--' },
      ],
      blist: [
        { name: '买1', p: '--', q: '--' },
        { name: '买2', p: '--', q: '--' },
        { name: '买3', p: '--', q: '--' },
        { name: '买4', p: '--', q: '--' },
        { name: '买5', p: '--', q: '--' },
      ],
      availableCount: '',
      availableBalance: '',
      isOrderConfirm: false,
      leftText: '确认支付',
      rightText: '取消',
      orderType: '',
      msg: '',
      price: '',
      number: '',
      sum: '',
      agree: true,
      isPayToast: false,
      page: 1,
      rows: 10,
      PurchasedLists: [],
      isNomoreShow: false,
      loading: false
    }
  },
  computed: {
    topStopPrice() {
      return this.topPrice ? `跌停<span style="color:#4affa5">${this.topPrice}</span>` : '跌停 0.00'
    },
    bottomStopPrice() {
      return this.bottomPrice ? `涨停<span style="color:#f20624">${this.bottomPrice}</span>` : '涨停 0.00 '
    },
    availableCountFormat() {
      return this.availableCount ? `可买 <span style="color:#F8CC00">${this.availableCount}</span> 秒` : '可买 0 秒'
    },
    availableBalanceFormat() {
      return this.availableBalance ? `余额 <span style="color:#F8CC00">${this.availableBalance.toFixed(0)}</span> 元` : '余额 0.00 元'
    }
  },
  methods: {
    focus() {
      this.$store.dispatch('code', '')
    },
    search(v) {
      console.log('search')
      this.searchLists = []
      let sendData = {
        s: v,
        n: 5
      }
      let config = {
        loading: false
      }
      deal.search(sendData, config).then(data => {
        if (data.data.code == 200) {
          if (!data.data.data) return this.searchLists = []
          this.searchLists = data.data.data
          if (this.$store.state.code) {
            this.selectCode(this.searchLists[0])
          }
        } else {
          toast(data.data.message)
        }
      })
    },
    formatCode(v) {
      if (!v) return
      let reg = new RegExp(this.searchName)
      let b = v.replace(reg, `<span style="color:#F8CC00">${this.searchName}</span>`)
      return b
    },
    selectCode(i) {
      if (!i) return
      this.searchName = `${i.name}  ${i.code}`
      this.pricesNum = i.lastPrice
      this.productId = i.productId
      this.code = i.code
      this.topPrice = i.topStopPrice
      this.bottomPrice = i.bottomStopPrice
      this.availableCount = parseInt(this.availableBalance / this.pricesNum)
      this.searchLists = []
      let sendData = {
        code: 10023
      }
      let config = {
        loading: false
      }
      this.timer10 = setInterval(() => {
        deal.tend(sendData, config).then(data => {
          if (data.data.code == 200) {
            if (!data.data.data) return clearInterval(this.timer10)
            let sArry = data.data.data.slist
            let bArry = data.data.data.blist
            this.slist = [
              { name: '卖5', p: '--', q: '--' },
              { name: '卖4', p: '--', q: '--' },
              { name: '卖3', p: '--', q: '--' },
              { name: '卖2', p: '--', q: '--' },
              { name: '卖1', p: '--', q: '--' },
            ]
            this.blist = [
              { name: '买1', p: '--', q: '--' },
              { name: '买2', p: '--', q: '--' },
              { name: '买3', p: '--', q: '--' },
              { name: '买4', p: '--', q: '--' },
              { name: '买5', p: '--', q: '--' },
            ]
            this.slist = this.slist.reverse().map((v, i) => {
              sArry.map((dv, di) => {
                if (i == di) {
                  v.p = dv.p
                  v.q = dv.q
                }
              })
              return v
            })
            this.slist.reverse()
            this.blist.map((v, i) => {
              bArry.map((dv, di) => {
                if (i == di) {
                  v.p = dv.p
                  v.q = dv.q
                }
              })
              return v
            })
          } else {
            toast(data.data.message)
          }
        })
      }, 500)
    },
    reducePrices() {
      console.log('reducePrices')
      return
      if (this.pricesNum == '购买价格(元)') {
        this.pricesNum = 0
      }
      if (this.pricesNum == 0) {
        return this.pricesNum = 0
      }
      this.pricesNum -= this.baseNum
    },
    addPrices() {
      console.log('addPrices')
      return
      if (this.pricesNum == '购买价格(元)') {
        this.pricesNum = 0
      }
      this.pricesNum += this.baseNum
    },
    reduceTimes() {
      console.log('reduceTimes')
      if (!this.availableCount) return
      if (this.timeNum == 0) {
        return this.timeNum = 0
      }
      if ((typeof this.timeNum) == 'string') {
        if (this.timeNum == '') {
          this.timeNum = 0
        } else {
          this.timeNum = parseFloat(this.timeNum)
        }
      }
      this.timeNum -= this.baseNum
    },
    enterTime() {
      if (this.timeNum > this.availableCount) {
        this.timeNum = this.availableCount
        return toast('超过当前可买时间,请先充值再进行购买')
      }
    },
    addTimes() {
      console.log('addTimes')
      if (!this.availableCount) return
      if (this.timeNum >= this.availableCount) {
        this.timeNum = this.availableCount
        return toast('超过当前可买时间,请先充值再进行购买')
      }
      if ((typeof this.timeNum) == 'string') {
        if (this.timeNum == '') {
          this.timeNum = 0
        } else {
          this.timeNum = parseFloat(this.timeNum)
        }
      }
      this.timeNum += this.baseNum
    },
    buyOrder() {
      console.log('buyOrder')
      // if(!this.pricesNum)return toast('请搜索并选择购买产品')
      if (!this.productId) return toast('请搜索并选择购买产品')
      if (!this.timeNum) return toast('请输入购买时间')
      let sendData = {
        number: this.timeNum,
        orderType: 1,
        price: this.pricesNum,
        productId: this.productId
      }
      deal.doMsg(sendData).then(data => {
        console.log(data)
        if (data.data.code == 200) {
          this.orderType = data.data.data.orderType
          this.msg = data.data.data.msg
          this.price = data.data.data.price
          this.number = data.data.data.number
          this.sum = data.data.data.sum
        } else {
          toast(data.data.message)
        }
      })
      this.isOrderConfirm = true
    },
    isAgree() {
      this.agree = !this.agree
    },
    toastLeft() {
      console.log('toastLeft')
      this.isOrderConfirm = false
      this.isPayToast = true
    },
    toastRight() {
      console.log('toastRight')
      this.isOrderConfirm = false
    },
    cancelToast() {
      this.isPayToast = false
    },
    isPayToastHide(a) {
      console.log(a)
      this.isPayToast = a
    },
    loadNewsPrices() {
      deal.latestPrice().then(data => {
        console.log(data)
      })
    },
    loadPurchasedLists() {
      this.loading = true
      let sendData = {
        page: this.page,
        rows: this.rows
      }
      deal.positions(sendData).then(data => {
        let that = this
        if (data.data.code == 200) {
          this.loading = false
          if (!data.data.data.rows) return
          data.data.data.rows.forEach(function (element) {
            this.PurchasedLists.push(element)
          }, this);
          if (data.data.data.rows.length == 0) {
            this.isNomoreShow = true
            document.querySelector('.dealContentWrap').removeEventListener('scroll', that.handleScroll)
          }
          this.page++
        } else {
          toast(data.data.message)
        }
      })
    },
    handleScroll() {
      let scrollTop = Math.round(document.querySelector('.dealContentWrap').scrollTop)
      let pageHeight = Math.round(document.querySelector('.dealContentWrap').offsetHeight)
      let allHeight = Math.round(document.querySelector('.buyWrap').scrollHeight);
      let a = allHeight - scrollTop - pageHeight
      if (a >= 0 && a <= 50) {
        if (this.loading) return
        this.loadPurchasedLists();
      }
    }
  },
  mounted() {
    let that = this
    deal.available().then(data => {
      this.availableBalance = data.data.data.available
    })
    if (this.page == 1) {
      this.loadPurchasedLists()
      this.loadNewsPrices()
      document.querySelector('.dealContentWrap').addEventListener('scroll', that.handleScroll)
    }
    if (this.$store.state.code) {
      this.search(this.$store.state.code)
    }

  },
  beforeDestroy() {
    clearInterval(this.timer10)
    this.$store.dispatch('code', '')
  },
  components: {
    OrderConfirm,
    DealPayToast,
    Nomore
  }
}
</script>

<style lang="less" scoped>
@import '../../less/config.less';
.buyWrap {
  padding-top: 0.2667rem;
  .buyBoxWrap {
    height: 7.01333rem;
    padding: 0.2667rem;
    background-color: @bgcolor;
    margin-bottom: 0.2667rem;
    display: flex;
    justify-content: space-between;
    .left {
      width: 5.76rem;
      .inputBOx {
        width: 5.76rem;
        height: 1.12rem;
        line-height: 1.12rem;
        position: relative;
        border: 0.02667rem solid #333;
        margin-bottom: 0.2667rem;
        input {
          width: 5.76rem;
          height: 1.12rem;
          line-height: 1.12rem;
          text-align: center;
          color: #fff;
          font-size: 0.4rem;
        }
        .active {
          border: 0.02667rem solid @yellow;
        }
        .searchLists {
          position: absolute;
          left: -0.02667rem;
          top: 1.12rem;
          width: 5.76rem;
          height: 5.36rem;
          border: 0.02667rem solid #333;
          background-color: @bgcolor;
          color: #999;
          font-size: 0.4rem;
          .listItem {
            padding: 0 @p30;
            height: 1.072rem;
            .listCode {
              display: inline-block;
              height: 1.072rem;
              line-height: 1.072rem;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap; // span {
              //   display: inline-block;
              //   height: 1.072rem;
              //   line-height: 1.072rem;
              // }
            }
            .listName {
              display: inline-block;
              height: 1.072rem;
              line-height: 1.072rem;
              width: 40%;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
      }
      .aboutBox {
        display: inline-block;
        width: 5.76rem;
        height: 1.12rem;
        border: 0.026667rem solid #333;
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #eee;
        font-size: 0.4rem;
        span {
          color: #666;
        }
        input {
          flex: 1 1 0.5rem;
          width: 2.1333rem;
          color: #666;
          text-align: center;
        }
        .button {
          flex: 0 0 1.12rem;
          display: inline-block;
          font-size: 1rem;
          color: @yellow;
          width: 1.12rem;
          height: 1.12rem;
          line-height: 1.12rem;
          text-align: center;
          background-color: #2a2b35;
        }
      }
      .bottomTips {
        width: 5.76rem;
        height: 0.85333rem;
        line-height: 0.85333rem;
        display: flex;
        justify-content: space-between;
        color: #999;
        font-size: 0.32rem;
      }
      .button432 {
        width: 5.76rem;
        height: 1.12rem;
        text-align: center;
        color: #191a22;
        font-size: 0.45333rem;
        line-height: 1.12rem;
        border-radius: 0.08rem;
        background-color: @yellow;
      }
    }
    .right {
      width: 3.4667rem;
      height: 6.48rem;
      border: 1px solid #333;
      background-color: #191a22;
      color: #fff;
      font-size: 0.26667rem;
      .rightBox {
        margin: 0 0.16rem;
        padding: 0.32rem 0;
        width: 3.14667rem;
        height: 3.24rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-bottom: 1px solid #333;
        .list {
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
  .historyBoxWrap {
    .historyTitle {
      height: 1.06667rem;
      padding: 0 0.26667rem;
      color: #eee;
      background-color: #20212a;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: solid 1px @bordercolor;
      span {
        flex: 1 1 2rem;
      }
    }
    .historyList {
      height: 2.13333rem;
      background-color: #20212a;
      padding: 0.6rem 0.26667rem;
      border-bottom: solid 1px @bordercolor;
      span {
        flex: 1 1 2rem;
      }
      .up {
        color: #eee;
        font-size: 0.373333rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.2rem;
        .red {
          color: #f20624;
        }
      }
      .down {
        color: #999;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }
    }
  }
}
</style>
