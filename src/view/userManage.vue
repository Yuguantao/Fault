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
                    <li data-userType="1"><input type="radio" class="iRadio" name="ccc" ><label>分系统级</label></li>
                    <li data-userType="2"><input type="radio" class="iRadio" name="ccc" ><label>一般用户</label></li>
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
                        <th width="10%"><input type="checkbox" name="chk_all" ></th>
                        <th width="15%">用户名</th>
                        <th width="15%">用户级别</th>
                        <th width="20%">系统</th>
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
                            <td class="pl10">
                                <el-checkbox-group 
                                    v-model="checkedSystem" @change="selectSystem">
                                    <el-checkbox v-for="(system,index) in cities"  :label="system" :key="index">{{system}}</el-checkbox>
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
    </div>
    
    
</template>

<script>
const cityOptions = ['光电经纬仪', '雷电系统', '遥测系统'];
export default {
    name:"search",
    data (){
        return{
            userName:"",
            userPermission:"",
            checkedSystem: [],
            cities: cityOptions,
            systemArr:[],
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
                        "acc_permission":this.userPermission[0]?this.userPermission[0]:"",
                        "acc_system":this.systemArr[0],
                        "acc_remarks":detailMessage
                    }
                }

            this.$axios.post('FaultDBManage/adduser/',param                   
            ).then(function(response){
                if(response.data.stu == 200){
                    
                }else{
                    alert("用户名密码错误！")
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
        },
        selectSystem(){
            this.systemArr = []
            this.systemArr.push(this.checkedSystem)
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
    .el-input__inner{
        border-color: #ced4da;
    }
</style>

