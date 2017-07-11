<template>
    <div class="systemNotices">
        <v-SytemNotices v-for="list in noticeLoglists" :title="list.title" :content="list.content" :createTime="list.createTime" :key="list.index"></v-SytemNotices>
        <Nomore v-show="announceslists.length>10 || announceslists.length==0" :isNomoreShow='isNomoreShow'></Nomore>
    </div>
</template>

<script>
import SytemNotices from '@/components/messages/SytemNotices.vue'
import Nomore from '@/components/Nomore'
import messages from '@/api/messages'
import { toast } from '@/util/index'

export default {
    data() {
        return {
            page: 1,
            rows: 10,
            noticeLoglists: [],
            isNomoreShow: false
        }
    },
    methods: {
        loadnoticeLog() {
            console.log('noticeLoglists')
            let sendData = {
                page: this.page,
                rows: this.rows
            }
            messages.noticeLogs(sendData).then(data => {
                console.log(data)
                let that = this
                if (data.data.code == 200) {
                    if (!data.data.data.rows) return
                    data.data.data.rows.forEach(function (element) {
                        this.noticeLoglists.push(element)
                    }, this);
                    if (data.data.data.rows.length == 0) {
                        this.isNomoreShow = true
                        document.querySelector('#app').removeEventListener('scroll', that.handleScroll)
                    }
                    this.page++
                } else {
                    toast(data.data.message)
                }
            })
        },
        handleScroll() {
            let scrollTop = document.querySelector('#app').scrollTop;
            let pageHeight = document.querySelector('#app').offsetHeight;
            let allHeight = document.querySelector('.systemNotices').offsetHeight;
            if (scrollTop + pageHeight == allHeight) {
                this.loadnoticeLog()
            }
        },
        toNext() {
            this.$router.push()
        }
    },
    mounted() {
        let that = this
        if (this.page == 1) {
            this.loadnoticeLog()
            document.querySelector('#app').addEventListener('scroll', that.handleScroll)
        }
    },
    beforeRouteEnter(to, from, next) {
        document.querySelector('title').innerText = '系统通知';
        next()
    },
    components: {
        'v-SytemNotices': SytemNotices,
        Nomore
    },
}
</script>




