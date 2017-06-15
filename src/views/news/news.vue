<template>
  <div>
    <v-Content>
      <v-Swiper swipeid="swipe" ref="swiper" :autoplay="3000" effect="slide">
        <a :href="top.href" v-for="top in tops" class="swiper-slide" slot="swiper-con">
          <img :src="top.image">
        </a>
      </v-Swiper>
      <v-NewsList v-for="list in lists" :title="list.title" :src="list.src" :key="list.index"></v-NewsList>
    </v-Content>
    <v-Footer></v-Footer>
  </div>
</template>

<script>
import Content from '@/components/Content'
import Footer from '@/components/Footer'
import Swiper from '@/components/swiper/Swiper.vue'
import NewsList from '@/components/news/NewsList.vue'

export default {
  data() {
    return {
      swiper: '',
      tops: [
        { image: require('@/assets/zixun_banner.png'), href: 'https://www.baidu.com/' },
        { image: require('@/assets/zixun_banner.png'), href: 'https://www.baidu.com/' },
        { image: require('@/assets/zixun_banner.png'), href: 'http://localhost:8080/#/' },
        { image: require('@/assets/zixun_banner.png'), href: 'http://localhost:8080/#/' }
      ],
      lists: [
        { title: '阿萨德发射点发大散发的说法', src: require('@/assets/zixun_pic_default.png') },
        { title: '阿萨德发射点发大散发的说法', src: require('@/assets/zixun_pic_default.png') },
        { title:'阿萨德发射点发大散发的说法', src: require('@/assets/zixun_pic_default.png')},
        { title: '阿萨德发射点发岁的发达省份撒旦法阿斯蒂芬安德森阿萨德发射点发岁的发达省份撒旦法阿斯蒂芬安德森',src: require('@/assets/zixun_pic_default.png')},
        { title: '阿萨德发射点发大散发的说法', src: require('@/assets/zixun_pic_default.png') },
        { title: '阿萨德发射点发大散发的说法', src: require('@/assets/zixun_pic_default.png') },
        { title:'阿萨德发射点发大散发的说法', src: require('@/assets/zixun_pic_default.png')},
        { title: '阿萨德发射点发岁的发达省份撒旦法阿斯蒂芬安德森阿萨德发射点发岁的发达省份撒旦法阿斯蒂芬安德森',src: require('@/assets/zixun_pic_default.png')},
        { title: '阿萨德发射点发大散发的说法', src: require('@/assets/zixun_pic_default.png') },
        { title: '阿萨德发射点发大散发的说法', src: require('@/assets/zixun_pic_default.png') },
        { title:'阿萨德发射点发大散发的说法', src: require('@/assets/zixun_pic_default.png')},
        { title: '阿萨德发射点发岁的发达省份撒旦法阿斯蒂芬安德森阿萨德发射点发岁的发达省份撒旦法阿斯蒂芬安德森',src: require('@/assets/zixun_pic_default.png')}
      ],
    }
  },
  components: {
    'v-Content': Content,
    'v-Footer': Footer,
    'v-Swiper': Swiper,
    'v-NewsList':NewsList
  },
  beforeRouteEnter(to, from, next) {
    document.querySelector('title').innerText = '资讯';
    next()
  },
  mounted() {
    let swiper = this.$refs.swiper
    if (swiper.dom) {
      this.swiper = swiper.dom;
    }
  }
}
</script>

<style lang='less' scoped>
.swiper-slide img {
  width: 100%;
  height: 5.0667rem;
}
</style>
