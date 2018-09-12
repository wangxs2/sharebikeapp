import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import permission from './modules/permission'
import getters from './getters'

Vue.use(Vuex)

const stores = new Vuex.Store({
  modules: {
    app,
    user,
    permission
  },
  getters
})


// document.addEventListener("plusready", function () {
//   var first = null;
//   plus.key.addEventListener('backbutton', function () {
//       if (!first) {
//           first = new Date().getTime();//记录第一次按下回退键的时间
//           window.alert = function (str) {
//               return;
//           }
//           console.log('再按一次退出应用');
//           history.go(-1)//回退到上一页面
//           setTimeout(function () {//1s中后清除
//               first = null;
//           }, 1000);
//       } else {
//           if (new Date().getTime() - first < 1000) {
//               plus.runtime.quit();//那么就退出app
//           }
//       }
//   }, false);
// });
export default stores
