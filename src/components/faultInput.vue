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
                                <td class="pl10" colspan="4" style="text-align:center;">故障信息录入表</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="line-height: 60px;">
                                <td width="100" class="item">设备选择</td>
                                <td class="pl10" colspan="3">
                                        <div>
                                            <el-select v-model="systemValue" @change="gainModal" placeholder="请选择系统" style="width:30%;">
                                                <el-option
                                                v-for="item in systemOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                                </el-option>
                                            </el-select>
                                            <el-select v-model="modalValue" @change="gainNumber" placeholder="请选择型号" style="width:30%;">
                                                <el-option
                                                v-for="item in modalOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                                </el-option>
                                            </el-select>
                                            <el-select v-model="numValue" @change="gainUuid" placeholder="请选择编号" style="width:30%;">
                                                <el-option
                                                v-for="item in numOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                                </el-option>
                                            </el-select>
                                        </div>
                                        
                                </td>
                            </tr>
                            <tr>
                                <td width="100" class="item">故障时间</td>
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
                                <td class="item">故障描述</td>
                                <td class="pl10"><input type="text" class="form-control equipmentInput fau_desc"></td>
                            </tr>
                            <tr>
                                
                                <td class="item">故障类型</td>
                                <td class="pl10"><input type="text" class="form-control equipmentInput fau_type">

                                </td>
                                <td class="item">故障现象</td>
                                <td class="pl10"><input type="text" class="form-control equipmentInput fau_phen">

                                </td>
                            </tr>
                            <tr>
                                <td class="item">故障原因</td>
                                <td class="pl10"><input type="text" class="form-control equipmentInput fau_reason">

                                </td>
                                <td class="item">故障影响</td>
                                <td class="pl10"><input type="text" class="form-control equipmentInput fau_effect">

                                </td>
                            </tr>
                            <tr>
                                <td class="item">检测方法</td>
                                <td class="pl10"><input type="text" class="form-control equipmentInput fau_check">

                                </td>
                                <td class="item">排除措施</td>
                                <td class="pl10"><input type="text" class="form-control equipmentInput fau_measure">

                                </td>
                            </tr>
                            <tr>
                                <td class="item">改进建议</td>
                                <td class="pl10"><input type="text" class="form-control equipmentInput fau_advise">

                                </td>
                                <td class="item">人员信息</td>
                                <td class="pl10"><input type="text" class="form-control equipmentInput fau_peopleInfo">

                                </td>
                            </tr>
                            <tr style="height: 70px;vertical-align: text-top;">
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
                            <tr style="height: 70px;vertical-align: text-top;">
                                <td class="item">图像信息</td>
                                <td class="pl10" style="height:80px;">
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
                    <div style="text-align:center;position: absolute;left: 0;right: 0;bottom: 30px;">
                        <el-button type="primary" style="width:120px;" @click="addEquipFault">录入</el-button>
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
            selectedOptions:[],
            systemOptions:[],
            modalOptions:[],
            numOptions:[],
            systemValue:"",
            modalValue:"",
            numValue:""
        }
    },
    mounted(){
        this.setUserName(),
        this.setStyle(),
        this.initSystem()
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
        setStyle(){
            $(".el-upload-list").css({
                "width": "257px",
                "height": "65px",
                "overflow-x":"hidden",
                "overflow-y": "auto",})
        },
        initSystem(){
            let param = {
                        "msg": {
                                "search_man": "光电经纬仪"
                            }
                        }

            
            this.$axios.post('FaultDBManage/searchinfo/',param,                
            ).then(function(response){
                this.systemOptions = []
                this.modalOptions  = []
                this.numOptions = []
                if(response.data.msg.length>0){
                    var sysArr = response.data.msg
                    for(var i = 0;i<sysArr.length;i++){
                        var item = {}
                        item.value = sysArr[i]
                        item.label = sysArr[i]
                        this.systemOptions.push(item)
                    }                    
                    
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })

        },
        gainModal(){
            let systemId = this.systemValue
            let param = {
                        "msg": {
                                "man_sys": systemId
                            }
                        }
            this.$axios.post('FaultDBManage/searchinfo/',param,                
            ).then(function(response){
                this.modalOptions  = []
                this.numOptions = []
                if(response.data.msg.length>0){
                    var modalArr = response.data.msg
    
                    for(var i = 0;i<modalArr.length;i++){                           
                        var temp = {}
                        temp.label = modalArr[i]
                        temp.value = modalArr[i]
                        
                        this.modalOptions.push(temp)
                    }
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })
            if (this.modalValue) {
                this.modalValue = '';
            }
            if (this.numValue) {
                this.numValue = '';
            }
        },
        gainNumber(){
            let systemId = this.systemValue
            let modalId = this.modalValue
            let param = {
                        "msg": {
                                "man_sys": systemId,
                                "man_model": modalId
                            }
                        }
            this.$axios.post('FaultDBManage/searchinfo/',param,                
            ).then(function(response){
                this.numOptions = []
                if(response.data.msg.length>0){
                    var numberArr = response.data.msg
                    for(var i = 0;i<numberArr.length;i++){                           
                        var temp = {}
                        temp.label = numberArr[i]
                        temp.value = numberArr[i]
                        this.numOptions.push(temp)
                    }
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })
            if (this.numValue) {
                this.numValue = '';
            }
        },
        gainUuid(){
            let systemId = this.systemValue
            let modalId = this.modalValue
            let numId = this.numValue
            let param = {
                        "msg": {
                                "man_sys": systemId,
                                "man_model": modalId,
                                "man_num": numId
                            }
                        }
            this.$axios.post('FaultDBManage/searchinfo/',param,                
            ).then(function(response){
                if(response.data.msg.length>0){
                    sessionStorage.setItem("faultSysUuid",response.data.msg[0].fields.uuid);
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })
        },
        addFileV(file, fileList){
            this.fileListVideo = []
            for(var i = 0; i<fileList.length;i++){
                this.fileListVideo.push(fileList[i].raw)
            }
            
        },
        addFileI(file, fileList){
            this.fileListImg = []
            for(var i = 0; i<fileList.length;i++){
                this.fileListImg.push(fileList[i].raw)
            }
        },
        handleRemoveV(file, fileList) {
            this.fileListVideo = []
            for(var i = 0; i<fileList.length;i++){
                this.fileListVideo.push(fileList[i].raw)
            }
        },
        handleRemoveI(file, fileList) {
            this.fileListImg = []
            for(var i = 0; i<fileList.length;i++){
                this.fileListImg.push(fileList[i].raw)
            }
        },
        handlePreview(file) {
            
        },
        addEquipFault(){
            let param = new FormData()

            let fau_manInfo = sessionStorage.getItem("faultSysUuid")
            let fau_useInfo = sessionStorage.getItem("faultSysUuid")

            let fau_desc = $(".fau_desc").val()
            let fau_type = $(".fau_type").val()
            let fau_phen = $(".fau_phen").val()
            let fau_reason = $(".fau_reason").val()
            let fau_effect  = $(".fau_effect").val()
            let fau_check = $(".fau_check").val()
            let fau_measure = $(".fau_measure").val()
            let fau_advise = $(".fau_advise").val()
            let fau_peopleInfo = $(".fau_peopleInfo").val()


            let fau_time = this.time;
            let fau_remarks = this.textarea

            let a = this.fileListVideo
            let b = this.fileListImg

            
            let fileList = a.concat(b)

            param.append("tablename","faulttable")
            param.append("fau_manInfo",fau_manInfo)
            param.append("fau_useInfo",fau_useInfo)
            param.append("fau_desc",fau_desc)
            param.append("fau_type",fau_type)
            param.append("fau_phen",fau_phen)
            param.append("fau_reason",fau_reason)
            param.append("fau_effect",fau_effect)
            param.append("fau_check",fau_check)
            param.append("fau_measure",fau_measure)
            param.append("fau_advise",fau_advise)
            param.append("fau_peopleInfo",fau_peopleInfo)
            param.append("fau_time",fau_time)
            param.append("fau_remarks",fau_remarks)

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
        width: 765px;
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

