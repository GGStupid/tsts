<template>
  <div class="nomoreWrap" v-show="isNomoreShow">
      暂无数据
  </div>
</template>
<script>
export default {
  props:{
      isNomoreShow:{
          type:Boolean,
          default:false
      }
  }
}
</script>

<style lang="less" scoped>
.nomoreWrap{
    height: 1.2rem;
    color: #999;
    padding: 0.3rem;
    font-size: 0.37333rem;
    text-align: center;
    background-color: #191a22;
}
</style>
