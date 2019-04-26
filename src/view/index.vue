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
                            <router-link to="/userManage" class="fr" id="useSet">
                                <img src="../assets/index/useSet.png" width="20" height="23" class="fl" style="margin:14px 5px 0;">
                                <span class="fl UserManage">配置</span>
                            </router-link>
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
        

        <div class="container-fluid projects index">
            <ul class="content row">
                <li class="visitor">
                    <p>新增设备</p>
                    <img src="../assets/index/computer1.png" alt="">
                    <router-link to= "/addEquip" >点击进入</router-link>
                </li>
                <li class="middle visitor">
                    <p>故障库</p>
                    <img src="../assets/index/computer2.png" alt="">
                    <router-link to="/fault">点击进入</router-link>
                </li>
                <li class="visitor">
                    <p>故障信息录入</p>
                    <img src="../assets/index/computer4.png" alt="">
                    <router-link to="/faultInput">点击进入</router-link>
                </li>
                <li style="margin-left:13px;">
                    <p>设备信息查询</p>
                    <img src="../assets/index/computer5.png" alt="">
                    <router-link to= "/search" >点击进入</router-link>
                </li>
            </ul>
        </div>
        <router-view></router-view>
    </div>
    
</template>

<script>
export default {
    name:"index",
    data (){
        return{
            acc_permission:"",
            userName:""
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
                    $(".visitor a").css("background-color","#999")
                    $(".visitor a").attr("disabled",true).css("pointer-events","none");
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
            this.$router.push({ path: '/login' });
            sessionStorage.removeItem("user")
        }
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
        margin: 450px auto 0;
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
</style>

