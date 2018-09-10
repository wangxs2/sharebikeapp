import router from './router'
import store from './stores'
import {
  getCookie,
  delCookie
} from './libs/util'


router.beforeEach((to, from, next) => {
  console.log(to)
  if (to.path === '/') {
    next('/login');
    return;
  }
  if (to.path === '/login') {
    next();
    return;
  }else{
    next()
  }

  // if (to.path != '/login' && to.path != '/socket' && to.path != '/forget' && !getCookie('flag')) {
  //   next('/login');
  //   return;
  // } else if (to.path == '/forget' || to.path == '/socket') {//注册
  //   next();
  //   return;
  // } else if (getCookie('flag')) {
  //   if ((store.getters.userId + '') !== getCookie('user')) { //判断是否拉取用户信息 权限
  //     Promise.all([store.dispatch('GenerateRoutes'), store.dispatch('GetUserInfo')]).then(res => {
  //       if (res[0] == 1) {
  //         Message.error({
  //           message: "权限错误,请重新登录！"
  //         })
  //         next('/login?flag=true');
  //       } else {
  //         router.addRoutes(store.getters.addRouters)
  //         if (to.path == '/') {
  //           next("/home")
  //         } else {
  //           next({ ...to,
  //             replace: true
  //           })
  //         }
  //       }
  //     }).catch(() => {
  //       next('/login?flag=true');
  //     })
  //   } else { //正常页面跳转
  //     next()
  //   }
  // }

})

router.afterEach((to, from) => {
})
