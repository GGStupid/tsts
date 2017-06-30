<template>
  <div class="marketWrap">
    <!--<div class="search">
      <img src="../../assets/quotes_nav_icon_search.png" alt="">
      <input type="text" @focus="toSearch" placeholder="输入发行人/代码">
      <span>{{search}}</span>
    </div>-->
    <div class="top">
      <v-PositionTab :tabTitles='tabTitles' @toNext='totrunTab'></v-PositionTab>
    </div>
    <div class="routeWrap">
      <v-hot v-show="tabtitle=='热门'"></v-hot>
      <v-personList :id='typeId' v-show="tabtitle!='热门'"></v-personList>
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
import market from '@/api/market/index'

export default {
  data() {
    return {
      search: '搜索',
      tabTitles: [
        { name: '热门', },
        { name: '自选', },
        // { name: '企业家', },
        // { name: '创业者', },
        // { name: '艺人', },
        // { name: '牛人', },

      ],
      tabtitle: '热门',
      typeId:''
    }
  },
  methods: {
    toSearch() {
      console.log('toSearch')
      this.$router.push('/toSearch')
    },
    totrunTab(payload) {
      console.log(payload)
      if(payload.name=='热门'){
          this.typeId='热门'
          this.tabtitle = payload.name;
          return 
      }
      if(payload.name=='自选'){
          this.typeId='自选'
          this.tabtitle = payload.name;
          return
      }
      this.tabtitle = payload.name;
      this.typeId=String(payload.id)
    }
  },
  mounted() {
    let that = this
    market.type().then(data => {
      data.data.data.forEach(function (element) {
        that.tabTitles.push(element)
      }, this);
    })
  },
  beforeRouteEnter(to, from, next) {
    document.querySelector('title').innerText = '行情'
    next()
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
.marketWrap {
  .search {
    position: relative;
    height: 1.17333rem;
    line-height: 1.17333rem;
    background-color: @bgcolor;
    margin-bottom: 0.2667rem;
    text-align: center;
    font-size: 0.37333rem;
    img {
      position: absolute;
      top: 0.38667rem;
      left: .6rem;
      width: 0.34667rem;
      height: 0.34667rem;
    }
    input {
      width: 8.1333rem;
      height: 0.77333rem;
      line-height: 0.77333rem;
      border-radius: 0.8rem;
      padding: 0 0.8rem;
      margin-right: @p30;
      background-color: #eee;
    }
    input::-webkit-input-placeholder {
      /* WebKit browsers*/
      color: @placeColor;
    }
    input::-moz-placeholder {
      /* Mozilla Firefox 4 to 18*/
      color: @placeColor;
    }
    input::-moz-placeholder {
      /* Mozilla Firefox 19+*/
      color: @placeColor;
    }
    input:-ms-input-placeholder {
      /* Internet Explorer 10+*/
      color: @placeColor;
    }
    span {
      color: #eee;
    }
  }
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
    top:1.06667rem;
    // top: 2.50667rem;
    right: 0;
    left: 0;
    bottom: 0;
    border-top: 1px solid @bordercolor;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }
}
</style>


