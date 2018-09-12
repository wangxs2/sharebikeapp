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

// 自适应计算
// function countratio(w) {
//   let whdef = 100 / 1920;
//   let rem = w * whdef;
//   $('html').css('font-size', rem + "px");
// }

// countratio($(document).width())

// window.addEventListener("resize", () => { //设置高度
//   stores.commit('SET_HEIGHT', $(document).height() - 180)
//   countratio($(document).width())
// })
//ios手动缩放
// window.onload=function () { 
//     document.addEventListener('touchstart',function (event) { 
//       if(event.touches.length>1){ 
//         event.preventDefault(); 
//       } 
//     }) 
//     var lastTouchEnd=0; 
//     document.addEventListener('touchend',function (event) { 
//       var now=(new Date()).getTime(); 
//       if(now-lastTouchEnd<=300){ 
//         event.preventDefault(); 
//       } 
//       lastTouchEnd=now; 
//     },false) 
//   };
document.addEventListener("plusready", function () {
  var first = null;
  plus.key.addEventListener('backbutton', function () {
      if (!first) {
          first = new Date().getTime();//记录第一次按下回退键的时间
          window.alert = function (str) {
              return;
          }
          console.log('再按一次退出应用');
          history.go(-1)//回退到上一页面
          setTimeout(function () {//1s中后清除
              first = null;
          }, 1000);
      } else {
          if (new Date().getTime() - first < 1000) {
              plus.runtime.quit();//那么就退出app
          }
      }
  }, false);
});
// getImage();
// window.getImage=function(val,row){
//     stores.commit('SET_IMAGE',val,row)
// }
export default stores
