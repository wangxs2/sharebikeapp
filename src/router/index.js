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
        component: _import('login/index'),
    },
    {
        path: '/layout',
        name: '主页',
        component: _import('layout/index'),

        children: [{
                path: 'selfCheck',
                name: '自查',
                component: () =>
                    import ('@/views/layout/selfCheck'),


            },
            {
                path: 'supervise',
                name: '派单',
                component: () =>
                    import ('@/views/layout/supervise'),


            },
            {
                path: 'needtodo',
                name: '待办',
                component: () =>
                    import ('@/views/layout/needtodo'),


            },
            {
                path: 'count',
                name: '统计',
                component: () =>
                    import ('@/views/layout/count'),


            },
            {
                path: 'warning',
                name: '预警',
                component: () =>
                    import ('@/views/layout/warning'),


            },
            {
                path: 'me',
                name: '个人中心',
                component: () =>
                    import ('@/views/layout/me'),


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
        name: '派单详情',
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
    }, {
        path: '/map',
        name: '地图',
        component: _import('map/index')
    }, {
        path: '/transfer',
        name: '转派',
        component: _import('transfer/index')
    }, {
        path: '/needtodoDetail',
        name: '待办详情',
        component: _import('needtodoDetail/index')
    }, {
        path: '/forget',
        name: '忘记密码',
        component: _import('forget/index')
    }, {
        path: '/test',
        name: '测试',
        component: _import('test/index')
    }, {
        path: '/test1',
        name: '测试1',
        component: _import('test1/index')
    }, {
        path: '/downloadmode',
        name: '下载方式',
        component: _import('downloadmode/index')
    },
    {
        path: '/evaluation',
        name: '考评',
        component: _import('evaluation/index')
    }, {
        path: '/evaluationrules',
        name: '考评规则',
        component: _import('evaluationrules/index')
    }, {
        path: '/historicalAppraisal',
        name: "历史考评",
        component: _import('historicalAppraisal/index')
    }, {
        path: '/assessmentDetails',
        name: "考评详情",
        component: _import('assessmentDetails/index')
    }, {
        path: '/noAssessment',
        name: "未考评",
        component: _import('noAssessment/index')
    }, {
        path: '/statisticsDaily',
        name: "统计日报",
        component: _import('statisticsDaily/index')
    }, {
        path: '/installationCount',
        name: "保有量统计",
        component: _import('installationCount/index')
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