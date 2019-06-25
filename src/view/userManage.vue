<template>
    <div class="container-fluid container-box">
        <vHead></vHead>
        <router-view></router-view>
        <el-container>
            <el-aside style="width:200px;height:100%;margin-top:52px;">
                <vNavMenu></vNavMenu>
            </el-aside>
            <el-main>
                <div class="topBox clearfix">
                    <vTabs></vTabs>
                </div>
                <div class="container-fluid userArray">
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
                        <button type="button" class="el-button el-button--primary fl newSearch" id="search_sure" @click="searchUser"><span>搜索</span></button>
                        <span class="btn btn-success fr" data-toggle="modal" data-target="#newUser">新建用户</span>
                        <span class="btn btn-default fr" data-toggle="modal" style="margin-right:10px;" data-target="#deleteBox">全部删除</span>
                    </div>
            
                    <el-table class="userTable"
                            fixed
                            ref="multipleTable"
                            :data="userData"
                            tooltip-effect="dark"
                            style="width: 100%;cursor:pointer"
                            :header-cell-style="tableHeaderColor"
                            height="500">
                            <el-table-column
                                type="selection"
                                width="50"
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="name"
                                label="用户名"
                                width="190"
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
                                width="180"
                                show-overflow-tooltip
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="system"
                                label="系统"
                                width="400"
                                show-overflow-tooltip
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="acc_remarks"
                                label="备注"
                                width="425"
                                show-overflow-tooltip
                                align="center">
                            </el-table-column>
                            <el-table-column
                                prop="uuid"
                                label="uuid"
                                v-if="false"
                                show-overflow-tooltip
                                align="center">
                            </el-table-column>
                            <el-table-column fixed="right" label="操作" width="160" align="center">
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
            </el-main>                 
        </el-container>
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

export default {
    name:"search",
    data (){
        return{
            userName:"",
            radio:3,
            userData:[],
            userPermission:"",
            checkedSystem: [],
            cities: [],
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
            value: '',
            results:[],
            oldChecksystem:[],
            oldInfo:[]
        }
    },
    mounted(){
        this.setUserName()
        this.initSearchUser(),
        this.initSystem()
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
        initSystem(){
            let param = {
                        "msg": {
                                "search_man": "光电经纬仪"
                            }
                        }           
            this.$axios.post('FaultDBManage/searchinfo/',param,                
            ).then(function(response){
                this.cities = []

                if(response.data.msg.length>0){
                    var sysArr = response.data.msg
                    for(var i = 0;i<sysArr.length;i++){  
                        this.cities.push(sysArr[i])
                    }                    
                    
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })

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
                        userBox.acc_remarks = userArr[i].fields.acc_remarks
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
        tableHeaderColor({ row, column, rowIndex, columnIndex }) {
            if (rowIndex === 0) {
                return 'background-color: lightblue;color: #111;font-weight: 500;'
            }
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
                    $("#newUser").modal('hide');                   
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
                this.checkedSystem = []
                this.oldChecksystem = []
                this.systemArr = []
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
                        userBox.acc_remarks = userArr[i].fields.acc_remarks
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
                        userBox.acc_remarks = userArr[i].fields.acc_remarks
                        this.userData.push(userBox)
                    }
                }else{
                    
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })
        },
        editUserBox(row){
            this.oldInfo = []
            $("#edit_user").val(row.name);
            $("#edit_password").val(row.password);
            $("#editDetailMessage").val(row.acc_remarks)
            this.getSystem(row)
            this.getPermission(row)
            this.oldInfo.push(row,this.oldChecksystem,this.value)
            

        },
        editUser(){
            let permissionName
            if(this.oldInfo[0].permission == "管理员"){
                permissionName = 0
            }else if(this.oldInfo[0].permission == "分系统用户"){
                permissionName = 1
            }else{
                permissionName = 2
            }
            let param = {
                        "msg": {
                            "uuid":this.oldInfo[0].uuid,
                            "acc_id_old":this.oldInfo[0].name,
                            "acc_id":$("#edit_user").val(),
                            "acc_pwd_old":this.oldInfo[0].password,
                            "acc_pwd":$("#edit_password").val(),
                            "acc_remarks_old":this.oldInfo[0].acc_remarks,
                            "acc_remarks":$("#editDetailMessage").val(),
                            "acc_permission_old":permissionName,
                            "acc_permission":this.value,
                            "acc_system":this.systemArr[0]?this.systemArr[0]:"",
                            "acc_system_old":this.oldInfo[1],
                        }
                    }
            this.$axios.post('FaultDBManage/alteruser/',param                   
            ).then(function(response){
                if(response.data.stu == 200){
                    alert("修改成功！")
                    this.initSearchUser()
                    $("#editBox").modal('hide')

                }else{
                    alert("修改失败！")
                    //$("#editBox").modal('hide')
                }
                this.checkedSystem = []
                this.value = ""
                this.disabled = false
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })

        },
        getSystem(row){
            this.checkedSystem = []
            this.oldChecksystem = []
            let strValue = row.system;
            let regex = /'([^']*)'/g;
            let currentResult;
            this.results = [];
            while ((currentResult = regex.exec(strValue)) !== null) {
                this.results.push(currentResult[1]);
            }
            for (let i = 0; i < this.results.length; i++) {
                this.checkedSystem.push(this.results[i])
                this.oldChecksystem.push(this.results[i])
            }
        },
        getPermission(row){
            this.value = ""
            if(row.permission == "管理员"){
                this.value = "0"
                this.disabled = true
                //this.oldChecksystem = []
                this.checkedSystem = []
            }else if(row.permission == "分系统用户"){
                this.value = "1"
                this.disabled = false
            }else{
                this.value = "2"
                this.disabled = true
                //this.oldChecksystem = []
                this.checkedSystem = []
            }
        },
        deleteUser(row){
            if(confirm("确认删除？")){
                if(true){          
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
        },

    }
}
</script>

