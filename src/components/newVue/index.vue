<template>
  <div class="indexWrap">
	  <vHead></vHead>
    <div class="middleWrap">
      <!--左侧 开始-->
      <transition name="left">
        <aside class="left" v-if="showMenu && !fullScreen">
			<vNavMenu></vNavMenu>
        </aside>
      </transition>
 
      <div :class="fullScreen? 'fullRight' : 'right'" ref="right">

        <!--打开的菜单(tab-bar) 开始-->
        <div class="tabWrap">
          <div class="tabBar">
            <vTabs></vTabs>
          </div>

        </div>
      </div>
      <!--右侧 结束-->

    </div>
    <!--主框架 结束-->

  </div>
</template>
<script>
import config from '../../router/MainConf'

export default {
	name:"index",
	data () {
		return {
			config: config,          // 全局配置
			showMenu: true,          // 是否显示左侧菜单
			fullScreen: false,       // 是否全屏
			searchText: '',           // 搜索框里的文字
			menuList: [],            // 复制一份菜单列表
			spreadedMenus: [],        // 要展开的菜单列表
		}
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
	watch: {
		searchText () {
			this.filterMenu()
		}
	},
	methods: {
		// 显示/隐藏 主菜单
		showHideMenu (bool) {
			this.showMenu = bool
		},
		// 全屏
		enterFullScreen () {
			let element = this.$refs['right']
			var requestMethod = element.requestFullScreen ||
				element.webkitRequestFullScreen ||
				element.mozRequestFullScreen ||
				element.msRequestFullScreen;
			// document.body.width = 1920
			// document.body.height = 1080
			requestMethod.call(document.body);
			this.fullScreen = true
		},
		// 退出全屏
		exitFullScreen () {
			this.fullScreen = false
			var exitMethod = document.exitFullscreen ||
				document.mozCancelFullScreen ||
				document.webkitExitFullscreen ||
				document.msExitFullScreen;
			exitMethod.call(document);
		},
		// 监听 ESC 按键
		listenKeyBoardEvent () {
			let that = this
			// 监听 ESC 按键
			window.onresize = function () {
				let isFull = document.fullscreenEnabled || window.fullScreen || document.webkitIsFullScreen || document.msFullscreenEnabled || false
				!isFull && that.exitFullScreen()
			}
		},
		// 跳转到对应的应用
		gotoApplication (url) {
			location.href = url
		},
		// 刷新组件
		reFreshTab (item) {
			let c = item.components
			item.components = []
			this.$nextTick(() => {
				item.components = c
			})
		},
		// 打开 页签
		openTab (item) {
			this.$tab.open(item)
			this.initializeMemu()
		},
		// 搜索菜单
		filterMenu () {
			let that = this
			this.spreadedMenus = []
			let keyword = this.searchText
			let menu = JSON.parse(JSON.stringify(this.config.menu))
			let newMenu = menu.filter(item => {
				item.sub = item.sub.filter(i => {
					return i.title.indexOf(keyword) > -1
				})
				return item.sub.length > 0 && this.spreadedMenus.push(item.menuId)
			})
			this.menuList = newMenu

		},
		initializeMemu () {
			this.menuList = JSON.parse(JSON.stringify(this.config.menu))
		},
		// 监听hash的变动
		listenHistory () {
			window.addEventListener('hashchange', (e) => {
				let url = location.href
				let indexOfSharp = url.indexOf('#')
				if (indexOfSharp > 0) {
					let hash = url.substr(indexOfSharp + 1)
					let tab = JSON.parse(Base64.decode(hash))
          if(tab.fromHistory) return
          tab.fromHistory = true
					this.$tab.open(tab)
				}
			})
		},
	},
		created () {
			this.$tab.reShow()
			this.listenKeyBoardEvent()
			this.initializeMemu()
      this.listenHistory()
		},
		mounted () {
		},
		beforeDestroy () {
		}
	}
</script>

<!--公共样式-->

<!--私有样式-->
<style scoped>

  /*总容器*/
  .indexWrap {
	min-width: 1200px;
	height: 100%;
  }

  /*顶部栏*/
  .topWrap {
    width: 100%;
    height: 64px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    background: #399CFF;
    color: #fff;
  }

  /*头部logo*/
  .topLogo {
    width: 200px;
    height: 100%;
    background: #0680F9;
    border-right: 1px solid #53a9ff;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    box-sizing: border-box;
  }

  .topLogo-img {
    height: 30px;
  }
  .topLogoText{
    line-height: 30px;
    font-size: 18px;
    font-weight: bold;
    margin-left: 5px;
  }

  /*应用选择*/
  .appName {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60px;
    height: 64px;
    /*background: #0680F9;*/
    background: #399CFF;
    color: #fff;
    border-right: 1px solid #53a9ff;
  }

  .appName:hover {
    background: #53a9ff;
  }

  .appNameIcon {
    font-size: 30px;
  }

  .appSelected {
    color: #fff;
    font-size: 30px;
  }

  .appItem {
    display: flex;
    align-items: center;
  }

  .appItem-icon {
    margin-right: 5px;
    font-size: 16px;
  }

  /*当前项目名称*/
  .currentProjectName {
    padding-left: 15px;
    line-height: 64px;
    font-size: 16px;
  }

  /*项目选择*/
  .projectName {
    padding-right: 10px;
    display: flex;
    align-items: center;
    border-right: 1px solid #53a9ff;
    /*color: red;*/
  }

  /*个人信息*/
  .userInfoWrap {
    padding-left: 10px;
  }

  .userInfoWrap:hover {
    background: #53a9ff;
  }

  .userInfo {
    margin: 12px 0;
    display: flex;
    align-items: center;
  }

  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }

  /*主容器*/
  .middleWrap {
    width: 100%;
    height: calc(100% - 115px);
    overflow: hidden;
    display: flex;
    position: relative;
  }

  /*主菜单*/
  .left {
    width: 200px;
    height: 100%;
    display: block;
    background: #fff;
    /* background: rgb(84, 92, 100); */
    /*border-right: 1px solid #e6e6e6;*/
    overflow-y: scroll;
    overflow-x: hidden;
    padding: 0;
    margin: 0;
    position: relative;
    box-sizing: border-box;
    flex-shrink: 0;

    -ms-overflow-style: none;

    /*-ms-scroll-chaining: chained;*/
    /*-ms-overflow-style: none;*/
    /*-ms-content-zooming: zoom;*/
    /*-ms-scroll-rails: none;*/
    /*-ms-content-zoom-limit-min: 100%;*/
    /*-ms-content-zoom-limit-max: 500%;*/
    /*-ms-scroll-snap-type: proximity;*/
    /*-ms-scroll-snap-points-x: snapList(100%, 200%, 300%, 400%, 500%);*/
    /*overflow: auto;*/
  }

  .left::-webkit-scrollbar {
    display: none;
  }

  /*菜单显示/隐藏 动画*/
  .left-enter-active, .left-leave-active {
    transition: width .5s;
  }

  .left-enter, .left-leave-to {
    width: 0px;
  }

  /*搜索和收藏*/
  .searchAndFavor {
    padding: 8px 5px 0 5px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    /*border-bottom: 1px solid #e6e6e6;*/
    background: #163B65;
    height: 46px;
  }

  .searchiIcon {
    font-size: 20px;
    line-height: 28px;
  }

  .myFavor {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: #2b5992;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
  }

  .myFavor:hover {
    background: #3d76bc;
  }

  .myFavorIcon {
    color: #fff;
    font-size: 20px;
    line-height: 28px;
  }

  /*隐藏菜单 按钮*/
  .hideMenuButton {
    width: 12px;
    height: 50px;
    position: fixed;
    top: 50%;
    left: 187px;
    transform: translate(0, -50%);

    background: #030A13;
    border-radius: 10px 0 0 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: #fff;
    z-index: 99;
  }

  /*显示菜单 按钮*/
  .showMenuButton {
    width: 12px;
    height: 50px;
    position: fixed;
    top: 50%;
    left: 0;
    transform: translate(0, -50%);

    background: #030A13;
    border-radius: 0px 10px 10px 0px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    color: #fff;
    z-index: 99;
  }

  /*显示/隐藏 按鈕 动画*/
  .hideMenu-enter-active, .hideMenu-leave-active {
    transition: all .5s;
  }

  .hideMenu-enter, .hideMenu-leave-to {
    left: -12px;
  }

  /*显示/隐藏 按鈕 动画*/
  .showMenu-enter-active, .showMenu-leave-active {
    transition: all .5s;
  }

  .showMenu-enter, .showMenu-leave-to {
    opacity: 0;
  }

  /*右侧布局*/
  .right {
    width: 100%;
    height: 100%;
    overflow: hidden;
    flex-shrink: 1;
    background: #fff;
    border-top: 1px solid #e6e6e6;
  }
  .fullRight {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #fff;
    /*border-top: 1px solid #e6e6e6;*/
    z-index: 999;
  }

  .fullRight .content {
    width: 100vw;
    height: 100vh;
    overflow-y: scroll;
  }

  .tabWrap {
    position: relative;
    width: 100%;
  }

  .tabBar {
    background: #F5F7FA;
    height: 46px;
    padding-top: 5px;
    padding-left: 10px;
    box-sizing: border-box;
  }

  /*以下2个样式,是覆盖 element 下拉菜单的默认样式*/
  .elDropdownMenu {
    margin-top: 0 !important;
    padding: 3px 0;
  }

  /*没有选中的 tab 标签 要隐藏下拉菜单*/
  .hiddenDropDown {
    display: none !important;
  }

  .elDropdownItem:hover {
    background-color: #fff !important;
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
    width: 100%;
    height: calc(100% - 46px);
    overflow-y: scroll;
    box-sizing: border-box;
  }
</style>
