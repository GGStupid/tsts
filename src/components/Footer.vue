<template>
  <footer>
    <router-link  v-for="item in list" :to="item.path" :key="item.index" exact>
      <span>
        <img :src="item.path==$route.path?item.src:item.unsrc" alt="">
      </span>
      <p>{{item.title}}</p>
    </router-link>
  </footer>
</template>
<script>
export default {
  data() {
    return {
       list: [
        {
          title: '资讯',
          path: '/home/news',
          src: require('../assets/tab_news_s.png'),
          unsrc: require('../assets/tab_news_n.png')
        },
        {
          title: '行情',
          path: '/home/market',
          src: require('../assets/tab_quotes_s.png'),
          unsrc: require('../assets/tab_quotes_n.png')
        },
        {
          title: '买卖',
          path: '/home/deal',
          src: require('../assets/tab_trading_s.png'),
          unsrc: require('../assets/tab_trading_n.png')
        },
        {
          title: '消息',
          path: '/home/messages',
          src: require('../assets/tab_message_s.png'),
          unsrc: require('../assets/tab_message_n.png')
        },
        {
          title: '我的',
          path: '/home/mine',
          src: require('../assets/tab_mine_s.png'),
          unsrc: require('../assets/tab_mine_n.png')
        }
      ]
    }
  },
  methods: {
    test() {
      alert(1111)
    }
  }
}
</script>

<style lang="less" scoped>
@bgcolor: #191a22;
@actcolor: #F8CC00;
@color: #999999;
@fsize: 0.29333rem;
@height: 1.30667rem;
footer {
  width: 100%;
  height: @height;
  border-top: 1px solid #2a2a34;
  position: absolute;
  bottom: 0;
  font-size: @fsize;
  display: flex;
  background-color: #191a22;
  span {
    display: block;
    text-align: center;
    img {
      width: 0.586rem;
    }
  }
  p {
    text-align: center;
  }
  a {
    width: 25%;
    color: @color;
    text-decoration: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .router-link-active {
    color: @actcolor;
  }
}
</style>
