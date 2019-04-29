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
        <div class="container-fluid detailBox">
            <div class="container-fluid">
                <el-tabs v-model="activeName">
                    <el-tab-pane :label="systemName" name="first"></el-tab-pane>
                </el-tabs>
            </div>
            <el-container>
                <el-main style="width:50%;">
                    <el-header>运行信息</el-header>
                    <div class="container-fluid"  style="height: 135px;border-bottom: 2px dashed #ccc5c5;">
                        <div class="basicInfoHead" style="position:relative;">
                            <span class="me-e">设备信息</span>
                            <div class="me-l">
									<div class="icon" >
											<a class="mf-a"></a>
											<span class="mf-fn">系统</span>
											<span class="mf-fnv" style="width: 100px;">{{system}}</span>
                                    </div>
                                    <div class="icon" style="left:120px;">
                                        <a class="mf-a"></a>
                                        <span class="mf-fn">型号</span>
                                        <span class="mf-fnv" style="width: 100px;">{{model}}</span>
                                    </div>
                                    
                                    <div class="icon" style="left:240px;">
                                        <a class="mf-a"></a>
                                        <span class="mf-fn">编号</span>
                                        <span class="mf-fnv" style="width: 100px;">{{number}}</span>
                                    </div>
                                    <div class="icon" style="left:360px;">
											<a class="mf-a" ></a>
											<span class="mf-fn">生产单位</span>
											<span class="mf-fnv" style="width: 125px;">{{product}}</span>
                                    </div>
                                    <div class="icon" style="top:80px;">
                                        <a class="mf-a"></a>
                                        <span class="mf-fn">引入时间</span>
                                        <span class="mf-fnv" style="width: 125px;">{{inputTime}}</span>
                                    </div>
                                    <div class="icon" style="top:80px;left:150px;">
                                        <a class="mf-a"></a>
                                        <span class="mf-fn">累计工作时长</span>
                                        <span class="mf-fnv" style="width: 125px;"></span>
                                    </div>
                                    <div class="icon" style="top:80px;left:300px;">
                                        <a class="mf-a"></a>
                                        <span class="mf-fn">发生故障次数</span>
                                        <span class="mf-fnv" style="width: 125px;"></span>
                                    </div>
								</div>
                        </div>
                    </div>
                    <div class="container-fluid" style="height: 280px;border-bottom: 2px dashed #ccc5c5;">
                        <div class="basicInfoHead" style="position:relative;">
                            <span class="me-e">使用信息</span>
                            <el-table class="equipTable"
                                    ref="multipleTable"
                                    tooltip-effect="dark"
                                    style="cursor:pointer"
                                    height="250"> 
                                <el-table-column fixed show-overflow-tooltip prop="model" label="使用时间" width="190" align="center"></el-table-column>
                                <el-table-column  show-overflow-tooltip prop="system" width="170" label="使用人" align="center"></el-table-column>
                                <el-table-column show-overflow-tooltip prop="number" width="120" label="使用时长" align="center"></el-table-column>
                                <el-table-column show-overflow-tooltip prop="marks" width="300" label="备注信息" align="center"></el-table-column>
                            </el-table>
                        </div>
                    </div>
                    <div class="container-fluid">
                        <div class="basicInfoHead" style="position:relative;">
                            <span class="me-e">技术资料</span>
                            
                        </div>
                    </div>
                </el-main>
                <el-main class="elMainSecond" style="width:50%;">
                    <el-header>维护保障</el-header>
                    <div class="container-fluid"  style="height: 320px;">
                        <div class="basicInfoHead" style="position:relative;">
                            <div class="basicInfoHead" style="position:relative;">
                                <span class="me-e">故障信息</span>
                                <el-table :data="faultTable"
                                        ref="multipleTable"
                                        tooltip-effect="dark"
                                        style="cursor:pointer"
                                        height="300" 
                                        @row-click="openDetails"> 
                                    <el-table-column fixed show-overflow-tooltip sortable prop="fau_time" label="故障时间" width="190" align="center">
                                        <template slot-scope="scope">
                                            <template v-if="scope.row.edit">
                                                <el-input v-model="scope.row.fau_time" placeholder="故障时间"></el-input>
                                            </template>
                                            <span v-else>{{ scope.row.fau_time }}</span> 
                                        </template>
                                    </el-table-column>
                                    <el-table-column  show-overflow-tooltip prop="fau_type" width="110" label="故障类型" align="center">
                                        <template slot-scope="scope">
                                            <template v-if="scope.row.edit">
                                                <el-input v-model="scope.row.fau_type" placeholder="故障类型"></el-input>
                                            </template>
                                            <span v-else>{{ scope.row.fau_type }}</span> 
                                        </template>
                                    </el-table-column>
                                    <el-table-column  show-overflow-tooltip prop="fau_desc" width="110" label="故障描述" align="center">
                                        <template slot-scope="scope">
                                            <template v-if="scope.row.edit">
                                                <el-input v-model="scope.row.fau_desc" placeholder="故障描述"></el-input>
                                            </template>
                                            <span v-else>{{ scope.row.fau_desc }}</span> 
                                        </template>
                                    </el-table-column>
                                    <el-table-column  show-overflow-tooltip prop="fau_phen" width="110" label="故障现象" align="center">
                                        <template slot-scope="scope">
                                            <template v-if="scope.row.edit">
                                                <el-input v-model="scope.row.fau_phen" placeholder="故障现象"></el-input>
                                            </template>
                                            <span v-else>{{ scope.row.fau_phen }}</span> 
                                        </template>
                                    </el-table-column>
                                    <el-table-column  show-overflow-tooltip prop="fau_reason" width="110" label="故障原因" align="center">
                                        <template slot-scope="scope">
                                            <template v-if="scope.row.edit">
                                                <el-input v-model="scope.row.fau_reason" placeholder="故障原因"></el-input>
                                            </template>
                                            <span v-else>{{ scope.row.fau_reason }}</span> 
                                        </template>
                                    </el-table-column>
                                    <el-table-column  show-overflow-tooltip prop="fau_effect" width="110" label="故障影响" align="center">
                                        <template slot-scope="scope">
                                            <template v-if="scope.row.edit">
                                                <el-input v-model="scope.row.fau_effect" placeholder="故障影响"></el-input>
                                            </template>
                                            <span v-else>{{ scope.row.fau_effect }}</span> 
                                        </template>
                                    </el-table-column>
                                    <el-table-column  show-overflow-tooltip prop="fau_check" width="110" label="检测方法" align="center">
                                        <template slot-scope="scope">
                                            <template v-if="scope.row.edit">
                                                <el-input v-model="scope.row.fau_check" placeholder="检测方法"></el-input>
                                            </template>
                                            <span v-else>{{ scope.row.fau_check }}</span> 
                                        </template>
                                    </el-table-column>
                                    <el-table-column  show-overflow-tooltip prop="fau_measure" width="110" label="排除措施" align="center">
                                        <template slot-scope="scope">
                                            <template v-if="scope.row.edit">
                                                <el-input v-model="scope.row.fau_measure" placeholder="排除措施"></el-input>
                                            </template>
                                            <span v-else>{{ scope.row.fau_measure }}</span> 
                                        </template>
                                    </el-table-column>
                                    <el-table-column  show-overflow-tooltip prop="fau_advise" width="110" label="改进建议" align="center">
                                        <template slot-scope="scope">
                                            <template v-if="scope.row.edit">
                                                <el-input v-model="scope.row.fau_advise" placeholder="改进建议"></el-input>
                                            </template>
                                            <span v-else>{{ scope.row.fau_advise }}</span> 
                                        </template>
                                    </el-table-column>
                                    <el-table-column show-overflow-tooltip prop="fau_peopleInfo" width="80" label="人员信息" align="center">
                                        <template slot-scope="scope">
                                            <template v-if="scope.row.edit">
                                                <el-input v-model="scope.row.fau_peopleInfo" placeholder="人员信息"></el-input>
                                            </template>
                                            <span v-else>{{ scope.row.fau_peopleInfo }}</span> 
                                        </template>
                                    </el-table-column>
                                    <el-table-column  show-overflow-tooltip prop="fau_remarks" width="110" label="备注" align="center">
                                        <template slot-scope="scope">
                                            <template v-if="scope.row.edit">
                                                <el-input v-model="scope.row.fau_remarks" placeholder="备注"></el-input>
                                            </template>
                                            <span v-else>{{ scope.row.fau_remarks }}</span> 
                                        </template>
                                    </el-table-column>
                                    <el-table-column v-if="false" show-overflow-tooltip prop="uuid" width="80" label="uuid" align="center"></el-table-column>                                   
                                    <el-table-column fixed="right" width="150" align="center" label="操作" v-if="whetherShow">
                                        <template slot-scope="scope">
                                            <el-button
                                                v-if="!scope.row.edit"
                                                v-model="scope.$index"
                                                @click="handleEdit(scope.$index, scope.row)"
                                                size="mini" class="handleButton">编辑</el-button>
                                            <el-button 
                                                type="success" 
                                                size="mini"
                                                v-model="scope.$index" 
                                                v-if="scope.row.edit"
                                                @click="exitfaultInfo(scope.row)">保存</el-button>
                                            <el-button
                                                size="mini"
                                                v-if="!scope.row.edit"
                                                v-model="scope.$index"
                                                type="danger" class="handleButton" >删除</el-button>
                                            <el-button
                                                v-else
                                                size="mini"
                                                type="danger"
                                                v-model="scope.$index"
                                                @click="handleCancle(scope.$index, scope.row)">取消</el-button>
                                        </template>
                                    </el-table-column>
                                </el-table>
                            </div>
                        </div>
                    </div>
                    <div class="container-fluid" style="width:100%;height:285px">
                        <div class="basicInfoHead" style="position:relative;width:100%;height:280px;">
                            <div class="icon" style="width: 100%;">
                                <a class="mf-a"></a>
                                <span class="mf-fn">故障现象</span>
                                <div class="mf-fnv faultDiv">
                                    <p>{{}}</p>
                                </div>
                            </div>
                            <div class="icon" style="top:95px;width: 100%;">
                                <a class="mf-a"></a>
                                <span class="mf-fn">故障原因</span>
                                <div class="mf-fnv faultDiv">
                                    <p>{{}}</p>
                                </div>
                            </div>
                            <div class="icon" style="top:188px;width: 100%;">
                                <a class="mf-a"></a>
                                <span class="mf-fn">改进建议</span>
                                <div class="mf-fnv faultDiv">
                                    <p>{{}}</p>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </el-main>
            </el-container>
        </div>
        <router-view></router-view>
    </div>
    
    
