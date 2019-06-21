export default {
	// 列表配置
	// 菜单列表
	menu: [
		{
			title: '主菜单1',            // 一级菜单名称
			icon: 'el-icon-location',   // 一级菜单 icon
			menuId: '1',                // 索引(必须唯一，是字符串)
			sub: [                      // 子菜单(二级菜单)
				{
					title: '新增设备',      // 菜单名称
					component: 'addEquip',    // 点击菜单打开的组件名称
					menuId: '1-1'           // 索引 (用于识别当前打开的tab,必须唯一，是字符串)
				},
				{title: '故障信息录入', component: 'faultInput', menuId: '1-2'}
			]
		}
	],

	// 主页 tab 配置
	homeTab: {
		title: '设备查询',                     //  tab 显示标题
		menuId: 'search',                   //  tab 内部名称(用来识别当前打开的tab)
		components: [{path: 'search'}],     //  tab 对应的组件
	}
}
