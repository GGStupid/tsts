<template>
    <div class="newDetailWrap">
        <div class="top">
            <div class="title" v-text="title">爱的</div>
            <div class="about">
                <span class="type" v-text="author">寒夜深度</span>
                <span class="time" v-text="updateTime">2016-10-10 10:32</span>
            </div>
        </div>
        <div class="newContent" v-html="content">
            阿斯蒂芬爱的色放安德森阿斯蒂芬阿斯蒂芬大事发生地方阿斯蒂 阿斯蒂芬爱的色放安德森阿斯蒂芬阿斯蒂芬大芬阿斯蒂芬大事发生地方阿斯蒂 阿斯蒂芬爱的色放安德森阿斯蒂芬阿斯蒂芬大事发生地方阿斯蒂 安德森阿斯蒂芬阿斯蒂芬大事发生地
        </div>
        <div class="toTop" v-show="scrollTop>5" @click="toTop">
            <img src="../../assets/zixun_details_icon_top@2x.png" alt="">
        </div>
    </div>
</template>
<script>
import market from '@/api/market/index'
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
        let id = this.$route.params.product_id
        let sendData = {
            newsId: id
        }
        market.newsId(sendData).then(data => {
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
        document.querySelector('title').innerText = '新闻详情'
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
            font-size: 0.5333rem;
            color: #eee;
            font-weight: 500;
            line-height: 1.5;
        }
        .about {
            font-size: 0.32rem;
            color: #999;
            margin: @p30 0 0.5866rem;
        }
    }
    .newContent {
        font-size: 0.426667rem;
        color: #999;
        line-height: 1.5;
        p {
            strong {
                width: 9.466667rem!important;
            }
        }
    }
    .toTop {
        position: fixed;
        bottom: 0.6rem;
        right: 0.5rem;
        img {
            width: 1rem;
            height: 1rem;
        }
    }
}
</style>
