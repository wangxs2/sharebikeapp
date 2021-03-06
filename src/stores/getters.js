const getters = {
    docHeight: state => state.app.docHeight,
    menuFlag: state => state.app.menuFlag,
    userId: state => state.user.userId,
    userName: state => state.user.userName,
    userRole: state => state.user.userRole,
    userOrg: state => state.user.userOrg,
    btnAuth: state => state.user.btnAuth,
    menuData: state => state.permission.menuData,
    routers: state => state.permission.routers,
    addRouters: state => state.permission.addRouters,
    imageUrl: state => state.app.imageUrl,
    userInfo: state => state.user.userInfo,
    willdoInfo: state => state.user.willdoInfo,
    password: state => state.user.password,
    query: state => state.app.query,
    district: state => state.user.district,//获取当前位置
    addressFlag: state => state.user.addressFlag,//获取当前位置
    gpsadress: state => state.user.gpsadress,//获取当前位置
    iscacheModule: state => state.app.iscacheModule,
}
export default getters