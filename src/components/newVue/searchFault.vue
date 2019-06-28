<template>
    <div class="container-fluid container-box">
        <el-container class="container-fluid fl">
            <el-main>
                <ul class="fl parList">
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
                    <el-select v-model="numValue" @change="getUuid" placeholder="请选择编号" style="width:30%;">
                        <el-option
                        v-for="item in numOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </ul>
    
                <el-table :data="faultTable"
                                        ref="multipleTable"
                                        tooltip-effect="dark"
                                        style="width: 100%;cursor:pointer;color:#111;"
                                        height="610"
                                        :row-style="tableRowStyle"
                                        :header-cell-style="tableHeaderColor"
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
                                    <el-table-column  show-overflow-tooltip prop="fau_num" width="100" label="故障次数" align="center">
                                        <template slot-scope="scope">
                                            <template v-if="scope.row.edit">
                                                <el-input v-model="scope.row.fau_num" placeholder="故障次数"></el-input>
                                            </template>
                                            <span v-else>{{ scope.row.fau_num }}</span> 
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
                                    <el-table-column fixed="right" width="160" align="center" label="操作" v-if="whetherShow">
                                        <template slot-scope="scope">
                                            <el-button
                                                v-if="!scope.row.edit"
                                                v-model="scope.$index"
                                                @click="handleEdit(scope.$index, scope.row)"
                                                :disabled = "(acc_system.indexOf(systemValue) >-1&&acc_permission != 0)||(acc_system.indexOf(systemValue) <=-1&&acc_permission == 0)? false:true"
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
                                                :disabled = "(acc_system.indexOf(systemValue) >-1&&acc_permission != 0)||(acc_system.indexOf(systemValue) <=-1&&acc_permission == 0)? false:true"
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
                                <div style="text-align: center;margin-top: 30px;">
                                    <el-pagination
                                        background
                                        @size-change="handleSizeChange"
                                        @current-change="handleCurrentChange"
                                        :current-page="currentPage"
                                        :page-size="pageSize"
                                        layout="total, prev, pager, next, jumper"
                                        :total="currentTotal">
                                    </el-pagination>
                                </div>               
            </el-main>
 
        </el-container>
    </div>
    
    
</template>

<script>
import { setTimeout } from 'timers';

import config from '../../router/MainConf'

export default {
    name:"search1",
    data (){
        return{
            userName:"",
   
            selectedOptions:[],
            systemOptions:[],
            modalOptions:[],
            numOptions:[],
            systemValue:"",
            modalValue:"",
            numValue:"",
            whetherShow:"",
            infoDetail_old:[],
            acc_system:'' ,
            acc_permission:"",
            uuidValue:'',
            currentTotal: 0,
            pageSize:8,
            currentPage:1,
            menuList:[],
            config:config,
            faultTable: [],             
        }
    },
    mounted(){
        this.setUserName(),
        this.initSystem()
    },
    methods: {
        setUserName(){
            var self = this;
            this.whetherShow = self.$store.state.whetherShow
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
        tableRowStyle({ row, rowIndex }) {
            
        },
        tableHeaderColor({ row, column, rowIndex, columnIndex }) {
            if (rowIndex === 0) {
                return 'background-color: lightblue;color: #111;font-weight: 500;font-size:15px;'
            }
        },
        openDetails(row, event, column){
            if(event.label == "操作"){
                if(column.target.innerText == "编辑"){
                    
                }else if(column.target.innerText == "删除"){
                    this.deleteFaultInfo(row)
                }  
            }else if(column.target.nodeName =="INPUT"){
                
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
                                    },{},{}
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
                                "fau_num_old":oldArr[13],

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
                                "fau_num":row.fau_num,

                            },
                            {
                                
                            },{}
                        ]
            }
            this.$axios.post('FaultDBManage/alterinfo/',param                   
            ).then(function(response){
                if(response.data.stu == 200){
                    alert("修改成功！")
                    this.getInfoDetail()
                    this.drawLine()
                }else{
                    alert("修改失败！") 
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })
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

        handleEdit(index,row){
            row.edit = true;
            this.infoDetail_old = []
            for (var prop in row) {
                let a = row[prop]
                this.infoDetail_old.push(a)
            }
        },
        handleCancle(index,row){
            setTimeout(function(){
                row.edit = false;
            },200)           
        },
  
        getUuid(){
            let man_sys = this.systemValue;
            let man_model = this.modalValue;
            let man_num = this.numValue;
            let param = {
                "msg": {
                    "man_sys": man_sys,
                    "man_model": man_model,
                    "man_num": man_num
                }
            }
            this.$axios.post('FaultDBManage/searchinfo/',param                   
            ).then(function(response){
                if(response.data.stu == 200){
                    this.uuidValue = response.data.msg[0].fields.uuid
                    this.getInfoDetail(this.uuidValue)
                }else{
                    
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })
        },
        handleSizeChange(val) {
            this.pageSize = val;
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.currentPage = val;
            console.log(`当前页: ${val}`);
        },
        initializeMemu () {
			this.menuList = JSON.parse(JSON.stringify(this.config.menu))
        },
        openTab (item) {
			this.$tab.open(item)
			this.initializeMemu()
		},
        getInfoDetail(manUuid){
            this.faultTable = []
            let param = {
                        "msg": {
                            "man_uuid":manUuid
                            }
                        }
            this.$axios.post('FaultDBManage/searchinfo/',param                   
            ).then(function(response){
                if(response.data.stu == 200){
                    var faultArr = response.data.faumsg;
                    this.currentTotal = faultArr.length;
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
                        faultBox.fau_num = faultArr[i].fields.fau_num
                        faultBox.edit = false
                        this.faultTable.push(faultBox)
                    }

                }else{
                    
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
    @import "../../../static/css/UserManage.css";


    .container-fluid.index{
        margin: 450px auto 0;
    }
    .container-fluid {
        padding-right:0px;
        padding-left:0px;
        margin-right: auto;
        margin-left: auto;
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
    
    .addMounting{
        width: 120px;
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
        margin-left: 25px;
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
    .el-select-dropdown .el-scrollbar .el-scrollbar__wrap{
        overflow: scroll;
    }
</style>

