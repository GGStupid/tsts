<template>
    <div>
        <v-Notices v-for="list in lists" :subtitle="list.subtitle" :time="list.time" :key="list.index"></v-Notices>
    </div>
</template>

<script>
import Notices from '@/components/messages/Notices.vue'

export default {
    data() {
        return {
            lists: [
                { subtitle: '今晚八点啊打发打发阿萨德发射点发三分今晚八点啊打发打发阿萨德发射点发三分', time: '今天 14:19', path: '/notice' },
                { subtitle: '啊啊恢复了您的评a阿萨德发射点发大分论啊啊恢复了您的评论啊啊恢复了您的评论啊啊恢复了您的评论啊啊恢复了您的评论', time: '今天 14:19', path: '/systemnotice' },
                { subtitle: '今晚八点啊打发打发阿萨德发射点发三分今晚八点啊打发打发阿萨德发射点发三分', time: '今天 14:19', path: '/notice' },
                { subtitle: '啊啊恢复了您的评a阿萨德发射点发大分论啊啊恢复了您的评论啊啊恢复了您的评论啊啊恢复了您的评论啊啊恢复了您的评论', time: '今天 14:19', path: '/systemnotice' }, { subtitle: '今晚八点啊打发打发阿萨德发射点发三分今晚八点啊打发打发阿萨德发射点发三分', time: '今天 14:19', path: '/notice' },
                { subtitle: '啊啊恢复了您的评a阿萨德发射点发大分论啊啊恢复了您的评论啊啊恢复了您的评论啊啊恢复了您的评论啊啊恢复了您的评论', time: '今天 14:19', path: '/systemnotice' }, { subtitle: '今晚八点啊打发打发阿萨德发射点发三分今晚八点啊打发打发阿萨德发射点发三分', time: '今天 14:19', path: '/notice' },
                { subtitle: '啊啊恢复了您的评a阿萨德发射点发大分论啊啊恢复了您的评论啊啊恢复了您的评论啊啊恢复了您的评论啊啊恢复了您的评论', time: '今天 14:19', path: '/systemnotice' }, { subtitle: '今晚八点啊打发打发阿萨德发射点发三分今晚八点啊打发打发阿萨德发射点发三分', time: '今天 14:19', path: '/notice' },
                { subtitle: '啊啊恢复了您的评a阿萨德发射点发大分论啊啊恢复了您的评论啊啊恢复了您的评论啊啊恢复了您的评论啊啊恢复了您的评论', time: '今天 14:19', path: '/systemnotice' }
            ]
        }
    },
    components: {
        'v-Notices': Notices
    },
    methods: {
        toNext(path) {
            this.$router.push(path)
        }
    },
    beforeRouteEnter(to, from, next) {
    document.querySelector('title').innerText = '通知';
    next()
  },
}
</script>

