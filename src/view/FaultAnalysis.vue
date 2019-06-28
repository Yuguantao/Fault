<template>
    <div class="container-box container-fluid">
        <div class="navbar navbar-inverse navbar-fixed-top" style="top:35px">
            <div class="container-fluid">
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
                            <div @click="UserManage" class="fr" id="useSet" style="cursor:pointer;">
                                <img src="../assets/index/useSet.png" width="20" height="23" class="fl" style="margin:14px 5px 0;">
                                <span class="fl UserManage">配置</span>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="container-fluid projects searchInput">
            <div style="position:relative;width:780px;margin:0 auto;">
                <el-select v-model="query" style="width:120px;">
                    <el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label"></el-option>
                </el-select>
                <el-input
                    placeholder="在搜索框输入需要查询的故障类型，点击搜索"
                    style="width:400px;"
                    v-model="searchInput"
                    @keyup.native="get($event)"
                    @keydown.down.native="selectDown"
                    @keydown.up.native="selectUp"
                    clearable>
                </el-input>
                <el-select v-model="query1" style="width:125px;">
                    <el-option v-for="item in options1" :key="item.value" :value="item.value" :label="item.label"></el-option>
                </el-select>
                <el-button type="primary" @click="searchKeyword" style="font-size:16px;width:120px;">搜　 索</el-button>
                <ul class="keywordBox" style="width:400px;position:absolute;overflow-x:hidden;overflow-y:auto;margin-left:124px;">
                    <li class="text-center" v-for ="(value,index) in myData" @click="searchValue($event)">
                        <span class=" textprimary" :class = "{gray:index==now}" style="display:block;padding-left:5px;color:#000;">{{value}}</span>
                    </li>
                </ul>
            </div>
            
        </div>
        <div class="container-fluid projects index">
            <el-row :gutter="20">

                <el-col :span="8">
                    <div class="grid-content bg-purple" style="cursor:pointer;">
                        <p>故障分析</p>
                        <img src="../assets/index/computer2.png" alt="">
                        <a  @click="router(1)">点击进入</a>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple" style="cursor:pointer;">
                        <p>故障信息录入</p>
                        <img src="../assets/index/computer4.png" alt="">
                        <a  class="normal" @click="router(2)">点击进入</a>
                    </div>
                </el-col>
                <el-col :span="8">
                    <div class="grid-content bg-purple" style="cursor:pointer;">
                        <p>设备信息库</p>
                        <img src="../assets/index/computer5.png" alt="">
                        <a  @click="router(3)">点击进入</a>
                    </div>
                </el-col>
            </el-row>
        </div>
        <router-view></router-view>
    </div>
    
</template>

<script>
import config from '../router/MainConf'

