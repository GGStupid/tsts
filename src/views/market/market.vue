<template>
  <div>
    <div class="top">
      <v-PositionTab :tabTitles='tabTitles' @toNext='totrunTab'></v-PositionTab>
    </div>
    <div class="routeWrap">
      <v-hot v-show="tabtitle=='热门'"></v-hot>
      <v-personList v-show="tabtitle!='热门'"></v-personList>
    </div>
  </div>
</template>

<script>
import Content from '@/components/Content'
import Footer from '@/components/Footer'
import PositionTab from '@/components/PositionTab'
import FlexTab from '@/components/FlexTab'
import hot from '@/views/market/hot'
import personList from '@/views/market/personList'

export default {
  data() {
    return {
      tabTitles: [
        { title: '热门', },
        { title: '自选', },
        { title: '企业家', },
        { title: '创业者', },
        { title: '艺人',},
        { title: '牛人', },

      ],
      tabtitle: '热门'
    }
  },
  methods: {
    totrunTab(payload) {
      this.tabtitle = payload.title;
    }
  },
  components: {
    'v-Content': Content,
    'v-Footer': Footer,
    'v-PositionTab': PositionTab,
    'v-FlexTab': FlexTab,
    'v-hot': hot,
    'v-personList': personList
  }
}
</script>

<style lang="less" scoped>
@import '../../less/config.less';
.top {
  width: 10rem;
  height: 1.06667rem;
  overflow: auto;
  padding: 0 0.2667rem;
  position: relative;
  background-color: @bgcolor;
  img {
    position: absolute;
    top: 0.3667rem;
    right: 0.2667rem;
    width: 0.37333rem;
  }
}

.routeWrap {
  position: absolute;
  top: 1.06667rem;
  right: 0;
  left: 0;
  bottom: 0;
  border-top: 1px solid @bordercolor;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}
</style>


