<template>
    <div class="navMenu">
        <el-row class="tac">
            <el-col>
                <!-- <el-menu
                router 
                :default-active="$route.path"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                style="font-size:20px;">
                <el-submenu index="1">
                    <template slot="title">
                        <i class="el-icon-menu"></i>
                        <span>设备信息库</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/search">设备查询</el-menu-item>
                        <el-menu-item index="/addEquip" :disabled = "acc_permission != 2? false:true">新增设备</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="/fault">
                    <i class="el-icon-search"></i>
                    <span slot="title">设备知识库</span>
                </el-menu-item>
                <el-menu-item index="/faultInput" :disabled = "acc_permission != 2? false:true">
                    <i class="el-icon-edit-outline"></i>
                    <span slot="title" >故障信息录入</span>
                </el-menu-item>
                <el-menu-item index="/analysis" :disabled = "acc_permission != 2? false:true">
                    <i class="el-icon-document"></i>
                    <span slot="title">故障分析</span>
                </el-menu-item>
                <el-submenu index="4" :disabled = "acc_permission == 0? false:true">
                    <template slot="title">
                        <i class="el-icon-setting"></i>
                        <span>人员管理</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item index="/userManage">实施人员管理</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item index="5">
                    <i class="el-icon-question"></i>
                    <span slot="title" >帮助</span>
                </el-menu-item>
                </el-menu> -->
                <el-menu :default-active="currentTabIndex" :default-openeds="spreadedMenus" 
                    
                    @open="handleOpen"
                    @close="handleClose"
                    :background-color="count ? '':'#545c64'"
                    :text-color="count ? '':'#fff'"
                    :active-text-color="count ? '':'#ffd04b'">
                    <el-submenu v-for="(item,index) in menuList" :key="index" :index="item.menuId">
                    <template slot="title">
                        <i :class="item.icon"></i>
                        <span>{{item.title}}</span>
                    </template>
                    <el-menu-item-group>
                        <el-menu-item v-for="(subItem,subIndex) in item.sub"
                                    :key="subIndex"
                                    :disabled = "ifnotpermission(subItem.menuId)"
                                    @click="openTab(subItem)"
                                    :index="subItem.menuId">
                        {{subItem.title}}
                        </el-menu-item>
                    </el-menu-item-group>
                    </el-submenu>

                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>

import config from '../../router/MainConf'

export default {
    name:"nvaHead",
    data (){
        return{
            acc_permission:'',
            menuList:[],
            config: config, 
            spreadedMenus: [],
            colorFlag:"",
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
        },   
        count () {
            return this.$store.state.changeColorFlag
        }
  
	},
    mounted(){
        this.setUserName()
        this.setStyle(),
        this.initializeMemu()
    },
    methods: {
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        setUserName(){
            var self = this;
            self.acc_permission = sessionStorage.getItem("acc_permission");
        },
        setStyle(){
            $(".el-submenu__title").css({"font-size": "18px"})
            $(".el-menu-item").css({"font-size": "18px"})
        },
        initializeMemu () {
			this.menuList = JSON.parse(JSON.stringify(this.config.menu))
        },
        openTab (item) {
			this.$tab.open(item)
			this.initializeMemu()
        },
        ifnotpermission(id){
            let ifnot;
            if(id == "1-1"){
                ifnot = this.acc_permission == 2? true:false; 
            }else if(id == "5-1"){
                ifnot = this.acc_permission == 2? true:false;
            }else{
                ifnot = false
            }
            return ifnot
        },
        init(){
            this.colorFlag = this.$store.state.setColorFlag
        }
    }
}
</script>

<style scoped>
    .navMenu{
        float: left;
        height: 100%;
        width: 201px;
        transition: all 0.3s;
    }

    .el-menu-item:hover{
        outline: 0 !important;
        color: #fff !important;
        background: #409EFF;
    }
    .el-menu-item.is-active {
        outline: 0;
        color: #409EFF;
    }
    .el-submenu__title:focus, .el-submenu__title:hover{
        color: #fff !important;
        background: #409EFF;
    }
    .el-menu-item-group__title {
        padding: 0px 0 0px 20px;
        line-height: normal;
        font-size: 12px;
        color: #909399;
    }

    
</style>


