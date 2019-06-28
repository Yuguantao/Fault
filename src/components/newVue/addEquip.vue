<template>
    <div class="container-fluid container-box">
 
        <el-container class="container-fluid container-addEquipmentBox">

            <el-main class="addEquipmentBox modal-content">

                <div class="modal-body equipmentBox">
                    <table width="99%" cellspacing="0" cellpadding="0">
                        <tbody><tr>
                            <td width="100" class="item">系统</td>
                            <!-- <td class="pl10">
                                <input type="text" class="form-control equipmentInput inputSystem" v-if="acc_permission == 0">
                                <el-select v-model="systemValue" placeholder="请选择系统" v-else>
                                    <el-option
                                    :disabled="(acc_system.indexOf(item.label) >-1&&acc_permission != 0)||(acc_system.indexOf(item.label) <=-1&&acc_permission == 0)? false:true"
                                    v-for="item in systemOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                                    </el-option>
                                </el-select>
                            </td> -->
                            <td class="pl10">
                                <select class="form-control select-box" v-model="systemValue">
                                    <option v-for="(item, index) in systemOptions" :key="index" :value="item.value">{{item.value}}</option>
                                </select>
                                <input type="text" class="input-box inputSystem" ref="inputBoxSys" :value="inputValueS" @input="changeValueS()">
                            </td>

                            <td class="item">型号</td>
                            <!-- <td class="pl10"><input type="text" class="form-control equipmentInput inputModel"></td> -->
                            <td class="pl10">
                                <select class="form-control select-box" v-model="modalValue">
                                    <option v-for="(item, index) in modalOptions" :key="index" :value="item.value">{{item.value}}</option>
                                </select>
                                <input type="text" class="input-box inputModel" ref="inputBoxM" :value="inputValueM" @input="changeValueM()">
                            </td>
                            

                        </tr>

                        <tr>
                            <td class="item">编号</td>
                            <!-- <td class="pl10"><input type="text" class="form-control equipmentInput inputNumber"> -->
                            <td class="pl10">
                                <select class="form-control select-box" v-model="numValue">
                                    <option v-for="(item, index) in numOptions" :key="index" :value="item.value">{{item.value}}</option>
                                </select>
                                <input type="text" class="input-box inputNumber" style="top:69px;" ref="inputBoxN" :value="inputValueN" @input="changeValueN()">
                            </td>

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
                                value-format="yyyy-MM-dd"
                                format="yyyy-MM-dd">
                                </el-date-picker>
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
                        <tr>
                            <td class="item" style="vertical-align: initial;">主要技术指标</td>
                            <td class="pl10">
                                <!-- <input type="text" class="form-control equipmentInput inputTechnical"> -->
                                <el-upload
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
                                </el-upload>
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

            </el-main>
        </el-container>       
    </div>
    
    
</template>

<script>

export default {
    name:"addEquip1",
    data (){
        return{
            userName:"",
            time:"",
            textarea:"",
            fileListVideo: [],
            fileListImg: [],
            fileListAttach: [],
            mediaUrl:"",
            acc_permission:'',
            acc_system:'',
            systemOptions:[],
            modalOptions:[],
            numOptions:[],
            systemValue:"",
            modalValue:"",
            numValue:"",

        }
    },
    computed: {

        // 获取select框中所选文本值
        inputValueS () {
            const self = this;
            var value;
            //遍历找到对应文本值

                this.systemOptions.forEach(function (item, index) {
                    if (item.value === self.systemValue) {
                        value = item.value;
                    }
                });
            this.gainModal()
            return value;
        },
        inputValueM () {
            const self = this;
            var value;
            //遍历找到对应文本值
                this.modalOptions.forEach(function (item, index) {
                    if (item.value === self.modalValue) {
                        value = item.value;
                    }
                });
            this.gainNumber()
            return value;
        },
        inputValueN () {
            const self = this;
            var value;
            //遍历找到对应文本值

                this.numOptions.forEach(function (item, index) {
                    if (item.value === self.numValue) {
                        value = item.value;
                    }
                });
            return value;
        }
    },
    mounted(){
        this.setUserName(),
        this.setStyle(),
        this.initSystem()
    },
    methods: {
        changeValueS() {
                    const self = this;
                  
                        var text = this.$refs.inputBoxSys.value;
 
                        //遍历修改对应文本值
                        this.systemOptions.forEach(function (item, index) {
                            if (item.value === self.systemValue) {
                                item.value = text;
                            }
                        });
                },
                changeValueM() {
                    const self = this;
                   
                        var text = this.$refs.inputBoxM.value;
 
                        //遍历修改对应文本值
                        this.modalOptions.forEach(function (item, index) {
                            if (item.value === self.modalValue) {
                                item.value = text;
                            }
                        });
                },
                changeValueN() {
                    const self = this;
                
                    var text = this.$refs.inputBoxN.value;

                    //遍历修改对应文本值
                    this.numOptions.forEach(function (item, index) {
                        if (item.value === self.numValue) {
                            item.value = text;
                        }
                    });
                },

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
        addEquipInput(){
            let param = new FormData()
            let man_sys = $(".inputSystem").val()
            // if($(".inputSystem").val()){
            //     man_sys = $(".inputSystem").val()
            // }else{
            //     man_sys = this.systemValue
            // }
            
            let man_model = $(".inputModel").val()
            let man_num = $(".inputNumber").val()


            let man_porpuse = $(".inputUse").val()
            let man_qualifi  = ""
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
                if(fileList[i].raw){
                    this.fileListAttach.push(fileList[i].raw)
                }else{
                   this.fileListAttach.push(fileList[i]) 
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
        handleRemoveA(file, fileList) {
            this.fileListAttach = []
            for(var i = 0; i<fileList.length;i++){
                if(fileList[i].raw){
                    this.fileListAttach.push(fileList[i].raw)
                }else{
                   this.fileListAttach.push(fileList[i]) 
                }
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
        },
        
    }
}
</script>

<style scoped>
    @import "../../../static/css/reset.css";
    @import "../../../static/css/index.css";
    @import "../../../static/css/voicePlus.css";


    .container-fluid.index{
        margin: 450px auto 0;
    }
    .container-fluid {
        margin-right: auto;
        margin-left: auto;
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
        width: 780px;
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
    /* .container-addEquipmentBox{
        margin-top:45px;
    } */
    .equipmentInput{
        width: 220px;
    }
    /* .el-upload-list{
        width: 257px;
        height: 62px !important;
        overflow-x:hidden;
        overflow-y: auto !important;
    } */

    .page-header {
        padding-bottom: 0px;
        margin: 0px;
        border-bottom: 1px solid #eee;
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
    .nav>li>a {
        padding: 5px 10px;
        border-radius: 5px 5px 0px 0px;
        margin: 0px 5px;
        cursor: pointer;
    }
    .nav-tabs>li.active>a, .nav-tabs>li.active>a:focus, .nav-tabs>li.active>a:hover {
        background: #EEF1F6;
        border: 1px solid #ddd;
        border-bottom-color: transparent;
    }

     .select-box {
            width: 220px;
            padding-left: 20px;
        }
 
        .input-box {
                outline: none;
                border: none;
                position: absolute;
                box-sizing: border-box;
                border-right: none;
                top: 21px;
                width: 200px;
                height: 36px;
                padding-left: 23px;
                margin-left: 3px;
                outline: 0;
        }
        .input-box:focus{ 
            outline: none;
            border: 0 ;
        }

</style>

