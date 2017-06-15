import Vue from 'vue'
import Router from 'vue-router'

// login
import login from '@/views/login/login'
const register1 = resolve => require(['@/views/login/register1'], resolve)
const register2 = resolve => require(['@/views/login/register2'], resolve)
const forget1 = resolve => require(['@/views/login/forget1'], resolve)
const forget2 = resolve => require(['@/views/login/forget2'], resolve)
//news
const news = resolve => require(['@/views/news/news'], resolve)

//market
const market = resolve => require(['@/views/market/market'], resolve)

//deal
const deal = resolve => require(['@/views/deal/deal'], resolve)

//messages
const messages = resolve => require(['@/views/messages/messages'], resolve)
const notices = resolve => require(['@/views/messages/notices'], resolve)
const systemNotices = resolve => require(['@/views/messages/systemNotices'], resolve)

//mine
const mine = resolve => require(['@/views/mine/mine'], resolve)
const userSetting = resolve => require(['@/views/mine/userSetting/userSetting'], resolve)
const nickname = resolve => require(['@/views/mine/userSetting/nickname'], resolve)
const paypassword = resolve => require(['@/views/mine/userSetting/paypassword'], resolve)
const authentication = resolve => require(['@/views/mine/userSetting/authentication'], resolve)
const authenticationByPerson = resolve => require(['@/views/mine/userSetting/authenticationByPerson'], resolve)
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
      path: '/news',
      name: 'news',
      component: news
    },
    //market
    {
      path: '/market',
      name: 'market',
      component: market
    },
    //deal
    {
      path: '/deal',
      name: 'deal',
      component: deal
    },
    //messages
    {
      path: '/messages',
      name: 'messages',
      component: messages
    },
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
    //mine
    {
      path: '/mine',
      name: 'mine',
      component: mine
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
      path: '/paypassword',
      name: 'paypassword',
      component: paypassword
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