<template>
    <div class="container container-box">
        <div class="navbar navbar-inverse navbar-fixed-top" style="top:35px">
            <div class="container">
                <div class="head">
                    <div class="headLeft fl">
                        <router-link to= "/FaultAnalysis" style="display:block;font-size: 25px;color: #fff;">故障数据库管理系统</router-link>
                    </div>
                    <div class="fr clearfix">
                        <div class="headRight fl"><a href="login">登录</a></div>
                        <div class="login" style="width:235px;">
                            <span class="user" id="user"></span>
                            <span>　|</span>
                            <span class="out" @click="exitUser()">退出</span>
                            <router-link to="/userManage" class="fr" id="useSet">
                                <img src="../assets/index/useSet.png" width="20" height="23" class="fl" style="margin:14px 5px 0;">
                                <span class="fl UserManage">配置</span>
                            </router-link>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container detailBox">
            <div class="container">
                <el-tabs v-model="activeName">
                    <el-tab-pane label="设备：1#" name="first"></el-tab-pane>
                </el-tabs>
            </div>
            <el-container>
                <el-main>
                    <el-header>运行信息</el-header>
                    <div class="container"  style="height: 135px;border-bottom: 2px dashed #ccc5c5;">
                        <div class="basicInfoHead" style="position:relative;">
                            <span class="me-e">设备信息</span>
                            <div class="me-l">
									<div class="icon" >
											<a class="mf-a"></a>
											<span class="mf-fn">系统</span>
											<span class="mf-fnv"></span>
                                    </div>
                                    <div class="icon" style="left:120px;">
                                        <a class="mf-a"></a>
                                        <span class="mf-fn">型号</span>
                                        <span class="mf-fnv"></span>
                                    </div>
                                    
                                    <div class="icon" style="left:240px;">
                                        <a class="mf-a"></a>
                                        <span class="mf-fn">编号</span>
                                        <span class="mf-fnv"></span>
                                    </div>
                                    <div class="icon" style="left:360px;">
											<a class="mf-a" ></a>
											<span class="mf-fn">生产/设计单位</span>
											<span class="mf-fnv"></span>
                                    </div>
                                    <div class="icon" style="top:80px;">
                                        <a class="mf-a"></a>
                                        <span class="mf-fn">引入时间</span>
                                        <span class="mf-fnv"></span>
                                    </div>
                                    <div class="icon" style="top:80px;left:150px;">
                                        <a class="mf-a"></a>
                                        <span class="mf-fn">累计工作时长</span>
                                        <span class="mf-fnv"></span>
                                    </div>
								</div>
                        </div>
                    </div>
                    <div class="container" style="height: 280px;border-bottom: 2px dashed #ccc5c5;">
                        <div class="basicInfoHead" style="position:relative;">
                            <span class="me-e">使用信息</span>
                            <el-table class="equipTable"
                                    ref="multipleTable"
                                    tooltip-effect="dark"
                                    style="cursor:pointer"
                                    height="250"> 
                                <el-table-column fixed show-overflow-tooltip prop="model" label="使用时间" width="190" align="center"></el-table-column>
                                <el-table-column  show-overflow-tooltip prop="system" width="120" label="使用人" align="center"></el-table-column>
                                <el-table-column show-overflow-tooltip prop="number" width="80" label="使用时长" align="center"></el-table-column>
                                <el-table-column show-overflow-tooltip prop="marks" width="100" label="备注信息" align="center"></el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div class="container">
                        <div class="basicInfoHead" style="position:relative;">
                            <span class="me-e">技术资料</span>
                            
                        </div>
                    </div>
                </el-main>
                <el-main class="elMainSecond">
                    <el-header>维护保障</el-header>
                    <div class="container"  style="height: 320px;">
                        <div class="basicInfoHead" style="position:relative;">
                            <div class="basicInfoHead" style="position:relative;">
                                <span class="me-e">故障信息</span>
                                <el-table :data="faultTable"
                                        ref="multipleTable"
                                        tooltip-effect="dark"
                                        style="cursor:pointer"
                                        height="300"> 
                                    <el-table-column fixed show-overflow-tooltip prop="model" label="故障时间" width="190" align="center"></el-table-column>
                                    <el-table-column  show-overflow-tooltip prop="system" width="110" label="故障类型" align="center"></el-table-column>
                                    <el-table-column show-overflow-tooltip prop="number" width="80" label="人员信息" align="center"></el-table-column>
                                    <el-table-column fixed="right" width="120" align="center" label="操作">
                                        <template>
                                            <template >
                                                <el-button
                                                size="mini"
                                                type="danger" class="handleButton">删除</el-button>
                                            </template>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </div>
                    <div class="container">
                        <div class="basicInfoHead" style="position:relative;">
                            <div class="icon">
                                <a class="mf-a"></a>
                                <span class="mf-fn">故障原因</span>
                                <div class="mf-fnv faultDiv"></div>
                            </div>
                            <div class="icon" style="top:80px;">
                                <a class="mf-a"></a>
                                <span class="mf-fn">故障影响</span>
                                <div class="mf-fnv faultDiv"></div>
                            </div>
                            <div class="icon" style="top:160px;">
                                <a class="mf-a"></a>
                                <span class="mf-fn">改进建议</span>
                                <div class="mf-fnv faultDiv"></div>
                            </div>
                            
                        </div>
                    </div>
                </el-main>
            </el-container>
        </div>
        <router-view></router-view>
    </div>
    
    
