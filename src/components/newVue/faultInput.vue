<template>
    <div class="container-fluid container-box">
        <el-container class="container-fluid container-addEquipmentBox" >
            <el-main class="addEquipmentBox modal-content">
                <div class="modal-body equipmentBox">
                    <table width="100%" cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr style="line-height: 60px;">
                                <td width="100" class="item">设备选择</td>
                                <td class="pl10" colspan="3">
                                        <div>
                                            <el-select v-model="systemValue" @change="gainModal" placeholder="请选择系统" style="width:20%;" filterable>
                                                <el-option
                                                :disabled="(acc_system.indexOf(item.label) >-1&&acc_permission != 0)||(acc_system.indexOf(item.label) <=-1&&acc_permission == 0)? false:true"
                                                v-for="item in systemOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                                </el-option>
                                            </el-select>
                                            <el-select v-model="modalValue" @change="gainNumber" placeholder="请选择型号" style="width:20%;" filterable>
                                                <el-option
                                                v-for="item in modalOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                                </el-option>
                                            </el-select>
                                            <el-select v-model="numValue" @change="gainUuid" placeholder="请选择编号" style="width:20%;" filterable>
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
                                <td class="pl10">
                                    <!-- <input type="text" class="form-control equipmentInput fau_type"> -->
                                    <el-select v-model="faultTypeValue" placeholder="请选择故障类型">
                                        <el-option
                                        v-for="item in faultTypeOptions"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                        </el-option>
                                    </el-select>
                                    <el-button type="primary" icon="el-icon-edit" @click="dialogFormVisible = true" v-if="acc_permission != 2"></el-button>
                                </td>
                                <td class="item">故障现象</td>
                                <td class="pl10"><input type="text" class="form-control equipmentInput fau_phen">

                                </td>
                            </tr>
                            <tr>
                                <td class="item">故障次数</td>
                                <td class="pl10"><input type="number" class="form-control equipmentInput fau_num">

                                </td>
                                <td class="item">故障原因</td>
                                <td class="pl10"><input type="text" class="form-control equipmentInput fau_reason">

                                </td>
                            </tr>
                            <tr>
                                
                                <td class="item">故障影响</td>
                                <td class="pl10"><input type="text" class="form-control equipmentInput fau_effect">

                                </td>
                                <td class="item">检测方法</td>
                                <td class="pl10"><input type="text" class="form-control equipmentInput fau_check">

                                </td>
                            </tr>
                            <tr>
                                
                                <td class="item">排除措施</td>
                                <td class="pl10"><input type="text" class="form-control equipmentInput fau_measure">

                                </td>
                                <td class="item">改进建议</td>
                                <td class="pl10"><input type="text" class="form-control equipmentInput fau_advise">

                                </td>
                            </tr>
                            <tr>
                                
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
                                        :on-preview="handlePreviewV"
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
                                        :on-preview="handlePreviewI"
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
                    <div style="text-align:center;position: absolute;right: 50px;bottom: 15px;">
                        <el-button type="primary" style="width:120px;" @click="addEquipFault">录入</el-button>
                    </div>

                </div>
                <el-dialog title="新增故障类型" :visible.sync="dialogFormVisible">
                        <table width="50%" cellspacing="0" cellpadding="0" style="margin:0 auto;">
                            <tbody>
                                <tr style="margin-bottom:15px;">
                                    <td width="100" class="item">系统</td>
                                    <td class="pl10">
                                        <el-select v-model="systemValueT" placeholder="请选择系统" style="">
                                            <el-option
                                            v-for="item in systemOptionsT"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="item">故障类型</td>
                                    <td class="pl10">
                                        <el-input v-model="faultName" type="text" style="width:220px;" ></el-input>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="addMounting">确 定</el-button>
                        </div>
                </el-dialog>
            </el-main>
        </el-container>
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
            numValue:"",
            acc_system:'',
            acc_permission:'',
            faultTypeValue:'',
            faultTypeOptions:[],
            systemOptionsT:[],
            systemValueT:"",
            dialogFormVisible:false,
            faultName:''
        }
    },
    mounted(){
        this.setUserName(),
        this.setStyle(),
        this.initSystem(),
        this.getFaultType(),
        this.initfauTypeSystem()
    },
    methods: {
        setUserName(){
            var self = this;
            self.acc_permission = sessionStorage.getItem("acc_permission");
            self.userName = sessionStorage.getItem("user");
            self.acc_system = sessionStorage.getItem("acc_system")
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
        handlePreviewV(file) {
            
        },
        handlePreviewI(file) {
            
        },
        addEquipFault(){
            let param = new FormData()

            let fau_manInfo = sessionStorage.getItem("faultSysUuid")
            let fau_useInfo = sessionStorage.getItem("faultSysUuid")

            let fau_desc = $(".fau_desc").val()
            let fau_type = this.faultTypeValue
            let fau_num = $(".fau_num").val()
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
            param.append("fau_num",fau_num)
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
        },
        getFaultType(){
            let param = {
                            "msg": [
                                {
                                
                                }, 
                                {

                                },
                                {
                                "uuid":""
                                },
                                {
                                    
                                }
                            ]
                        }
            this.$axios.post('FaultDBManage/fautype/',param,                
            ).then(function(response){
                this.faultTypeOptions = []
                if(response.data.msg.length>0){
                    var faultTypeArr = response.data.msg
                    for(var i = 0;i<faultTypeArr.length;i++){                           
                        var temp = {}
                        temp.label = faultTypeArr[i].fields.fatp_name
                        temp.value = faultTypeArr[i].fields.fatp_name
                        this.faultTypeOptions.push(temp)
                    }
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })
        },
        initfauTypeSystem(){
            let param = {
                        "msg": {
                                "search_man": "光电经纬仪"
                            }
                        }           
            this.$axios.post('FaultDBManage/searchinfo/',param,                
            ).then(function(response){
                this.systemOptionsT = []
                if(response.data.msg.length>0){
                    var sysArr = response.data.msg
                    for(var i = 0;i<sysArr.length;i++){
                        var item = {}
                        item.value = sysArr[i]
                        item.label = sysArr[i]
                        this.systemOptionsT.push(item)
                    }                                       
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })

        },
        addMounting(){
            
            var self = this;
            let fit_name  = this.systemValueT
            let fit_num   = this.faultName

            let param = {
                    "msg": [
                        {
                        "fatp_manInfo": "",
                        "fatp_system": fit_name,
                        "fatp_name": fit_num,
                        "fatp_remarks": ""
                        }, {},{},{}
                    ]
                }


            this.$axios.post('FaultDBManage/fautype/',param             
            ).then(function(response){
                if(response.data.msg == "true"){
                    alert("故障类型新增成功！")
                    this.dialogFormVisible = false
                    this.getFaultType() 
                }else{
                    alert("故障类型新增失败！")
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })

        },
    }
}
</script>

<style scoped>
    @import "../../../static/css/reset.css";
    @import "../../../static/css/index.css";
    @import "../../../static/css/UserManage.css";
    
    .container-fluid.index{
        margin: 450px auto 0;
    }
    .container-fluid{
        padding-right:0px;
        padding-left:0px;
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
        margin: 7px 0 25px;
    }
    .el-table__footer-wrapper, .el-table__header-wrapper{
        display: none !important;
    }
    .equipmentBox{
        width: 100%;
        height: 800px;
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
    .equipmentInput{
        width: 220px;
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
    .modal-content1{
        width: 350px;
    }
</style>

