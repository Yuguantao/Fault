<template>
        <div class="navbar navbar-inverse navbar-fixed-top">
            <div class="container-fluid" style="height:115px;line-height:115px;">
                <div class="head">
                    <div class="headLeft fl" style="margin-right:20px;">
                        <img src="../../assets/login/login1.png" alt="" style="width:115px;height:115px;float:left;margin-right:10px;">
                        <router-link to= "/FaultAnalysis" style="display:block;font-size: 30px;color: #fff;float:left">故障数据库管理系统</router-link>
                    </div>
                    <el-select v-model="query" style="width:120px;" v-if="$route.path != '/fault'">
                        <el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label"></el-option>
                    </el-select>
                    <el-input
                        placeholder="输入需要搜索的内容"
                        style="width:220px;"
                        v-model="searchInput"
                        @keyup.native="get($event)"
                        @keydown.down.native="selectDown"
                        @keydown.up.native="selectUp"
                        v-if="$route.path != '/fault'"
                        clearable>
                    </el-input>
                    <el-select v-model="systemValue" clearable  placeholder="请选择" style="width:125px;" v-if="$route.path != '/fault'">
                            <el-option
                        v-for="item in systemOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button type="primary" @click="searchKeyword" v-if="$route.path != '/fault'" style="font-size:16px;width:120px;">搜　 索</el-button>
                    <ul v-if="$route.path != '/fault'" class="keywordBox" style="width:219px;position:absolute;overflow-x:hidden;overflow-y:auto;left: 460px;top: 58px;">
                        <li class="text-center" v-for ="(value,index) in myData" @click="searchValue($event)">
                            <span class=" textprimary" :class = "{gray:index==now}" style="display:block;padding-left:5px;color:#000;">{{value}}</span>
                        </li>
                    </ul>
                    
                    <div class="fr clearfix">
                        <div class="headRight fl"><a href="login">登录</a></div>
                        <div class="login" style="width:160px;">
                            <span class="user" id="user"></span>
                            <span>　|</span>
                            <span class="out" @click="exitUser()">退出</span>
                            <router-link to="/userManage" class="fr" id="useSet">
                                <img src="../../assets/index/useSet.png" width="20" height="23" class="fl" style="margin:44px 5px 0;">
                                <span class="fl UserManage" style="line-height:115px;">配置</span>
                            </router-link>
                            
                        </div>
                    </div>
                    <div class="headLeft fr gotofu" style="line-height:115px;position:relative;margin-right:50px;">
                        <span class="btn-home"></span>
                        <div class="goToFu">换肤</div>
                    </div>
                    <div class="headLeft fr gotohome" style="line-height:115px;position:relative;margin-right:20px;">
                        <router-link tag="a" class="btn-home" to= "/FaultAnalysis"></router-link>
                        <div class="goToHome">主页</div>
                    </div>
                </div>
            </div>
            <div class="warn-t" id="warn-main" @click="move">
                <div>
                    用户状态
                </div>
            </div>
            <div class="warn-c" style="width: 220px;height: 666px;position: absolute;right:0;top: 120px;background: #999;border-radius: 5px 0 0 5px;cursor: pointer;z-index: 999999;display:none;">
                <el-table
                :data="userData"
                :row-style="tableRowStyle"
                :header-cell-style="tableHeaderColor"
                style="width: 100%">
                    <el-table-column
                        prop="name"
                        label="用户名"
                        align="center"
                        show-overflow-tooltip
                        width="165">
                    </el-table-column>
                    <el-table-column
                        prop="status"
                        label="状态"
                        align="center"
                        width="55">
                    </el-table-column>
                </el-table>
            </div>
            <router-view></router-view>
        </div>  
</template>

<script>
    
export default {
    name:"",
    data (){
        return{
            userName:"",
            searchInput:"",
            activeName:"first",
            items:[],
            myData:[],
            keyword:'',
            now:-1,
            systemValue:'',
            userData:[],
            systemOptions:[
                {
                    value: '1',
                    label: '故障数据库'
                }, {
                    value: '2',
                    label: '设备信息库'
                }
            ],
            valueArr:[],
            options: [{
                    value: '0',
                    label: '模糊搜索'
                }, {
                    value: '1',
                    label: '精确搜索'
                }],
            query: '1',
            timer:'',
            
        }
    },
    mounted(){
        this.setUserName(),
        this.initSearchUser()
        this.timer = setInterval(this.initSearchUser, 10000);
    },
    methods: {
        setUserName(){
            var self = this;
            self.acc_permission = sessionStorage.getItem("acc_permission");
            self.userName = sessionStorage.getItem("user");
            if(self.acc_permission){
                $(".headRight").hide();
                $("#user").text(self.userName)
                if(self.acc_permission != 0){
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
            var self = this;
            var userName = sessionStorage.getItem("user");
            var password = sessionStorage.getItem("password");
            
            var param = {
                "msg":{
                        "acc_id":userName,
                        "acc_pwd":password,
                        "acc_stu":"0"
                    }
            }
            this.$axios.post('FaultDBManage/loginuser/',param                   
            ).then(function(response){
                
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })   
            this.$router.push({ path: '/login' });
            sessionStorage.removeItem("user")

        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        searchKeyword(){
            sessionStorage.setItem("keyword",this.searchInput)
            sessionStorage.setItem("query",this.query)
            sessionStorage.setItem("query1",this.query1)
            this.$router.push({ path: '/fault' })
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
                        userBox.name = userArr[i].fields.acc_id;
                        let permissionName;
                        if(userArr[i].fields.acc_stu == 0){
                            permissionName = "离线"
                        }else if(userArr[i].fields.acc_stu == 1){
                            permissionName = "在线"
                        }
                        userBox.status = permissionName
                        this.userData.push(userBox)
                    }
                }else{
                    
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })
        },
        move(){

            if ($(".warn-c").css("display") == "none") {
                $(".warn-c").css("display","block");
                $(".warn-t").css({"right": "220px"});
            }
            else {
                $(".warn-c").css("display","none");
                $(".warn-t").css({"right": "0px"});
            }
        },
        tableHeaderColor({ row, column, rowIndex, columnIndex }) {
            if (rowIndex === 0) {
                return 'background-color: lightblue;color: #fff;font-weight: 500;'
            }
        },
        tableRowStyle({ row, rowIndex }) {
            return 'background-color: #ccc'
        },
    }
}
</script>

