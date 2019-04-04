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
        <div class="container container-addEquipmentBox">
            <div class="addEquipmentBox modal-content">
                <div class="modal-body equipmentBox">
                    <table width="100%" cellspacing="0" cellpadding="0">
                        <tbody><tr>
                            <td width="100" class="item">系统</td>
                            <td class="pl10"><input type="text" class="form-control equipmentInput"></td>
                        </tr>
                        <tr>
                            <td class="item">型号</td>
                            <td class="pl10"><input type="text" class="form-control equipmentInput"></td>
                        </tr>
                        <tr>
                            <td class="item">编号</td>
                            <td class="pl10"><input type="text" class="form-control equipmentInput">

                            </td>
                        </tr>
                        <tr>
                            <td class="item">引入日期</td>
                            <td class="pl10">
                                <el-date-picker
                                v-model="time"
                                type="datetime"
                                placeholder="选择日期时间"
                                default-time="12:00:00">
                                </el-date-picker>
                            </td>
                        </tr>
                        <tr style="height: 90px;vertical-align: text-top;">
                            <td class="item">视频信息</td>
                            <td class="pl10">
                                <el-upload
                                    class="upload-demo"
                                    style="height:95px;"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemove"
                                    :before-remove="beforeRemove"
                                    multiple
                                    :limit="2"
                                    :on-exceed="handleExceed"
                                    :file-list="fileList">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                    </el-upload>
                                    
                            </td>										
                        </tr>
                        <tr style="height: 90px;vertical-align: text-top;">
                            <td class="item">音频信息</td>
                            <td class="pl10" style="height:80px;">
                                <el-upload
                                    class="upload-demo"
                                    style="height:95px;"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :file-list="fileList">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                    </el-upload>
                            </td>										
                        </tr>
                        <tr style="height: 90px;vertical-align: text-top;">
                            <td class="item">图像信息</td>
                            <td class="pl10" style="height:80px;">
                                <el-upload
                                    class="upload-demo"
                                    style="height:95px;"
                                    action="https://jsonplaceholder.typicode.com/posts/"
                                    :file-list="fileList">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                    </el-upload>
                            </td>										
                        </tr>
                        <tr>
                            <td class="item">故障信息</td>
                            <td class="pl10">
                                <input type="text" class="form-control">
                            </td>										
                        </tr>
                        <tr>
                            <td class="item">备注信息</td>
                            <td class="pl10">
                                <el-input
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 3}"
                                placeholder="请输入内容"
                                v-model="textarea">
                                </el-input>
                            </td>										
                        </tr>
                        </tbody>
                    </table>
                    <div style="text-align:center;">
                        <el-button type="primary">录入</el-button>
                    </div>
                </div>

            </div>
        </div>
        <router-view></router-view>
    </div>
    
    
</template>

<script>
export default {
    name:"addEquipment",
    data (){
        return{
            userName:"",
            time:"",
            textarea:"",
            fileList: []
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
                if(self.userName !== "admin"){
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
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        handleExceed(files, fileList) {
            this.$message.warning(`当前限制选择 2 个文件，本次选择了 ${files.length} 个文件，共上传了 ${fileList.length} 个文件`);
        },
        beforeRemove(file, fileList) {
            return this.$confirm(`确定移除 ${ file.name }？`);
        }
    }
}
</script>

<style scoped>
    @import "../../static/css/reset.css";
    @import "../../static/css/index.css";
    @import "../../static/css/voicePlus.css";


    .container.index{
        margin: 450px auto 0;
    }
    .container {
        padding-right: 15px;
        padding-left: 15px;
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
    .dropBox{display: none; position: absolute; width: 582px; min-height: 44px; box-sizing: border-box; border-bottom: 1px solid #d1d1d1; border-left: 1px solid #d1d1d1; border-right: 1px solid #d1d1d1; box-shadow: 0 2px 5px #e2e2e2; top:40px; left: -1px; background-color: #fff; padding: 10px 0; z-index:100;}
    .dropBox li{text-indent: 10px; line-height: 32px; cursor: pointer; font-size:14px;}
    .grey{background-color:#e1e1e1;}
    .dropBox li:hover{background-color:#e1e1e1;}
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
    .equipmentBox{
        width: 100%;
        height: 720px;
    }
    .modal-content{
        display: -ms-flexbox;
        display: -webkit-box;
        display: flex;
        -ms-flex-direction: column;
        -webkit-box-orient: vertical;
        -webkit-box-direction: normal;
        flex-direction: column;
        width: 600px;
        height: 720px;
        pointer-events: auto;
        background-clip: padding-box;
        border: 1px solid rgba(0,0,0,.2);
        border-radius: .3rem;
        outline: 0;
        margin:0 auto;
    }
    .modal-body{
        padding: 15px;
    }
    .equipmentBox .item {
        text-align: right;
    }
    .equipmentBox td{
        padding: 5px 0;
    }
    .equipmentBox td.pl10{
    padding-left: 20px;
    }
    .equipmentBox td{
        padding: 5px 0;
    }
    .container-addEquipmentBox{
        margin-top:70px;
    }
    .equipmentInput{
        width: 220px;
    }
</style>

