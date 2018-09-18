import router from './router'
import store from './stores'
import {
  getCookie,
  delCookie
} from './libs/util'

router.beforeEach((to, from, next) => {
  if (to.path === "/login") {
    delCookie('userId');
    store.commit("SET_ID","");
    store.commit("SET_USERINFO", {});
    next();
    return;
  }

  if (to.path !== "/login" && !getCookie('userId')) {
    next('/login');
    return;
  } else if (getCookie('userId')) {
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
