<template>
    <div class="invitingFriendsWrap">
        <img src="../../assets/invite_QR code_bg.png" alt="">
        <div class="content">
            <div class="introduce">
                <div>
                    1.该二维码是您的专属推广二维码，可直接右上角分享到朋友圈，QQ等渠道邀请好友进行注册。
                </div>
                <div>
                    2.使用微信扫一扫功能直接邀请您的好友注册。
                </div>
                <div>
                    3.长安保存图片后分享到朋友圈，QQ等各种渠道。
                </div>
            </div>
            <div class="friendsList">
                <div class="title">
                    <span class="line" style="left:0"></span>
                    <span class="font">我的好友</span>
                    <span class="line" style="right:0"></span>
                </div>
                <div class="main">
                    <img src="../../assets/invite_friend_bg.png" alt="">
                    <div class="listWrap">
                        <div class="top">
                            <span>
                                好友昵称
                            </span>
                            <span class="tel">
                                手机号码
                            </span>
                            <span>
                                注册时间
                            </span>
                        </div>
                        <div class="list" v-for="(friend,index) in friends" :key="index">
                            <span class="name">
                                {{friend.nickName}}
                            </span>
                            <span class="tel">
                                {{friend.mobilePhone}}
                            </span>
                            <span>
                                {{friend.createTime}}
                            </span>
                        </div>
                        <div class="end" @click="moreFriends" v-text="endTitle">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import mine from '@/api/mine/index'
export default {
    data() {
        return {
            friends: [
                // {
                //     nickName: '啊打发',
                //     mobilePhone: '135****1234',
                //     createTime: '2017-4-2'
                // },
                // {
                //     nickName: '啊打发',
                //     mobilePhone: '135****1234',
                //     createTime: '2017-4-2'
                // },{
                //     nickName: '啊打发',
                //     mobilePhone: '135****1234',
                //     createTime: '2017-4-2'
                // },{
                //     nickName: '啊打发',
                //     mobilePhone: '135****1234',
                //     createTime: '2017-4-2'
                // },
            ],
            endTitle:' 查看更多'
        }
    },
    methods:{
        moreFriends(){
            console.log('moreFriends')
            this.$router.push('/moreFriends')
        }
    },
    mounted(){
        let sendData={
            page:1,
            rows:8
        }
        mine.inviteUser(sendData).then(data=>{
            console.log(data.data)
            this.friends=data.data.data.rows
        })
    },
    beforeRouteEnter(to,from,next){
        document.querySelector('title').innerText="邀请好友"
        next()
    }
}
</script>

<style lang="less"  scoped>
@import '../../less/config.less';
.invitingFriendsWrap {
    width: 100%;
    height: 100%;
    background-color: #ffbe26;
    img {
        width: 100%;
    }
    .content {
        margin-top: -0.8rem;
        .introduce {
            padding: 1.0667rem;
            font-size: 0.346667rem;
            color: #904506;
            line-height: 1.8;
        }
        .friendsList {
            .title {
                width: 7.86667rem;
                margin: 0 auto;
                text-align: center;
                font-size: 0.37333rem;
                color: #904506;
                position: relative;
                .line {
                    width: 2.8rem;
                    height: 0.02667rem;
                    display: inline-block;
                    background-color: #b4784a;
                    position: absolute;
                    top: 0.2rem;
                }
            }
            .main {
                text-align: center;
                background-color: #ffbe26;
                padding-bottom:0.88rem; 
                img {
                    width: 8.9333rem;
                    margin-top: 0.3rem;
                }
                .listWrap {
                    width: 8.45333rem;
                    border-radius: 0.1333rem;
                    margin: -0.133rem auto;
                    background-color: #EEEEEE;
                    .top {
                        width: 7.89333rem;
                        margin: 0 auto;
                        height: 1.01333rem;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        font-size: 0.37333rem;
                        color: #333;
                        font-weight: 600;
                        border-bottom: 1px solid #f0e3c2;
                        .left {
                            flex: 0 0 2rem;
                            text-align: left;
                        }
                    }
                    .list {
                        width: 7.89333rem;
                        margin: 0 auto;
                        height: 1.01333rem;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        font-size: 0.32rem;
                        color: #666;
                        border-bottom: 1px solid #f0e3c2;
                        .name {
                            flex: 0 0 1.7rem;
                            text-align: left;
                        }
                        .tel {
                            flex: 0 0 2rem;
                            text-align: left;
                        }
                    }
                    .end{
                        width: 7.89333rem;
                        margin: 0 auto;
                        height: 1.01333rem;
                        line-height: 1.01333rem;
                         font-size: 0.37333rem;
                         color: #666
                    }
                }
            }
        }
    }
}
</style>