export default {
    name:"FaultAnalysis",
    data (){
        return{
            acc_permission:"",
            userName:"",
            searchInput:"",
            now:-1,
            myData:[],
            keyword:'',
            options: [{
                    value: '0',
                    label: '模糊搜索'
                }, {
                    value: '1',
                    label: '精确搜索'
                }],
            query: '1',
            options1: [{
                    value: '1',
                    label: '故障数据库'
                }, {
                    value: '2',
                    label: '设备信息库'
                }],
            query1: '',
            config:config,
            menuList:[]
        }
    },
    mounted(){
        this.setUserName()
    },
    methods: {
        setUserName(){
            var self = this;
            self.userName = sessionStorage.getItem("user");
            self.acc_permission = sessionStorage.getItem("acc_permission");
            if(self.userName){
                $(".headRight").hide();
                $("#user").text(self.userName)
                if(self.acc_permission == "2"){
                    $(".index .normal").css("background-color","#999")
                    $(".index .normal").attr("disabled",true).css("pointer-events","none");
                    $("#useSet").hide()
                }else if(self.acc_permission == "1"){
                    $("#useSet").hide()
                }
            }else{
                alert("请登录！")
                this.$router.push({ path: '/login' })
            }

        },
        exitUser(){
            this.$store.state.changeColorFlag = true
            this.$router.push({ path: '/login' });
            sessionStorage.removeItem("user")
        },
        searchKeyword(){
            this.$store.state.changeColorFlag = true
            sessionStorage.setItem("keyword",this.searchInput)
            sessionStorage.setItem("query",this.query)
            sessionStorage.setItem("query1",this.query1)
            let item = {
                            component: "fault",
                            menuId: "2-1",
                            title: "设备知识库"
                        }
            
            this.openTab(item)
            this.$router.push({ path: '/index' });
            
        },
        UserManage(){
            let item = {
                            component: "userManage",
                            menuId: "5-1",
                            title: "实施人员管理"
                        }
            this.openTab(item)
            this.$router.push({ path: '/index' })
        },
            get:function (event) {
                if(event.keyCode==38||event.keyCode==40)return;
                if(event.keyCode == 13){
                    this.searchKeyword()
                    return
                }
                let keyword = this.searchInput
                let userName = sessionStorage.getItem("user");
                let param =         {
                            "msg": {
                                    "wrd_accid": userName,
                                    "wrd_records": keyword,
                                }
                            }

                this.$axios.post('FaultDBManage/searchkeywrd/',param                   
                ).then(function(response){
                    if(response.data.stu == 200){
                        this.myData = response.data.msg
                        $(".keywordBox").show()
                    }else{
                        this.myData = []
                        $(".keywordBox").hide()
                    }
                }.bind(this)).catch(function (error) { 
                    console.log(error);
                })
            },
            selectDown:function () {
                this.now++;
                if(this.now==this.myData.length)this.now=-1;
                this.searchInput=this.myData[this.now];
            },
            selectUp:function () {
                this.now--;
                if(this.now==-2)this.now=this.myData.length-1;
                this.searchInput=this.myData[this.now];
            },
            searchValue(event){
                $(".keywordBox").hide()
                this.searchInput = event.target.innerText
            },
            initializeMemu () {
                this.menuList = JSON.parse(JSON.stringify(this.config.menu))
            },
            openTab (item) {
                this.$tab.open(item)
                this.initializeMemu()
            },
            router(index){
                
                let item
                if(index == 1){
                    item = {
                                    component: "analysis",
                                    menuId: "4-1",
                                    title: "故障综合分析"
                                }
                    
                }else if(index == 2){
                    item = {
                                    component: "faultInput",
                                    menuId: "3-1",
                                    title: "故障信息录入"
                                }
                }else if(index == 3){
                    item = {
                                    component: "search",
                                    menuId: "search",
                                    title: "设备信息"
                                }
                }
                this.openTab(item)
                this.$store.state.changeColorFlag = true
                this.$router.push({ path: '/index' })
            },
    }
}
</script>

