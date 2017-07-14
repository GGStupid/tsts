<template>
  <div class="applyPurchaseWrap">
    <ApplayPayToast :isShow="isPayToast" :number='number' :productId='productId' @isPayToastHide='isPayToastHide' @cancelToast='cancelToast'></ApplayPayToast>
    <div class="titleWrap">
      {{productTitle}}
    </div>
    <div class="titleWrap">
      {{purchase_price}}
    </div>
    <div class="countWrap">
      <span class="button" @click="reduce">-</span>
      <span>{{number}}</span>
      <span class="button" @click="add">+</span>
    </div>
    <div class="tips">
      您已申购 {{number}} 秒,最多还可申购
      <span>{{purchase_number_max}}</span> 秒
    </div>
    <div class="confirButton" @click="confirmDelivery">
      申购
    </div>
    <div class="rlues">
      <div class="title">
        申购规则:
      </div>
      <p>
        1.申购数量需为100秒或其整数倍，最多可申购108000秒
      </p>
      <p>
        2.您可在6月8日20：00前进行申购，支付成功后冻结相应资金
      </p>
      <p>
        3.申购结束后进行摇号抽签，中签处理（6月9日9：25-9:29）,最小中签数量为100秒或其整数倍
      </p>
      <p>
        4.申购成功用户获得相应时间，未成功用户申购时间退回
      </p>
    </div>
  </div>
</template>
<script>
import market from '@/api/market/index'
import ApplayPayToast from '@/components/market/ApplayPayToast'
import { toast } from '@/util/index'
export default {
  data() {
    return {
      productTitle: '',
      purchase_price: '',
      purchase_number_max: '',
      addNumber: 100,
      isPayToast: false,
      number: 0,
      productId: this.$route.params.productId
    }
  },
  methods: {
    reduce() {
      console.log('reduce')
      if (this.number == 0) return
      this.number -= this.addNumber
    },
    add() {
      console.log('add')
      this.number += this.addNumber
    },
    confirmDelivery() {
      console.log('applayPurchase')
      if (this.number == 0) return toast('申购数量必须是100的整数倍')
      this.isPayToast = true
    },
    isPayToastHide(a) {
      console.log(a)
      this.isPayToast = a
    },
    cancelToast() {
      this.isPayToast = false
    },
  },
  mounted() {
    let sendData = {
      productId: this.$route.params.productId
    }
    market.detail(sendData).then(data => {
      if (data.data.code == 200) {
        console.log(data)
        this.productTitle = `${data.data.data.name}  ${data.data.data.code}`
        this.purchase_price = `${data.data.data.purchasePrice}元 / 秒`
        this.purchase_number_max = data.data.data.purchaseNumberMax
      } else {
        toast(data.data.message)
      }
    })
  },
  beforeRouteEnter(to, from, next) {
    document.querySelector('title').innerText = '申购'
    next()
  },
  components: {
    ApplayPayToast
  }
}
</script>

<style lang="less" scoped>
@import '../../less/config.less';
.applyPurchaseWrap {
  padding-top: @p30;
  background-color: @bgcolor;
  .titleWrap {
    margin: 0 auto;
    margin-bottom: .4rem;
    width: 8rem;
    height: 1.12rem;
    line-height: 1.12rem;
    border: 0.026667rem solid #333;
    color: #eee;
    font-size: 0.4rem;
    text-align: center
  }
  .countWrap {
    margin: 0 auto;
    margin-bottom: .4rem;
    width: 8rem;
    height: 1.12rem;
    border: 0.026667rem solid #333;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #eee;
    font-size: 0.4rem;
    .button {
      display: inline-block;
      font-size: 1rem;
      color: @yellow;
      width: 1.12rem;
      height: 1.12rem;
      line-height: 1.12rem;
      text-align: center;
      background-color: #333;
    }
  }
  .tips {
    margin: 0.50667rem auto 0.6667rem;
    width: 8rem;
    color: #999;
    font-size: 0.346667rem;
    span {
      color: @yellow;
    }
  }
  .confirButton {
    width: 8rem;
    height: 1.17333rem;
    line-height: 1.17333rem;
    margin: 0 auto;
    margin-bottom: .8rem;
    border-radius: 0.08rem;
    background-color: @yellow;
    font-size: 0.453333rem;
    color: #191a22;
    text-align: center;
  }
  .rlues {
    padding: @p30;
    color: #999;
    line-height: 1.8;
    font-size: .32rem;
    background-color: #191a22;
  }
}
</style>
