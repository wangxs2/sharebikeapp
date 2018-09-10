import {
  fetchPost
} from "@/libs/http"

let userTest = {
	"auth":"按钮级权限",
	"org":[],
	"roles":[
		{
			"code":"superadmin",
			"descr":"超级管理员，最高角色",
			"id":1000,
			"name":"超级管理员",
			"updateBy":1000,
			"updateTime":1535710377000
		}
	],
	"id":1000,
	"userName":"root"
}


const user = {
  state: {
    userId: "",
    userName: '',
    userRole: [], //用户角色
    userOrg: [], //用户组织
    btnAuth: '', //按钮权限
  },
  mutations: {
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
        // fetchPost("loginCtrl/getLoginInfo").then(res => {
          let res = userTest;
          document.cookie = "user=" + res.id;

          commit('SET_ID', res.id);
          commit('SET_NAME', res.userName);
          commit('SET_BTNAUTH', res.auth);
          commit('SET_ORG', res.org);

          resolve(res)
        // })
      })
    },
  }
}
export default user
