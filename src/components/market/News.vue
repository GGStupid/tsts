<template>
  <div class="newsWrap">
    <div class="newsList" v-for="(newItem,index) in newsList" :key="index">
      <img :src="newItem.newSrc" alt="">
      <div class="right">
        <div class="title">{{newItem.newTitle}}</div>
        <div class="times">
          <span>{{newItem.newTime}}</span>
          <span>{{newItem.newReporter}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return {
      newsList:[
        {
          newSrc:require('../../assets/quotes_hot_notice_avatar.png'),
          newTitle:'蒙牛:行业功过区域进口料件离开家刻录机家刻录机家刻录机家刻录机离开家',
          newTime:'今天08：39',
          newReporter:'制动才今晚'
        },
        {
          newSrc:require('../../assets/quotes_hot_notice_avatar.png'),
          newTitle:'蒙牛:行业功过区域进口料件离开家刻录机家刻录机家刻录机家刻录机离开家',
          newTime:'今天08：39',
          newReporter:'制动才今晚'
        },
        
      ]
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../less/config.less';
.newsWrap {
  background-color: #191a22;
  width: 100%;
  height: 15.46667rem;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  .newsList {
    height: 2.4rem;
    padding: 0 @p30;
    background-color: @bgcolor;
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      flex:0 0 2.1333rem;
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
}
</style>
