<template>
    <div class="container-fluid">
        <div class="fh-login">
            <div class="fh-login-left">
                <img src="../assets/login/login-logo.png">
                <h2>故障数据库管理系统</h2>
                <img src="../assets/login/gif.gif" style="margin-top:10px;">
            </div>
            <div class="fh-login-right">
                <div class="login-title">欢迎使用</div>
                <div class="form-signin">

                    <div class="group">
						<img src="../assets/login/fh-user.png" style="width:30px">
						<input type="text" class="input-control" id="inputEmail" autocomplete="off" placeholder="用户名" style="height: 50px; line-height: 50px;" required autofocus>
					</div>
                    
                    <div class="group" style="margin-bottom:55px;">
						<img src="../assets/login/suo.png" style="width:30px">
						<input type="password" class="input-control" id="inputPassword" autocomplete="off" placeholder="密　码" style="height: 50px; line-height: 50px;">
					</div>

                    <div class="group">
						<button style="width: 100%; border: none; background: rgb(82, 166, 212); color: rgb(255, 255, 255); height: 50px;" type="button" class="btn btn-default" id="loginBtn" @click="GetLoginInfo">登  录</button>
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
    
            }
        },
        mounted(){
             
        },
        methods: {
            GetLoginInfo(){
                var self = this;
                var userName = $("#inputEmail").val()
                var password = $("#inputPassword").val()

                var param = {
                    "msg":{
                            "acc_id":userName,
                            "acc_pwd":password
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
                        this.$router.push({ path: '/FaultAnalysis' })
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
        background: url(http://demo.windasoft.com:8080/windaedm/img/login/fh-login.png) no-repeat;
        width: 860px;
        height: 465px;
        position: fixed;
        top: 50%;
        left: 50%;
        margin-top: -250px;
        margin-left: -440px;
    }
    .fh-login .fh-login-left {
        float: left;
        width: 50%;
        text-align: center;
    }
    .fh-login .fh-login-right {
        float: right;
        width: 50%;
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
        padding: 15px 0px;
        border-bottom: 1px solid #ccc;
    }
    .fh-login-right .login-title {
        font-size: 24px;
        color: #333;
        padding: 15px 0px;
        border-bottom: 1px solid #ccc;
    }
    .fh-login-right .group {
        display: inline-block;
        border: 1px solid #ccc;
        margin: 10px 0px;
        width: 80%;
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
    width: 100%;
    height: 100%;
    background: url("../assets/login/login.png");
}
</style>

