<template>
        <div class="tabWrap">
            <div class="tabBar">
                <el-tabs :value="currentTabIndex" @input="$tab.showTab" type="card" @tab-remove="$tab.close">
                    <el-tab-pane
                        v-for="item in openedTabs"
                        :key="item.menuId"
                        :label="item.title"
                        :name="item.menuId"
                        :closable="item.menuId !== homeTabMenuId"
                    >
                    <div class="content pr10">
                        <component :is="item.components[item.components.length - 1].path" v-if="item.components.length"></component>
                    </div>
                    </el-tab-pane>
                </el-tabs>
            </div>

        </div>
</template>

<script>
import config from '../../router/MainConf'

export default {
    name:"tabs",
    data (){
        return{
            config: config,  
            activeName: 'second'  
        }
    },
    mounted(){
        
    },
    computed: {
		// 当前 tab 项的 name
		currentTabIndex () {
			return this.$store.getters.GetCurrentTabIndex
		},
		// 打开的页签列表
		openedTabs () {
			// console.log(this.$store.getters.GetOpenedTabs)
			return this.$store.getters.GetOpenedTabs
		},
    // 主页 tab 的 menuId
        homeTabMenuId () {
                return this.$store.getters.GetHomeTabMenuId
        }
	},
    methods: {
        handleClick(tab, event) {
            console.log(tab, event);
        },
    }
}
</script>

<style>
    .topWrap {
        width: 100%;
        height: 64px;
        display: flex;
        justify-content: space-between;
        box-sizing: border-box;
        background: #399CFF;
        color: #fff;
    }
    .tabBar {
        background: #F5F7FA;
        height: 46px;
        padding-top: 5px;
        padding-left: 10px;
        box-sizing: border-box;
    }
    .tabIcon {
    font-size: 20px;
    line-height: 30px;
    box-sizing: border-box;
  }

  .tabOperate {
    position: absolute;
    width: 30px;
    height: 30px;
    right: 5px;
    top: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    border-radius: 3px;
    border: 1px solid #e4e7ed;
  }

  .tabDropdown {
    display: flex;
    align-items: center;
  }

  .tabDropdown i {
    font-size: 20px;
    margin-right: 5px;
  }

  .tabDropdownLine {
    width: 1px;
    height: 16px;
    background: #E4E7ED;
  }

  .tabDropdownRefresh {
    color: #606266;
    font-size: 14px;
    padding-right: 10px;
    display: flex;
    align-items: center;
  }

  .tabDropdownRefresh:hover {
    color: #399CFF;
  }

  .tabDropdownFavor {
    color: #606266;
    font-size: 14px;
    padding-left: 10px;
  }

  .tabDropdownFavor:hover {
    color: #399CFF;
  }
  .content {
    width: 100vw;
    height: 100vh;
    overflow-y: scroll;
  }
  .content {
    width: 100%;
    height: calc(100vh - 130px);
    overflow-y: scroll;
    box-sizing: border-box;
  }
</style>


