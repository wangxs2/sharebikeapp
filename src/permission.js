import router from './router'
import store from './stores'
import {
  getCookie,
  delCookie
} from './libs/util'


router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    delCookie('flag');
    store.commit("SET_USERINFO", {});
    next();
    return;
  }

  if (to.path !== "/login" && !getCookie('flag')) {
    next('/login');
    return;
  } else if (getCookie('flag')) {
    if (getCookie('userId') == (store.getters.userId + '')) {
      next();
    } else {
      store.dispatch("GetUserInfo").then(res => {
        if (to.path == '/') {
          next("/layout/selfCheck")
        } else {
          next({ ...to,
            replace: true
          })
        }
      })
    }
  }

})

router.afterEach((to, from) => {})
