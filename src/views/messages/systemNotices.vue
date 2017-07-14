<template>
    <div class="systemNoticesWrap">
        <v-SytemNotices v-for="list in noticeLoglists" :title="list.title" :content="list.content" :createTime="list.createTime" :key="list.index"></v-SytemNotices>
        <Nomore v-show="noticeLoglists.length>10 || noticeLoglists.length==0" :isNomoreShow='isNomoreShow'></Nomore>
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
                        document.querySelector('#app').removeEventListener('scroll', that.handleScrollsy)
                    }
                    this.page++
                } else {
                    toast(data.data.message)
                }
            })
        },
        handleScrollsy() {
            let scrollTop = document.querySelector('#app').scrollTop;
            //246
            let pageHeight = document.querySelector('#app').offsetHeight; //1334
            //1540
            let allHeight = document.querySelector('.systemNoticesWrap').offsetHeight+20;
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
            document.querySelector('#app').addEventListener('scroll', that.handleScrollsy)
        }
    },
    beforeDestroy(){
      document.querySelector('#app').removeEventListener('scroll', this.handleScrollsy)
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




