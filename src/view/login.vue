<template>
    <div class="container">
        <div class="container">
            <div class="form-signin">
                <label for="inputEmail" class="sr-only">Email address</label>
                <input  id="inputEmail" class="form-control" placeholder="用户名" required autofocus>
                <label for="inputPassword" class="sr-only">Password</label>
                <input type="password" id="inputPassword" class="form-control" placeholder="密码" required>
                <div class="buttonBox">
                    <button class="btn btn-lg btn-primary btn-block" id="loginBtn" @click="GetLoginInfo">登录</button>
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
        max-width: 330px;
        padding: 15px;
        margin: 0 auto;
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
        margin-bottom: 10px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
    }
    /* .form-signin .buttonBox{
        width:100%;
        float: left;
    } */
    /* .form-signin .buttonBox #loginBtn{
        width: 49%;
    }
    .form-signin .buttonBox #VisitorLogin{
        width: 49%;
    } */
</style>

