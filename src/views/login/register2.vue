<template>
  <div class="register1wrap">
    <div class="form">
      <div class="list">
        <span>登录密码</span>
        <input v-if='ispassword' type="password" maxlength="16" v-model='password' placeholder='8-16位数字及字母组成' @keyup='isCleanShow'>
        <input v-if='!ispassword' type="text" maxlength="16" v-model='password' placeholder='8-16位数字及字母组成' @keyup='isCleanShow'>
        <img src="../../assets/icon_clean.png" v-show="passShow" @click='isPassWrodClean' class="rclean" alt="">
        <img class="rIcon" :src="passwordSrc" alt="" @click='checkTpye'>
      </div>
    </div>
    <v-button title='注册' :isActive='isActive' topNum='0.6667rem' @toNext='toNext'></v-button>
    <div class="agreement">点击“注册”，即表示同意
      <span class="tips" @click="showTips">《用户服务协议》</span>
    </div>
  </div>
</template>

<script>
import login from '@/api/login/index'
import Button from '@/components/buttons/Button690'
import { toast, isPassWord } from '@/util/index'
export default {
  data() {
    return {
      password: '',
      passShow: false,
      passwordSrc: require('../../assets/icon_hide_pwd.png'),
      ispassword: true,
      isActive: true
    }
  },
  components: {
    'v-button': Button
  },
  methods: {
    isCleanShow() {
      if (this.password != '') {
        this.passShow = true
      } else {
        this.passShow = false
      }
    },
    cleanPhone() {
      this.phone = ''
      this.isphone = false
    },
    isPassWrodClean() {
      if (this.password != '') {
        this.password = ''
        this.passShow = false
        return
      }
    },
    checkTpye() {
      this.ispassword = !this.ispassword;
      if (!this.ispassword) {
        this.passwordSrc = require('../../assets/icon_show_pwd.png')
      } else {
        this.passwordSrc = require('../../assets/icon_hide_pwd.png')
      }
    },
    toNext() {
      if (isPassWord(this.password)) {
        console.log('register')
        let encrypt = new JSEncrypt();
        encrypt.setPublicKey(this.$store.state.pubkey);
        let sendData = {
          password: encrypt.encrypt(this.password),
          regCode: this.$store.state.regCode,
          token: this.$store.state.token
        }
        login.userRegister(sendData).then(data => {
          if (data.data.code == 200) {
            toast('注册成功，请登录')
            this.$router.push({ path: '/' })
          } else {
            toast(data.data.message)
          }
        })
      }
    },
    showTips() {
      console.log('showTips')
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
  .agreement {
    margin-top: 0.2667rem;
    color: @color;
    text-align: center;
    font-size: @p30;
    .tips {
      color: #f8cc00;
    }
  }
}
</style>