<style scoped>
    @import "../../static/css/reset.css";
    @import "../../static/css/index.css";
    @import "../../static/css/bootstrap-select.min.css";
    @import "../../static/css/skinBlue.css";
    @import "../../static/css/UserManage.css";

    .container-fluid.index{
        margin: 450px auto 0;
    }
    .userArray{
        height: 450px;
    }

    .icheckbox_minimal-blue,.icheckbox_minimal-blue.checked{display: inline-block; top: 3px;}
	.iradio_minimal-blue,.iradio_minimal-blue.checked{ float:left; top: 2px;}
    label{margin-right: 5px; font-weight: normal; margin-right: 5px;}
    
    .container-fluid .topBox {
        margin: 7px 0;
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
    .container-box {
            margin-right: auto;
            margin-left: auto;
            padding-right:0px;
            padding-left:0px;
        }

        .page-header {
        padding-bottom: 9px;
        margin: 10px 0 10px;
        border-bottom: 1px solid #eee;
    }
    .page-header {
        padding-bottom: 0px;
        margin: 0px;
    }
    .nav {
        padding-left: 10px;
        padding-top: 5px;
        background: #fff;
    }
    .nav-tabs>li {
        float: left;
        margin-bottom: -1px;
    }
    .nav>li {
        position: relative;
        display: block;
    }
    
    .nav-tabs>li.active>a, .nav-tabs>li.active>a:focus, .nav-tabs>li.active>a:hover {
        color: #555;
        cursor: default;
        background-color: #fff;
        border: 1px solid #ddd;
        border-bottom-color: transparent;
    }
    .nav>li>a {
        padding: 5px 10px;
        border-radius: 5px 5px 0px 0px;
        margin: 0px 5px;
        cursor: pointer;
    }
    .nav-tabs>li.active>a, .nav-tabs>li.active>a:focus, .nav-tabs>li.active>a:hover {
        background: #EEF1F6;
    }
</style>

