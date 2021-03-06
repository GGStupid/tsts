// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// css
import 'normalize.css'
import 'flex.css'

Vue.config.productionTip = false

/* eslint-disable no-new */
const app=new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})

export default app

