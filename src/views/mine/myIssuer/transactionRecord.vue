<template>
  <div class="transactionRecordWrap">
    <div class="transactionRecordList" v-for="(transactionRecordList,index) in transactionRecordLists" :key="index">
      <div class="left">
        <div class="name">交割-{{transactionRecordList.name}} ({{transactionRecordList.code}})</div>
        <div class="time">{{transactionRecordList.time}}</div>
      </div>
      <div class="right">
        - {{transactionRecordList.dealTime}}s
      </div>
    </div>
  </div>
</template>

<script>
import mine from '@/api/mine/index'
export default {
  data() {
    return {
      transactionRecordLists: [
        // {
        //   name: '阿道夫',
        //   code: 800011,
        //   time: '2017-03-01 15:20:30',
        //   dealTime: 36000
        // }, {
        //   name: '阿道夫',
        //   code: 800011,
        //   time: '2017-03-01 15:20:30',
        //   dealTime: 36000
        // },
      ]
    }
  },
  mounted() {
    mine.records().then(data => {
      console.log(data)
      this.transactionRecordLists=data.data.data.rows
    })
  },
  beforeRouteEnter(to, from, next) {
    document.querySelector('title').innerText = '交割记录'
    next()
  }
}
</script>
<style lang="less" scoped>
@import '../../../less/config.less';
.transactionRecordWrap {
  margin-top: 0.26667rem;
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
}
</style>
