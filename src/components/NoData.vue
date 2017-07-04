<template>
  <div class="noDataWrap" v-show="isNodata">
      暂无数据
  </div>
</template>

<script>
export default {
  props:{
      isNodata:{
          type:Boolean,
          default:true
      }
  }
}
</script>

<style lang="less" scoped>
@color:#999999;
@fontSize:0.37333rem;
.noDataWrap{
    height: 1rem;
    line-height: 1rem;
    text-align:center;
    color: @color;
    font-size: @fontSize
}
</style>


