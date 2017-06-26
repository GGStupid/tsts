<template>
    <div class="detailsTribuneWrap">
        <div class="content">
            <div class="listWrap">
                <div class="tribuneList" v-for="(comment,index) in commentLists" :key="index">
                    <img class="avatar" :src="comment.avatarImg" alt="">
                    <div class="right">
                        <div class="top">
                            <div class="name">
                                {{comment.name}}
                                <img v-show="comment.isAuthentication" src="../../assets/quotes_forum_v.png" alt="">
                            </div>
                            <div class="commentsabout">
                                <span class="icon" @click="addZans">
                                    <img :src="comment.zansNum>0?require('../../assets/quotes_forum_icon_zan_s.png'):require('../../assets/quotes_forum_icon_zan_n.png')" alt=""> {{comment.zansNum}}
                                </span>
                                <span class="icon" @click="addReport">
                                    <img :src="comment.reportNum>0?require('../../assets/quotes_forum_icon_comt_s.png'):require('../../assets/quotes_forum_icon_comt_n.png')" alt=""> {{comment.reportNum}}
                                </span>
                            </div>
                        </div>
                        <div class="times">
                            {{comment.time}}
                        </div>
                        <div class="commentcontent">
                            {{comment.content}}
                        </div>
                        <div class="comments" v-show="comment.zansNum>0 || comment.reportNum>0">
                            <div class="zans" v-show="comment.zansNum>0">
                                <img src="../../assets/quotes_forum_icon_zan_s.png" alt="">
                                <span class="answer">{{comment.answerLists}}</span>
                            </div>
                            <div class="commentList" @click="reportComment" v-show="comment.reportNum>0">
                                <span class="answer">{{comment.answerName}}</span>
                                <span class="comListContent">：{{comment.answerContent}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="footer">
            <input type="text" placeholder="我也来说一句...">
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            title: '胡灵（500060）',
            commentLists: [
                {
                    avatarImg: require('../../assets/quotes_forum_avatar.png'),
                    name: 'a阿道夫',
                    isAuthentication: true,
                    zansNum: 0,
                    reportNum: 10,
                    time: '06-01',
                    content: '大师傅阿道夫嗷嗷待食 大师傅阿道夫嗷嗷待食 大师傅阿道夫嗷嗷待食 大师傅阿道夫嗷嗷待食 大师傅阿道夫嗷嗷待食 大师傅阿道夫嗷嗷待食 大师傅阿道夫嗷嗷待食 大师傅阿道夫嗷嗷待食 大师傅阿道夫嗷嗷待食 大师傅阿道夫嗷嗷待食 大师傅阿道夫嗷嗷待食 大师傅阿道夫嗷嗷待食 大师傅阿道夫嗷嗷待食 大师傅阿道夫嗷嗷待食 大师傅阿道夫嗷嗷待食 大师傅阿道夫嗷嗷待食',
                    answerLists: '阿萨德发,阿萨德发,阿萨德发,阿萨德发,阿萨德发,阿萨德发,阿萨德发,阿萨德发',
                    answerName: '我',
                    answerContent: '买水电费阿斯蒂芬啊速达阿斯蒂芬阿萨德发送到啊速达发射点发苏打撒旦法地方a卖',
                },
                {
                    avatarImg: require('../../assets/quotes_forum_avatar.png'),
                    name: 'a阿道夫',
                    isAuthentication: false,
                    zansNum: 2,
                    reportNum: 2,
                    time: '06-01',
                    content: '大师傅阿道夫嗷嗷待食',
                    answerLists: '阿萨德发,阿萨德发,阿萨德发,阿萨德发,阿萨德发,阿萨德发,阿萨德发,阿萨德发',
                    answerName: '我',
                    answerContent: '买水电费阿斯蒂芬啊速达阿斯蒂芬阿萨德发送到啊速达发射点发苏打撒旦法地方a卖',
                }
            ]
        }
    },
    methods: {
        addZans() {
            console.log('addZans')
        },
        addReport() {
            console.log('addReport')
        },
        reportComment(){
            console.log('reportComment')
        }
    },
    beforeRouteEnter(to, from, next) {
        next(vm => {
            document.querySelector('title').innerText = vm.title
        })
    }
}
</script>

<style lang="less" scoped>
@import '../../less/config.less';
.detailsTribuneWrap {
    .content {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 1.386667rem;
        z-index: 10;
        overflow: auto;
        -webkit-overflow-scrolling: touch;
        background-color: #191a22;
        .listWrap {
            background-color: #20212a;
            .tribuneList {
                width: 9.2rem;
                padding: @p30 0;
                margin: 0 auto;
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid @bordercolor;
                .avatar {
                    flex: 0 0 0.96rem;
                    height: 0.96rem;
                    margin-right: @p30;
                }
                .right {
                    flex: 1 1 5rem;
                    line-height: 1.6;
                    .top {
                        display: flex;
                        justify-content: space-between;
                        font-size: 0.37333rem;
                        .name {
                            color: #fff;
                            img {
                                width: 0.37333rem;
                                vertical-align: text-top;
                            }
                        }
                        .commentsabout {
                            color: #999;
                            img {
                                width: 0.32rem;
                                vertical-align: text-top;
                            }
                            span:first-child {
                                margin-right: 0.32rem;
                            }
                        }
                    }
                    .times {
                        font-size: 0.32rem;
                        color: #999;
                    }
                    .commentcontent {
                        font-size: 0.37333rem;
                        color: #acacac;
                    }
                    .comments {
                        border-radius: 0.08rem;
                        border-top-left-radius: 0;
                        background-color: #2a2b35;
                        padding: 0.34667rem;
                        font-size: 0.32rem;
                        margin-top: 0.2rem;
                        line-height: 1.5;
                        position: relative;
                        &:before {
                            content: '';
                            position: absolute;
                            top: -0.2133rem;
                            left: 0;
                            width: 0;
                            height: 0;
                            border-bottom: 0.2133rem solid #2a2b35;
                            border-right: 0.2133rem solid transparent;
                        }
                        .answer {
                            color: #2379bd;
                        }
                        .zans {
                            margin-bottom: 0.2rem;
                            img {
                                width: 0.32rem;
                                margin-right: 0.1rem;
                                vertical-align: text-top;
                            }
                        }
                        .commentList {
                            color: #999;
                            line-height: 1.6;
                        }
                    }
                }
            }
        }
    }
    .footer {
        width: 100%;
        height: 1.386667rem;
        border-top: 1px solid #2a2a34;
        position: absolute;
        bottom: 0;
        font-size: 0.32rem;
        line-height: 1.2;
        color: #ddd;
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: #191a22;
        input {
            width: 9.2rem;
            height: 0.85333rem;
            background-color: #fff;
            border-radius: 0.08rem;
            padding-left: 0.2rem;
        }
    }
}
</style>
