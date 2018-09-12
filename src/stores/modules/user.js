import {
  fetchGet
} from '@/libs/http.js'


const user = {
  state: {
    userId: "",
    userName: '',
    userRole: [], //用户角色
    userOrg: [], //用户组织
    btnAuth: '', //按钮权限
    userInfo: {}
  },
  mutations: {
    SET_USERINFO: (state, userInfo) => { //用户信息
      state.userInfo = userInfo
    },
    SET_BTNAUTH: (state, btnAuth) => { //按钮权限
      state.btnAuth = btnAuth
    },
    SET_ID: (state, userId) => { //用户ID
      state.userId = userId
    },
    SET_NAME: (state, userName) => { //用户名
      state.userName = userName
    },
    SET_ROLES: (state, userRole) => { //用户角色
      state.userRole = userRole
    },
    SET_ORG: (state, userOrg) => { //用户组织
      state.userOrg = userOrg
    },
  },
  actions: {
    GetUserInfo({ //获取用户信息
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
        fetchGet("user/user").then(res => {
        // let res = userTest;
        // document.cookie = "user=" + res.id;


        commit('SET_ID', res.id);
        commit('SET_NAME', res.userName);
        commit('SET_USERINFO',res);
        // commit('SET_BTNAUTH', res.auth);
        // commit('SET_ORG', res.org);

        resolve(res)
        })
      })
    },
  }
}
export default user