<style scoped>
    @import "../../../static/css/reset.css";
    @import "../../../static/css/index.css";
    @import "../../../static/css/voicePlus.css";

    .navbar {
        position: relative;
        height: 115px;
        line-height: 115px;
        background: #449CCC;
    }
    .content h4{font-size:16px; line-height:32px; padding-left:10px; width:100px; float:left; margin-bottom:20px;}
    .noData1,.noData2{font-size:20px; display:none; text-align:center; margin-top:150px;}
    .parList{
        margin-bottom: 25px;
    }
    .parList li{float: left; margin-right: 15px; line-height: 34px;}
    .parList li select{border:1px solid #e0e0e0; border-radius:4px; height:34px; line-height:34px;}
    .parList li.second select{width:120px;}
    .parList li.third select{width:130px;}
    /* 搜索下拉框  */	
    .keywordBox{display:none;position: absolute; width: 500px; min-height: 44px; box-sizing: border-box; border-bottom: 1px solid #d1d1d1; border-left: 1px solid #d1d1d1; border-right: 1px solid #d1d1d1; box-shadow: 0 2px 5px #e2e2e2; background-color: #fff; padding: 10px 0; z-index:100;}
    .keywordBox li{text-indent: 10px; line-height: 32px; cursor: pointer; font-size:14px;}
    .grey{background-color:#e1e1e1;}
    .keywordBox li:hover{background-color:#e1e1e1;}
    .sBtn{
        width: 80px;
        height: 36px;
        line-height: 36px;
        background-color: #28a3f4;
        color: #fff;
        font-size: 16px;
        text-align: center;
        border-radius: 4px;
        cursor: pointer;
        display: block;
        float: right;
    }
    .topBox{
        margin: 50px 0 25px;
    }
    .el-table__footer-wrapper, .el-table__header-wrapper{
        display: none !important;
    }
    .searchBox{
        margin:70px 0 50px 0;
    }

    .content .part_t{width: 100%; border-bottom: 1px solid #e1e1e1; margin-top: 25px; padding-bottom: 20px;}
    .content .part_t li{font-size: 16px; color: #0077c6; line-height: 28px;}
    .content .part_t li img{width: 16px; height: 16px; vertical-align: -2px; margin-right: 8px;}
    .content .part_t li.red{color: #d50000; text-decoration: underline;}
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
        .warn-t{width:28px;height:118px;position:absolute;right:0;top:120px;  background: #449ccc;border-radius: 5px 0 0 5px;;cursor: pointer;opacity: 0.8;z-index:99999;line-height: 28px;}
        .warn-t div{color:#fff;font-size:13px;width: 15px;margin: 0 auto;height: 118px;}
        .gotohome a{
            background: url("../../assets/home.png");
            background-size: 100% 100%;
            width:35px;
            height:35px;
            cursor: pointer;
            display: inline-block;
            vertical-align: middle;
        }
        .gotofu span{
            background: url("../../assets/skin.png");
            background-size: 100% 100%;
            width:35px;
            height:35px;
            cursor: pointer;
            display: inline-block;
            vertical-align: middle;
        }
        .goToHome,.goToFu{
            position: absolute;
            border-radius: 5px;
            margin: -8px 8px 0px;
            border: 1px solid #c9c9c9;
            color: #444;
            background: #f0f0f0;
            padding: 0px 5px;
            text-align: center;
            z-index: 9999999999;
            width: 45px;
            height: 20px;
            line-height: 20px;
            display: none;
            font-size: 12px;
            left: -13px;
            
        }
        .gotohome:hover>.goToHome{
            display: block;
        }
        .gotofu:hover>.goToFu{
            display: block;
        }
        .head{
            height: 115px;
            line-height: 115px;
        }
</style>

