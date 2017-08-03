<template>
  <div class="tabWrap">
    <div class="tabSelect">
      <div class="tabwarp" @click='tabFun'>
        <span :class="{'active':text=='分时'}">分时</span>
        <span :class="{'active':text=='历史'}">历史</span>
      </div>
      <span class="imgbox" @click='showDetailBox'>
        <img :src="isDetailShow?require('../../assets/quotes_details_icon_menu_s.png'):require('../../assets/quotes_details_icon_menu_n.png')" alt="">
      </span>
    </div>
    <component :is="currentview" class="chartWrap"></component>
    <div class="detailBox" v-show="isDetailShow">
      <div class="boxTop" @click="detaiBox">
        <span :class="{'active':detailBoxText=='五档'}">五档</span>
        <span :class="{'active':detailBoxText=='明细'}">明细</span>
      </div>
      <div class="right" v-show="detailBoxText=='五档'">
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
      <div class="left" v-show="detailBoxText=='明细'">
        <div class="leftBox">
          <div class="list" v-for="(l,index) in details" :key="index">
            <span>{{l.ts}}</span>
            <span style="width:0.8rem;text-align:right">{{l.p.toFixed(2)}}</span>
            <span style="width:1.186667rem;text-align:right">{{l.q}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TimeChart from './TimeChart'
import TimeHistoryChart from './TimeHistoryChart'
import market from '@/api/market/index'
import { toast } from '@/util/index'
export default {
  data() {
    return {
      text: '历史',
      currentview: 'TimeHistoryChart',
      isDetailShow: false,
      detailBoxText: '五档',
      timer10: '',
      timerdetals: '',
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
      details:[]
    }
  },
  methods: {
    tabFun(e) {
      let t = e.target.innerText
      if (t == '历史') {
        this.text = t
        this.currentview = 'TimeHistoryChart'
      } else if (t == '分时') {
        this.text = t
        this.currentview = 'TimeChart'
      }
    },
    showDetailBox() {
      console.log('showDetailBox')
      if (this.isDetailShow) {
        clearInterval(this.timer10)
        clearInterval(this.timerdetals)
      } else {
         this.detailBoxText='五档'
        this.fiveRang()
      }
      this.isDetailShow = !this.isDetailShow
    },
    detaiBox(e) {
      console.log(e.target.innerText)
      let t = e.target.innerText
      if (t == '五档') {
        clearInterval(this.timer10)
        clearInterval(this.timerdetals)
        this.detailBoxText = t
        this.fiveRang()
      } else if (t == '明细') {
        clearInterval(this.timer10)
        clearInterval(this.timerdetals)
        this.detailBoxText = t
        this.detals()
      }
    },
    fiveRang() {
      let sendData = {
        code: this.$store.state.code
      }
      let config = {
        loading: false
      }
      this.timer10 = setInterval(() => {
        market.tend(sendData, config).then(data => {
          if (data.data.code == 200) {
            if (!data.data.data) return
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
    detals() {
      let sendData = {
        code: this.$store.state.code
        // code:10023
      }
      let config = {
        loading: false
      }
      this.timerdetals = setInterval(() => {
        market.deals(sendData, config).then(data => {
          if (data.data.code == 200) {
            if (!data.data.data) return
            this.details=data.data.data
          } else {
            toast(data.data.message)
          }
        })
      }, 500)
    }
  },
  beforeDestroy(){
    clearInterval(this.timer10)
    clearInterval(this.timerdetals)
  },
  components: {
    TimeChart,
    TimeHistoryChart,
  }
}
</script>

<style lang="less" scoped>
@import '../../less/config.less';
.tabWrap {
  height: 5.933333rem;
  position: relative;
  .tabSelect {
    width: 100%;
    height: 0.93333rem;
    padding: 0 .4rem;
    background-color: #20212a;
    border-bottom: 1px solid @bordercolor;
    display: flex;
    justify-content: space-around;
    align-items: center;
    color: #eee;
    font-size: 0.4rem;
    .tabwarp {
      flex: 1 1 auto;
      display: flex;
      justify-content: space-around;
      align-items: center;
      span {
        flex: 1 1 2rem;
        text-align: center;
        height: 0.93333rem;
        line-height: 0.93333rem;
      }
    }
    .imgbox {
      flex: 0 0 .48rem;
      width: .48rem;
      height: 0.93333rem;
      line-height: 0.93333rem;
      img {
        width: .48rem;
        height: .346667rem;
      }
    }
    .active {
      color: @yellow;
    }
  }
  .chartWrap {
    height: 5rem;
  }
  .detailBox {
    position: absolute;
    right: 0;
    top: 0.93333rem;
    height: 7.6rem;
    color: #eee;
    width: 3.76rem;
    background-color: #191a22;
    .boxTop {
      display: flex;
      justify-content: space-around;
      align-content: center;
      border-bottom: 1px solid #333;
      span {
        flex: 0 0 auto;
        text-align: center;
        height: .533333rem;
        line-height: .533333rem;
      }
      .active {
        color: @yellow;
        border-bottom: 1px solid @yellow;
      }
    }
    .right {
      width: 3.76rem;
      height: 7.066667rem;
      background-color: #191a22;
      color: #fff;
      font-size: 0.26667rem;
      .rightBox {
        margin: 0 0.32rem;
        padding: 0.32rem 0;
        width: 3.14667rem;
        height: 3.533333rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .list {
          display: flex;
          justify-content: space-between;
        }
      }
    }
    .left {
      width: 3.76rem;
      height: 7.066667rem;
      background-color: #191a22;
      color: #fff;
      font-size: 0.26667rem;
      overflow-y: auto;
      .leftBox {
        margin: 0 0.32rem;
        padding: 0.32rem 0;
        width: 3.14667rem;
        // height: 3.533333rem;
        // display: flex;
        flex-direction: column;
        justify-content: space-between;
        .list {
          display: flex;
          justify-content: space-between;
        }
      }
    }
  }
}
</style>
