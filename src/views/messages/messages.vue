<template>
  <div>
    <v-MsgList  :src="require('@/assets/message_icon_notice.png')" :count="notReadAnnounceNum" title="通知" :subtitle="announcecontent" :time="announcecreateTime"  @toNext="toNext('/notices')"></v-MsgList>
    <v-MsgList  :src="require('@/assets/message_icon_system notice.png')" :count="notReadNoticeLogNum" title="系统通知" :subtitle="noticeLogcontent" :time="noticeLogcreateTime"  @toNext="toNext('/systemNotices')"></v-MsgList>
  </div>
</template>

<script>
import Content from '@/components/Content'
import Footer from '@/components/Footer'
import MsgList from '@/components/messages/MsgList.vue'
import messages from '@/api/messages'
import { toast } from '@/util/index'
export default {
  data() {
    return {
      // lists: [
      //   { title: '通知', count: 9, subtitle: '今晚八点啊打发打发阿萨德发射点发三分今晚八点啊打发打发阿萨德发射点发三分', time: '今天 14:19', src: require('@/assets/message_icon_notice.png'), path: '/notices' },
      //   { title: '系统通知', count: 1, subtitle: '啊啊恢复了您的评论', time: '6月2日 14:19', src: require('@/assets/message_icon_system notice.png'), path: '/systemNotices' }
      // ],
      notReadAnnounceNum:0,
      announcecontent:'',
      announcecreateTime:'',
      notReadNoticeLogNum:0,
      noticeLogcontent:'',
      noticeLogcreateTime:'',
    }
  },
  methods: {
    toNext(path) {
      this.$router.push(path)
    }
  },
  mounted(){
    messages.message().then(data=>{
      if(data.data.code==200){
        this.notReadAnnounceNum=data.data.data.notReadAnnounceNum
        this.announcecontent=data.data.data.announce ? data.data.data.announce.title :''
        this.announcecreateTime=data.data.data.announce ? data.data.data.announce.createTime :''
        this.notReadNoticeLogNum=data.data.data.notReadNoticeLogNum
        this.noticeLogcontent=data.data.data.noticeLog ? data.data.data.noticeLog.content :''
        this.noticeLogcreateTime=data.data.data.noticeLog ? data.data.data.noticeLog.createTime :''
      }else{
        toast(data.data.message)
      }
    })
  },
  beforeRouteEnter(to, from, next) {
    document.querySelector('title').innerText = '消息';
    next()
  },
  components: {
    'v-Content': Content,
    'v-Footer': Footer,
    'v-MsgList': MsgList
  },
}
</script>

