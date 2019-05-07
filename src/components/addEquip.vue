<template>
    <div class="container-fluid container-box">
        <div class="navbar navbar-inverse navbar-fixed-top" style="top:35px">
            <div class="container-fluid">
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
        <div class="container-fluid container-addEquipmentBox">
            <div class="addEquipmentBox modal-content">
                <div class="modal-body equipmentBox">
                    <table width="100%" cellspacing="0" cellpadding="0">
                        <thead>
                            <tr width="100" class="item">
                                <td class="pl10" colspan="4" style="text-align:center;">新增设备表</td>
                            </tr>
                        </thead>
                        <tbody><tr>
                            <td width="100" class="item">系统</td>
                            <td class="pl10"><input type="text" class="form-control equipmentInput inputSystem"></td>
                            <td class="item">型号</td>
                            <td class="pl10"><input type="text" class="form-control equipmentInput inputModel"></td>
                        </tr>

                        <tr>
                            <td class="item">编号</td>
                            <td class="pl10"><input type="text" class="form-control equipmentInput inputNumber">

                            </td>
                            <td class="item">功能用途</td>
                            <td class="pl10"><input type="text" class="form-control equipmentInput inputUse">

                            </td>
                        </tr>
                        <tr>
                            <td class="item">引入日期</td>
                            <td class="pl10">
                                <el-date-picker
                                v-model="time"
                                type="datetime"
                                placeholder="选择日期时间"
                                default-time="12:00:00"
                                value-format="yyyy-MM-dd HH:mm:ss"
                                format="yyyy-MM-dd HH:mm:ss">
                                </el-date-picker>
                            </td>
                        </tr>                       

                        <tr>
                            <td class="item">主要技术指标</td>
                            <td class="pl10"><input type="text" class="form-control equipmentInput inputTechnical">

                            </td>
                            <td class="item">存放地点</td>
                            <td class="pl10"><input type="text" class="form-control equipmentInput inputPlace">

                            </td>
                        </tr>
                        <tr>
                            <td class="item">责任部门</td>
                            <td class="pl10"><input type="text" class="form-control equipmentInput responsible">

                            </td>
                            <td class="item">责任人</td>
                            <td class="pl10"><input type="text" class="form-control equipmentInput responsibler">

                            </td>
                        </tr>
                        <tr>
                            <td class="item">生产厂家</td>
                            <td class="pl10"><input type="text" class="form-control equipmentInput manufacturer">

                            </td>
                            <td class="item">厂家联系人</td>
                            <td class="pl10"><input type="text" class="form-control equipmentInput ManufacturerContact">

                            </td>
                        </tr>

                        <tr style="margin-top:150px;">
                            <td class="item">备注信息</td>
                            <td class="pl10">
                                <el-input
                                type="textarea"
                                :autosize="{ minRows: 2, maxRows: 2}"
                                placeholder="请输入内容"
                                v-model="textarea">
                                </el-input>
                            </td>										
                        </tr>
                        <tr style="height: 90px;vertical-align: text-top;width:;overflow:hidden;">
                            <td class="item">音视频信息</td>
                            <td class="pl10">
                                <el-upload
                                    class="upload-demo"
                                    style="height:95px;width:257px;"
                                    show-overflow-tooltip
                                    ref="upload"
                                    action="123"
                                    :on-change="addFileV"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemoveV"
                                    
                                    :file-list="fileListVideo"
                                    multiple
                                    :auto-upload="false">
                                    <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
                                </el-upload>                               
                            </td>										
                        </tr>
                        <tr style="height: 90px;vertical-align: text-top;">
                            <td class="item">图像信息</td>
                            <td class="pl10">
                                <el-upload
                                    class="upload-demo"
                                    style="height:95px;width:257px;"
                                    show-overflow-tooltip
                                    ref="upload"
                                    action="123"
                                    :on-change="addFileI"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemoveI"
                                    :file-list="fileListImg"
                                    multiple
                                    :auto-upload="false">
                                    <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
                                </el-upload>
                            </td>										
                        </tr>
                        <tr style="height: 90px;vertical-align: text-top;">
                            <td class="item">备附件说明</td>
                            <td class="pl10">
                                <!-- <el-upload
                                    class="upload-demo"
                                    style="height:95px;width:257px;"
                                    show-overflow-tooltip
                                    ref="upload"
                                    action="123"
                                    :on-change="addFileA"
                                    :on-preview="handlePreview"
                                    :on-remove="handleRemoveA"
                                    :file-list="fileListAttach"
                                    multiple
                                    :auto-upload="false">
                                    <el-button slot="trigger" size="small" type="primary">选择文件</el-button>
                                </el-upload> -->
                                <input type="text" class="form-control equipmentInput attach">
                            </td>										
                        </tr>
                        </tbody>
                    </table>
                    <div style="text-align:center;position: absolute;left: 0;right: 0;bottom: 10px;">
                        <el-button type="primary" style="width:120px;" @click="addEquipInput">录入</el-button>
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
            fileListVideo: [],
            fileListImg: [],
            fileListAttach: [],
            mediaUrl:"",
        }
    },
    mounted(){
        this.setUserName(),
        this.setStyle()
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
            this.$router.push({ path: '/login' });
            sessionStorage.removeItem("user")
        },
        addEquipInput(){
            let param = new FormData()

            let man_sys = $(".inputSystem").val()
            let man_model = $(".inputModel").val()
            let man_num = $(".inputNumber").val()
            let man_porpuse = $(".inputUse").val()
            let man_qualifi  = $(".inputTechnical").val()
            let man_place = $(".inputPlace").val()
            let man_department = $(".responsible").val()
            let man_persion = $(".responsibler").val()
            let man_mfrs = $(".manufacturer").val()
            let man_mfrspersion = $(".ManufacturerContact").val()
            let man_enclosure = $(".attach").val()

            let man_impTime = this.time;
            let man_remarks = this.textarea

            let a = this.fileListVideo
            let b = this.fileListImg
            let c = this.fileListAttach
            
            let d = a.concat(b)
            let fileList = d.concat(c)

            param.append("tablename","managetable")
            param.append("man_sys",man_sys)
            param.append("man_model",man_model)
            param.append("man_num",man_num)
            param.append("man_porpuse",man_porpuse)
            param.append("man_qualifi",man_qualifi)
            param.append("man_place",man_place)
            param.append("man_department",man_department)
            param.append("man_persion",man_persion)
            param.append("man_mfrs",man_mfrs)
            param.append("man_mfrspersion",man_mfrspersion)
            param.append("man_remarks",man_remarks)
            param.append("man_impTime",man_impTime)
            param.append("man_enclosure",man_enclosure)

            for(var i = 0;i<fileList.length;i++){
                param.append("files",fileList[i])
            }
            

            this.$axios.post('FaultDBManage/addinfo/',param,{headers: {'Content-Type':'application/x-www-form-urlencoded'}}                
            ).then(function(response){
                if(response.data.msg == "true"){
                    alert("录入成功")
                    this.mediaUrl = response.data.url
                }else{
                    alert("该设备信息已存在!")
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })
        },
        addFileV(file, fileList){
            this.fileListVideo = []
            for(var i = 0; i<fileList.length;i++){
                if(fileList[i].raw){
                    this.fileListVideo.push(fileList[i].raw)
                }else{
                    this.fileListVideo.push(fileList[i])
                }
                
            }
            
        },
        addFileI(file, fileList){
            this.fileListImg = []
            for(var i = 0; i<fileList.length;i++){
                if(fileList[i].raw){
                    this.fileListImg.push(fileList[i].raw)
                }else{
                    this.fileListImg.push(fileList[i])
                }
                
            }
        },
        addFileA(file, fileList){
            this.fileListAttach = []
            for(var i = 0; i<fileList.length;i++){
                this.fileListAttach.push(fileList[i].raw)
            }
        },
        handleRemoveV(file, fileList) {
            this.fileListVideo = []
            for(var i = 0; i<fileList.length;i++){
                if(fileList[i].raw){
                    this.fileListVideo.push(fileList[i].raw)
                }else{
                    this.fileListVideo.push(fileList[i])
                }
                
            }
        },
        handleRemoveI(file, fileList) {
            this.fileListImg = []
            for(var i = 0; i<fileList.length;i++){
                if(fileList[i].raw){
                    this.fileListImg.push(fileList[i].raw)
                }else{
                    this.fileListImg.push(fileList[i])
                }
                
            }
        },
        handleRemoveA(file, fileList) {
            this.fileListAttach = []
            for(var i = 0; i<fileList.length;i++){
                this.fileListAttach.push(fileList[i].raw)
            }
        },
        handlePreview(file) {
            
        },
        setStyle(){
            $(".el-upload-list").css({
                "width": "257px",
                "height": "65px",
                "overflow-x":"hidden",
                "overflow-y": "auto",})
        }
    }
}
</script>

<style scoped>
    @import "../../static/css/reset.css";
    @import "../../static/css/index.css";
    @import "../../static/css/voicePlus.css";


    .container-fluid.index{
        margin: 450px auto 0;
    }
    .container-fluid {
        padding-right: 40px;
        padding-left: 40px;
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
        width: 780px;
        height: 770px;
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
        margin-top:45px;
    }
    .equipmentInput{
        width: 220px;
    }
    /* .el-upload-list{
        width: 257px;
        height: 62px !important;
        overflow-x:hidden;
        overflow-y: auto !important;
    } */
</style>

