<template>
  <div>
    <v-Content>
      <v-HeadSetting :icon="headSetting.icon" :title="headSetting.title" @toNext="userSetting()"></v-HeadSetting>
      <v-AccountInformation></v-AccountInformation>
      <div class="listWrap">
        <v-IconTextArrow :icon="myIssuerIcon" title="我投资的发行人" @toNext="myIssuer"></v-IconTextArrow>
        <v-IconTextArrow :icon="fundDetailsIcon" title="资金明细" @toNext="fundDetails"></v-IconTextArrow>
        <v-IconTextArrow :icon="myBackIcon" title="我的银行卡" @toNext="myBack"></v-IconTextArrow>
        <v-IconTextArrow :icon="invitingFriendsIcon" title="邀请好友" @toNext="invitingFriends"></v-IconTextArrow>
      </div>
      <div class="aboutWrap">
        <v-IconTextArrow :icon="helpCenterIcon" title="帮助中心" @toNext="helpCenter"></v-IconTextArrow>
        <v-IconTextArrow :icon="aboutUsIcon" title="关于我们" @toNext="aboutUs"></v-IconTextArrow>
      </div>
    </v-Content>
    <v-Footer></v-Footer>
  </div>
</template>

<script>
import Content from '@/components/Content'
import Footer from '@/components/Footer'
import HeadSetting from '@/components/mine/HeadSetting'
import AccountInformation from '@/components/mine/AccountInformation'
import IconTextArrow from '@/components/mine/IconTextArrow'

export default {
  data() {
    return {
      headSetting: {
        icon: require('../../assets/mine_avatar_default.png'),
        title: '用户昵称'
      },
      myIssuerIcon: require('../../assets/mine_icon_issuer.png'),
      fundDetailsIcon: require('../../assets/mine_icon_fund details.png'),
      myBackIcon: require('../../assets/mine_icon_bank card.png'),
      invitingFriendsIcon: require('../../assets/mine_icon_invite.png'),
      helpCenterIcon: require('../../assets/mine_icon_help.png'),
      aboutUsIcon:require('../../assets/mine_icon_about.png'),
    }
  },
  methods: {
    userSetting() {
      console.log('userSetting')
       this.$router.push('/userSetting')
    },
    myIssuer() {
      console.log('myIssuer')
    },
    fundDetails() {
      console.log('fundDetails')
    },
    myBack() {
      console.log('myBack')
    },
    invitingFriends() {
      console.log('invitingFriends')
    },
    helpCenter(){
      console.log('helpCenter')
      this.$router.push('/helpCenter')
    },
    aboutUs(){
      console.log('aboutUs')
    }
  },
  components: {
    'v-Content': Content,
    'v-Footer': Footer,
    'v-HeadSetting': HeadSetting,
    'v-AccountInformation': AccountInformation,
    'v-IconTextArrow': IconTextArrow
  },
  beforeRouteEnter(to, from, next) {
    document.querySelector('title').innerText = '我的';
    next()
  },
}
</script>

<style lang="less" scoped>
.listWrap,.aboutWrap{
  margin-bottom: 0.26667rem;
}

</style>


