<template>
  <div>
    <v-WhiteToastButton2 :isShow="isShow" msg="为了保障您的账户安全，请先进行实名认证" leftText="去认证" @toastLeft="toastLeft" rightText="取消" @toastRight="toastRight"></v-WhiteToastButton2>
    <v-HeadSetting :icon="avatarUrl" :title="nickName" @toNext="userSetting()"></v-HeadSetting>
    <v-AccountInformation></v-AccountInformation>
    <div class="listWrap">
      <v-IconTextArrow :icon="myIssuerIcon" title="我投资的发行人" @toNext="myIssuer"></v-IconTextArrow>
      <v-IconTextArrow :icon="fundDetailsIcon" title="资金明细" @toNext="fundDetails"></v-IconTextArrow>
      <v-IconTextArrow :icon="myBackIcon" title="我的银行卡" @toNext="myBack"></v-IconTextArrow>
      <v-IconTextArrow :icon="invitingFriendsIcon" title="邀请好友" @toNext="invitingFriends"></v-IconTextArrow>
    </div>
    <div class="aboutWrap">
      <v-IconTextArrow :icon="helpCenterIcon" title="帮助中心" @toNext="helpCenter"></v-IconTextArrow>
      <!--<v-IconTextArrow :icon="aboutUsIcon" title="关于我们" @toNext="aboutUs"></v-IconTextArrow>-->
    </div>
  </div>
</template>

<script>
import Content from '@/components/Content'
import Footer from '@/components/Footer'
import HeadSetting from '@/components/mine/HeadSetting'
import AccountInformation from '@/components/mine/AccountInformation'
import IconTextArrow from '@/components/mine/IconTextArrow'
import WhiteToastButton2 from '@/components/WhiteToastButton2'
import mine from '@/api/mine/index'
import { toast } from '@/util/index'
export default {
  data() {
    return {
      userIdentify:{},
      isShow:false,
      realnameStatus:'',
      headSetting: {
        icon: require('../../assets/mine_avatar_default.png'),
        title: '用户昵称'
      },
      myIssuerIcon: require('../../assets/mine_icon_issuer.png'),
      fundDetailsIcon: require('../../assets/mine_icon_fund details.png'),
      myBackIcon: require('../../assets/mine_icon_bank card.png'),
      invitingFriendsIcon: require('../../assets/mine_icon_invite.png'),
      helpCenterIcon: require('../../assets/mine_icon_help.png'),
      aboutUsIcon: require('../../assets/mine_icon_about.png'),
    }
  },
  computed:{
    avatarUrl(){
      return this.$store.state.userInfor.avatarUrl ? this.$store.state.userInfor.avatarUrl : require('../../assets/mine_avatar_default.png')
    },
    nickName(){
      return this.$store.state.userInfor.nickName ? this.$store.state.userInfor.nickName :'用户昵称'
    }
  },
  methods: {
    toastLeft(){
      console.log('toastLeft')
      this.$router.push('/authentication')
    },
    toastRight(){
      console.log('toastRight')
      this.isShow=false
    },
    userSetting() {
      console.log('userSetting')
      this.$router.push('/userSetting')
    },
    myIssuer() {
      console.log('myIssuer')
      this.$router.push('/myIssuer')
    },
    fundDetails() {
      console.log('fundDetails')
      this.$router.push('/fundDetails')
    },
    myBack() {
      console.log('myBack')
      if(this.userIdentify.realnameStatus==2){
        toast('您的实名认证正在审核中')
        return
      }
      if(this.realnameStatus==1 || this.realnameStatus==4){
       this.isShow=true
       return
      }
      this.$router.push('/myBack')
    },
    invitingFriends() {
      console.log('invitingFriends')
      this.$router.push('/invitingFriends')
    },
    helpCenter() {
      console.log('helpCenter')
      this.$router.push('/helpCenter')
    },
    aboutUs() {
      console.log('aboutUs')
    }
  },
  components: {
    'v-Content': Content,
    'v-Footer': Footer,
    'v-HeadSetting': HeadSetting,
    'v-AccountInformation': AccountInformation,
    'v-IconTextArrow': IconTextArrow,
    'v-WhiteToastButton2':WhiteToastButton2
  },
  mounted() {
    mine.getUserInforPost().then((data) => {
      this.$store.dispatch('userInfor',data.data.data)
      this.userIdentify=data.data.data.userIdentify
      this.realnameStatus=data.data.data.userIdentify.realnameStatus
    if(data.data.data.userIdentify.realnameStatus!=3 && data.data.data.userIdentify.realnameStatus!=2){
      this.isShow=true
    }
    })
  },
  beforeRouteEnter(to, from, next) {
    document.querySelector('title').innerText = '我的';
    next()
  },
}
</script>

<style lang="less" scoped>
.listWrap,
.aboutWrap {
  margin-bottom: 0.26667rem;
}
</style>


