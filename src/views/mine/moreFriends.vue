<template>
    <div class="moreFriendsWrap">
        <div class="title">
            <span>好友昵称</span>
            <span class="middle">手机号码</span>
            <span class="right">注册时间</span>
        </div>
    
        <div class="friendsList" v-for="(friend,index) in friends" :key="index">
            <span class="name">
                {{friend.nickName}}
            </span>
            <span class="tel">
                {{friend.mobilePhone}}
            </span>
            <span class="right">
                {{friend.createTime}}
            </span>
        </div>
        <Nomore :isNomoreShow='isNomoreShow'></Nomore>
    </div>
</template>

<script>
import mine from '@/api/mine/index'
import Nomore from '@/components/Nomore'
import { toast } from '@/util/index'
export default {
    data() {
        return {
            page: 1,
            rows: 22,
            friends: [],
            isNomoreShow: false,
        }
    },
    methods: {
        loadFriends() {
            var that = this
            let sendData = {
                page: this.page,
                rows: this.rows
            }
            mine.inviteUser(sendData).then(data => {
                data.data.data.rows.forEach(function (element) {
                    that.friends.push(element)
                }, this);
                if (data.data.data.rows.length == 0) {
                    this.isNomoreShow = true
                    document.querySelector('#app').removeEventListener('scroll', that.handleScroll)
                }
                this.page++
            })
        },
        handleScroll() {
            let scrollTop = document.querySelector('#app').scrollTop;
            let pageHeight = window.innerHeight;
            let allHeight = document.querySelector('.moreFriendsWrap').offsetHeight;
            if (scrollTop + pageHeight == allHeight) {
                this.loadFriends();
            }
        }
    },
    mounted() {
        let that = this;
        if (that.page === 1) {
            that.loadFriends();
            document.querySelector('#app').addEventListener('scroll', that.handleScroll);
        }
    },
    components: {
        Nomore
    }
}
</script>

<style lang="less" scoped>
@import '../../less/config.less';
.moreFriendsWrap {
    font-size: 0.37333rem;
    .title {
        height: 1.04rem;
        padding: 0 @p30;
        color: #acacac;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: @bgcolor;
        margin-bottom: 0.26667rem;
        span {
            width: 3rem;
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .right {
            text-align: right;
        }
    }
    .friendsList {
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 1.41333rem;
        padding: 0 @p30;
        color: #eee;
        background-color: @bgcolor;
        border-bottom: solid 1px @bordercolor;
        span {
            width: 3rem;
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .right {
            text-align: right;
        }
    }
}
</style>
