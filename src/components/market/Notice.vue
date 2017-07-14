<template>
  <div class="noticeWrap">
    <div class="noticeListWrap">
      <div class="noticesList" v-for="(notice,index) in noticesLists" :key="index">
        <div class="title">
          <span>{{notice.createTime}}</span>
          <span class="type">{{notice.typeFormatter}}</span>
        </div>
        <div class="body" v-html="notice.content">
        </div>
      </div>
      <div style="color:#acacac;padding: 0.4rem;
      text-align: center;
      font-size: 0.4rem;" v-show="noticesLists.length==0">
        暂无数据
      </div>
    </div>
  </div>
</template>

<script>
import market from '@/api/market/index'
export default {
  data() {
    return {
      page: 1,
      rows: 10,
      noticesLists: [
        // {
        //   time: '06-05',
        //   type: '行权',
        //   content: ' 胡灵的时间被行权7200秒，当前流通时间86400000秒！'
        // },
        // {
        //   time: '06-05',
        //   type: '行权',
        //   content: ' 胡灵的时间被行权7200秒，当前流通时间86400000秒！胡灵的时间被行权7200秒，当前流通时间86400000秒！胡灵的时间被行权7200秒，当前流通时间86400000秒！胡灵的时间被行权7200秒，当前流通时间86400000秒！胡灵的时间被行权7200秒，当前流通时间86400000秒！胡灵的时间被行权7200秒，当前流通时间86400000秒！'
        // }
      ]
    }
  },
  methods: {
    loadNotice() {
      var that = this
      let sendData = {
        productId: this.$store.state.productId,
        page: this.page,
        rows: this.rows
      }
      console.log(sendData)
      market.announces(sendData).then(data => {
        data.data.data.rows.forEach(function (element) {
          this.noticesLists.push(element)
        }, this);
        if (data.data.data.rows.length == 0) {
          document.querySelector('.noticeWrap').removeEventListener('scroll', that.handleScroll)
        }
        this.page++
      })
    },
    handleScroll() {
      let scrollTop = document.querySelector('.noticeWrap').scrollTop;
      let pageHeight = document.querySelector('.noticeWrap').offsetHeight;
      let allHeight = document.querySelector('.noticeListWrap').offsetHeight;
      if (scrollTop + pageHeight == allHeight) {
        this.loadNotice();
      }
    },
  },
  mounted() {
    let that = this;
    if (that.page === 1) {
      that.loadNotice();
      document.querySelector('.noticeWrap').addEventListener('scroll', that.handleScroll);
    }
  },
}
</script>

<style lang="less" scoped>
@import '../../less/config.less';
.noticeWrap {
  background-color: #191a22;
  width: 100%;
  height: 15.46667rem;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  .noticesList {
    width: 100%;
    padding: @p30;
    background-color: @bgcolor;
    color: #999;
    font-size: 0.32rem;
    border-bottom: 1px solid @bordercolor;
    .title {
      .type {
        color: @yellow;
      }
    }
    .body {
      display: inline-block;
      line-height: 1.8;
    }
  }
}
</style>
