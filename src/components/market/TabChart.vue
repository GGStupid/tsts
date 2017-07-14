<template>
  <div class="tabWrap">
    <div class="tabSelect" @click='tabFun'>
      <span :class="{'active':text=='分时'}">分时</span>
      <span :class="{'active':text=='历史'}">历史</span>
      <span class="imgbox">
        <img :src="text==''?require('../../assets/quotes_details_icon_menu_s.png'):require('../../assets/quotes_details_icon_menu_n.png')" alt="">
      </span>
    </div>
    <component :is="currentview" class="chartWrap"></component>
  </div>
</template>

<script>
import TimeChart from './TimeChart'
import KlineChart from './KlineChart'
export default {
  data() {
    return {
      text: '分时',
      currentview:'TimeChart'
    }
  },
  methods: {
    tabFun(e) {
      let t = e.target.innerText
      if(t=='历史'){
          this.text = t
        this.currentview='KlineChart'
      }else if(t=='分时'){
         this.text = t
        this.currentview='TimeChart'
      }else if(t==''){
         this.text = t
        return
      }
    }
  },
  components:{
    TimeChart,
    KlineChart,
  }
}
</script>

<style lang="less" scoped>
@import '../../less/config.less';
.tabWrap {
  height: 5.933333rem;
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
    span {
      flex: 1 1 2rem;
      text-align: center;
      height: 0.93333rem;
      line-height: 0.93333rem;
    }
    .imgbox {
      flex: 0 0 .48rem;
      width: .48rem;
      height: 0.93333rem;
      img {
        width: .48rem;
        height: .346667rem;
      }
    }
    .active {
      color: @yellow;
    }
  }
  .chartWrap{
    height: 5rem;
  }
}
</style>
