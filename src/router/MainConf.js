export default {
	// 列表配置
	// 菜单列表
	menu: [
		{
			title: '设备信息库',            // 一级菜单名称
			icon: 'el-icon-menu',   // 一级菜单 icon
			menuId: '1',                // 索引(必须唯一，是字符串)
			sub: [                      // 子菜单(二级菜单)
				{title: '设备信息', component: 'search', menuId: 'search'},
				{title: '新增设备', component: 'addEquip', menuId: '1-1'},
				{title: '配件信息', component: 'mountings', menuId: '1-2'},
				
			]
		},
		{
			title: '设备知识库',            // 一级菜单名称
			icon: 'el-icon-search',   // 一级菜单 icon
			menuId: '2',                // 索引(必须唯一，是字符串)
			sub: [                      // 子菜单(二级菜单)
				{
					title: '设备知识库',      // 菜单名称
					component:'fault',    // 点击菜单打开的组件名称
					menuId: '2-1'           // 索引 (用于识别当前打开的tab,必须唯一，是字符串)
				}
			]
		},
		{
			title: '故障信息库',            // 一级菜单名称
			icon: 'el-icon-edit-outline',   // 一级菜单 icon
			menuId: '3',                // 索引(必须唯一，是字符串)
			sub: [                      // 子菜单(二级菜单)
				{
					title: '故障信息录入',      // 菜单名称
					component:'faultInput',    // 点击菜单打开的组件名称
					menuId: '3-1'           // 索引 (用于识别当前打开的tab,必须唯一，是字符串)
				},
				{
					title: '故障信息查询',      // 菜单名称
					component:'searchFault',    // 点击菜单打开的组件名称
					menuId: '3-2'           // 索引 (用于识别当前打开的tab,必须唯一，是字符串)
				},
				{
					title: '故障信息汇总分析',      // 菜单名称
					component:'faultAnalysis',    // 点击菜单打开的组件名称
					menuId: '3-3'           // 索引 (用于识别当前打开的tab,必须唯一，是字符串)
				}
			]
		},
		{
			title: '故障综合分析',            // 一级菜单名称
			icon: 'el-icon-document',   // 一级菜单 icon
			menuId: '4',                // 索引(必须唯一，是字符串)
			sub: [                      // 子菜单(二级菜单)
				{
					title: '故障综合分析',      // 菜单名称
					component:'analysis',    // 点击菜单打开的组件名称
					menuId: '4-1'           // 索引 (用于识别当前打开的tab,必须唯一，是字符串)
				}
			]	
		},
		{
			title: '人员管理',            // 一级菜单名称
			icon: 'el-icon-setting',   // 一级菜单 icon
			menuId: '5',                // 索引(必须唯一，是字符串)	
			sub: [                      // 子菜单(二级菜单)
				{
					title: '实施人员管理',      // 菜单名称
					component: 'userManage',    // 点击菜单打开的组件名称
					menuId: '5-1'           // 索引 (用于识别当前打开的tab,必须唯一，是字符串)
				},
			]
		},
		{
			title: '帮助',            // 一级菜单名称
			icon: 'el-icon-question',   // 一级菜单 icon
			menuId: '6',                // 索引(必须唯一，是字符串)			
		}

	],

	// 主页 tab 配置
	homeTab: {
		title: '设备信息',                     //  tab 显示标题
		menuId: 'search',                   //  tab 内部名称(用来识别当前打开的tab)
		components: [{path: 'search'}],     //  tab 对应的组件
	}
}
