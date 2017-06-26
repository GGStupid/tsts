<template>
  <div class="toastWrap" v-show="isToastShow">
      {{msg}}
  </div>
</template>

<script>
export default {
  props:{
      msg:{
          type:String
      },
      isToastShow:{
          type:Boolean
      }
  }
}
</script>

<style lang="less" scoped>
@width:5.70667rem;
@color:#999;
@fontSize:0.37333rem;
@bgColor:#000000;
.toastWrap{
    width: @width;
    position: fixed;
    top: 40%;
    left: 50%;
    transform:translate(-50%,-40%);
    color: @color;
    background-color: @bgColor;
    text-align: center;
    line-height: 1.8;
    padding: 0.4rem;
}
</style>
