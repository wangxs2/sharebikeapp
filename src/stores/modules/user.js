import {
    fetchGet
} from '@/libs/http.js'


const user = {
    state: {
        userId: "",
        userName: '',
        password: '',
        district:'',
        addressFlag:true,//当前的位置
        gpsadress:'定位中...',
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
        SET_DISTRICT: (state, district) => { //当前位置
            state.district = district
        },
        SET_ADDRESSFlAG: (state, addressFlag) => { //当前位置
            state.addressFlag = addressFlag 
        }, 
        SET_GPSADRESS: (state, gpsadress) => { //当前位置
            state.gpsadress = gpsadress 
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
        getMap({ //获取当前的位置
            commit,
            state
        }) {
            let geolocation = new AMap.Geolocation({
                enableHighAccuracy: true, //是否使用高精度定位，默认:true
                timeout: 10000, //超过10秒后停止定位，默认：无穷大
                maximumAge: 0, //定位结果缓存0毫秒，默认：0
                convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
                showButton: false, //显示定位按钮，默认：true
                buttonPosition: "RB", //定位按钮停靠位置，默认：'LB'，左下角
                buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
                showMarker: false, //定位成功后在定位到的位置显示点标记，默认：true
                showCircle: false, //定位成功后用圆圈表示定位精度范围，默认：true
                panToLocation: false, //定位成功后将定位到的位置作为地图中心点，默认：true
                useNative: true,
                zoomToAccuracy: false //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
            });
            geolocation.getCurrentPosition((status, result) => {
                if (status == "complete") {
                    commit('SET_DISTRICT', result.addressComponent.district);
                    commit('SET_ADDRESSFlAG', false);
                } else {
                    commit('SET_GPSADRESS', "定位失败");
                }
            });
        },
    }
}
export default user