<template>
    <div class="container-fluid">
        <!-- <div class="fh-login">
            <div class="fh-login-right" >
                <div class="login-title">欢迎使用</div>
                <div class="form-signin" style="height:280px;">
                    <div class="group">
						<img src="../assets/login/fh-user.png" style="width:30px">
						<input type="text" class="input-control" id="inputEmail" autocomplete="off" placeholder="用户名" style="height: 50px; line-height: 50px;" required autofocus>
					</div>
                    <div class="group" style="margin-bottom:20px;">
						<img src="../assets/login/suo.png" style="width:30px">
						<input type="password" class="input-control" id="inputPassword" autocomplete="off" placeholder="密　码" style="height: 50px; line-height: 50px;">
					</div>
                    <el-select v-model="value" placeholder="请选择" style="width: 295px;  height: 40px;">
                        <el-option
                        v-for="item in options"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>

                    <div class="group">
						<button style="width: 100%; border: none; background: rgb(82, 166, 212); color: rgb(255, 255, 255); height: 50px;" type="button" class="btn btn-default" id="loginBtn" @click="GetLoginInfo">登  录</button>
					</div>
                </div>
            </div>
        </div> -->
         <div class="loginBox" style="position:relative;">
             <h1>
                 <img src="../assets/login/logoA.png" alt="" style="margin-top:222px;">
             </h1>
             <h2>
                 <span style="color:#fff;font-family:'华文行楷';font-size:50px;margin-top: 80px;display: block;margin-left: 243px;font-weight: bold;">故障数据库管理系统</span>
             </h2>
             <h3>
                 <span class="line" style="display:block;width:100%;height:10px;margin-top:225px;"></span>
             </h3>
             <div class="loginFooter">
                 <!-- <span>
                     版权所有 CopyRight ©2019 All Right Reserved
                 </span>
                 <span>
                     故障数据库管理系统项目组2019
                 </span> -->
             </div>
             <div class="fh-login">
                <div class="fh-login-right" >
                    <div class="login-title">登录管理系统</div>
                    <div class="form-signin" style="height:280px;">
                        <div class="group">
                            <img src="../assets/login/fh-user.png" style="width:30px">
                            <input type="text" class="input-control" id="inputEmail" autocomplete="off" placeholder="用户名" style="height: 50px; line-height: 50px;" required autofocus>
                        </div>
                        <div class="group" style="margin-bottom:20px;">
                            <img src="../assets/login/suo.png" style="width:30px">
                            <input type="password" class="input-control" id="inputPassword" autocomplete="off" placeholder="密　码" style="height: 50px; line-height: 50px;">
                        </div>
                        <el-select v-model="value" placeholder="请选择" style="width: 257px;  height: 40px;">
                            <el-option
                            v-for="item in options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>

                        <div class="group" style="margin-top:50px;">
                            <button style="width: 100%; border: none; background: rgb(82, 166, 212); color: rgb(255, 255, 255); height: 50px;" type="button" class="btn btn-default" id="loginBtn" @click="GetLoginInfo">登  录</button>
                        </div>
                    </div>
                </div>
            </div>
         </div>
    </div>
</template>

