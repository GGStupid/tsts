<template>
  <div class="register1wrap">
    <div class="form">
      <div class="list">
        <span>手机号</span>
        <input type="tel" maxlength="11" v-model='phone' placeholder='请输入手机号' @keyup='isPhoneClean'>
        <img src="../../assets/icon_clean.png" class="rIcon" v-show="isphone" @click='cleanPhone' alt="">
      </div>
      <div class="list">
        <span>验证码</span>
        <input type="tel" maxlength="6" v-model='phoneCode' placeholder='请输入验证码'>
        <span @click='getphoneCode' v-text='phoneCodetitle' class="rIcon cdspan"></span>
      </div>
    </div>
    <v-Button title='下一步' :isActive='isActive' topNum='0.6667rem' @toNext='toNext'></v-Button>
  </div>
</template>

<script>
import login from '@/api/login/index'
import Button from '@/components/buttons/Button690'
import { toast, isPhone, isPassWord } from '@/util/index'
export default {
  data() {
    return {
      phone: '',
      phoneCodetitle: '获取验证码',
      isphone: false,
      count: 60,
      phoneCode: '',
      isActive: true
    }
  },
  components: {
    'v-Button': Button
  },
  methods: {
    isPhoneClean() {
      if (this.phone != '') {
        this.isphone = true
      } else {
        this.isphone = false
      }
    },
    cleanPhone() {
      this.phone = ''
      this.isphone = false
    },
    getphoneCode() {
      if (isPhone(this.phone)) {
        let sendData = {
          mobilePhone: this.phone
        }
        login.userGetRegistCode(sendData).then(data => {
          if (data.data.code == 200) {
             toast('手机验证码已发送请注意查收')
            if (this.count != 60) {
              return false
            }
            let timer = setInterval(() => {
              this.count--
              this.phoneCodetitle = `${this.count}秒`
              if (this.count == 0) {
                clearInterval(timer)
                this.phoneCodetitle = '重新获取验证码'
                this.count = 60
              }
            }, 1000)
          } else {
            toast(data.data.message)
          }
        })
      }
    },
    toNext() {
      if (isPhone(this.phone) && this.phoneCode.length == 6) {
        console.log('toregister2')
        let sendData = {
          mobilePhone: this.phone,
          phoneCode: this.phoneCode,
          token: this.$store.state.token
        }
        login.userCheckRegistCode(sendData).then(data => {
          if (data.data.code == 200) {
            this.$store.dispatch('regCode', data.data.data.regCode)
            this.$router.push({ path: '/register2' })
          } else {
            toast(data.data.message)
          }
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../less/config.less';
.register1wrap {
  padding: @m50 @p30 0;
  .form {
    border-radius: 0.08rem;
    background-color: #353641;
  }
  .list {
    height: 1.30667rem;
    padding: 0 0.32rem;
    position: relative;
    font-size: @fontsize32;
    color: @color;
    border-bottom: 1px solid #191A22;
    img {
      width: 0.42667rem;
      line-height: 1.1733rem;
      vertical-align: middle
    }
    .cdspan {
      color: @yellow;
      padding: 0 0 0 0.2667rem;
      text-align: center;
      border-left: 1px solid #191A22;
    }
    .rIcon {
      position: absolute;
      right: 0.32rem;
      top: 0.44rem;
    }
    input {
      color: #ffffff;
      line-height: 1.1733rem;
      margin-left: 0.64rem;
    }
    input::-webkit-input-placeholder {
      /* WebKit browsers*/
      color: @placeColor;
    }
    input::-moz-placeholder {
      /* Mozilla Firefox 4 to 18*/
      color: @placeColor;
    }
    input::-moz-placeholder {
      /* Mozilla Firefox 19+*/
      color: @placeColor;
    }
    input:-ms-input-placeholder {
      /* Internet Explorer 10+*/
      color: @placeColor;
    }
  }
}
</style>
