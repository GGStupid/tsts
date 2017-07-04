<template>
    <div class="newDetailWrap">
        <div class="top">
            <div class="title" v-text="title"></div>
            <div class="about">
                <span class="type" v-text="author"></span>
                <span class="time" v-text="updateTime"></span>
            </div>
        </div>
        <div class="newContent" v-html="content">
        </div>
        <div class="toTop" v-show="scrollTop>5" @click="toTop">
            <img src="../../assets/zixun_details_icon_top@2x.png" alt="">
        </div>
    </div>
</template>
<script>
import news from '@/api/news/index'
export default {
    data() {
        return {
            title: '',
            author: '',
            updateTime: '',
            content: '',
            meta: '',
            scrollTop: 0
        }
    },
    methods: {
        toTop() {
            console.log('toTop')
            document.querySelector('#app').scrollTop = 0
            this.scrollTop = 0
        }
    },
    mounted() {
        console.log('newDetail')
        let id = this.$route.params.id
        let sendData = {
            informationId: id
        }
        news.informationId(sendData).then(data => {
            this.title = data.data.data.title
            this.author = data.data.data.author
            this.updateTime = data.data.data.updateTime
            this.content = data.data.data.content
        })
        document.querySelector('#app').addEventListener('scroll', () => {
            var that = this
            setTimeout(function () {
                that.scrollTop = document.querySelector('#app').scrollTop;
            }, 500);
        });
    },
    beforeRouteEnter(to, from, next) {
        document.querySelector('title').innerText = '资讯详情'
        next(vm => {
            vm.meta = document.querySelector('meta[name="viewport"]').content
            document.querySelector('meta[name="viewport"]').content = "width=device-width,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=no"
        })
    },
    beforeRouteLeave(to, from, next) {
        document.querySelector('meta[name="viewport"]').content = this.meta
        next()
    }
}
</script>

<style lang="less" scoped>
@import '../../less/config.less';
.newDetailWrap {
    padding: 0.32rem 0.26667rem 0.32rem;
    background-color: #20212a;
    .top {
        .title {
            font-size: 20px;
            color: #eee;
            font-weight: 500;
            line-height: 1.5;
        }
        .about {
            font-size: 12px;
            color: #999;
            margin: 15px 0;
        }
    }
    .newContent {
        color: #999;
    }
    .toTop {
        position: fixed;
        bottom: 0.6rem;
        right: 0.5rem;
        img {
            width: 37.5px;
            height: 37.5px;
        }
    }
}
</style>
