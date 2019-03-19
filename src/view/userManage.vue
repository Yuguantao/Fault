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
        <router-view></router-view>
        <div class="container userArray">
            <div class="topBox clearfix">
                <span class="fl">用户级别：</span>
                <ul class="userLevel fl clearfix">
                    <li data-userType="3">
                        <input type="radio" class="iRadio" name="ccc" checked="checked"  ><label>全部</label>
                    </li>
                    <li data-userType="0"><input type="radio" class="iRadio" name="ccc" ><label>管理员</label></li>
                    <li data-userType="1"><input type="radio" class="iRadio" name="ccc" ><label>总师级</label></li>
                    <li data-userType="2"><input type="radio" class="iRadio" name="ccc" ><label>分系统级</label></li>
                </ul>
                <!-- <form class="public-search fl"> --><div class="public-search fl"><span class="octicon-search02"></span>
                    <input type="text" value="请输入用户名" class="form-control" style="padding-left:8px;" id="search_user">
            <!--   </form> --></div>
                <span class="btn btn-primary fl newSearch"  id="search_sure">搜索</span>
                <span class="btn btn-success fr" data-toggle="modal" data-target="#newUser">新建用户</span>
                <span class="btn btn-default fr" data-toggle="modal" style="margin-right:10px;" data-target="#deleteBox">全部删除</span>
            </div>
            <table class="tableModel" width="100%" cellpadding="0" cellspacing="0">
                <thead>
                    <tr>
                        <th width="5%"><input type="checkbox" name="chk_all" ></th>
                        <th width="15%">用户名</th>
                        <th width="15%">用户级别</th>
                        <th width="20%">型号</th>
                        <th width="20%">系统</th>
                        <th width="15%">岗位</th>
                        <th width="10%">操作</th>
                    </tr>
                </thead>
                <tbody id="result">
                
                </tbody>
            </table>
            <!-- 分页 -->
            <table class="pageModel">
                <tr>
                    <td>
                        <span class="page_prev"><a href="#">&lt;&lt;</a></span>
                        <span class="page_num current">1</span>
                        <span class="page_num"><a href="#">2</a></span>
                        <span class="page_num"> <a  href="#">3</a></span>
                        <span class="page_next"><a href="#">&gt;&gt;</a></span>
                    </td>
                </tr>
            </table>
        </div>
        <div class="modal fade" id="newUser" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-dialog userBox">
                <div class="modal-content">
                <div class="modal-body">
                    <table width="100%" cellspacing="0" cellpadding="0">
                        <tbody><tr>
                            <td width="100" class="item">用户名</td>
                            <td class="pl10"><input type="text" class="form-control" id="add_user"></td>
                        </tr>
                        <tr>
                            <td class="item">密码</td>
                            <td class="pl10"><input type="password" class="form-control" id="add_password"></td>
                        </tr>
                        <tr>
                            <td class="item">用户级别</td>
                            <td class="pl10">
                                <select class="selectpicker" id="add_userlevel" style="display: none;">
                                    <option value="0">管理员</option>
                                    <option value="1">总师</option>
                                    <option value="2">分系统</option>
                                </select><div class="btn-group bootstrap-select dropup"><button type="button" class="btn dropdown-toggle selectpicker btn-default" data-toggle="dropdown" data-id="add_userlevel" title="管理员"><span class="filter-option pull-left">管理员</span>&nbsp;<span class="caret"></span></button><div class="dropdown-menu open" style="max-height: 170.141px; overflow: hidden; min-height: 0px;"><ul class="dropdown-menu inner selectpicker" role="menu" style="max-height: 158.141px; overflow-y: auto; min-height: 0px;"><li rel="0" class="selected"><a tabindex="0" class="" style=""><span class="text">管理员</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="1"><a tabindex="0" class="" style=""><span class="text">总师</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="2"><a tabindex="0" class="" style=""><span class="text">分系统</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li></ul></div></div>
                            </td>
                        </tr>
                        <tr>
                            <td class="item">型号</td>
                            <td class="pl10">
                                <select class="selectpicker" id="add_model" style="display: none;">
                                    <option value="1">设备知识库</option>
                                </select>
                                <div class="btn-group bootstrap-select">
                                    <button type="button" class="btn dropdown-toggle selectpicker btn-default" data-toggle="dropdown" data-id="add_model" title="CZ-5"><span class="filter-option pull-left">设备知识库</span>&nbsp;<span class="caret"></span></button>
                                    <div class="dropdown-menu open"><ul class="dropdown-menu inner selectpicker" role="menu"><li rel="0" class="selected"><a tabindex="0" class="" style=""><span class="text">设备知识库</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li></ul></div></div>
                            </td>
                        </tr>
                        <tr>
                            <td class="item">系统</td>
                            <td class="pl10">
                                <div style="width:220px;" class="sys_check" id="add_system"><div class="icheckbox_minimal-blue checked" style="position: relative;"><input type="checkbox" value="全系统" class="sys_check_One" checked="checked" style="position: absolute; top: -20%; left: -20%; display: block; width: 140%; height: 140%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"><ins class="iCheck-helper" style="position: absolute; top: -20%; left: -20%; display: block; width: 140%; height: 140%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins></div><span>全系统</span>
                                <div class="icheckbox_minimal-blue" style="position: relative;"><input type="checkbox" value="动力系统" style="position: absolute; top: -20%; left: -20%; display: block; width: 140%; height: 140%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"><ins class="iCheck-helper" style="position: absolute; top: -20%; left: -20%; display: block; width: 140%; height: 140%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins></div><span>光电经纬仪</span>
                                <div class="icheckbox_minimal-blue" style="position: relative;"><input type="checkbox" value="测量系统" style="position: absolute; top: -20%; left: -20%; display: block; width: 140%; height: 140%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"><ins class="iCheck-helper" style="position: absolute; top: -20%; left: -20%; display: block; width: 140%; height: 140%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins></div><span>雷达系统</span>
                                <div class="icheckbox_minimal-blue" style="position: relative;"><input type="checkbox" value="动力利用系统" style="position: absolute; top: -20%; left: -20%; display: block; width: 140%; height: 140%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"><ins class="iCheck-helper" style="position: absolute; top: -20%; left: -20%; display: block; width: 140%; height: 140%; margin: 0px; padding: 0px; background: rgb(255, 255, 255); border: 0px; opacity: 0;"></ins></div><span>遥测系统</span>
                                </div>
                                <!-- <select class="selectpicker" id="add_system">
                                    <option value="1">全系统</option>
                                    <option value="2">动力系统</option>
                                    <option value="3">测量系统</option>
                                    <option value="4">动力利用系统</option>
                                    <option value="5">加注系统</option>
                                </select> -->
                            </td>
                        </tr>
                        <tr>
                            <td class="item">岗位</td>
                            <td class="pl10">
                                <select class="selectpicker" id="add_post" style="display: none;">
                                    <option value="1">总师</option>
                                    <option value="2">总指挥</option>
                                    <option value="3">一岗</option>
                                    <option value="4">二岗</option>
                                </select><div class="btn-group bootstrap-select"><button type="button" class="btn dropdown-toggle selectpicker btn-default" data-toggle="dropdown" data-id="add_post" title="总师"><span class="filter-option pull-left">总师</span>&nbsp;<span class="caret"></span></button><div class="dropdown-menu open"><ul class="dropdown-menu inner selectpicker" role="menu"><li rel="0" class="selected"><a tabindex="0" class="" style=""><span class="text">总师</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="1"><a tabindex="0" class="" style=""><span class="text">总指挥</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="2"><a tabindex="0" class="" style=""><span class="text">一岗</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li><li rel="3"><a tabindex="0" class="" style=""><span class="text">二岗</span><i class="glyphicon glyphicon-ok icon-ok check-mark"></i></a></li></ul></div></div>
                            </td>
                        </tr>
                    </tbody></table>
                </div>
                <div class="modal-footer" style="text-align:center;">
                    <button type="button" class="btn btn-primary" id="newUser_add">确认</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                </div>
                </div>
            </div>
        </div>
    </div>
    
    
</template>

<script>

export default {
    name:"search",
    data (){
        return{
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
            if(self.userName){
                $(".headRight").hide();
                $("#user").text(self.userName)
                if(self.userName == "游客用户"){
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
    @import "../../static/css/bootstrap-select.min.css";
    @import "../../static/css/skinBlue.css";
    @import "../../static/css/UserManage.css";
    .head{
        width: 100%;
        height: 66px;
        border-bottom: 5px solid #4A6471;
    }
    .container.index{
        margin: 450px auto 0;
    }
    .container {
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
    }
    .userArray{
        margin: 100px 0 25px;
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
    .icheckbox_minimal-blue,.icheckbox_minimal-blue.checked{display: inline-block; top: 3px;}
	.iradio_minimal-blue,.iradio_minimal-blue.checked{ float:left; top: 2px;}
    label{margin-right: 5px; font-weight: normal; margin-right: 5px;}
    
    .container .topBox {
        margin: 30px 0;
    }
    .fl{
        float: left;
    }
    .modal-body{
        padding: 15px;
    }
</style>

