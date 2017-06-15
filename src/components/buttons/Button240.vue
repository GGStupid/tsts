<template>
  <div @click='toNext'>
    {{title}}
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
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
@background: #20212a;
div {
  width: 3.2rem;
  height:1.0667rem;
  line-height:1.0667rem;
  margin:0 auto;
  text-align: center;
  font-size: @fontsize;
  background-color: @background;
  color:@active;
  border-radius:0.08rem;
  border:solid 0.02667rem @active;
}
</style>
