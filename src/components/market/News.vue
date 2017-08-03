<template>
  <div class="newsWrap">
    <div class="newListWrap">
      <div class="newsList" v-for="(newItem,index) in newsList" :key="index" @click="toDetailsNews(newItem.id)">
        <img :src="baseImgUrl+newItem.picPath" alt="">
        <div class="right">
          <div class="title">{{newItem.title}}</div>
          <div class="times">
            <span>{{newItem.updateTime}}</span>
            <span>{{newItem.creator}}</span>
          </div>
        </div>
      </div>
      <div class="nodata" v-show="newsList.length==0">
        <img src="../../assets/nodata.png" alt="">
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
      baseImgUrl: this.$store.state.baseImgUrl,
      page: 1,
      rows: 10,
      newsList: [],
      loading: false
    }
  },
  methods: {
    loadNews() {
      var that = this
      this.loading = true
      let sendData = {
        productId: this.$store.state.productId,
        page: this.page,
        rows: this.rows
      }
      market.news(sendData).then(data => {
        if (data.data.code == 200) {
          this.loading = false
          if (!data.data.data.rows) return
          data.data.data.rows.forEach(function (element) {
            this.newsList.push(element)
          }, this);
          if (data.data.data.rows.length == 0) {
            document.querySelector('.newsWrap').removeEventListener('scroll', that.handleScroll)
          }
          this.page++
        } else {
          toast(data.data.message)
        }
      })
    },
    handleScroll() {
      let scrollTop = document.querySelector('.newsWrap').scrollTop;
      let pageHeight = document.querySelector('.newsWrap').offsetHeight;
      let allHeight = document.querySelector('.newListWrap').offsetHeight;
      let a = allHeight - scrollTop - pageHeight
      if (a >= 0 && a <= 50) {
        if (this.loading) return
        this.loadNews();
      }
    },
    toDetailsNews(id) {
      console.log('toDetailsNews')
      this.$router.push('/marketNewsDeatil/' + id)
    }
  },
  mounted() {
    let that = this;
    if (that.page === 1) {
      that.loadNews();
      document.querySelector('.newsWrap').addEventListener('scroll', that.handleScroll);
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../less/config.less';
.newsWrap {
  background-color: #191a22;
  .newsList {
    height: 2.4rem;
    padding: 0 @p30;
    background-color: @bgcolor;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      flex: 0 0 2.1333rem;
      width: 2.1333rem;
      height: 1.70667rem;
      margin-right: 0.69333rem;
    }
    .right {
      flex: 1 1 6.3333rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      height: 1.70667rem;
      .title {
        line-height: 1.5;
        font-size: 0.4rem;
        color: #eee;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .times {
        color: #999;
        font-size: 0.346667rem;
      }
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
