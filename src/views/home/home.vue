<template>
    <div>
        <router-view class="homeWrap"></router-view>
        <v-Footer></v-Footer>
    </div>
</template>

<script>
import Content from '@/components/Content'
import Footer from '@/components/Footer'

export default {
    components: {
        'v-Content': Content,
        'v-Footer': Footer
    }
}
</script>
<style lang="less" scoped>
 .homeWrap {
     position: absolute;
     top: 0;
     left: 0;
     right: 0;
     bottom: 1.30667rem;
     z-index: 10;
     overflow: auto;
     -webkit-overflow-scrolling: touch;
     background-color: #191a22;
 }
</style>


