<template>
	<div class="loginwrap">
		<div class="icon">
			<img src="../../assets/login_logo.png"  alt="">
		</div>
		<div class="form">
			<div class="list">
				<span>手机号</span>
				<input type="tel" maxlength="11" v-model='mobile' placeholder='请输入手机号' @keyup='isCleanShow'>
				<img class="rIcon" src="../../assets/icon_clean.png" v-show="iconShow" alt="" @click='isPhoneClean'>
			</div>
			<div class="list">
				<span>密码</span>
				<input v-if='ispassword' type="password" maxlength="16" v-model='password' placeholder='请输入登录密码' @keyup='isCleanShow'>
				<input v-if='!ispassword' type="text" maxlength="16" v-model='password' placeholder='请输入登录密码' @keyup='isCleanShow'>
				<img src="../../assets/icon_clean.png" v-show="passShow" @click='isPassWrodClean' class="rclean" alt="">
				<img class="rIcon" :src="passwordSrc" alt="" @click='checkTpye'>
			</div>
		</div>
		<v-button title='登录' :isActive='isActive' topNum='0.6667rem' @toNext='login'></v-button>
		<div class="tips">
			<router-link class="register" to='/register1'>注册淘刻</router-link>
			<router-link  class="forget" to='/forget1'>忘记密码？</router-link>
		</div>
	</div>
</template>

<script>
import login from '@/api/login/index'
import Button from '@/components/buttons/Button690'
import { toast, isPhone, isPassWord } from '@/util/index'
export default {
	data() {
		return {
			mobile: '',
			iconShow: false,
			password: '',
			passShow: false,
			passwordSrc: require('../../assets/icon_hide_pwd.png'),
			ispassword: true,
            isActive:true
            
		}
	},
	components: {
		'v-button': Button
	},
	methods: {
		isCleanShow() {
			if (this.mobile != '') {
				this.iconShow = true
			} else {
				this.iconShow = false
			}
			if (this.password != '') {
				this.passShow = true
			} else {
				this.passShow = false
			}
		},
		isPhoneClean(){
			if (this.mobile != '') {
				this.mobile = ''
				this.iconShow = false
				return 
			}
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
		login() {
			console.log('login')
			let encrypt = new JSEncrypt();
			encrypt.setPublicKey(this.$store.state.pubkey);
			let senddata = {
				mobilePhone: this.mobile,
				password: encrypt.encrypt(this.password),
				token: this.$store.state.token
			}
			if (isPhone(this.mobile) && isPassWord(this.password)) {
				login.userLogin(senddata).then((data) => {
					if (data.data.code == 200) {
						this.$router.push({ path: '/home/news' })
					} else {
						toast(data.data.message)
					}
				})
			}
		}
	},
	watch: {

	},
	created() {

	}
}
</script>
<style lang='less' scoped>
@placeColor:#999999;
@color:#EEEEEE;
@fontsize32:0.42667rem;
@p30:0.4rem;
.loginwrap {
	height: 100%;
	background-image: url('../../assets/login_bg.png');
	background-repeat: no-repeat;
	background-size: 100%;
    padding: 0 @p30;
}
.icon {
	padding-top: 1.3333rem;
    padding-bottom: 1.1733rem;
	text-align: center;
	img {
		width: 1.6rem;
	}
}
.form{
    border-radius: 0.08rem;
    background-color: #353641;
}
.list {
	height: 1.30667rem;
    padding: 0 0.32rem;
	position: relative;
	font-size: @fontsize32;
    color:@color;
    border-bottom:1px solid #191A22;
    span{
        display: inline-block;
        width: 1.5rem;
    }
	img {
		width: 0.42667rem;
		line-height: 1.1733rem;
		vertical-align: middle
	}
	.rIcon {
		position: absolute;
		right: 0.32rem;
		top: 0.45rem;
	}
    .rclean{
        position: absolute;
        top:0.45rem;
        right: 1.28rem;
    }
	input {
		width: 5rem;
		color: #ffffff;
		line-height: 1.1733rem;
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

.tips {
	margin-top: 0.45333rem;
	font-size: 0.3733rem;
	position: relative;
	a {
		color: @color;
		text-decoration: none;
	}
    .register{
        color:#F8CC00
    }
	.forget {
		position: absolute;
		right: 0;
        color:#999999;
	}
}
</style>

