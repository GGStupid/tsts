<template>
  <div class="tribuneWrap">
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
          <div class="content">
            {{comment.content}}
          </div>
          <div class="comments" v-show="comment.zansNum>0 || comment.reportNum>0">
            <div class="zans" v-show="comment.zansNum>0">
              <img src="../../assets/quotes_forum_icon_zan_s.png" alt="">
              <span class="answer">{{comment.answerLists}}</span>
            </div>
            <div class="commentList" v-show="comment.reportNum>0">
              <span class="answer">{{comment.answerName}}</span>
              <span class="comListContent">：{{comment.answerContent}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="moreComments" @click="moreComments">
      查看更多
    </div>
  </div>
</template>

<script>
import market from '@/api/market/index'
export default {
  data() {
    return {
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
    addZans(){
      console.log('addZans')
    },
    addReport(){
      console.log('addReport')
    },
    moreComments() {
      console.log('moreComments')
      this.$router.push('/detailsTribune')
    }
  },
  mounted(){
    let sendData = {
      productId: this.$route.params.product_id,
      page:1,
      rows:2
    }
    market.getforums(sendData).then(data => {
      console.log(data)
    })
  }
}
</script>

<style lang="less" scoped>
@import '../../less/config.less';
.tribuneWrap {
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
        .content {
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
  .moreComments {
    padding: 0.4rem;
    text-align: center;
    font-size: 0.4rem;
    color: #eee;
  }
}
</style>
