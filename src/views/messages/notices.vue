<template>
    <div class="noticesWrap">
        <v-Notices v-for="list in announceslists" :content="list.content" :createTime="list.createTime" :key="list.index"></v-Notices>
        <Nomore v-show="announceslists.length>10" :isNomoreShow='isNomoreShow'></Nomore>
        <div class="nodata" v-show="announceslists.length==0">
            <img src="../../assets/nomessages.png" alt="">
        </div>
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
            isNomoreShow: false,
            loading: false
        }
    },
    methods: {
        loadannounces() {
            console.log('announceslists')
            this.loading = true
            let sendData = {
                page: this.page,
                rows: this.rows
            }
            messages.announces(sendData).then(data => {
                console.log(data)
                let that = this
                if (data.data.code == 200) {
                    this.loading = false
                    if (data.data.data.rows.length==0) return 
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
            let scrollTop = document.querySelector('#app').scrollTop;
            let pageHeight = document.querySelector('#app').offsetHeight;
            let allHeight = document.querySelector('.noticesWrap').offsetHeight;
            let a = allHeight - scrollTop - pageHeight
            if (a >= 0 && a <= 50) {
                if (this.loading) return
                this.loadannounces();
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
    beforeDestroy() {
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
<style lang="less" scoped>
.nodata {
    text-align: center;
    margin-top: 2.133333rem;
    img {
        width: 5.706667rem;
        height: 4.76rem;
    }
}
</style>


