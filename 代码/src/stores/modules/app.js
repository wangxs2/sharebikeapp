const app = {
    state: {
        docHeight: 500, //文档高度
        menuFlag: false, //左侧菜单的开关
        imageUrl: "",
        imageName: "",
        query: {}, //全局传参对象,
        iscacheModule: false,
    },
    mutations: {
        SET_FLAG: (state) => { //菜单收缩
            state.menuFlag = !state.menuFlag
        },
        SET_HEIGHT: (state, docHeight) => { //文档高度
            state.docHeight = docHeight
        },
        SET_QUERY: (state, query) => {
            state.query = query
        },
        SET_CACHE: (state, iscacheModule) => {
            state.iscacheModule = iscacheModule
        },
    }
}
export default app