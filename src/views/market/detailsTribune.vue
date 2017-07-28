<template>
    <div class="detailsTribuneWrap">
        <div class="detailsTribuneContent">
            <div class="listWrap">
                <div class="tribuneList" v-for="(comment,index) in filterMy(commentLists)" :key="index">
                    <span class="avatar">
                        <img :src="comment.avatarPath?baseImgUrl+comment.avatarPath:require('../../assets/mine_avatar_default.png')" alt="">
                    </span>
                    <div class="right">
                        <div class="top">
                            <div class="name">
                                {{comment.nickName}}
                                <img v-show="comment.isAuthentication" src="../../assets/quotes_forum_v.png" alt="">
                            </div>
                            <div class="commentsabout">
                                <span class="icon" @click="addZans(comment.id,index)">
                                    <img :src="comment.isLike==true?require('../../assets/quotes_forum_icon_zan_s.png'):require('../../assets/quotes_forum_icon_zan_n.png')" alt=""> {{comment.likeCount}}
                                </span>
                                <span class="icon" @click="addReport(comment)">
                                    <img :src="comment.isComment==true?require('../../assets/quotes_forum_icon_comt_s.png'):require('../../assets/quotes_forum_icon_comt_n.png')" alt=""> {{comment.commentCount}}
                                </span>
                            </div>
                        </div>
                        <div class="createTimes">
                            {{comment.createTime}}
                        </div>
                        <div class="content" v-show="comment.content">
                            {{comment.content}}
                        </div>
                        <div class="imgContent" v-show="comment.picArr.length>0" v-for="(imgTeam,index) in comment.picArr" :key="index">
                            <img :src="baseImgUrl+imgTeam" alt="" @click="open(baseImgUrl+imgTeam,comment.picArr)">
                        </div>
                        <div class="comments" v-show="comment.likeCount>0 || comment.commentCount>0">
                            <div class="zans" v-show="comment.likeCount>0">
                                <img src="../../assets/quotes_forum_icon_zan_s.png" alt="">
                                <span class="answer">{{ comment.forumLikes | zansName}}</span>
                            </div>
                            <div class="commentList" v-show="comment.commentCount>0" v-for="(ModelList,index) in comment.commentModelList" :key="index">
                                <div class="modelList" v-if="ModelList.parentUserId">
                                    <span class="answer">{{ModelList.nickName}}</span>
                                    回复
                                    <span class="answer">{{ModelList.parentNickName}}</span>
                                    <span class="comListContent" @click="answerReport(comment.id,ModelList)">：{{ModelList.content}}</span>
                                </div>
                                <div class="modelList" v-else>
                                    <span class="answer">{{ModelList.nickName}}</span>
                                    <span class="comListContent" @click="answerReport(comment.id,ModelList)">：{{ModelList.content}}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style="color:#acacac;padding: 0.4rem;
                          text-align: center;
                          font-size: 0.4rem;" v-show="commentLists.length==0">
                    暂无数据
                </div>
        </div>
        <div class="footer">
            <span @click="releaseComments">我也来说一句...</span>
            <!--<input type="text" id="commentInput" autofocus="autofocus" v-show="isInputShow">-->
        </div>
    </div>
</template>