</template>

<script>
export default {
    name:"infoDetail",
    data (){
        return{
            userName:"",
            systemName:"",
            activeName:"",
            system:"",
            model:"",
            number:"",
            inputTime:"",
            product:"",
            faultTable: [],
            whetherShow:"",
            faultinfo_old:[]
        }
    },
    mounted(){
        this.setUserName()
        this.getInfoDetail()
    },
    methods: {
        setUserName(){
            var self = this;
            this.whetherShow = self.$store.state.whetherShow
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
            let systemName = sessionStorage.getItem("systemName")
            this.system = sessionStorage.getItem("system");
            this.model = sessionStorage.getItem("model");
            this.number = sessionStorage.getItem("number");
            this.inputTime = sessionStorage.getItem("inputTime");
            this.product = sessionStorage.getItem("man_mfrs");
            this.systemName = "设备："+systemName

        },
        exitUser(){
            this.$router.push({ path: '/login' });
            sessionStorage.removeItem("user")
        },
        getInfoDetail(){
            this.faultTable = []
            let manUuid = sessionStorage.getItem("systemUuid")
            let param = {
                        "msg": {
                            "man_uuid":manUuid
                            }
                        }
            this.$axios.post('FaultDBManage/searchinfo/',param                   
            ).then(function(response){
                if(response.data.stu == 200){
                    var faultArr = response.data.faumsg;
                    for(let i = 0;i<faultArr.length;i++){
                        let faultBox = {}
                        faultBox.uuid = faultArr[i].pk;
                        faultBox.fau_time = faultArr[i].fields.fau_time;
                        faultBox.fau_type = faultArr[i].fields.fau_type;
                        faultBox.fau_phen = faultArr[i].fields.fau_phen;
                        faultBox.fau_reason = faultArr[i].fields.fau_reason;
                        faultBox.createTime = faultArr[i].fields.fau_creDate;
                        faultBox.fau_check = faultArr[i].fields.fau_check;
                        faultBox.fau_remarks = faultArr[i].fields.fau_remarks
                        faultBox.fau_effect = faultArr[i].fields.fau_effect
                        faultBox.fau_measure = faultArr[i].fields.fau_measure
                        faultBox.fau_advise = faultArr[i].fields.fau_advise
                        faultBox.fau_peopleInfo = faultArr[i].fields.fau_peopleInfo
                        faultBox.fau_desc = faultArr[i].fields.fau_desc
                        faultBox.edit = false
                        this.faultTable.push(faultBox)
                    }
                }else{
                    
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })

        },
        openDetails(row, event, column){
            if(event.label == "操作"){
                if(column.target.innerText == "编辑"){
                    
                }else if(column.target.innerText == "删除"){
                    this.deleteFaultInfo(row)
                }  
            }else if(column.target.nodeName =="INPUT"){
                
            }else{

            }
            
        },
        deleteFaultInfo(row){

            if(confirm("确认删除？")){
                if(true){          
                    let param = {
                                "msg": [
                                    {},
                                    {},{
                                        "uuid":"["+row.uuid+"]"
                                    },{}
                                ]
                            }

                    this.$axios.post('FaultDBManage/delinfo/',param                   
                    ).then(function(response){
                        if(response.data.stu == 200){
                            alert("删除成功！")
                            this.getInfoDetail()
                        }else{
                            alert("删除失败！") 
                        }
                    }.bind(this)).catch(function (error) { 
                        console.log(error);
                    })    
                }
            }
        },
        handleEdit(index,row){
            row.edit = true;
            this.faultinfo_old = []
            for (var prop in row) {
                let a = row[prop]
                this.faultinfo_old.push(a)
            }
            console.log(this.faultinfo_old)
        },
        handleCancle(index,row){
            setTimeout(function(){
                row.edit = false;
            },200)           
        },
        exitfaultInfo(row){
            let oldArr = this.faultinfo_old

            let param = {
                        "msg": [
                            {

                            },
                            {
                            
                            },
                            {
                                "uuid":row.uuid,
                                "fau_time_old":oldArr[1],
                                "fau_phen_old":oldArr[3],
                                "fau_desc_old":oldArr[12],
                                "fau_type_old":oldArr[2],
                                "fau_reason_old":oldArr[4],
                                "fau_effect_old":oldArr[8],
                                "fau_check_old":oldArr[6],
                                "fau_measure_old":oldArr[9],
                                "fau_advise_old":oldArr[10],
                                "fau_peopleInfo_old":oldArr[11],
                                "fau_remarks_old":oldArr[7],

                                "fau_time":row.fau_time,
                                "fau_phen":row.fau_phen,
                                "fau_desc":row.fau_desc,
                                "fau_type":row.fau_type,
                                "fau_reason":row.fau_reason,
                                "fau_effect":row.fau_effect,
                                "fau_check":row.fau_check,
                                "fau_measure":row.fau_measure,
                                "fau_advise":row.fau_advise,
                                "fau_peopleInfo":row.fau_peopleInfo,
                                "fau_remarks":row.fau_remarks,

                            },
                            {
                                
                            }
                        ]
            }
            this.$axios.post('FaultDBManage/alterinfo/',param                   
            ).then(function(response){
                if(response.data.stu == 200){
                    alert("修改成功！")
                    this.getInfoDetail()
                }else{
                    alert("修改失败！") 
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
    .detailBox{
        margin-top:70px;
        width:100%;
        height:735px;
        background: #e2e2e2;
    }
      .el-main {
        background-color: #E9EEF3;
        color: #333;
        height: 660px;
        margin-right:20px;
        border: 1px solid #acafb1;
        border-radius: 5px;
        padding: 0px;
    }
    .elMainSecond{
        margin-right: 0px;
    }
    .el-header {
        color: #333;
        text-align: left;
        height: 35px !important;
        line-height: 35px;
        border-bottom: 1px solid #B3C0D1;
        margin-bottom:5px;
    }
    span.me-e{width:66px;display: block;font-family: Youyuan;font-size: 13px;font-weight: bold;color: #333;margin-top: 15px;border-left: 4px solid #3A9EE0;padding-left: 6px;height: 16px;line-height: 16px;}
	div.basicInfoHead a.mf-a{display:block;background:url(../assets/icon.png) center center no-repeat;width:10px;height:15px;float:left;}
    .icon{
        position: absolute;
    }
    .icon .mf-a{
       color: #333;height: 14px;line-height: 14px;padding-left: 5px;
       margin-top: 5px;
       margin-right: 5px;
    }
    .icon .mf-fn{
        font-size: 12px;
    }
    div.mf-fnv{
        width: 100%;
        height: 70px;
        background: rgb(233, 230, 230);
        border:1px solid #999;
        border-radius: 5px;
    }
    span.mf-fnv{
        font-size: 12px;
        position: absolute;
        left: 15px;
        margin-top: 10px;       
    }
</style>

