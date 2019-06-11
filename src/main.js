// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import 'normalize.css' // 样式重置
import App from './App'
import mintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import './assets/css/global.css'
import router from './router'
import './permission' //路由判断
import 'babel-polyfill' //兼容ie
import store from './stores' //vuex
import 'lib-flexible'
import 'animate.css'
// import axios from 'axios'
// Vue.prototype.$axios = axios

import $ from 'zepto'
import common from './libs/common.js'
import Vconsole from 'vconsole'
import VuePreview from 'vue-preview'
import { Swipe, SwipeItem } from 'mint-ui'
import VueLazyLoad from 'vue-lazyload'
import VueScroller from 'vue-scroller'
Vue.use(VueScroller)
Vue.use(VueLazyLoad, {
  preLoad: 1,
  error: require('./assets/image/error.svg'),
  loading: require('./assets/image/loading.svg'),
  attempt: 2
})
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)
let vConsole = new Vconsole()
Vue.use(VuePreview, {
  mainClass: 'pswp--minimal--dark',
  barsSize: { top: 0, bottom: 0 },
  captionEl: false,
  fullscreenEl: false,
  shareEl: false,
  bgOpacity: 0.85,
  tapToClose: true,
  tapToToggleControls: false
})
Vue.use(common)
Vue.use(mintUI)
// Vue.prototype.Ip = process.env.API_HOST + '';
// Vue.prototype.Ip = 'http://10.1.4.42:18088';
Vue.prototype.Ip = 'http://10.1.30.202:18088'
//图片地址
// Vue.prototype.Ip = 'http://101.231.47.116:12333'
//Vue.prototype.Ip = 'http://106.14.198.128:18088'
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