<script>
import market from '@/api/market/index'
import mine from '@/api/mine/index'
import { toast } from '@/util/index'
export default {
    data() {
        return {
            baseImgUrl: this.$store.state.baseImgUrl,
            title: this.$store.state.title,
            userId: this.$store.state.userInfor.id,
            page: 1,
            rows: 5,
            productId: this.$store.state.productId,
            commentLists: [
                // {
                //     avatarImg: require('../../assets/quotes_forum_avatar.png'),
                //     name: 'a阿道夫',
                //     isAuthentication: true,
                //     zansNum: 0,
                //     reportNum: 10,
                //     time: '06-01',
                //     content: '大师傅阿道夫嗷嗷待食 大师傅阿道夫嗷嗷待食 大师傅阿道夫嗷嗷待食 大师傅阿道夫嗷嗷待食 大师傅阿道夫嗷嗷待食 大师傅阿道夫嗷嗷待食 大师傅阿道夫嗷嗷待食 大师傅阿道夫嗷嗷待食 大师傅阿道夫嗷嗷待食 大师傅阿道夫嗷嗷待食 大师傅阿道夫嗷嗷待食 大师傅阿道夫嗷嗷待食 大师傅阿道夫嗷嗷待食 大师傅阿道夫嗷嗷待食 大师傅阿道夫嗷嗷待食 大师傅阿道夫嗷嗷待食',
                //     answerLists: '阿萨德发,阿萨德发,阿萨德发,阿萨德发,阿萨德发,阿萨德发,阿萨德发,阿萨德发',
                //     answerName: '我',
                //     answerContent: '买水电费阿斯蒂芬啊速达阿斯蒂芬阿萨德发送到啊速达发射点发苏打撒旦法地方a卖',
                // },
                // {
                //     avatarImg: require('../../assets/quotes_forum_avatar.png'),
                //     name: 'a阿道夫',
                //     isAuthentication: false,
                //     zansNum: 2,
                //     reportNum: 2,
                //     time: '06-01',
                //     content: '大师傅阿道夫嗷嗷待食',
                //     answerLists: '阿萨德发,阿萨德发,阿萨德发,阿萨德发,阿萨德发,阿萨德发,阿萨德发,阿萨德发',
                //     answerName: '我',
                //     answerContent: '买水电费阿斯蒂芬啊速达阿斯蒂芬阿萨德发送到啊速达发射点发苏打撒旦法地方a卖',
                // }
            ],
            loading: false
        }
    },
    methods: {
        loadCommentLists() {
            var that = this
            this.loading = true
            let sendData = {
                productId: this.productId,
                page: this.page,
                rows: this.rows
            }
            market.getforums(sendData).then(data => {
                if (data.data.code == 200) {
                    this.loading = false
                    if (!data.data.data.rows) return
                    data.data.data.rows.forEach(function (element) {
                        that.commentLists.push(element)
                    }, this);
                    if (data.data.data.rows.length == 0) {
                        document.querySelector('.detailsTribuneContent').removeEventListener('scroll', that.handleScroll)
                    }
                    this.page++
                } else {
                    toast(data.data.message)
                }
            })
        },
        handleScroll() {
            let scrollTop = document.querySelector('.detailsTribuneContent').scrollTop;
            let pageHeight = document.querySelector('.detailsTribuneContent').offsetHeight;
            let allHeight = document.querySelector('.listWrap').offsetHeight;
            let a = allHeight - scrollTop - pageHeight
            if (a >= 0 && a <= 50) {
                if (this.loading) return
                this.loadCommentLists();
            }
        },
        filterMy(value) {
            if (!value) return
            value.map(i => {
                if (i.userId == this.userId) {
                    i.nickName = '我'
                }
                i.commentModelList.map(n => {
                    if (n.userId == this.userId) {
                        n.nickName = '我'
                        i.isComment = true
                    }
                    if (n.parentUserId == this.userId) {
                        n.parentNickName = '我'
                    }
                })
                i.forumLikes.map(t => {
                    if (t.userId == this.userId) {
                        t.nickName = '我'
                        i.isLike = true
                    }
                })
            })
            return value
        },
        addZans(id, index) {
            console.log('addZans')
            let sendData = {
                forumId: id
            }
            market.like(sendData).then(data => {
                if (data.data.code == 200) {
                    this.commentLists.splice(index, 1, data.data.data)
                } else {
                    toast(data.data.message)
                }
            })
        },
        addReport(comment) {
            console.log('addReport')
            console.log(comment)
            let commentSendData = {
                forumId: comment.id,
                parentId: '',
                parentUserId: '',
            }
            this.$store.dispatch('commentSendData', commentSendData)
            this.$router.push('/commentReport')
        },
        answerReport(id, ModelList) {
            console.log('answerReport')
            let commentSendData = {
                forumId: id,
                parentId: ModelList.id,
                parentUserId: ModelList.userId
            }
            this.$store.dispatch('commentSendData', commentSendData)
            this.$router.push('/commentReport')
        },
        open(src, arr) {
            console.log('open')
            let imgs = [];
            let current = src
            if (arr.length == 0) return
            arr.map(item => {
                imgs.push(this.baseImgUrl + item)
            })
            WeixinJSBridge.invoke("imagePreview", {
                "urls": imgs,
                "current": current
            })
        },
        releaseComments() {
            console.log('releaseComments')
            this.$router.push('/releaseComments')
        }
    },
    filters: {
        zansName(item) {
            if (!item) return
            let arr = []
            item.map(i => {
                arr.push(i.nickName)
            })
            let str = arr.join(',')
            return str
        }
    },
    mounted() {
        let that = this
        if (that.page === 1) {
            that.loadCommentLists();
            document.querySelector('.detailsTribuneContent').addEventListener('scroll', that.handleScroll);
        }
        mine.getUserInforPost().then((data) => {
            this.$store.dispatch('userInfor', data.data.data)
        })
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
    .detailsTribuneContent {
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
                    display: inline-block;
                    width: 0.96rem;
                    height: 0.96rem;
                    text-align: center;
                    line-height: 0.96rem;
                    overflow: hidden;
                    border-radius: 50%;
                    margin-right: @p30;
                    img {
                        width: 0.96rem;
                        height: 0.96rem;
                    }
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
                    .createTimes {
                        font-size: 0.32rem;
                        color: #999;
                    }
                    .content {
                        font-size: 0.37333rem;
                        color: #acacac;
                    }
                    .imgContent {
                        display: inline-block;
                        position: relative;
                        width: 1.8667rem;
                        height: 1.8667rem;
                        margin-right: 0.1333rem;
                        margin-bottom: 0.1333rem;
                        margin-top: 0.1333rem;
                        img {
                            width: 1.8667rem;
                            height: 1.8667rem;
                        }
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
        span,
        input {
            width: 9.2rem;
            height: 0.85333rem;
            line-height: 0.85333rem;
            color: #ccc;
            background-color: #fff;
            border-radius: 0.08rem;
            padding-left: 0.2rem;
        }
    }
}
</style>