</template>

<script>
export default {
    name:"infoDetail",
    data (){
        return{
            userName:"",
            activeName:"",
            faultTable: [
                {
                model: '2018-07-20 10:00:00',
                system: '运动或动力故障型',
                number: '张三',
            }
            ],
        }
    },
    mounted(){
        this.setUserName()
    },
    methods: {
        setUserName(){
            var self = this;
            self.userName = sessionStorage.getItem("user");
            if(self.userName){
                $(".headRight").hide();
                $("#user").text(self.userName)
                if(self.userName !== "admin"){
                    $(".visitor a").css("background-color","#999")
                    $(".visitor a").attr("disabled",true).css("pointer-events","none");
                    $("#useSet").hide()
                }
            }else{
                alert("请登录！")
                this.$router.push({ path: '/login' })
            }

        },
        exitUser(){
            this.$router.push({ path: '/login' });
            sessionStorage.removeItem("user")
        }
    }
}
</script>

<style scoped>
    @import "../../static/css/reset.css";
    @import "../../static/css/index.css";
    @import "../../static/css/voicePlus.css";


    .container.index{
        margin: 450px auto 0;
    }
    .container {
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
    }
    .navbar-inverse {
        background-color: rgba(0,0,0,0);
        border-color: #080808;
    }
    .navbar-fixed-top {
        top: 0;
        border-width: 0 0 1px;
    }


    .navbar-fixed-bottom, .navbar-fixed-top {
        position: fixed;
        right: 0;
        left: 0;
        z-index: 1030;
    }
    .navbar {
        position: relative;
        min-height: 50px;
        margin-bottom: 20px;
        border: 1px solid transparent;
    }
    .content h4{font-size:16px; line-height:32px; padding-left:10px; width:100px; float:left; margin-bottom:20px;}
    .noData1,.noData2{font-size:20px; display:none; text-align:center; margin-top:150px;}
    .parList{
        margin-bottom: 25px;
    }
    .parList li{float: left; margin-right: 15px; line-height: 34px;}
    .parList li select{border:1px solid #e0e0e0; border-radius:4px; height:34px; line-height:34px;}
    .parList li.second select{width:120px;}
    .parList li.third select{width:130px;}
    /* 搜索下拉框  */	
    .dropBox{display: none; position: absolute; width: 582px; min-height: 44px; box-sizing: border-box; border-bottom: 1px solid #d1d1d1; border-left: 1px solid #d1d1d1; border-right: 1px solid #d1d1d1; box-shadow: 0 2px 5px #e2e2e2; top:40px; left: -1px; background-color: #fff; padding: 10px 0; z-index:100;}
    .dropBox li{text-indent: 10px; line-height: 32px; cursor: pointer; font-size:14px;}
    .grey{background-color:#e1e1e1;}
    .dropBox li:hover{background-color:#e1e1e1;}
    .sBtn{
        width: 80px;
        height: 36px;
        line-height: 36px;
        background-color: #28a3f4;
        color: #fff;
        font-size: 16px;
        text-align: center;
        border-radius: 4px;
        cursor: pointer;
        display: block;
        float: right;
    }
    .topBox{
        margin: 50px 0 25px;
    }
    .el-table__footer-wrapper, .el-table__header-wrapper{
        display: none !important;
    }
    .detailBox{
        margin-top:70px;
        width:100%;
        height:690px;
        background: #e2e2e2;
    }
      .el-main {
        background-color: #E9EEF3;
        color: #333;
        height: 615px;
        margin-right:20px;
        border: 1px solid #acafb1;
        border-radius: 5px;
        padding: 0px;
    }
    .elMainSecond{
        margin-right: 0px;
    }
    .el-header {
        color: #333;
        text-align: left;
        height: 35px !important;
        line-height: 35px;
        border-bottom: 1px solid #B3C0D1;
        margin-bottom:5px;
    }
    span.me-e{width:66px;display: block;font-family: Youyuan;font-size: 13px;font-weight: bold;color: #333;margin-top: 15px;border-left: 4px solid #3A9EE0;padding-left: 6px;height: 16px;line-height: 16px;}
	div.basicInfoHead a.mf-a{display:block;background:url(../assets/icon.png) center center no-repeat;width:10px;height:15px;float:left;}
    .icon{
        position: absolute;
    }
    .icon .mf-a{
       color: #333;height: 14px;line-height: 14px;padding-left: 5px;
       margin-top: 5px;
       margin-right: 5px;
    }
    .icon .mf-fn{
        font-size: 12px;
    }
    div.mf-fnv{
        width: 500px;
        height: 50px;
        background: rgb(233, 230, 230);
        border:1px solid #999;
        border-radius: 5px;
    }
</style>

