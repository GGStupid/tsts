<template>
  <div class="transactionRecordWrap">
    <div class="transactionRecordList" v-for="(transactionRecordList,index) in transactionRecordLists" :key="index">
      <div class="left">
        <div class="name">交割-{{transactionRecordList.publisherName}} ({{transactionRecordList.publisherCode}})</div>
        <div class="time">{{transactionRecordList.createTime}}</div>
      </div>
      <div class="right">
        - {{transactionRecordList.number}}s
      </div>
    </div>
    <Nomore :isNomoreShow='isNomoreShow'></Nomore>
    <div class="nodata" v-show="transactionRecordLists.length==0">
      <img src="../../../assets/norecord.png" alt="">
    </div>
  </div>
</template>

<script>
import mine from '@/api/mine/index'
import Nomore from '@/components/Nomore'
import { toast } from '@/util/index'
export default {
  data() {
    return {
      page: 1,
      rows: 12,
      transactionRecordLists: [],
      isNomoreShow: false,
      loading: false
    }
  },
  methods: {
    loadPositions() {
      var that = this
      this.loading = true
      let sendData = {
        page: this.page,
        rows: this.rows
      }
      mine.records(sendData).then(data => {
        if (data.data.code == 200) {
          this.loading = false
          if (!data.data.data.rows) return
          data.data.data.rows.forEach(function (element) {
            that.transactionRecordLists.push(element)
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
      let allHeight = Math.round(document.querySelector('.transactionRecordWrap').scrollHeight);
      let a = allHeight - scrollTop - pageHeight
      if (a >= 0 && a <= 50) {
        if (this.loading) return
        this.loadPositions();
      }
    },
  },
  mounted() {
    let that = this
    // if (that.page === 1) {
    //   that.loadPositions();
    //   document.querySelector('#app').addEventListener('scroll', that.handleScroll);
    // }
  },
  beforeRouteEnter(to, from, next) {
    document.querySelector('title').innerText = '交割记录'
    next()
  },
  components: {
    Nomore
  }
}
</script>
<style lang="less" scoped>
@import '../../../less/config.less';
.transactionRecordWrap {
  margin-top: .266667rem;
  .transactionRecordList {
    height: 1.6rem;
    border-bottom: 1px solid @bordercolor;
    background-color: @bgcolor;
    color: @color;
    font-size: 0.37333rem;
    padding: 0 @p30;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .left {
      line-height: 1.5;
      .time {
        font-size: 0.32rem;
        color: @placeColor;
      }
    }
    .right {
      color: #4AFFA5;
    }
  }
  .nodata {
    text-align: center;
    margin-top: 2.133333rem;
    img {
      width: 5.706667rem;
      height: 4.76rem;
    }
  }
}
</style>
