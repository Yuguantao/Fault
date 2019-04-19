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
                        <thead>
                            <tr width="100" class="item">
                                <td class="pl10" colspan="4" style="text-align:center;">故障信息录入表</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td width="100" class="item">设备选择</td>
                                <td class="pl10">
                                    <el-cascader
                                        v-model="selectedOptions"
                                        placeholder="请选择系统"
                                        :options="systemOption"
                                        @active-item-change="handleItemChange"
                                        :props="modalOption"
                                        ></el-cascader>
                                </td>
                            </tr>
                            <tr>
                                <td width="100" class="item">故障时间</td>
                                <td class="pl10">
                                    <el-date-picker
                                    v-model="time"
                                    type="datetime"
                                    placeholder="选择日期时间"
                                    default-time="12:00:00">
                                    </el-date-picker>
                                </td>
                                <td class="item">故障描述</td>
                                <td class="pl10"><input type="text" class="form-control equipmentInput"></td>
                            </tr>
                            <tr>
                                
                                <td class="item">故障类型</td>
                                <td class="pl10"><input type="text" class="form-control equipmentInput">

                                </td>
                                <td class="item">故障现象</td>
                                <td class="pl10"><input type="text" class="form-control equipmentInput">

                                </td>
                            </tr>
                            <tr>
                                <td class="item">故障原因</td>
                                <td class="pl10"><input type="text" class="form-control equipmentInput">

                                </td>
                                <td class="item">故障影响</td>
                                <td class="pl10"><input type="text" class="form-control equipmentInput">

                                </td>
                            </tr>
                            <tr>
                                <td class="item">检测方法</td>
                                <td class="pl10"><input type="text" class="form-control equipmentInput">

                                </td>
                                <td class="item">排除措施</td>
                                <td class="pl10"><input type="text" class="form-control equipmentInput">

                                </td>
                            </tr>
                            <tr>
                                <td class="item">改进建议</td>
                                <td class="pl10"><input type="text" class="form-control equipmentInput">

                                </td>
                                <td class="item">人员信息</td>
                                <td class="pl10"><input type="text" class="form-control equipmentInput">

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
                        <el-button type="primary" style="width:120px;">录入</el-button>
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
            systemOption:[],
            modalOption:{
                value:'label',
                label:"name",
                children: "children"
            }
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
                if(response.data.msg.length>0){
                    var sysArr = response.data.msg
                    sysArr.map(item => {
                        this.$set(item, "name", item);
                        this.$set(item, "children", []);
                    });
                    this.systemOption = sysArr;
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })
        },
        initModal(systemId){
            let param = {
                        "msg": {
                                "man_sys": systemId
                            }
                        }
            this.$axios.post('FaultDBManage/searchinfo/',param,                
            ).then(function(response){
                if(response.data.msg.length>0){
                    var modalArr = response.data.msg
                                       
                    // for(var j = 0;j<this.systemOption.length;j++){
                    //     if(this.systemOption[j].label = val[0]){
                    //         for(var i = 0;i<modalArr.length;i++){                           
                    //             var temp = {}
                    //             temp.label = modalArr[i]
                    //             temp.value = modalArr[i]
                    //             temp.children = []
                    //             this.systemOption[j].children.push(temp)
                    //         }
                    //     }
  
                    // }
                    modalArr.map(item => {
                        this.$set(item, "name", item);
                        this.$set(item, "children", []);
                    });
                    this.systemOption.map((item, i) => {
                        if (item.name === systemId) {
                        item.children = modalArr;
                        }
                    });

                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })
        },
        initNumber(systemId,modalId){
            let param = {
                        "msg": {
                                "man_sys": systemId,
                                "man_model": modalId
                            }
                        }

            this.$axios.post('FaultDBManage/searchinfo/',param,                
            ).then(function(response){
                if(response.data.msg.length>0){
                    var numberArr = response.data.msg
                                       
                    // for(var j = 0;j<this.systemOption.length;j++){
                    //     if(this.systemOption[j].label = val[0]){
                    //         for(var i = 0;i<modalArr.length;i++){                           
                    //             var temp = {}
                    //             temp.label = modalArr[i]
                    //             temp.value = modalArr[i]
                    //             temp.children = []
                    //             this.systemOption[j].children.push(temp)
                    //         }
                    //     }
  
                    // }
                    numberArr.map(item => {
                        this.$set(item, "name", item);
                        this.$set(item, "children", []);
                    });
                    this.systemOption.map((item, i) => {
                        if (item.name === systemId) {
                            item.children.map((city, idx) => {
                                city.children = numberArr;
                            });
                        }
                    });
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })
        },
        handleItemChange(val){
            if (val.length === 1) {
                this.initModal(val[0]);
            } else if (val.length === 2) {
                this.initNumber(val[0], val[1]);
            }

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

