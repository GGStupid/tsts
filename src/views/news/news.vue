<template>
  <div>
    <div class="newsWrap">
      <v-Swiper swipeid="swipe" ref="swiper" :autoplay="3000" effect="slide">
        <a :href="top.linkUrl" v-for="(top,index) in tops" :key="index" class="swiper-slide" slot="swiper-con">
          <img :src="baseImgUrl+top.picPath">
        </a>
      </v-Swiper>
      <v-NewsList v-for="list in lists" :title="list.title" :picPath="baseImgUrl+list.picPath" :id="list.id" @toNewDetail="toNewDetail(list.id)" :key="list.index"></v-NewsList>
    </div>
  </div>
</template>

<script>
import Content from '@/components/Content'
import Footer from '@/components/Footer'
import Swiper from '@/components/swiper/Swiper.vue'
import NewsList from '@/components/news/NewsList.vue'
import news from '@/api/news/index'

export default {
  data() {
    return {
      baseImgUrl:this.$store.state.baseImgUrl,
      page: 1,
      rows: 10,
      swiper: '',
      tops: [
        // { image: require('@/assets/zixun_banner.png'), href: 'https://www.baidu.com/' },
        // { image: require('@/assets/zixun_banner.png'), href: 'https://www.baidu.com/' },
        // { image: require('@/assets/zixun_banner.png'), href: 'http://localhost:8080/#/' },
        // { image: require('@/assets/zixun_banner.png'), href: 'http://localhost:8080/#/' }
      ],
      lists: [
        // { title: '阿萨德发射点发大散发的说法', picPath: require('@/assets/zixun_pic_default.png'), id: 3 },
        // { title: '阿萨德发射点发大散发的说法', picPath: require('@/assets/zixun_pic_default.png'), id: 4 },
        // { title: '阿萨德发射点发大散发的说法', picPath: require('@/assets/zixun_pic_default.png'), id: 5 },
        // { title: '阿萨德发射点发岁的发达省份撒旦法阿斯蒂芬安德森阿萨德发射点发岁的发达省份撒旦法阿斯蒂芬安德森', picPath: require('@/assets/zixun_pic_default.png'), id: 36 },
        // { title: '阿萨德发射点发大散发的说法', picPath: require('@/assets/zixun_pic_default.png'), id: 33 },
        // { title: '阿萨德发射点发大散发的说法', picPath: require('@/assets/zixun_pic_default.png'), id: 36 },
        // { title: '阿萨德发射点发大散发的说法', picPath: require('@/assets/zixun_pic_default.png'), id: 26 },
        // { title: '阿萨德发射点发岁的发达省份撒旦法阿斯蒂芬安德森阿萨德发射点发岁的发达省份撒旦法阿斯蒂芬安德森', picPath: require('@/assets/zixun_pic_default.png'), id: 31 },
        // { title: '阿萨德发射点发大散发的说法', picPath: require('@/assets/zixun_pic_default.png'), id: 13 },
        // { title: '阿萨德发射点发大散发的说法', picPath: require('@/assets/zixun_pic_default.png'), id: 12 },
        // { title: '阿萨德发射点发大散发的说法', picPath: require('@/assets/zixun_pic_default.png'), id: 36 },
        // { title: '阿萨德发射点发岁的发达省份撒旦法阿斯蒂芬安德森阿萨德发射点发岁的发达省份撒旦法阿斯蒂芬安德森', picPath: require('@/assets/zixun_pic_default.png'), id: 23 }
      ],
    }
  },
  methods: {
    loadNews() {
      var that = this
      let sendData = {
        page: this.page,
        rows: this.rows
      }
      news.informations(sendData).then(data => {
        data.data.data.rows.forEach(function (element) {
          that.lists.push(element)
        }, this);
        if (data.data.data.rows.length == 0) {
          document.querySelector('.homeWrap').removeEventListener('scroll', that.handleScroll)
        }
        this.page++
      })
    },
    handleScroll() {
      let scrollTop = document.querySelector('.homeWrap').scrollTop;
      let pageHeight = document.querySelector('.homeWrap').offsetHeight;
      let allHeight = document.querySelector('.newsWrap').offsetHeight;
      if (scrollTop + pageHeight == allHeight) {
        this.loadNews();
      }
    },
    toNewDetail(id) {
      console.log('toNewDetail')
      this.$router.push('/newDetail/' + id)
    }
  },
  beforeRouteEnter(to, from, next) {
    document.querySelector('title').innerText = '资讯';
    next(vm => {
      news.banners().then(data => {
        vm.tops = data.data.data
      })
    })
  },
  mounted() {
    let that = this;
    if (that.page === 1) {
      that.loadNews();
      document.querySelector('.homeWrap').addEventListener('scroll', that.handleScroll);
    }
    let swiper = this.$refs.swiper
    if (swiper.dom) {
      this.swiper = swiper.dom;
    }
  },
  components: {
    'v-Content': Content,
    'v-Footer': Footer,
    'v-Swiper': Swiper,
    'v-NewsList': NewsList
  },
}
</script>

<style lang='less' scoped>
.newsWrap {
  position: relative;
}

.swiper-slide img {
  width: 100%;
  height: 5.0667rem;
}
</style>
