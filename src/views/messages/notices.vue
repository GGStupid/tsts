<template>
    <div class="noticesWrap">
        <v-Notices v-for="list in announceslists" :content="list.content" :createTime="list.createTime" :key="list.index"></v-Notices>
        <Nomore v-show="announceslists.length>10 || announceslists.length==0" :isNomoreShow='isNomoreShow'></Nomore>
    </div>
</template>

<script>
import Notices from '@/components/messages/Notices.vue'
import Nomore from '@/components/Nomore'
import messages from '@/api/messages'
import { toast } from '@/util/index'
export default {
    data() {
        return {
            page: 1,
            rows: 10,
            announceslists: [],
            isNomoreShow: false
        }
    },
    methods: {
        loadannounces() {
            console.log('announceslists')
            let sendData = {
                page: this.page,
                rows: this.rows
            }
            messages.announces(sendData).then(data => {
                console.log(data)
                let that = this
                if (data.data.code == 200) {
                    if (!data.data.data.rows) return
                    data.data.data.rows.forEach(function (element) {
                        this.announceslists.push(element)
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
            console.log(2222222)
            let scrollTop = document.querySelector('#app').scrollTop;
            let pageHeight = document.querySelector('#app').offsetHeight;
            let allHeight = document.querySelector('.noticesWrap').offsetHeight;
            if (scrollTop + pageHeight == allHeight) {
                this.loadannounces()
            }
        },
        toNext() {
            this.$router.push()
        }
    },
    mounted() {
        let that = this
        if (this.page == 1) {
            this.loadannounces()
            document.querySelector('#app').addEventListener('scroll', that.handleScroll)
        }
    },
    beforeDestroy(){
      document.querySelector('#app').removeEventListener('scroll', this.handleScroll)
    },
    beforeRouteEnter(to, from, next) {
        document.querySelector('title').innerText = '通知';
        next()
    },
    components: {
        'v-Notices': Notices,
        Nomore
    },
}
</script>

