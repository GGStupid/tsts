<template>
  <div class="hotWrap">
    <v-SwiperBar swipeid="swipe" ref="swiper">
      <v-RankingList v-for="(rank,index) of ranks" :key="index" :title="rank.title" :lists="rank.lists" class="swiper-slide" @toDetails="toDetails" slot="swiper-con">
      </v-RankingList>
    </v-SwiperBar>
    <div class="tabWrap">
      <v-FlexTab :tabTitles='tabTitles' @toNext="toCheckTab"></v-FlexTab>
      <v-HotList :isNews="isNews"></v-HotList>
    </div>
  </div>
</template>

<script>
import SwiperBar from '@/components/swiper/SwiperBar.vue'
import RankingList from '@/components/market/RankingList'
import FlexTab from '@/components/FlexTab'
import HotList from '@/components/market/HotList'
import market from '@/api/market/index'
export default {
  data() {
    return {
      swiper: '',
      ranks: [],
      tabTitles: [
        { title: '新人预告' },
        { title: '增发预告' }
      ],
      isNews: true,
    }
  },
  methods: {
    toDetails(data) {
      console.log('toDetails')
      console.log(data)
      this.$store.dispatch('productId',data.productId)
      this.$router.push('/pricePersonDetail/' + data.productId)
    },
    toCheckTab(e) {
      console.log('toCheckTab')
      if (e.title == '新人预告') {
        this.isNews = true
      }
      if (e.title == '增发预告') {
        this.isNews = false
      }
    },
    toNext() {
      console.log('toNextlit')
    }
  },
  components: {
    'v-SwiperBar': SwiperBar,
    'v-RankingList': RankingList,
    'v-FlexTab': FlexTab,
    'v-HotList': HotList
  },
  created() {
    market.hot().then(data => {
      this.ranks = data.data.data
      let swiper = this.$refs.swiper
      if (swiper.dom) {
        this.swiper = swiper.dom;
      }
    })
  }
}
</script>

<style lang="less" scoped>
@import '../../less/config.less';
.tabWrap {
  margin-top: @p30;
  background-color: @bgcolor;
}
</style>


