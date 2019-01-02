import {
    fetchGet
} from '@/libs/http.js'


const user = {
    state: {
        userId: "",
        userName: '',
        password: '',
        userRole: [], //用户角色
        userOrg: [], //用户组织
        btnAuth: '', //按钮权限
        userInfo: {},
        willdoInfo: {}
    },
    mutations: {
        SET_USERINFO: (state, userInfo) => { //用户信息
            state.userInfo = userInfo
        },
        SET_WILLDOINFO: (state, willdoInfo) => { //显示状态信息
            state.willdoInfo = willdoInfo
        },
        SET_PASSWORD: (state, password) => { //用户密码
            state.password = password
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
                    commit('SET_ID', res.id);
                    commit('SET_NAME', res.userName);
                    commit('SET_USERINFO', res);
                    resolve(res)
                })
                fetchGet("count/willdo").then(res => {
                    commit('SET_WILLDOINFO', res);
                    resolve(res)
                })
            })
        },
    }
}
export default user