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
                    <el-radio-group v-model="radio" @change="filterUser">
                        <el-radio :label="3">全部</el-radio>
                        <el-radio :label="0">管理员</el-radio>
                        <el-radio :label="1">分系统用户</el-radio>
                        <el-radio :label="2">一般用户</el-radio>
                    </el-radio-group>
                </ul>
                <!-- <form class="public-search fl"> --><div class="public-search fl"><span class="octicon-search02"></span>
                    <input type="text" placeholder="请输入用户名" class="form-control" style="padding-left:8px;" id="search_user">
            <!--   </form> --></div>
                <span class="btn btn-primary fl newSearch"  id="search_sure" @click="searchUser">搜索</span>
                <span class="btn btn-success fr" data-toggle="modal" data-target="#newUser">新建用户</span>
                <span class="btn btn-default fr" data-toggle="modal" style="margin-right:10px;" data-target="#deleteBox">全部删除</span>
        </div>
        
        <el-table class="userTable"
                    fixed
                    ref="multipleTable"
                    :data="userData"
                    tooltip-effect="dark"
                    style="width: 100%;cursor:pointer"
                    height="500">
                    <el-table-column
                        type="selection"
                        width="50"
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="name"
                        label="用户名"
                        width="150"
                        show-overflow-tooltip
                        align="center">
                        <template ></template>
                    </el-table-column>
                    <el-table-column
                        prop="password"
                        label="密码"
                        width="150"
                        show-overflow-tooltip
                        align="center">
                        <template ></template>
                    </el-table-column>
                    <el-table-column
                        prop="permission"
                        label="用户级别"
                        width="100"
                        show-overflow-tooltip
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="system"
                        label="系统"
                        width="380"
                        show-overflow-tooltip
                        align="center">
                    </el-table-column>
                    <el-table-column
                        prop="uuid"
                        label="uuid"
                        width="85"
                        show-overflow-tooltip
                        align="center">
                    </el-table-column>
                    <el-table-column label="操作" width="150" align="center">
                        <template slot-scope="scope">
                            <el-button
                            size="mini" @click="editUserBox(scope.row)" data-toggle="modal" data-target="#editBox">编辑</el-button>
                            <el-button
                            size="mini"
                            type="danger" @click="deleteUser(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
            </el-table>
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
                                <el-select @change="userSelect" v-model="value" placeholder="请选择" style="width:220px">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </td>
                        </tr>
                        <tr>
                            <td class="item">系统</td>
                            <td class="pl10 systemBox">
                                <el-checkbox-group 
                                    v-model="checkedSystem" @change="selectSystem">
                                    <el-checkbox v-for="(system,index) in cities"  :disabled="disabled" :label="system" :key="index">{{system}}</el-checkbox>
                                </el-checkbox-group>
                            </td>
                        </tr>
                        <tr>
                            <td class="item">备注信息</td>
                            <td class="pl10">
                                <input class="form-control" type="text" id="detailMessage">
                            </td>										
                        </tr>
                    </tbody></table>
                </div>
                <div class="modal-footer" style="text-align:center;">
                    <button type="button" class="btn btn-primary" id="newUser_add" @click="addNewUser">确认</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="editBox" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-dialog userBox">
                <div class="modal-content">
                <div class="modal-body">
                    <table width="100%" cellspacing="0" cellpadding="0">
                        <tbody><tr>
                            <td width="100" class="item">用户名</td>
                            <td class="pl10"><input type="text" class="form-control" id="edit_user"></td>
                        </tr>
                        <tr>
                            <td class="item">密码</td>
                            <td class="pl10"><input type="password" class="form-control" id="edit_password"></td>
                        </tr>
                        <tr>
                            <td class="item">用户级别</td>
                            <td class="pl10">
                                <el-select @change="userSelect" v-model="value" placeholder="请选择" style="width:220px">
                                    <el-option
                                    v-for="item in options"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </td>
                        </tr>
                        <tr>
                            <td class="item">系统</td>
                            <td class="pl10 systemBox">
                                <el-checkbox-group 
                                    v-model="checkedSystem" @change="selectSystem">
                                    <el-checkbox v-for="(system,index) in cities"  :disabled="disabled" :label="system" :key="index">{{system}}</el-checkbox>
                                </el-checkbox-group>
                            </td>
                        </tr>
                        <tr>
                            <td class="item">备注信息</td>
                            <td class="pl10">
                                <input class="form-control " type="text" id="editDetailMessage">
                            </td>										
                        </tr>
                    </tbody></table>
                </div>
                <div class="modal-footer" style="text-align:center;">
                    <button type="button" class="btn btn-primary" id="newUser_edit" @click="editUser">确认</button>
                    <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                </div>
                </div>
            </div>
        </div>
    </div>
    
    
</template>

