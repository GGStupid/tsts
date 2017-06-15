<template>
  <div @click='toNext' :class="{active:isActive}" :style="{marginTop:topNum}">
    {{title}}
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    isActive: {
      type: Boolean
    },
    topNum:{
      type:String
    }
  },
  methods:{
    toNext(){
      this.$emit('toNext')
    }
  }
}
</script>

<style lang="less" scoped>
@active: #f8cc00;
@unactive: #999999;
@unactivecolor:#fff;
@fontsize: 0.48rem;
@color: #191a22;

div {
  width: 100%;
  height:1.2rem;
  line-height:1.2rem;
  text-align: center;
  font-size: @fontsize;
  background-color: @unactive;
  color:@unactivecolor;
  border-radius:0.08rem;
  .active {
    background-color: @active;
    color: @color;
  }
}
</style>
