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

        <div class="container fl">
            <div class="topBox clearfix">
                <span class="fl" style="line-height:34px;">设备信息查询：</span>
                <div class="fl sys1">
                </div>
            </div>
            <ul class="fl parList">
                <!-- <li class="second getHair">
                    <span class="fl">系统：</span>
                    <select class="fl">
                        <option value="">设备知识库</option>
                    </select>
                </li> -->
                <li class="third testType">
                    <span class="fl">设备：</span>
                    <select class="fl">
                        <option value="">-请选择-</option>
                        <option value="">光电经纬仪</option>
                        <option value="">雷达系统</option>
                        <option value="">遥测系统</option>
                    </select>
                </li>
                <li class="third testPhase">
                    <span class="fl">型号：</span>
                    <select class="fl">
                        <option value="">-请选择-</option>
                        <option value="">GD220-Ⅱ</option>
                        <option value="">GD220-Ⅲ</option>
                        <option value="">GDL-5T</option>
                        <option value="">GD100</option>
                        <option value="">GD100-ZD</option>
                    </select>
                </li>
                <li class="four testPhase">
                    <span class="fl">位置：</span>
                    <select class="fl">
                        <option value="">-请选择-</option>
                        <option value="">1#</option>
                        <option value="">2#</option>
                    </select>
                </li>
            </ul>
            
            <span class="sBtn" id="sureBtn">查询</span>
            <table class="tableModel" width="100%" cellpadding="0" cellspacing="0">
                <thead>
                    <tr style="text-align: center;">
                        <th width="20%">故障时间</th>
                        <th width="20%">故障模式</th>
                        <th width="20%">故障原因</th>
                        
                        <th width="20%">人员信息</th>
                        <th width="20%">操作</th>
                    </tr>
                </thead>
            </table>
            
            <div class="detail">
                <!-- <span class="noData1">暂无数据</span> -->
                <el-table :data="tableData" border  >
                    <el-table-column fixed prop="date" width="220" align="center"></el-table-column>
                    <el-table-column prop="name" width="220" align="center"></el-table-column>
                    <el-table-column prop="province" width="220" align="center"></el-table-column>
                    <el-table-column prop="city" width="220" align="center"></el-table-column>
                    <el-table-column fixed="right" width="180" align="center">
                        <template>
                            <el-button type="text" size="small">删除</el-button>
                            <el-button type="text" size="small">编辑</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            
	</div>
        <router-view></router-view>
    </div>
    
    
</template>

<script>
export default {
    name:"search",
    data (){
        return{
            userName:"",
            tableData: [{
                date: '2018-07-20 10:00:00',
                name: '运动或动力故障型',
                province: '材质因素',
                city: '张三',
            }, {
                date: '2018-07-20 10:00:00',
                name: '运动或动力故障型',
                province: '材质因素',
                city: '张三',
            }, {
                date: '2018-07-20 10:00:00',
                name: '运动或动力故障型',
                province: '材质因素',
                city: '张三',
            }, {
                date: '2018-07-20 10:00:00',
                name: '运动或动力故障型',
                province: '材质因素',
                city: '张三',
            }]
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
</style>

