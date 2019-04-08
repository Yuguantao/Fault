import Vue from 'vue'
import Router from 'vue-router'
import login from '@/view/login'
import FaultAnalysis from '@/view/index'
import search from '@/components/search'
import addEquipment from '@/components/addEquipment'
import equipmentInput from '@/components/equipmentInput'
import faultInput from '@/components/faultInput'
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
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/userManage',
      name: 'userManage',
      component: userManage
    },
    {
      path:'/addEquipment',
      name:'addEquipment',
      component:addEquipment
    },
    {
      path:'/equipmentInput',
      name:'equipmentInput',
      component:equipmentInput
    },
    {
      path:'/faultInput',
      name:'faultInput',
      component:faultInput
    }
  ]
})