<script>
const cityOptions = ['光电经纬仪', '雷电系统', '遥测系统'];
export default {
    name:"search",
    data (){
        return{
            userName:"",
            radio:3,
            userData:[
            //     {
            //     name: '王小虎',
            //     permission: '分系统用户',
            //     system:"'光电经纬仪', '雷电系统', '遥测系统'",
            //      uuid:""
            // }
            ],

            userPermission:"",
            checkedSystem: [],
            cities: cityOptions,
            systemArr:[],
            disabled:false,
            options: [{
                    value: '0',
                    label: '管理员'
                }, {
                    value: '1',
                    label: '分系统用户'
                }, {
                    value: '2',
                    label: '一般用户'
                }],
            value: ''
        }
    },
    mounted(){
        this.setUserName()
        this.initSearchUser()
    },
    methods: {
        setUserName(){
            var self = this;
            self.userName = sessionStorage.getItem("user");
            self.password = sessionStorage.getItem("password");
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
        initSearchUser(){
            this.userData = []
            let userName = sessionStorage.getItem("user");
            let password = sessionStorage.getItem("password");
            let param = {
                "msg": {
                    "acc_id":userName,
                    "acc_pwd":password,
                }
            }
            this.$axios.post('FaultDBManage/searchuser/',param                   
            ).then(function(response){
                if(response.data.stu == 200){
                    
                    var userArr = response.data.msg;
                    for(let i = 0;i<userArr.length;i++){
                        let userBox = {}
                        userBox.uuid = userArr[i].pk;
                        userBox.name = userArr[i].fields.acc_id;
                        userBox.password = userArr[i].fields.acc_pwd;
                        let permissionName;
                        if(userArr[i].fields.acc_permission == 0){
                            permissionName = "管理员"
                        }else if(userArr[i].fields.acc_permission == 1){
                            permissionName = "分系统用户"
                        }else{
                            permissionName = "一般用户"
                        }
                        userBox.permission = permissionName;
                        userBox.system = userArr[i].fields.acc_system
                        this.userData.push(userBox)
                    }
                }else{
                    
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })
        },
        exitUser(){
            this.$router.push({ path: '/login' });
            sessionStorage.removeItem("user")
        },
        addNewUser(){
            var self = this;
            let userName = $("#add_user").val()
            let password = $("#add_password").val()
            let detailMessage = $("#detailMessage").val()

            var param = {
                    "msg": {
                        "acc_id":userName,
                        "acc_pwd":password,
                        "acc_permission":this.userPermission[0],
                        "acc_system":this.systemArr[0]?this.systemArr[0]:"",
                        "acc_remarks":detailMessage
                    }
                }
            if(this.userPermission[0] != 1) param.msg.acc_system = ""
            this.$axios.post('FaultDBManage/adduser/',param                   
            ).then(function(response){
                if(response.data.stu == 200){
                    alert("创建成功")
                    $("#newUser").hide();
                    $(".modal-backdrop").hide();
                }else{
                    alert("用户名已存在！")
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })
        },
        userSelect(vId){
            let obj = {};
            obj = this.options.find((item)=>{
                return item.value === vId;//
            });
            this.userPermission = obj.value
            if(this.userPermission != "1"){
                this.disabled = true
            }else{
                this.disabled = false
            }
        },
        selectSystem(){
            this.systemArr = []
            this.systemArr.push(this.checkedSystem)
        },
        filterUser(){
            this.userData = []
            let param = {
                    "msg": {
                    "acc_permission":this.radio
                    }
                }
                
            this.$axios.post('FaultDBManage/selectuser/',param                   
            ).then(function(response){
                if(response.data.stu == 200){
                    
                    var userArr = response.data.msg;
                    for(let i = 0;i<userArr.length;i++){
                        let userBox = {}
                        userBox.uuid = userArr[i].pk;
                        userBox.name = userArr[i].fields.acc_id;
                        userBox.password = userArr[i].fields.acc_pwd;
                        let permissionName;
                        if(userArr[i].fields.acc_permission == 0){
                            permissionName = "管理员"
                        }else if(userArr[i].fields.acc_permission == 1){
                            permissionName = "分系统用户"
                        }else{
                            permissionName = "一般用户"
                        }
                        userBox.permission = permissionName;
                        userBox.system = userArr[i].fields.acc_system
                        this.userData.push(userBox)
                    }
                }else{
                    
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })
        },
        searchUser(){
            this.userData = []
            let username = $("#search_user").val()
            let param = {
                    "msg": {
                    "acc_id":username
                    }
                }
                
            this.$axios.post('FaultDBManage/selectuser/',param                   
            ).then(function(response){
                if(response.data.stu == 200){
                    
                    var userArr = response.data.msg;
                    for(let i = 0;i<userArr.length;i++){
                        let userBox = {}
                        userBox.uuid = userArr[i].pk;
                        userBox.name = userArr[i].fields.acc_id;
                        userBox.password = userArr[i].fields.acc_pwd;
                        let permissionName;
                        if(userArr[i].fields.acc_permission == 0){
                            permissionName = "管理员"
                        }else if(userArr[i].fields.acc_permission == 1){
                            permissionName = "分系统用户"
                        }else{
                            permissionName = "一般用户"
                        }
                        userBox.permission = permissionName;
                        userBox.system = userArr[i].fields.acc_system
                        this.userData.push(userBox)
                    }
                }else{
                    
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })
        },
        editUserBox(row){
            $("#edit_user").val(row.name);
            $("#edit_password").val(row.password);
        },
        editUser(){

        },
        deleteUser(row){
            let param = {
                    "msg": {
                        "uuid":row.uuid
                    }
                }
            this.$axios.post('FaultDBManage/deluser/',param                   
            ).then(function(response){
                if(response.data.stu == 200){
                    alert("删除成功！")
                    var length = this.userData.length;
                    for (var i = 0; i < length; i++) {
                        if (this.userData[i].uuid == param.msg.uuid) {                           
                                this.userData.splice(i, 1);
                        }
                    }
                }else{
                   alert("删除失败！") 
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })    
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
        height: 450px;
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
    .el-input__inner{
        border-color: #ced4da;
    }
</style>

