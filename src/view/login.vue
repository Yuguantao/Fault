<template>
    <div class="container">
        <div class="container">
            <form class="form-signin">
                <label for="inputEmail" class="sr-only">Email address</label>
                <input  id="inputEmail" class="form-control" placeholder="用户名" required autofocus>
                <label for="inputPassword" class="sr-only">Password</label>
                <input type="password" id="inputPassword" class="form-control" placeholder="密码" required>
                <div class="buttonBox">
                    <button class="btn btn-lg btn-primary btn-block" type="submit" id="loginBtn" @click="GetLoginInfo(true)">登录</button>
                    <!-- <button class="btn btn-lg btn-primary btn-block"  id="VisitorLogin" @click="GetLoginInfo(false)">游客登录</button> -->
                </div>
            </form>
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

            // getSystemInfo(){
            //     var self = this;                
            //     self.arr = sessionStorage.getItem("jians");
            //     self.arr1 = sessionStorage.getItem("jianx");
            //     this.$axios.get('DataDriver/monitor/sys',{params:{
            //             numId:this.$store.state.numId
            //         }}                    
            //     ).then(function(response){

			//     })
            // },
            GetLoginInfo(index){
                if(index){
                    if($("#inputPassword").val() != "123"){
                        alert("用户名密码错误")
                    }else{
                        sessionStorage.setItem("user",$("#inputEmail").val());
                        //sessionStorage.setItem("password",$("#inputPassword").val());

                        this.$router.push({ path: '/FaultAnalysis' }) 
                    }
                }else{
                    sessionStorage.setItem("user","游客用户");
                    //sessionStorage.setItem("password",$("#inputPassword").val());

                    this.$router.push({ path: '/FaultAnalysis' }) 
                }
                
                           
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

