<template>
  <div>
    <div class="newsWrap">
      <v-Swiper swipeid="swipe" ref="swiper" :autoplay="3000" effect="slide">
        <a :href="top.linkUrl" v-for="(top,index) in tops" :key="index" class="swiper-slide" slot="swiper-con">
          <img :src="baseImgUrl+top.picPath">
        </a>
      </v-Swiper>
      <v-NewsList v-for="list in lists" :title="list.title" :picPath="baseImgUrl+list.picPath" :id="list.id" @toNewDetail="toNewDetail(list.id)" :key="list.index"></v-NewsList>
      <Nomore :isNomoreShow='isNomoreShow'></Nomore>
      <div class="nodata" v-show="tops.length==0 && lists.length==0">
        <img  src="../../assets/nonews.png" alt="">
      </div>
    </div>
  </div>
</template>

<script>
import Content from '@/components/Content'
import Footer from '@/components/Footer'
import Swiper from '@/components/swiper/Swiper.vue'
import NewsList from '@/components/news/NewsList.vue'
import Nomore from '@/components/Nomore'
import news from '@/api/news/index'
import { toast } from '@/util/index'
export default {
  data() {
    return {
      baseImgUrl: this.$store.state.baseImgUrl,
      page: 1,
      rows: 12,
      swiper: '',
      tops: [],
      lists: [],
      isNomoreShow: false,
      loading: false
    }
  },
  methods: {
    loadNews() {
      var that = this
      this.loading = true
      let sendData = {
        page: this.page,
        rows: this.rows
      }
      news.informations(sendData).then(data => {
        if (data.data.code == 200) {
          this.loading = false
          if (!data.data.data.rows) return
          data.data.data.rows.forEach(function (element) {
            that.lists.push(element)
          }, this);
          if (data.data.data.rows.length == 0) {
            this.isNomoreShow = true
            document.querySelector('.homeWrap').removeEventListener('scroll', that.handleScroll)
          }
          this.page++
        } else {
          toast(data.data.message)
        }
      })
    },
    handleScroll() {
      let scrollTop = Math.round(document.querySelector('.homeWrap').scrollTop)
      let pageHeight = Math.round(document.querySelector('.homeWrap').offsetHeight)
      let allHeight = Math.round(document.querySelector('.newsWrap').scrollHeight);
      let a = allHeight - scrollTop - pageHeight
      if (a >= 0 && a <= 50) {
        if (this.loading) return
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
    next()
  },
  mounted() {
    let that = this;
    news.banners().then(data => {
      this.tops = data.data.data
    })
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
    'v-NewsList': NewsList,
    Nomore
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
.nodata{
  text-align: center;
  margin-top: 2.133333rem;
  img{
    width: 5.706667rem;
    height: 4.76rem;
  }
}
</style>
