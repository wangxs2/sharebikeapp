import Vue from 'vue'
import Router from 'vue-router'
// import postman from '../components/postman/index'
// import socket from '../components/socketio/index'
const _import = require('./_import_production')

Vue.use(Router)

// import Layout from '@/views/layout/index'
export const constantRouterMap = [{
    path: '/login',
    name: '登录',
    component: _import('login/index')
  },
  {
    path: '/layout',
    name: '主页',
    component: _import('layout/index'),
    children: [{
        path: 'selfCheck',
        name: '自查',
        component: () =>
          import('@/views/layout/selfCheck'),
      },
      {
        path: 'supervise',
        name: '派单',
        component: () =>
          import('@/views/layout/supervise'),
      },
      {
        path: 'needtodo',
        name: '待办',
        component: () =>
          import('@/views/layout/needtodo'),
      },
      {
        path: 'count',
        name: '统计',
        component: () =>
          import('@/views/layout/count'),
      },
      {
        path: 'warning',
        name: '预警',
        component: () =>
          import('@/views/layout/warning'),
      },
      {
        path: 'me',
        name: '个人中心',
        component: () =>
          import('@/views/layout/me'),
      },
    ]
  },
  {
    path: '/selfCheckAdd',
    name: '添加企业自查',
    component: _import('selfCheckAdd/index')
  },
  {
    path: '/infoModification',
    name: '个人信息修改',
    component: _import('infoModification/index')
  },
  {
    path: '/settings',
    name: '设置',
    component: _import('settings/index')
  },
  {
    path: '/password',
    name: '修改密码',
    component: _import('password/index')
  },
  {
    path: '/problemFeedback',
    name: '意见反馈',
    component: _import('problemFeedback/index')
  },
  {
    path: '/warningDetail',
    name: '预警详情',
    component: _import('warningDetail/index')
  },
  {
    path: '/selfCheckdetail',
    name: '自查详情',
    component: _import('selfCheckdetail/index')
  },
  {
    path: '/needtodoAdd',
    name: '待办添加',
    component: _import('needtodoAdd/index')
  },
  {
    path: '/superviseDetail',
    name: '自查详情',
    component: _import('superviseDetail/index')
  },
  {
    path: '/superviseAdd',
    name: '添加派单',
    component: _import('superviseAdd/index')
  }, {
    path: '/feedBack',
    name: '添加反馈',
    component: _import('feedBack/index')
  },{
    path: '/map',
    name: '地图',
    component: _import('map/index')
  },{
    path: '/transfer',
    name: '转派',
    component: _import('transfer/index')
  },{
    path: '/needtodoDetail',
    name: '待办详情',
    component: _import('needtodoDetail/index')
  }
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
