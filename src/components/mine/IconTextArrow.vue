<template>
  <div class="iconTextArrow" @click="toNext">
    <div class="left">
      <img :src="icon" alt="">
      <span>{{title}}</span>
    </div>
    <img src="../../assets/arrow_right.png" class="right" alt="">
  </div>
</template>
<script>
export default {
  props: {
    icon: {
      type: String
    },
    title: {
      type: String
    }
  },
  methods: {
    toNext() {
      this.$emit('toNext')
    }
  }
}
</script>
<style lang="less" scoped>
@color: #eee;
@fontSize: 0.426667rem;
@p30: 0.4rem;
@height: 1.30667rem;
@background: #20212a;
@bordercolor: #191A22;
@imgWidth: 0.48rem;
@rightImgWidth: 0.16rem;
@rightImgHeight: 0.29333rem;
.iconTextArrow {
  width: 100%;
  height: @height;
  padding: 0 @p30;
  color: @color;
  font-size: @fontSize;
  background-color: @background;
  border-bottom: 1px solid @bordercolor;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    display: flex;
    justify-content: space-between;
    align-items: center;
    img {
      width: @imgWidth;
      margin-right: 0.26667rem;
    }
  }
  .right {
    width: @rightImgWidth;
    height: @rightImgHeight;
  }
}
</style>
