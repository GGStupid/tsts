import Vue from 'vue'
import Router from 'vue-router'

// login
import login from '@/views/login/login'
const register1 = resolve => require(['@/views/login/register1'], resolve)
const register2 = resolve => require(['@/views/login/register2'], resolve)
const forget1 = resolve => require(['@/views/login/forget1'], resolve)
const forget2 = resolve => require(['@/views/login/forget2'], resolve)
//home
const home = resolve => require(['@/views/home/home'], resolve)
//news
const news = resolve => require(['@/views/news/news'], resolve)
const newDetail = resolve => require(['@/views/news/newDetail'], resolve)
//market
const market = resolve => require(['@/views/market/market'], resolve)
const toSearch = resolve => require(['@/views/market/toSearch'], resolve)
const hot = resolve => require(['@/views/market/hot'], resolve)
const personList = resolve => require(['@/views/market/personList'], resolve)
const pricePersonDetail = resolve => require(['@/views/market/pricePersonDetail'], resolve)
const marketNewsDeatil =resolve=> require(['@/views/market/marketNewsDeatil'], resolve)
const detailsTribune = resolve => require(['@/views/market/detailsTribune'], resolve)
//deal
const deal = resolve => require(['@/views/deal/deal'], resolve)

//messages
const messages = resolve => require(['@/views/messages/messages'], resolve)
const notices = resolve => require(['@/views/messages/notices'], resolve)
const systemNotices = resolve => require(['@/views/messages/systemNotices'], resolve)