<script>  
    export default {
        name: 'login',
        data(){
            return{
                options: [
                    {
                        value: '选项1',
                        label: '光电测试用户'
                    }, 
                    {
                        value: '选项2',
                        label: '雷达设备用户'
                    }, 
                    {
                        value: '选项3',
                        label: '遥测设备用户'
                    }, 
                    {
                        value: '选项4',
                        label: '新增设备用户'
                    }
                ],
                value: ''
            }
        },
        mounted(){
             
        },
        created() {
            let that = this;
            document.onkeypress = function(e) {
            var keycode = document.all ? event.keyCode : e.which;
            if (keycode == 13) {
                that.GetLoginInfo();// 登录方法名
                return false;
            }
            };
        },
        methods: {
            GetLoginInfo(){
                var self = this;
                var userName = $("#inputEmail").val()
                var password = $("#inputPassword").val()
                if(userName == "InitializeUserName"){
                    sessionStorage.setItem("user","InitializeUserName");
                    sessionStorage.setItem("password","123");
                    sessionStorage.setItem("acc_permission","0");
                    sessionStorage.setItem("acc_system","");
                    //this.$router.push({ path: '/FaultAnalysis' })
                    this.$router.push({ path: '/index' })
                    return
                }
                var param = {
                    "msg":{
                            "acc_id":userName,
                            "acc_pwd":password,
                            "acc_stu":"1"
                        }
                }
                this.$axios.post('FaultDBManage/loginuser/',param                   
                ).then(function(response){
                    if(response.data.stu == 200){
                        sessionStorage.setItem("user",response.data.msg[0].fields.acc_id);
                        sessionStorage.setItem("password",response.data.msg[0].fields.acc_pwd);
                        sessionStorage.setItem("acc_permission",response.data.msg[0].fields.acc_permission);
                        sessionStorage.setItem("acc_system",response.data.msg[0].fields.acc_system);
                        if(sessionStorage.getItem("acc_permission") == "2"){
                            this.$store.state.whetherShow = false
                        }else{
                            this.$store.state.whetherShow = true
                        }
                        //this.$router.push({ path: '/FaultAnalysis' })
                        this.$router.push({ path: '/index' })
                    }else{
                        alert("用户名密码错误！")
                    }
                }.bind(this)).catch(function (error) { 
                    console.log(error);
                })                    
            }
        },

    }
</script>

<style scoped>
    .form-signin {
        max-width: 400px;
        padding: 15px;
        margin: 30px auto 0;
    }
    .form-signin .form-signin-heading,
    .form-signin .checkbox {
        margin-bottom: 10px;
    }
    .form-signin .checkbox {
        font-weight: normal;
    }
    .form-signin .form-control {
        position: relative;
        height: auto;
        -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
                box-sizing: border-box;
        padding: 10px;
        font-size: 16px;
    }
    .form-signin .form-control:focus {
        z-index: 2;
    }
    .form-signin input[type="email"] {
        margin-bottom: -1px;
        border-bottom-right-radius: 0;
        border-bottom-left-radius: 0;
    }
    .form-signin input[type="password"] {
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
    .fh-login {
        position: absolute;
        background:#fff;
        border: 1px solid #000;
        border-radius: 7px;
        box-shadow: 5px 5px 15px #171616;
        width: 300px;
        height: 450px;
        top: 267px;
        right: 111px;
    }
    .fh-login .fh-login-left {
        float: left;
        width: 100%;
        text-align: center;
    }
    .fh-login .fh-login-right {
        float: right;
        width: 100%;
        text-align: center;
    }
    .fh-login .fh-login-left img {
        margin-top: 50px;
    }
    img {
        vertical-align: middle;
    }
    .fh-login .fh-login-left h2 {
        padding: 30px 0px;
        color: #FFF;
        font-size: 40px;
        font-weight: 600;
    }
    h1, h2, h3 {
        margin-top: 20px;
        margin-bottom: 10px;
    }
    .fh-login-right .login-title {
        font-size: 24px;
        color: #333;
        padding: 10px 0px 9px;
        border-bottom: 1px solid #ccc;
    }
    .fh-login-right .group {
        display: inline-block;
        border: 1px solid #000;
        margin: 10px 0px;
        width: 95%;
        border-radius: 5px;
    }
    .fh-login-right .group>img {
        margin-left: 2%;
        width: 30px;
    }
        
.fh-login-right .group input {
    border: none!important;
    outline: none!important;
    background-color: #fff!important;
    height: 42px!important;
    width: 82%!important;
    padding: 0px 10px!important;
    line-height: 50px;
}

.container-fluid{
    width: 1920px;
    height: 100%;
    background: url("../assets/login/login.png") no-repeat;
    background-size: 100% 35%;
    background-position: center;
}
.loginBox{
    width:70%;
    height: 100%;
    margin: 0 auto;
}
.line{
    background:url('../assets/login/login.png') no-repeat;
}
</style>

