import Vue from 'vue'
import Router from 'vue-router'
import login from '@/view/login'
import FaultAnalysis from '@/view/index'
import search from '@/components/search'
import userManage from '@/view/userManage'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/FaultAnalysis',
      name: 'FaultAnalysis',
      component: FaultAnalysis,
    },
    {
      path: '/FaultAnalysis/search',
      name: 'search',
      component: search
    },
    {
      path: '/userManage',
      name: 'userManage',
      component: userManage
    },
  ]
})