//mine
const mine = resolve => require(['@/views/mine/mine'], resolve)
//充值
const Recharge = resolve => require(['@/views/mine/Recharge/Recharge'], resolve)
const quickPay = resolve => require(['@/views/mine/Recharge/quickPay'], resolve)
const BankPay = resolve => require(['@/views/mine/Recharge/BankPay'], resolve)
const Withdrawals = resolve => require(['@/views/mine/Withdrawals/Withdrawals'], resolve)
//用户设置
const userSetting = resolve => require(['@/views/mine/userSetting/userSetting'], resolve)
const loginpw = resolve => require(['@/views/mine/userSetting/loginpw'], resolve)
const nickname = resolve => require(['@/views/mine/userSetting/nickname'], resolve)
const oldpaypassword = resolve => require(['@/views/mine/userSetting/oldpaypassword'], resolve)
const paypassword = resolve => require(['@/views/mine/userSetting/paypassword'], resolve)
const paypassword1 = resolve => require(['@/views/mine/userSetting/paypassword1'], resolve)
const authentication = resolve => require(['@/views/mine/userSetting/authentication'], resolve)
const authenticationByPerson = resolve => require(['@/views/mine/userSetting/authenticationByPerson'], resolve)
//我投资的发行人
const myIssuer = resolve => require(['@/views/mine/myIssuer/myIssuer'], resolve)
const transactionRecord = resolve => require(['@/views/mine/myIssuer/transactionRecord'], resolve)
const delivery = resolve => require(['@/views/mine/myIssuer/delivery'], resolve)
const deliveryagreement = resolve => require(['@/views/mine/myIssuer/deliveryagreement'], resolve)
//资金明细
const fundDetails = resolve => require(['@/views/mine/fundDetails'], resolve)
//我的银行卡
const myBack = resolve => require(['@/views/mine/myBack/myBack'], resolve)
const addBack = resolve => require(['@/views/mine/myBack/addBack'], resolve)
const addBackByPerson = resolve => require(['@/views/mine/myBack/addBackByPerson'], resolve)
const selectBank = resolve => require(['@/views/mine/myBack/selectBank'], resolve)
//邀请好友
const invitingFriends = resolve => require(['@/views/mine/invitingFriends'], resolve)
const moreFriends = resolve => require(['@/views/mine/moreFriends'], resolve)
//帮助中心
const helpCenter = resolve => require(['@/views/mine/helpCenter/helpCenter'], resolve)
const aboutExercise = resolve => require(['@/views/mine/helpCenter/aboutExercise'], resolve)

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    // login
    {
      path: '/',
      name: 'login',
      component: login,
    },
    {
      path: '/register1',
      name: 'register1',
      component: register1
    },
    {
      path: '/register2',
      name: 'register2',
      component: register2
    },
    {
      path: '/forget1',
      name: 'forget1',
      component: forget1
    },
    {
      path: '/forget2',
      name: 'forget2',
      component: forget2
    },
    //news
    {
      path: '/newDetail/:id',
      component: newDetail
    },
    //messages
    {
      path: '/notices',
      name: 'notices',
      component: notices
    },
    {
      path: '/systemNotices',
      name: 'systemNotices',
      component: systemNotices
    },
    //home
    {
      path: '/home',
      component: home,
      children: [
        //news
        {
          path: '',
          name: 'default',
          component: news
        },
        //news
        {
          path: 'news',
          name: 'news',
          component: news
        },
        //market
        {
          path: 'market',
          component: market
        },
        //deal
        {
          path: 'deal',
          name: 'deal',
          component: deal
        },
        //messages
        {
          path: 'messages',
          name: 'messages',
          component: messages
        },
        //mine
        {
          path: 'mine',
          name: 'mine',
          component: mine
        }
      ]
    },
    //market
    {
      path: '/toSearch',
      component: toSearch
    },
    {
      path: '/pricePersonDetail/:product_id',
      component: pricePersonDetail
    },
    {
      path: '/marketNewsDeatil/:product_id',
      component: marketNewsDeatil
    },
    // {
    //   path: '/pricePersonDetail/:product_id',
    //   component: pricePersonDetail
    // },
    {
      path: '/detailsTribune',
      component: detailsTribune
    },
    //mine
    {
      path: '/Recharge',
      name: 'Recharge',
      component: Recharge
    }, {
      path: '/quickPay',
      name: 'quickPay',
      component: quickPay
    },
    {
      path: '/BankPay',
      component: BankPay
    },
    {
      path: '/Withdrawals',
      name: 'Withdrawals',
      component: Withdrawals
    },
    {
      path: '/transactionRecord',
      name: 'transactionRecord',
      component: transactionRecord
    },
    {
      path: '/delivery',
      name: 'delivery',
      component: delivery
    },
    {
      path: '/deliveryagreement',
      component: deliveryagreement
    },
    {
      path: '/fundDetails',
      name: 'fundDetails',
      component: fundDetails
    },
    {
      path: '/myIssuer',
      name: 'myIssuer',
      component: myIssuer
    },
    {
      path: '/userSetting',
      name: 'userSetting',
      component: userSetting
    },
    {
      path: '/nickname',
      name: 'nickname',
      component: nickname
    },
    {
      path: '/loginpw',
      name: 'loginpw',
      component: loginpw
    },
    {
      path: '/oldpaypassword',
      component: oldpaypassword
    },
    {
      path: '/paypassword',
      name: 'paypassword',
      component: paypassword
    },
    {
      path: '/paypassword1',
      name: 'paypassword1',
      component: paypassword1
    },
    {
      path: '/authentication',
      name: 'authentication',
      component: authentication
    },
    {
      path: '/authenticationByPerson',
      name: 'authenticationByPerson',
      component: authenticationByPerson
    },
    {
      path: '/myBack',
      name: 'myBack',
      component: myBack
    },
    {
      path: '/addBack',
      name: 'addBack',
      component: addBack
    }, {
      path: '/addBackByPerson',
      name: 'addBackByPerson',
      component: addBackByPerson
    },
    {
      path: '/selectBank',
      name: 'selectBank',
      component: selectBank
    },
    {
      path: '/invitingFriends',
      name: 'invitingFriends',
      component: invitingFriends
    },
    {
      path: '/moreFriends',
      component: moreFriends
    },
    {
      path: '/helpCenter',
      name: 'helpCenter',
      component: helpCenter
    },
    {
      path: '/aboutExercise',
      name: 'aboutExercise',
      component: aboutExercise
    }
  ]
})

// router.beforeEach((to, from, next) => {
//   let token = localStorage.getItem("token")
//   if (to.meta.requireAuth) {
//     if (token) {
//       next()
//     } else {
//       next({
//         path: '/'
//       })
//     }
//   } else {
//     next()
//   }
// })

export default router