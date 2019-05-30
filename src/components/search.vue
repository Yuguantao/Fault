<template>
    <div class="container-fluid container-box">
        <vHead></vHead>
        <router-view></router-view>
        <el-container class="container-fluid fl">
            <el-aside style="width:200px;height:100%;margin-top:52px;">
                <vNavMenu></vNavMenu>
            </el-aside>
            <el-main>
                <div class="topBox clearfix">
                    <div class="page-header">
                        <ul class="nav nav-tabs">
                            <li class="active"><a href="javascript:void(0);" class="cmsall">设备查询</a></li>
                        </ul>
                    </div>
                </div>
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
                    <el-select v-model="numValue" @change="selectInfo" placeholder="请选择编号" style="width:30%;">
                        <el-option
                        v-for="item in numOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </ul>

                <span class="addMounting" data-toggle="modal" data-target="#addMounting" v-if="acc_permission != 2" @click="initSystemM">新增配件信息</span>
                
                <span class="sBtn" id="sureBtn" @click="addEquip" v-if="acc_permission != 2">新增设备</span>
    
                <el-table :data="equipData.slice((currentPage-1)*pageSize,currentPage*pageSize)" class="equipTable" 
                        fixed
                        ref="multipleTable"
                        tooltip-effect="dark"
                        style="width: 100%;cursor:pointer;color:#111;"
                        height="650"
                        :row-style="tableRowStyle"
                        :header-cell-style="tableHeaderColor"
                        @row-click="openDetails">
                        
                    <el-table-column fixed show-overflow-tooltip prop="system" label="系统" width="150" align="center">
                        <template slot-scope="scope">
                            <template  v-if="scope.row.edit">
                                <el-input v-model="scope.row.system" placeholder="系统"></el-input>
                            </template>
                            <span v-else>{{ scope.row.system }}</span>                        
                        </template>
                    </el-table-column>
                    <el-table-column  fixed show-overflow-tooltip prop="model" width="120" label="型号" align="center">
                        <template slot-scope="scope">
                            <template v-if="scope.row.edit">
                                <el-input v-model="scope.row.model" placeholder="型号"></el-input>
                            </template>
                            <span v-else>{{ scope.row.model }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed show-overflow-tooltip prop="number" width="80" label="编号" align="center">
                        <template slot-scope="scope">
                            <template v-if="scope.row.edit">
                                <el-input v-model="scope.row.number" placeholder="编号"></el-input>
                            </template>
                            <span v-else>{{ scope.row.number }}</span>                       
                        </template>
                    </el-table-column>
                    <el-table-column sortable prop="createTime" width="250" label="创建时间" align="center">
                        <template slot-scope="scope">
                            <template v-if="scope.row.edit">
                                <el-date-picker
                                    v-model="scope.row.createTime"
                                    type="datetime"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    value-format="yyyy-MM-dd HH:mm:ss"
                                    placeholder="创建时间">
                                </el-date-picker>
                            </template>
                            <span v-else>{{ scope.row.createTime }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip prop="man_porpuse" width="220" label="功能用途" align="center">
                        <template slot-scope="scope">
                            <template v-if="scope.row.edit">
                                <el-input v-model="scope.row.man_porpuse" placeholder="功能用途"></el-input>
                            </template>
                            <span v-else>{{ scope.row.man_porpuse }}</span> 
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip prop="man_qualifi" width="220" label="主要技术指标" align="center">
                        <template slot-scope="scope">
                            <template v-if="scope.row.edit">
                                <el-input v-model="scope.row.man_qualifi" placeholder="主要技术指标"></el-input>
                            </template>
                            <span v-else>{{ scope.row.man_qualifi }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip prop="man_place" width="120" label="存放地点" align="center">
                        <template slot-scope="scope">
                            <template v-if="scope.row.edit">
                                <el-input v-model="scope.row.man_place" placeholder="存放地点"></el-input>
                            </template>
                            <span v-else>{{ scope.row.man_place }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip prop="man_department" width="220" label="责任部门" align="center">
                        <template slot-scope="scope">
                            <template v-if="scope.row.edit">
                                <el-input v-model="scope.row.man_department" placeholder="责任部门"></el-input>
                            </template>
                            <span v-else>{{ scope.row.man_department }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip prop="man_persion" width="220" label="责任人" align="center">
                        <template slot-scope="scope">
                            <template v-if="scope.row.edit">
                                <el-input v-model="scope.row.man_persion" placeholder="责任人"></el-input>
                            </template>
                            <span v-else>{{ scope.row.man_persion }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip prop="man_mfrs" width="220" label="生产厂家" align="center">
                        <template slot-scope="scope">
                            <template v-if="scope.row.edit">
                                <el-input v-model="scope.row.man_mfrs" placeholder="生产厂家"></el-input>
                            </template>
                            <span v-else>{{ scope.row.man_mfrs }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip prop="man_mfrspersion" width="220" label="厂家联系人" align="center">
                        <template slot-scope="scope">
                            <template v-if="scope.row.edit">
                                <el-input v-model="scope.row.man_mfrspersion" placeholder="厂家联系人"></el-input>
                            </template>
                            <span v-else>{{ scope.row.man_mfrspersion }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip v-if="false" prop="uuid" width="80" label="uuid" align="center">
                        <template slot-scope="scope">
                            <template v-if="scope.row.edit">
                                <el-input v-model="scope.row.uuid" placeholder=""></el-input>
                            </template>
                            <span v-else>{{ scope.row.uuid }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip prop="marks" width="270" label="备注信息" align="center">
                        <template slot-scope="scope">
                            <template v-if="scope.row.edit">
                                <el-input v-model="scope.row.marks" placeholder="备注信息"></el-input>
                            </template>
                            <span v-else>{{ scope.row.marks }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip prop="marks" width="150" label="查看配件信息" align="center">
                        <el-button id="lookMounting" type="primary" icon="el-icon-edit"></el-button>
                    </el-table-column>
                    <el-table-column fixed="right" width="150" align="center" label="操作" v-if = "whetherShow">
                        <template slot-scope="scope">
                            <el-button
                                v-if="!scope.row.edit"
                                v-model="scope.$index"
                                :disabled = "(acc_system.indexOf(scope.row.system) >-1&&acc_permission != 0)|| (acc_system.indexOf(scope.row.system) <=-1&&acc_permission == 0)? false:true"
                                @click="handleEdit(scope.$index, scope.row)"
                                size="mini" class="handleButton">编辑</el-button>
                            <el-button 
                                type="success" 
                                size="mini"
                                v-model="scope.$index" 
                                v-if="scope.row.edit"
                                @click="exitEquipInfo(scope.row)">保存</el-button>
                            <el-button
                                size="mini"
                                v-if="!scope.row.edit"
                                v-model="scope.$index"
                                :disabled = "(acc_system.indexOf(scope.row.system) >-1&&acc_permission != 0)|| (acc_system.indexOf(scope.row.system) <=-1&&acc_permission == 0)? false:true"
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
        <div class="modal fade" id="addMounting" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-dialog userBox">
                <div class="modal-content">
                    <div class="modal-body">
                        <table width="100%" cellspacing="0" cellpadding="0">
                            <tbody>
                                <tr>
                                    <td width="100" class="item">系统</td>
                                    <td class="pl10">
                                        <el-select v-model="systemValueM" @change="gainModalM" placeholder="请选择系统">
                                            <el-option
                                            v-for="item in systemOptionsM"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="100" class="item">型号</td>
                                    <td class="pl10">
                                        <el-select v-model="modalValueM" @change="gainNumberM" placeholder="请选择型号">
                                            <el-option
                                            v-for="item in modalOptionsM"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="100" class="item">编号</td>
                                    <td class="pl10">
                                        <el-select v-model="numValueM" @change="getUuid" placeholder="请选择编号">
                                            <el-option
                                            v-for="item in numOptionsM"
                                            :key="item.value"
                                            :label="item.label"
                                            :value="item.value">
                                            </el-option>
                                        </el-select>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="100" class="item">配件名称</td>
                                    <td class="pl10"><input type="text" class="form-control" id="add_name"></td>
                                </tr>
                                <tr>
                                    <td class="item">配件编号</td>
                                    <td class="pl10"><input type="text" class="form-control" id="add_num"></td>
                                </tr>
                                <tr>
                                    <td class="item">使用状态</td>
                                    <td class="pl10"><input type="text" class="form-control" id="add_status"></td>
                                </tr>
                                <tr>
                                    <td class="item">存放地点</td>
                                    <td class="pl10"><input type="text" class="form-control" id="add_place"></td>
                                </tr>
                                <tr>
                                    <td class="item">备注信息</td>
                                    <td class="pl10">
                                        <input class="form-control" type="text" id="detailMessage">
                                    </td>										
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="modal-footer" style="text-align:center;">
                        <button type="button" class="btn btn-primary" id="newUser_add" @click="addMounting">确认</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    
</template>

<script>
import { setTimeout } from 'timers';

export default {
    name:"search",
    data (){
        return{
            userName:"",
            equipData: [],
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
            systemOptionsM:[],
            modalOptionsM:[],
            numOptionsM:[],
            systemValueM:"",
            modalValueM:"",
            numValueM:"",
            uuidValue:'',
            currentTotal: 0,
            pageSize:8,
            currentPage:1             
        }
    },
    mounted(){
        this.setUserName(),
        this.initEquipInfo(),
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
        initEquipInfo(){
            this.equipData = []
            // let userName = sessionStorage.getItem("user");
            // let password = sessionStorage.getItem("password");
            let param = {
                "msg": {

                }
            }
            this.$axios.post('FaultDBManage/searchinfo/',param                   
            ).then(function(response){
                if(response.data.stu == 200){
                    
                    var equipArr = response.data.msg;
                    this.currentTotal = equipArr.length;
                    for(let i = 0;i<equipArr.length;i++){
                        let equipBox = {}
                        equipBox.uuid = equipArr[i].fields.uuid;
                        equipBox.system = equipArr[i].fields.man_sys;
                        equipBox.model = equipArr[i].fields.man_model;
                        equipBox.number = equipArr[i].fields.man_num;
                        equipBox.createTime = equipArr[i].fields.man_impTime;
                        equipBox.marks = equipArr[i].fields.man_remarks
                        equipBox.man_mfrs = equipArr[i].fields.man_mfrs
                        equipBox.man_porpuse = equipArr[i].fields.man_porpuse
                        equipBox.man_qualifi = equipArr[i].fields.man_qualifi
                        equipBox.man_department = equipArr[i].fields.man_department
                        equipBox.man_place = equipArr[i].fields.man_place
                        equipBox.man_mfrspersion = equipArr[i].fields.man_mfrspersion
                        equipBox.man_persion = equipArr[i].fields.man_persion
                        equipBox.edit = false
                        this.equipData.push(equipBox)
                    }
                }else{
                    
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })
        },
        selectInfo(){
            this.equipData = []
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
                    
                    var equipArr = response.data.msg;
                    this.currentTotal = equipArr.length;
                    for(let i = 0;i<equipArr.length;i++){
                        let equipBox = {}
                        equipBox.uuid = equipArr[i].fields.uuid;
                        equipBox.system = equipArr[i].fields.man_sys;
                        equipBox.model = equipArr[i].fields.man_model;
                        equipBox.number = equipArr[i].fields.man_num;
                        equipBox.createTime = equipArr[i].fields.man_impTime;
                        equipBox.marks = equipArr[i].fields.man_remarks
                        equipBox.man_mfrs = equipArr[i].fields.man_mfrs
                        equipBox.man_porpuse = equipArr[i].fields.man_porpuse
                        equipBox.man_qualifi = equipArr[i].fields.man_qualifi
                        equipBox.man_department = equipArr[i].fields.man_department
                        equipBox.man_place = equipArr[i].fields.man_place
                        equipBox.man_mfrspersion = equipArr[i].fields.man_mfrspersion
                        equipBox.man_persion = equipArr[i].fields.man_persion
                        equipBox.edit = false
                        this.equipData.push(equipBox)
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
                    this.deleteInfo(row)
                }  
            }else if(column.target.nodeName =="INPUT"){
                
            }else if(column.target.className == "el-icon-edit"||column.target.id == "lookMounting"){
                sessionStorage.setItem("systemUuid",row.uuid);
                this.$router.push({ path: '/mountings' })
            }else{
                sessionStorage.setItem("systemUuid",row.uuid);
                sessionStorage.setItem("systemName",row.system+" > "+row.model+" > "+row.number);
                sessionStorage.setItem("system",row.system);
                sessionStorage.setItem("model",row.model);
                sessionStorage.setItem("number",row.number);
                sessionStorage.setItem("inputTime",row.createTime);
                sessionStorage.setItem("man_mfrs",row.man_mfrs);
                this.$router.push({ path: '/infoDetail' });
            }
            
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
        deleteInfo(row){
            if(confirm("确认删除？")){
                if(true){          
                    let param = {
                                "msg": [
                                    {
                                    "uuid":"["+row.uuid+"]"
                                    },
                                    {},{},{},{}
                                ]
                            }

                    this.$axios.post('FaultDBManage/delinfo/',param                   
                    ).then(function(response){
                        if(response.data.stu == 200){
                            alert("删除成功！")
                            this.initEquipInfo()
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
        exitEquipInfo(row){
            let oldArr = this.infoDetail_old

            let param = {
                        "msg": [
                            {
                                "uuid":row.uuid,
                                "man_sys_old": oldArr[1],
                                "man_model_old": oldArr[2],
                                "man_num_old":oldArr[3],
                                "man_impTime_old":oldArr[4],
                                "man_remarks_old":oldArr[5],
                                "man_mfrs_old":oldArr[6],
                                "man_porpuse_old":oldArr[7],
                                "man_qualifi_old":oldArr[8],
                                "man_department_old":oldArr[9],
                                "man_persion_old":oldArr[12],
                                "man_mfrspersion_old":oldArr[11], 
                                "man_place_old":oldArr[10],

                                "man_sys": row.system,
                                "man_model": row.model,
                                "man_num":row.number,
                                "man_impTime":row.createTime,
                                "man_remarks":row.marks,
                                "man_mfrs":row.man_mfrs,
                                "man_porpuse":row.man_porpuse,
                                "man_qualifi":row.man_qualifi,
                                "man_department":row.man_department,
                                "man_persion":row.man_persion,
                                "man_mfrspersion":row.man_mfrspersion, 
                                "man_place":row.man_place
                            },
                            {
                            
                            },
                            {
                            
                            },
                            {
                                
                            },
                            {
                                
                            }
                        ]
            }
            this.$axios.post('FaultDBManage/alterinfo/',param                   
            ).then(function(response){
                if(response.data.stu == 200){
                    alert("修改成功！")
                    this.initEquipInfo()
                }else{
                    alert("修改失败！") 
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })

        },
        addEquip(){
            this.$router.push({ path: '/addEquip' })
        },
        getUuid(){
            let man_sys = this.systemValueM;
            let man_model = this.modalValueM;
            let man_num = this.numValueM;
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
                }else{
                    
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })
        },
        initSystemM(){
            let param = {
                        "msg": {
                                "search_man": "光电经纬仪"
                            }
                        }           
            this.$axios.post('FaultDBManage/searchinfo/',param,                
            ).then(function(response){
                this.systemOptionsM = []
                this.modalOptionsM  = []
                this.numOptionsM = []
                if(response.data.msg.length>0){
                    var sysArr = response.data.msg
                    for(var i = 0;i<sysArr.length;i++){
                        var item = {}
                        item.value = sysArr[i]
                        item.label = sysArr[i]
                        this.systemOptionsM.push(item)
                    }                                       
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })

        },
        gainModalM(){
            let systemId = this.systemValueM
            let param = {
                        "msg": {
                                "man_sys": systemId
                            }
                        }
            this.$axios.post('FaultDBManage/searchinfo/',param,                
            ).then(function(response){
                this.modalOptionsM  = []
                this.numOptionsM = []
                if(response.data.msg.length>0){
                    var modalArr = response.data.msg
    
                    for(var i = 0;i<modalArr.length;i++){                           
                        var temp = {}
                        temp.label = modalArr[i]
                        temp.value = modalArr[i]
                        
                        this.modalOptionsM.push(temp)
                    }
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })
            if (this.modalValueM) {
                this.modalValueM = '';
            }
            if (this.numValueM) {
                this.numValueM = '';
            }
        },
        gainNumberM(){
            let systemId = this.systemValueM
            let modalId = this.modalValueM
            let param = {
                        "msg": {
                                "man_sys": systemId,
                                "man_model": modalId
                            }
                        }
            this.$axios.post('FaultDBManage/searchinfo/',param,                
            ).then(function(response){
                this.numOptionsM = []
                if(response.data.msg.length>0){
                    var numberArr = response.data.msg
                    for(var i = 0;i<numberArr.length;i++){                           
                        var temp = {}
                        temp.label = numberArr[i]
                        temp.value = numberArr[i]
                        this.numOptionsM.push(temp)
                    }
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })
            if (this.numValueM) {
                this.numValueM = '';
            }
        },
        addMounting(){
            var self = this;
            let fit_name  = $("#add_name").val()
            let fit_num   = $("#add_num").val()
            let fit_isuse = $("#add_status").val()
            let fit_place = $("#add_place").val()
            let detailMessage = $("#detailMessage").val()

            let param = new FormData()

            let fit_manInfo = this.uuidValue

            param.append("tablename","fittingstable")
            param.append("fit_manInfo",fit_manInfo)
            param.append("fit_name",fit_name)
            param.append("fit_num",fit_num)
            param.append("fit_isuse",fit_isuse)
            param.append("fit_place",fit_place)
            param.append("fit_remarks",detailMessage)
            

            this.$axios.post('FaultDBManage/addinfo/',param,{headers: {'Content-Type':'application/x-www-form-urlencoded'}}                
            ).then(function(response){
                if(response.data.msg == "true"){
                    alert("新增配件成功！")
                    $("#addMounting").modal('hide'); 
                }else{
                    alert("新增配件失败!")
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
        }
        
    }
}
</script>

<style scoped>
    @import "../../static/css/reset.css";
    @import "../../static/css/index.css";
    @import "../../static/css/voicePlus.css";
    @import "../../static/css/UserManage.css";


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
    .el-select-dropdown .el-scrollbar .el-scrollbar__wrap{
        overflow: scroll;
    }
</style>