<style scoped>
    @import "../../static/css/reset.css";
    @import "../../static/css/index.css";
    .modalBox{width:100%;height:100%;position:fixed;top:0;left:0;bottom:0;right:0;background-color:rgba(0,0,0,.4);display:none;z-index:999;}
    .modalBox .settingBox{width:400px;height:400px;border-radius:5px;background-color:white;position:absolute;top:30%;left:50%;transform:translateX(-50%) translateY(-30%);}
    .settingBox h3{width:100%;text-align:center;margin-top:13px;padding:0 10px;font-size:18px;margin-bottom: 20px}
    .settingBox {width:100%;height:100%;text-align:center;position:relative;}
    .settingBox  p{width:70%;padding: 10px 0;margin: 0px auto;}
    .settingBox .detail{width:100%;}
    .settingBox .detail li{width:70%;padding:7px 0px;text-align:left;margin:0 auto;}
    .detailTime{width: 47%;position: relative;padding: 0px 0 10px 0;margin: 0 auto;text-align: left;}
    .detailTime input {width:155px;border: 1px solid #e0e0e0;border-radius: 4px;height:25px;line-height:25px;}
    .settingBox #detailMessage{width:70%;height:30px;border: 1px solid #e0e0e0;border-radius: 4px;}
    .settingBox  button{width:70px;height:35px;position:absolute;bottom:25px;display: inline-block;font-size: 14px;font-weight: 400;text-align: center;white-space: nowrap;vertical-align: middle;cursor: pointer;-webkit-user-select: none;-moz-user-select: none;-ms-user-select: none;user-select: none;background-image: none;border: 1px solid transparent;border-radius: 4px;}
    .settingBox .submit{left:100px;color: #fff;background-color: #428bca;border-color: #357ebd;}
    .settingBox .cancel{right:100px;color: #333;background-color: #fff;border-color: #ccc;}
    .main-content .mc-m{height:828px; position:relative;}
    .main-content .mc-m .mcm-seq{height:690px;}
    .main-content .mc-b div.ml-d{display:none;}
    .main-content .mc-m .newBtn{position:absolute; bottom:25px; left:50%; margin-left:-45px;width:80px; height:32px; line-height:32px; text-align:center; background:#1879a3; border-radius:4px; color:#fff; font-size:14px; z-index:10; cursor:pointer;}
    .submenu span{background:none;}
    .submenu{display:block;}
    .ml-tree-p{font-size: 15px;display: block;padding: 5px 30px 5px 30px;border-top: 1px solid #FCFEFE;border-bottom: 1px solid #9A9A9A;cursor: pointer;font-weight: bold;}
    .ml-tree-p select{width:100px;border: 1px solid #e0e0e0;border-radius: 4px;height: 34px;line-height: 34px;}
    .line {width: 100%;height: 100px;}
    .line .title {height: 0px;padding-left: 0px;}
    .line .detail li select {width:150px;border: 1px solid #e0e0e0;border-radius: 4px;height: 25px;line-height: 25px;}
    [class^="icon-"],[class*=" icon-"]{background-image: url(../assets/glyphicons-halflings.png);background-position: 14px 14px;background-repeat: no-repeat;display: inline-block;height: 14px;line-height: 14px;margin-top: 1px;vertical-align: text-top;width: 14px;}
    .add-on{position: absolute;right: -20px;top: 8px;width: 14px;height: 14px;}
    .form_datetime .add-on .icon-th{margin-top: -7px;background-position: -240px 0;cursor: pointer;width: 14px;height: 14px;}
    .icon-arrow-left{background-position: -240px -96px;}
    .icon-arrow-right {background-position: -264px -96px;}

    .container-fluid.index{
        margin: 200px auto 0;
    }
    .container-fluid {
        padding-right: 40px;
        padding-left: 40px;
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
    .el-row {
        margin-bottom: 20px;
        &:last-child {
        margin-bottom: 0;
        }
    }
    .el-col {
        border-radius: 4px;
        text-align: center
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
        width: 254px; height: 205px; background: url(../assets/index/bg.png) repeat; text-align: center;
        margin: 0 auto;
    }

    .bg-purple p{width: 100%; height: 52px; font-size: 14px; color: #333; text-align: center; line-height: 52px; font-weight: bold;}
    .bg-purple img{width: 82px; height: 62px; margin-bottom: 17px;margin-top: 17px;}
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }

    .bg-purple a{display: block; width: 120px; height: 34px; line-height: 34px; text-align: center; font-size: 12px; color: #fff; background-color: #28a3f4; border-radius: 4px; margin: 0 auto;}
    .bg-purple a:hover{background-color: #2092dd;}

    .searchInput{
        text-align: center;
        margin: 250px 0;
    }


    .part_t{width: 100%; border-bottom: 1px solid #e1e1e1; margin-top: 25px; padding-bottom: 20px;}
    .part_t li{font-size: 16px; color: #0077c6; line-height: 28px;}
    .part_t li img{width: 16px; height: 16px; vertical-align: -2px; margin-right: 8px;}
    .part_t li.red{color: #d50000; text-decoration: underline;}
    .part_b{width: 100%; margin-top: 25px; padding-bottom: 40px;}
    .part_b li{line-height: 22px; margin-bottom: 20px;}
    .part_b h4{font-size: 16px; color: #0077c6; line-height: 28px;}
    .part_b h4 img{vertical-align: -2px; margin-right: 8px;}

        .title{
           color:#ffffff;
           text-align: center;
       }
       .gray{
           background-color: #dff0d8;
       }
       .textprimary{
           color:#000;
           text-align: left;
           font-family: "Microsoft YaHei UI";
           font-size: 12px;
       }
       /* 搜索下拉框  */	
    .keywordBox{display:none;position: absolute; width: 500px; min-height: 44px; box-sizing: border-box; border-bottom: 1px solid #d1d1d1; border-left: 1px solid #d1d1d1; border-right: 1px solid #d1d1d1; box-shadow: 0 2px 5px #e2e2e2; background-color: #fff; padding: 10px 0; z-index:100;}
    .keywordBox li{text-indent: 10px; line-height: 32px; cursor: pointer; font-size:14px;}
    .grey{background-color:#e1e1e1;}
    .keywordBox li:hover{background-color:#e1e1e1;}

    .container-box{
        width: 100%;
        height: 100%;
        background: url("../assets/login/login.png");
    }
</style>

