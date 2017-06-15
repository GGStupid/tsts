<template>
    <div class="systemNotices">
        <v-SytemNotices v-for="list in lists" :title="list.title" :subtitle="list.subtitle" :time="list.time" :key="list.index"></v-SytemNotices>
    </div>
</template>

<script>
import SytemNotices from '@/components/messages/SytemNotices.vue'

export default {
    data() {
        return {
            lists: [
                { title: '动态通知', subtitle: '今晚八点啊打发打发阿萨德发射点发三分今晚八点啊打发打发阿萨德发射点发三分今晚八点啊打发打发阿萨德发射点发三分今晚八点啊打发打发阿萨德发射点发三分今晚八点啊打发打发阿萨德发射点发三分今晚八点啊打发打发阿萨德发射点发三分今晚八点啊打发打发阿萨德发射点发三分今晚八点啊打发打发阿萨德发射点发三分今晚八点啊打发打发阿萨德发射点发三分今晚八点啊打发打发阿萨德发射点发三分今晚八点啊打发打发阿萨德发射点发三分今晚八点啊打发打发阿萨德发射点发三分', time: '今天 14:19', path: '/notice' },
                { title: '动态通知', subtitle: '啊啊恢复了您的评a阿萨德发射点发大分论啊啊恢复了您的评论啊啊恢复了您的评论啊啊恢复了您的评论啊啊恢复了您的评论', time: '今天 14:19', path: '/systemnotice' },
                { title: '动态通知', subtitle: '今晚八点啊打发打发阿萨德发射点发三分今晚八点啊打发打发阿萨德发射点发三分', time: '今天 14:19', path: '/notice' },
                { title: '动态通知', subtitle: '啊啊恢复了您的评a阿萨德发射点发大分论啊啊恢复了您的评论啊啊恢复了您的评论啊啊恢复了您的评论啊啊恢复了您的评论', time: '今天 14:19', path: '/systemnotice' }, { title: '动态通知', subtitle: '今晚八点啊打发打发阿萨德发射点发三分今晚八点啊打发打发阿萨德发射点发三分', time: '今天 14:19', path: '/notice' },
                { title: '动态通知', subtitle: '啊啊恢复了您的评a阿萨德发射点发大分论啊啊恢复了您的评论啊啊恢复了您的评论啊啊恢复了您的评论啊啊恢复了您的评论', time: '今天 14:19', path: '/systemnotice' }, { title: '动态通知', subtitle: '今晚八点啊打发打发阿萨德发射点发三分今晚八点啊打发打发阿萨德发射点发三分', time: '今天 14:19', path: '/notice' },
                { title: '动态通知', subtitle: '啊啊恢复了您的评a阿萨德发射点发大分论啊啊恢复了您的评论啊啊恢复了您的评论啊啊恢复了您的评论啊啊恢复了您的评论', time: '今天 14:19', path: '/systemnotice' }, { title: '动态通知', subtitle: '今晚八点啊打发打发阿萨德发射点发三分今晚八点啊打发打发阿萨德发射点发三分', time: '今天 14:19', path: '/notice' },
                { title: '动态通知', subtitle: '啊啊恢复了您的评a阿萨德发射点发大分论啊啊恢复了您的评论啊啊恢复了您的评论啊啊恢复了您的评论啊啊恢复了您的评论', time: '今天 14:19', path: '/systemnotice' }, { title: '动态通知', subtitle: '今晚八点啊打发打发阿萨德发射点发三分今晚八点啊打发打发阿萨德发射点发三分', time: '今天 14:19', path: '/notice' }
            ]
        }
    },
    components: {
        'v-SytemNotices': SytemNotices
    },
    methods: {
        toNext(path) {
            this.$router.push(path)
        }
    },
    beforeRouteEnter(to, from, next) {
    document.querySelector('title').innerText = '系统通知';
    next()
  },
}
</script>




