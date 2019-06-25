import login from '@/view/login'
import FaultAnalysis from '@/view/FaultAnalysis'
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
import index from '@/components/index'

let routes = [
    {
        path: '/login',
        component: login,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '',
        leaf: true,//只有一个节点
        iconCls: 'el-icon-menu', //图标样式class
        children: [
            { path: '/adminIndex', component: AdminIndex, name: '首页' },
        ]
    },
    {
        path: '/',
        component: Home,
        name: '广告',
        // leaf: true,//只有一个节点
        iconCls: 'el-icon-message', //图标样式class
        children: [
            { path: '/table', component: Table, name: '表格' },
            { path: '/echarts', component: echarts, name: '图表' },
            { path: '/test', component: test, name: 'test' },
            { path: '/tree', component: Tree, name: '树形控件' },
        ]
    },
    {
	    path: '/',
	    component: index,
	    name: '站点管理',
	    iconCls: 'el-icon-message', //图标样式class
	    children: [
	        { path: '/search1', component: search1, name: '新增站点' },
			{ path: '/sitelists', component: Sitelists, name: '站点分配' }
	    ]
	}
];

export default routes;