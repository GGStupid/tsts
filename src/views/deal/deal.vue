<template>
  <div class="dealWrap">
    <!--<v-WhiteToastButton1 :isShow="isShow" :msg="msg" @toastConfirm="toastConfirm"></v-WhiteToastButton1>-->
    <v-FlexTab :tabTitles="tabTitles" @toNext="toNext"></v-FlexTab>
    <div class="dealContentWrap">
      <component :is="currentView"></component>
    </div>
  </div>
</template>

<script>
import Content from '@/components/Content'
import Footer from '@/components/Footer'
import FlexTab from '@/components/FlexTab'
import WhiteToastButton1 from '@/components/WhiteToastButton1'
import Attorn from '@/components/deal/Attorn'
import Buy from '@/components/deal/Buy'
import Detailed from '@/components/deal/Detailed'
import Order from '@/components/deal/Order'
import Purchased from '@/components/deal/Purchased'

export default {
  data() {
    return {
      isShow: true,
      msg: '该功能暂未开放',
      tabTitles: [
        { title: '购买', component: 'Buy' },
        { title: '转让', component: 'Attorn' },
        { title: '订单', component: 'Order' },
        { title: '已购', component: 'Purchased' },
        { title: '明细', component: 'Detailed' }
      ],
    }
  },
  computed:{
    currentView(){
      return this.$store.state.currentView
    }
  },
  methods: {
    toNext(data) {
      console.log(data)
       this.$store.dispatch('currentView', data.component)
    },
    toastConfirm() {
      this.$router.push('/home/news')
    }
  },
  beforeRouteEnter(to, from, next) {
    document.querySelector('title').innerText = '买卖'
    next(vm=>{
       let rge = /pricePersonDetail/
    if (rge.test(from.path)) {
      console.log(rge.test(from.path))
    } else {
      vm.$store.dispatch('code', '')
      vm.$store.dispatch('attorncode', '')
    }
    })
  },
  components: {
    'v-Content': Content,
    'v-Footer': Footer,
    'v-WhiteToastButton1': WhiteToastButton1,
    'v-FlexTab': FlexTab,
    Attorn,
    Buy,
    Detailed,
    Order,
    Purchased,
  }
}
</script>
<style lang="less" scoped>
@import '../../less/config.less';
.dealContentWrap {
  position: absolute;
  top: 1.06667rem;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 11;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  background-color: #191a22;
}
</style>


