import Vue from 'vue'
import Router from 'vue-router'
// import postman from '../components/postman/index'
// import socket from '../components/socketio/index'
const _import = require('./_import_production')

Vue.use(Router)

// import Layout from '@/views/layout/index'

export const constantRouterMap = [
  {
    path: '/login',
    name: '登录',
    component: _import('login/index')
  },
  {
    path: '/layout',
    name: '主页',
    component: _import('layout/index'),
    children: [
      {
        path: 'selfCheck',
        name: '自查',
        component: () => import('@/views/layout/selfCheck'),
      },
      {
        path: 'supervise',
        name: '派单',
        component: () => import('@/views/layout/supervise'),
      },
      {
        path: 'count',
        name: '统计',
        component: () => import('@/views/layout/count'),
      },
      {
        path: 'warning',
        name: '预警',
        component: () => import('@/views/layout/warning'),
      },
      {
        path: 'me',
        name: '个人中心',
        component: () => import('@/views/layout/me'),
      },
    ]
  },
  {
    path: '/selfCheckAdd',
    name: '添加企业自查',
    component: _import('selfCheckAdd/index')
  },
  // {
  //   path: '/test',
  //   name: '测试组件',
  //   component: _import('test/index')
  // }
]

/* {
  path: '/socket',
  name: 'socket连接',
  component: socket
},*/

/* ,{
  path:'/postman',
  name:'邮差',
  component:postman
} */
export const asyncRouterMap = [{
  path: '',
  component: ""
}]

export default new Router({
  // mode: 'history',//router模式
  routes: constantRouterMap
})
