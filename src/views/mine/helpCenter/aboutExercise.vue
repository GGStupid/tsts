<template>
  <div class="aboutExercise">
      <div class="wrap">
          <div class="title">
              多少时间能与名人通话或见面？
          </div>
          <div class="details">
              答：您好！持有名人600秒，可与对应的名人预约视频或通话；持有7200秒，可与对应的名人线下约见（线下约见活动范围请参考淘刻APP中该名人的行权内容范围）。
          </div>
      </div>
      <div class="wrap">
          <div class="title">
              多少时间能与名人通话或见面？
          </div>
          <div class="details">
              答：您好！持有名人600秒，可与对应的名人预约视频或通话；持有7200秒，可与对应的名人线下约见（线下约见活动范围请参考淘刻APP中该名人的行权内容范围）。
          </div>
      </div>
      <div class="wrap">
          <div class="title">
              多少时间能与名人通话或见面？
          </div>
          <div class="details">
              答：您好！持有名人600秒，可与对应的名人预约视频或通话；持有7200秒，可与对应的名人线下约见（线下约见活动范围请参考淘刻APP中该名人的行权内容范围）。
          </div>
      </div>
  </div>
</template>
<script>
export default {
  beforeRouteEnter(to, from, next) {
        document.querySelector('title').innerText = '关于行权';
        next()
    }
}
</script>
<style lang="less" scoped>
@import '../../../less/config.less';
.aboutExercise{
    margin:@p30 0;
    padding:0 @p30;
    color:@placeColor;
    font-size:0.34666rem;
    line-height: 1.8;
    .wrap{
        padding: 0.3rem 0;
        .title{
            color:@color;
            margin-bottom: 0.3rem;
        }
    }
}
</style>
