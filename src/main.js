// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'normalize.css' // 样式重置
import App from './App'
import router from './router'
import './permission' //路由判断
import store from './stores' //vuex
import mintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import 'lib-flexible'
import $ from 'zepto'
import common from './libs/common.js' //自定义包
Vue.use(common)
Vue.use(mintUI)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
