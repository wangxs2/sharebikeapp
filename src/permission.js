import router from './router'
import store from './stores'
import {
    getCookie,
    delCookie
} from './libs/util'

router.beforeEach((to, from, next) => {
    if(document.getElementById('loading')){
        document.body.removeChild(document.getElementById('loading'))
      }
      next()
    if (to.path === "/login") {
        delCookie('userId');
        store.commit("SET_ID", "");
        store.commit("SET_USERINFO", {});
        next();
        return;
    }
    if (to.path == '/forget') { //注册
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
            store.dispatch("getMap");
            store.dispatch("GetUserInfo").then(res => {
                if (to.path == '/') {
                    next("/layout/selfCheck")
                } else {
                    next({
                        ...to,
                        replace: true
                    })

                }
            })
        }
    }

})

router.afterEach((to, from) => {
    // if (((from.path == '/selfCheckAdd' || from.path == '/selfCheckdetail') && to.path == '/layout/selfCheck') || ((from.path == '/superviseAdd' || from.path == '/superviseDetail') && to.path == '/layout/supervise')) {
    //     let isRefresh = sessionStorage.getItem('isRefresh');
    //     if (isRefresh == '0') {
    //         sessionStorage.setItem('isRefresh', null);
    //         window.location.reload();
    //     } else {
    //         sessionStorage.setItem('isRefresh', 0);
    //     }
    // } else if (((to.path == '/selfCheckAdd' || to.path == '/selfCheckdetail') && from.path == '/layout/selfCheck') || ((to.path == '/superviseAdd' || to.path == '/superviseDetail') && from.path == '/layout/supervise')) {
    //     sessionStorage.setItem('isRefresh', 0)
    // }
})