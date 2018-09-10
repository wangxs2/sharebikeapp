
import {
  fetchGet
} from "@/libs/http"
import {
  constantRouterMap,
  asyncRouterMap
} from '@/router'


const _import = require('@/router/_import_production')
const localList = `/home,
/system,/system/role,/system/org,/system/user,/system/auth,/system/const,` //本地列表 注意最后加逗号

let menuTest = [
	{
		"code":"HOME_PAGE",
		"descr":"首页",
		"id":1000,
		"name":"首页",
		"pid":1,
		"props":"icon-shouye1",
		"setRange":0,
		"sort":100000000,
		"type":1,
		"updateBy":1000,
		"updateTime":1523171374000,
		"url":"/home"
	},
	{
		"code":"",
		"descr":"系统管理",
		"id":1259,
		"name":"系统管理",
		"pid":1,
		"props":"icon-guanli",
		"setRange":0,
		"sort":900000000,
		"type":1,
		"updateBy":1000,
		"updateTime":1534833794000,
		"url":"/system"
	},
	{
		"code":"",
		"descr":"系统管理-组织管理",
		"id":1291,
		"name":"组织管理",
		"pid":1259,
		"props":"",
		"setRange":0,
		"sort":901000000,
		"type":1,
		"updateBy":1000,
		"updateTime":1534833794000,
		"url":"/system/org"
	},
	{
		"code":"",
		"descr":"系统管理-角色管理",
		"id":1271,
		"name":"角色管理",
		"pid":1259,
		"props":"",
		"setRange":0,
		"sort":901000000,
		"type":1,
		"updateBy":1000,
		"updateTime":1534833794000,
		"url":"/system/role"
	},
	{
		"code":"",
		"descr":"权限管理-用户管理",
		"id":1261,
		"name":"用户管理",
		"pid":1259,
		"props":"",
		"setRange":0,
		"sort":902000000,
		"type":1,
		"updateBy":1000,
		"updateTime":1534833794000,
		"url":"/system/user"
	},
	{
		"code":"",
		"descr":"系统管理-权限管理",
		"id":1276,
		"name":"权限管理",
		"pid":1259,
		"props":"",
		"setRange":0,
		"sort":903000000,
		"type":1,
		"updateBy":1000,
		"updateTime":1534833794000,
		"url":"/system/auth"
	},
	{
		"code":"",
		"descr":"系统管理-常量管理",
		"id":1283,
		"name":"常量管理",
		"pid":1259,
		"props":"",
		"setRange":0,
		"sort":904000000,
		"type":1,
		"updateBy":1000,
		"updateTime":1534833794000,
		"url":"/system/const"
	}
]

/**
 * 递归菜单
 */
function filterAsyncMenu(pid, json) {
  let arr = [];
  json.forEach(item => {
    if (item.pid === pid) {
      if (localList.indexOf(item.url + ",") == -1 || item.url === "") { //判断是否本地页面 不是去错误页面
        item.url = "/error"
      }
      arr.push(item);
      item.children = filterAsyncMenu(item.id, json);
    }
  });
  return arr;
}

/**
 * 格式菜单成路由表
 */

function filterAsyncRouter(menuData) {
  let arr = [],
    obj;
  menuData.forEach(item => {
    obj = {};
    if (item.children && item.children.length) {
      obj.children = filterAsyncRouter(item.children);
    }

    if (item.url === '/error') { //加载错误页面
      obj.path = "/error"
      obj.component = _import("errorPage/index")
    } else {
      obj.path = item.url
      obj.component = _import(item.url.slice(1) + "/index")
    }

    obj.name = item.name
    arr.push(obj);
  });
  return arr;
}
const permission = {
  state: {
    menuData: [], //菜单数据
    routers: constantRouterMap, //路由表
    addRouters: [], //动态路由表
  },
  mutations: {
    SET_MENU: (state, menuData) => { //菜单
      state.menuData = menuData
    },
    SET_ROUTERS: (state, routers) => { //设置路由
      state.addRouters = routers
      state.routers = constantRouterMap.concat(routers)
    }
  },
  actions: {
    GenerateRoutes({ //获取菜单
      commit,
      state
    }) {
      return new Promise((resolve, reject) => {
    
          let menuData = filterAsyncMenu(1, menuTest)

          asyncRouterMap[0].children = filterAsyncRouter(menuData.slice(0))
          let routerData = asyncRouterMap;
          commit('SET_MENU', menuData);
          commit('SET_ROUTERS', routerData);
          resolve({
            menuData,
            routerData
          })
      })
    }
  }
}

export default permission