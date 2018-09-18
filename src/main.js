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
import store from './stores' //vuex
import 'lib-flexible'
import $ from 'zepto'
import common from './libs/common.js'
import Vconsole from "vconsole"
import VuePreview from 'vue-preview'
import { Swipe, SwipeItem } from "mint-ui";
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

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
Vue.prototype.Ip = process.env.API_HOST + '';
Vue.config.productionTip = false
/* eslint-disable no-new */


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
