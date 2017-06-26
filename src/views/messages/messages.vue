<template>
  <div>
      <v-MsgList v-for="list in lists" :src="list.src" :count="list.count" :title="list.title" :subtitle="list.subtitle" :time="list.time" :key="list.index" @toNext="toNext(list.path)"></v-MsgList>
  </div>
</template>

<script>
import Content from '@/components/Content'
import Footer from '@/components/Footer'
import MsgList from '@/components/messages/MsgList.vue'

export default {
  data() {
    return {
      lists: [
        { title: '通知',count:9,subtitle:'今晚八点啊打发打发阿萨德发射点发三分今晚八点啊打发打发阿萨德发射点发三分', time:'今天 14:19',src: require('@/assets/message_icon_notice.png'),path:'/notices' },
        { title: '系统通知',count:1,subtitle:'啊啊恢复了您的评论', time:'6月2日 14:19',src: require('@/assets/message_icon_system notice.png'),path:'/systemNotices' }
      ]
    }
  },
  components: {
    'v-Content': Content,
    'v-Footer': Footer,
    'v-MsgList': MsgList
  },
  methods:{
    toNext(path){
      this.$router.push(path)
    }
  },
  beforeRouteEnter(to, from, next) {
    document.querySelector('title').innerText = '消息';
    next()
  },
}
</script>

