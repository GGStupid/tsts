<template>
  <div class="noticeWrap">
    <div class="noticeListWrap">
      <div class="noticesList" v-for="(notice,index) in noticesLists" :key="index">
        <div class="title">
          <span>{{notice.createTime | mmddFormate}}</span>
          <span class="type">{{notice.title}}</span>
        </div>
        <div class="body" v-html="notice.content">
        </div>
      </div>
      <div class="nodata" v-show="noticesLists.length==0">
        <img src="../../assets/nonotice.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import market from '@/api/market/index'
import { toast } from '@/util/index'
export default {
  data() {
    return {
      page: 1,
      rows: 10,
      noticesLists: [],
      loading: false
    }
  },
  methods: {
    loadNotice() {
      var that = this
      this.loading = true
      let sendData = {
        productId: this.$store.state.productId,
        page: this.page,
        rows: this.rows
      }
      market.announces(sendData).then(data => {
        if (data.data.code == 200) {
          this.loading = false
          if (!data.data.data.rows) return
          data.data.data.rows.forEach(function (element) {
            this.noticesLists.push(element)
          }, this);
          if (data.data.data.rows.length == 0) {
            document.querySelector('.noticeWrap').removeEventListener('scroll', that.handleScroll)
          }
          this.page++
        } else {
          toast(data.data.message)
        }
      })
    },
    handleScroll() {
      let scrollTop = document.querySelector('.noticeWrap').scrollTop;
      let pageHeight = document.querySelector('.noticeWrap').offsetHeight;
      let allHeight = document.querySelector('.noticeListWrap').offsetHeight;
      let a = allHeight - scrollTop - pageHeight
      if (a >= 0 && a <= 50) {
        if (this.loading) return
        this.loadNotice();
      }
    },
  },
  filters: {
    mmddFormate(v) {
      if (!v) return
      return v.slice(5, 10)
    }
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
      width: 100%;
      word-break: break-all;
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
