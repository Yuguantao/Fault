import Vue from 'vue'
import Router from 'vue-router'
import login from '@/view/login'
import FaultAnalysis from '@/view/index'
import search from '@/components/search'
import addEquipment from '@/components/addEquipment'
import addEquip from '@/components/addEquip'
import equipmentInput from '@/components/equipmentInput'
import faultInput from '@/components/faultInput'
import infoDetail from '@/components/infoDetail'
import fault from '@/components/fault'
import userManage from '@/view/userManage'
import video from '@/components/video'
import word from '@/components/word'
import picture from '@/components/picture'
import audio from '@/components/audio'
import header from '@/components/public/header'
import mountings from '@/components/mountings'
import analysis from '@/components/analysis'


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
    },
    {
      path:'/infoDetail',
      name:'infoDetail',
      component:infoDetail
    },
    {
      path:'/fault',
      name:'fault',
      component:fault
    },
    {
      path:'/addEquip',
      name:'addEquip',
      component:addEquip
    },
    {
      path:'/video',
      name:'video',
      component:video
    },
    {
      path:'/word',
      name:'word',
      component:word
    },
    {
      path:'/picture',
      name:'picture',
      component:picture
    },
    {
      path:'/audio',
      name:'audio',
      component:audio
    },
    {
      path:'/header',
      name:'header',
      component:header
    },
    {
      path:'/mountings',
      name:'mountings',
      component:mountings
    },
    {
      path:'/analysis',
      name:'analysis',
      component:analysis
    },
  ]
})
