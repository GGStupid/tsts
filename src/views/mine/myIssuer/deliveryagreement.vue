<template>
    <div class="deliveryagreementWrap">
 的阿萨德发射点发阿萨德发打算
    </div>
</template>
<script>
export default {
    beforeRouteEnter(to, from, next) {
        document.querySelector('title').innerText = '交割协议'
        next()
    }
}
</script>
<style lang="less" scoped>
@import '../../../less/config.less';

.deliveryagreementWrap{
    padding: @p30;
    color: @color;
    font-size: 0.346667rem;
    text-indent: 0.69rem;
    line-height: 1.5;
    background-color: @bgcolor;

}
</style>

