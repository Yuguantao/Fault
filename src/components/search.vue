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
                <el-cascader clearable 
                    :options="options"
                    v-model="equipSelectedOptions"
                    @change="handleChange">
                </el-cascader>
            </ul>
            
            <span class="sBtn" id="sureBtn" @click="selectInfo">查询</span>
  
            <el-table :data="equipData" class="equipTable"
                    fixed
                    ref="multipleTable"
                    tooltip-effect="dark"
                    style="width: 100%;cursor:pointer"
                    height="500"
                    @row-click="openDetails">
                    <el-table-column
                        type="selection"
                        width="50"
                        align="center">
                    </el-table-column>
                <el-table-column fixed show-overflow-tooltip prop="model" label="型号" width="120" align="center"></el-table-column>
                <el-table-column  show-overflow-tooltip prop="system" width="120" label="系统" align="center"></el-table-column>
                <el-table-column show-overflow-tooltip prop="number" width="80" label="编号" align="center"></el-table-column>
                <el-table-column show-overflow-tooltip prop="createTime" width="220" label="创建时间" align="center"></el-table-column>
                <el-table-column show-overflow-tooltip prop="uuid" width="80" label="uuid" align="center"></el-table-column>
                <el-table-column show-overflow-tooltip prop="marks" width="220" label="备注信息" align="center"></el-table-column>
                <el-table-column fixed="right" width="150" align="center" label="操作">
                    <template>
                        <template >
                            <!-- <el-button
                            size="mini" class="handleButton">编辑</el-button> -->
                            <el-button
                            size="mini"
                            type="danger" class="handleButton">删除</el-button>
                        </template>
                    </template>
                </el-table-column>
            </el-table>
            
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
            equipSelectedOptions: [],
            equipData: [
            //     {
            //     model: '2018-07-20 10:00:00',
            //     system: '运动或动力故障型',
            //     number: '材质因素',
            //     createTime: '张三',
            //     uuid:"",
            //     marks:""
            // }
            ],
            options:[{
                value: '光电经纬仪',
                label: '光电经纬仪',
                children: [{
                        value: 'GD220-Ⅱ',
                        label: 'GD220-Ⅱ',
                        children: [{
                            value: '1#',
                            label: '1#'
                            }, {
                            value: '2#',
                            label: '2#'
                            }]
                    },
                    {
                        value: 'GD220-Ⅲ',
                        label: 'GD220-Ⅲ',
                        children: [{
                            value: '1#',
                            label: '1#'
                            }, {
                            value: '2#',
                            label: '2#'
                            }]
                    },
                    {
                        value: 'GDL-5T',
                        label: 'GDL-5T',
                        children: [{
                            value: '1#',
                            label: '1#'
                            }, {
                            value: '2#',
                            label: '2#'
                            }]
                    },
                    {
                        value: 'GD100',
                        label: 'GD100',
                        children: [{
                            value: '1#',
                            label: '1#'
                            }, {
                            value: '2#',
                            label: '2#'
                            }]
                    },
                    {
                        value: 'GD100-ZD',
                        label: 'GD100-ZD',
                        children: [{
                            value: '1#',
                            label: '1#'
                            }, {
                            value: '2#',
                            label: '2#'
                            }]
                    }]
                },
                {
                value: '雷达系统',
                label: '雷达系统',
                children: [{
                        value: 'GD220-Ⅱ',
                        label: 'GD220-Ⅱ',
                        children: [{
                            value: '1#',
                            label: '1#'
                            }, {
                            value: '2#',
                            label: '2#'
                            }]
                    },
                    {
                        value: 'GD220-Ⅲ',
                        label: 'GD220-Ⅲ',
                        children: [{
                            value: '1#',
                            label: '1#'
                            }, {
                            value: '2#',
                            label: '2#'
                            }]
                    },
                    {
                        value: 'GDL-5T',
                        label: 'GDL-5T',
                        children: [{
                            value: '1#',
                            label: '1#'
                            }, {
                            value: '2#',
                            label: '2#'
                            }]
                    },
                    {
                        value: 'GD100',
                        label: 'GD100',
                        children: [{
                            value: '1#',
                            label: '1#'
                            }, {
                            value: '2#',
                            label: '2#'
                            }]
                    },
                    {
                        value: 'GD100-ZD',
                        label: 'GD100-ZD',
                        children: [{
                            value: '1#',
                            label: '1#'
                            }, {
                            value: '2#',
                            label: '2#'
                            }]
                    }]
                },
                {
                value: '遥测系统',
                label: '遥测系统',
                children:[{
                        value: 'GD220-Ⅱ',
                        label: 'GD220-Ⅱ',
                        children: [{
                            value: '1#',
                            label: '1#'
                            }, {
                            value: '2#',
                            label: '2#'
                            }]
                    },
                    {
                        value: 'GD220-Ⅲ',
                        label: 'GD220-Ⅲ',
                        children: [{
                            value: '1#',
                            label: '1#'
                            }, {
                            value: '2#',
                            label: '2#'
                            }]
                    },
                    {
                        value: 'GDL-5T',
                        label: 'GDL-5T',
                        children: [{
                            value: '1#',
                            label: '1#'
                            }, {
                            value: '2#',
                            label: '2#'
                            }]
                    },
                    {
                        value: 'GD100',
                        label: 'GD100',
                        children: [{
                            value: '1#',
                            label: '1#'
                            }, {
                            value: '2#',
                            label: '2#'
                            }]
                    },
                    {
                        value: 'GD100-ZD',
                        label: 'GD100-ZD',
                        children: [{
                            value: '1#',
                            label: '1#'
                            }, {
                            value: '2#',
                            label: '2#'
                            }]
                    }]
                }
            ]
                
        }
    },
    mounted(){
        this.setUserName(),
        this.initEquipInfo()
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
        },
        handleChange(value) {
            this.equipSelectedOptions = []
            this.equipSelectedOptions.push(value[0],value[1],value[2])
        },
        initEquipInfo(){
            this.equipData = []
            // let userName = sessionStorage.getItem("user");
            // let password = sessionStorage.getItem("password");
            let param = {
                "msg": {

                }
            }
            this.$axios.post('FaultDBManage/searchinfo/',param                   
            ).then(function(response){
                if(response.data.stu == 200){
                    
                    var equipArr = response.data.msg;
                    for(let i = 0;i<equipArr.length;i++){
                        let equipBox = {}
                        equipBox.uuid = equipArr[i].fields.uuid;
                        equipBox.model = equipArr[i].fields.man_sys;
                        equipBox.system = equipArr[i].fields.man_model;
                        equipBox.number = equipArr[i].fields.man_num;
                        equipBox.createTime = equipArr[i].fields.man_creDate;
                        equipBox.marks = equipArr[i].fields.man_remarks
                        this.equipData.push(equipBox)
                    }
                }else{
                    
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })
        },
        selectInfo(){
            this.equipData = []
            let man_sys = this.equipSelectedOptions[0];
            let man_model = this.equipSelectedOptions[1];
            let man_num = this.equipSelectedOptions[2];
            let param = {
                "msg": {
                    "man_sys": man_sys,
                    "man_model": man_model,
                    "man_num": man_num
                }
            }
            this.$axios.post('FaultDBManage/searchinfo/',param                   
            ).then(function(response){
                if(response.data.stu == 200){
                    
                    var equipArr = response.data.msg;
                    for(let i = 0;i<equipArr.length;i++){
                        let equipBox = {}
                        equipBox.uuid = equipArr[i].fields.uuid;
                        equipBox.model = equipArr[i].fields.man_sys;
                        equipBox.system = equipArr[i].fields.man_model;
                        equipBox.number = equipArr[i].fields.man_num;
                        equipBox.createTime = equipArr[i].fields.man_creDate;
                        equipBox.marks = equipArr[i].fields.man_remarks
                        this.equipData.push(equipBox)
                    }
                }else{
                    
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })
        },
        openDetails(row, event, column){
            if(event.label == "操作"){
                alert("hahaha")
            }else{
                this.$router.push({ path: '/infoDetail' });
            }
            
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

