<template>
  <div class="hotWrap">
    <v-SwiperBar swipeid="swipe" ref="swiper">
      <v-RankingList :key="rank.index" :title="rank.title" :lists="rank.lists" class="swiper-slide" slot="swiper-con" v-for="rank in ranks">
      </v-RankingList>
    </v-SwiperBar>
    <div class="tabWrap">
      <v-FlexTab :tabTitles='tabTitles' @toNext="toCheckTab"></v-FlexTab>
      <v-HotList :lists="lists" @toNext="toNext"></v-HotList>
    </div>
  </div>
</template>

<script>
import SwiperBar from '@/components/swiper/SwiperBar.vue'
import RankingList from '@/components/market/RankingList'
import FlexTab from '@/components/FlexTab'
import HotList from '@/components/market/HotList'

export default {
  data() {
    return {
      swiper: '',
      ranks: [
        {
          title: '买卖榜',
          lists: [
            { headImg: require('@/assets/quotes_hot_avatar.png'), name: '阿斗', sub: '33.46%' },
            { headImg: require('@/assets/quotes_hot_avatar.png'), name: '阿斗', sub: '33.46%' },
            { headImg: require('@/assets/quotes_hot_avatar.png'), name: '阿斗', sub: '33.46%' },
            { headImg: require('@/assets/quotes_hot_avatar.png'), name: '阿斗', sub: '33.46%' },
            { headImg: require('@/assets/quotes_hot_avatar.png'), name: '阿斗', sub: '33.46%' }
          ],
        },
        {
          title: '换手榜',
          lists: [
            { headImg: require('@/assets/quotes_hot_avatar.png'), name: '阿斗', sub: '33.46%' },
            { headImg: require('@/assets/quotes_hot_avatar.png'), name: '阿斗', sub: '33.46%' },
            { headImg: require('@/assets/quotes_hot_avatar.png'), name: '阿斗', sub: '33.46%' },
            { headImg: require('@/assets/quotes_hot_avatar.png'), name: '阿斗', sub: '33.46%' },
            { headImg: require('@/assets/quotes_hot_avatar.png'), name: '阿斗', sub: '33.46%' }
          ],
        },
        {
          title: '身价榜',
          lists: [
            { headImg: require('@/assets/quotes_hot_avatar.png'), name: '阿斗', sub: '33.46%' },
            { headImg: require('@/assets/quotes_hot_avatar.png'), name: '阿斗', sub: '33.46%' },
            { headImg: require('@/assets/quotes_hot_avatar.png'), name: '阿斗', sub: '33.46%' },
            { headImg: require('@/assets/quotes_hot_avatar.png'), name: '阿斗', sub: '33.46%' },
            { headImg: require('@/assets/quotes_hot_avatar.png'), name: '阿斗', sub: '33.46%' }
          ],
        },
      ],
      tabTitles: [
        { title: '新人预告' },
        { title: '增发预告' }
      ],
      isCheck:false,
      lists:[
        {
          avatar:require('@/assets/quotes_hot_notice_avatar.png'),
          name:'阿斯蒂芬',
          code:'546545',
          prices:'135.00',
          isTimes:false,
          isSaleShow:true,
          isSale:true,
        },
        {
          avatar:require('@/assets/quotes_hot_notice_avatar.png'),
          name:'阿斯蒂芬',
          code:'546545',
          prices:'135.00',
          isTimes:false,
          isSaleShow:true,
          isSale:true,
        },
        {
          avatar:require('@/assets/quotes_hot_notice_avatar.png'),
          name:'阿斯蒂芬',
          code:'546545',
          prices:'135.00',
          isTimes:false,
          isSaleShow:true,
          isSale:false,
        },
        {
          avatar:require('@/assets/quotes_hot_notice_avatar.png'),
          name:'阿斯蒂芬',
          code:'546545',
          prices:'135.00',
          isTimes:false,
          isSaleShow:true,
          isSale:true,
        }
      ],
      addLists:[
        {
          avatar:require('@/assets/quotes_hot_notice_avatar.png'),
          name:'阿斯芬',
          code:'546545',
          prices:'135.00',
          isTimes:false,
          isSaleShow:true,
          isSale:true,
        },
        {
          avatar:require('@/assets/quotes_hot_notice_avatar.png'),
          name:'阿斯芬',
          code:'546545',
          prices:'135.00',
          isTimes:false,
          isSaleShow:true,
          isSale:true,
        }
      ],
      middle:''
    }
  },
  methods: {
    toCheckTab() {
      console.log('toCheckTab')
      this.isCheck=!this.isCheck
      this.middle=this.lists
      this.lists=this.isCheck ? this.addLists : this.middle
    },
    toNext(){
      console.log('toNextlit')
    }
  },
  components: {
    'v-SwiperBar': SwiperBar,
    'v-RankingList': RankingList,
    'v-FlexTab': FlexTab,
    'v-HotList':HotList
  },
  mounted() {
    let swiper = this.$refs.swiper
    if (swiper.dom) {
      this.swiper = swiper.dom;
    }
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


