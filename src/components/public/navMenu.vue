<template>
    <div class="navMenu">
        <el-row class="tac">
            <el-col>
                <el-menu
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
                </el-menu>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    name:"nvaHead",
    data (){
        return{
            acc_permission:''
        }
    },
    mounted(){
        this.setUserName()
        this.setStyle()
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
    }
}
</script>

<style scoped>
    .navMenu{
        position: relative;
        top: 0;
        left: 0;
        height: 700px;
        width: 200px;
        transition: all 0.3s;
    }

    .el-menu-item:hover{
        outline: 0 !important;
        color: #fff !important;
        background: #409EFF !important;
    }
    .el-menu-item.is-active {
        outline: 0 !important;
        color: #409EFF !important;
        background: none !important;
    }
    .el-submenu__title:focus, .el-submenu__title:hover{
        color: #fff !important;
        background: #409EFF !important;
    }
</style>


