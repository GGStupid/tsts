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
const marketNewsDeatil = resolve => require(['@/views/market/marketNewsDeatil'], resolve)
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
      component: newDetail,
      
    },
    //messages
    {
      path: '/notices',
      name: 'notices',
      component: notices,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/systemNotices',
      name: 'systemNotices',
      component: systemNotices,
      meta: {
        requireAuth: true
      }
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
          component: news,
        },
        //news
        {
          path: 'news',
          name: 'news',
          component: news,
        },
        //market
        {
          path: 'market',
          component: market,
        },
        //deal
        {
          path: 'deal',
          name: 'deal',
          component: deal,
          meta: {
            requireAuth: true
          }
        },
        //messages
        {
          path: 'messages',
          name: 'messages',
          component: messages,
          meta: {
            requireAuth: true
          }
        },
        //mine
        {
          path: 'mine',
          name: 'mine',
          component: mine,
          meta: {
            requireAuth: true
          }
        }
      ]
    },
    //market
    {
      path: '/toSearch',
      component: toSearch,
    },
    {
      path: '/pricePersonDetail/:product_id',
      component: pricePersonDetail,
    },
    {
      path: '/marketNewsDeatil/:product_id',
      component: marketNewsDeatil,
    },
    // {
    //   path: '/pricePersonDetail/:product_id',
    //   component: pricePersonDetail
    // },
    {
      path: '/detailsTribune',
      component: detailsTribune,
    },
    //mine
    {
      path: '/Recharge',
      name: 'Recharge',
      component: Recharge,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/quickPay',
      name: 'quickPay',
      component: quickPay,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/BankPay',
      component: BankPay,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/Withdrawals',
      name: 'Withdrawals',
      component: Withdrawals,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/transactionRecord',
      name: 'transactionRecord',
      component: transactionRecord,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/delivery',
      name: 'delivery',
      component: delivery,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/deliveryagreement',
      component: deliveryagreement,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/fundDetails',
      name: 'fundDetails',
      component: fundDetails,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/myIssuer',
      name: 'myIssuer',
      component: myIssuer,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/userSetting',
      name: 'userSetting',
      component: userSetting,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/nickname',
      name: 'nickname',
      component: nickname,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/loginpw',
      name: 'loginpw',
      component: loginpw,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/oldpaypassword',
      component: oldpaypassword,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/paypassword',
      name: 'paypassword',
      component: paypassword,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/paypassword1',
      name: 'paypassword1',
      component: paypassword1,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/authentication',
      name: 'authentication',
      component: authentication,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/authenticationByPerson',
      name: 'authenticationByPerson',
      component: authenticationByPerson,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/myBack',
      name: 'myBack',
      component: myBack,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/addBack',
      name: 'addBack',
      component: addBack,
      meta: {
        requireAuth: true
      }
    }, {
      path: '/addBackByPerson',
      name: 'addBackByPerson',
      component: addBackByPerson,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/selectBank',
      name: 'selectBank',
      component: selectBank,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/invitingFriends',
      name: 'invitingFriends',
      component: invitingFriends,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/moreFriends',
      component: moreFriends,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/helpCenter',
      name: 'helpCenter',
      component: helpCenter,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/aboutExercise/:classId',
      name: 'aboutExercise',
      component: aboutExercise,
      meta: {
        requireAuth: true
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  let token = localStorage.getItem("isLogin")
  if (to.meta.requireAuth) {
    if (token) {
      next()
    } else {
      next({
        path: '/'
      })
    }
  } else {
    next()
  }
})

export default router