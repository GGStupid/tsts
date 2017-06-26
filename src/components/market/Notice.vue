<template>
  <div class="noticeWrap">
    <div class="noticesList" v-for="(notice,index) in noticesLists" :key="index">
      <div class="title">
        <span>{{notice.time}}</span>
        <span class="type">{{notice.type}}</span>
      </div>
      <div class="body">
        {{notice.content}}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      noticesLists: [
        {
          time: '06-05',
          type: '行权',
          content: ' 胡灵的时间被行权7200秒，当前流通时间86400000秒！'
        },
        {
          time: '06-05',
          type: '行权',
          content: ' 胡灵的时间被行权7200秒，当前流通时间86400000秒！胡灵的时间被行权7200秒，当前流通时间86400000秒！胡灵的时间被行权7200秒，当前流通时间86400000秒！胡灵的时间被行权7200秒，当前流通时间86400000秒！胡灵的时间被行权7200秒，当前流通时间86400000秒！胡灵的时间被行权7200秒，当前流通时间86400000秒！'
        }]
    }
  }
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
