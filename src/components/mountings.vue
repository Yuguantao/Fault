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
                            <li class="active"><a href="javascript:void(0);" class="cmsall">配件信息</a></li>
                        </ul>
                    </div>
                </div>
    
                <el-table :data="equipData" class="equipTable"
                        fixed
                        ref="multipleTable"
                        tooltip-effect="dark"
                        style="width: 86%;cursor:pointer;color:#111;"
                        height="650"
                        :row-style="tableRowStyle"
                        :header-cell-style="tableHeaderColor"
                        @row-click="openDetails">
                        
                    <el-table-column fixed show-overflow-tooltip prop="fit_name" label="配件名称" width="220" align="center">
                        <template slot-scope="scope">
                            <template  v-if="scope.row.edit">
                                <el-input v-model="scope.row.fit_name" placeholder="配件名称"></el-input>
                            </template>
                            <span v-else>{{ scope.row.fit_name }}</span>                        
                        </template>
                    </el-table-column>
                    <el-table-column  fixed show-overflow-tooltip prop="fit_num" width="200" label="配件编号" align="center">
                        <template slot-scope="scope">
                            <template v-if="scope.row.edit">
                                <el-input v-model="scope.row.fit_num" placeholder="配件编号"></el-input>
                            </template>
                            <span v-else>{{ scope.row.fit_num }}</span>
                        </template>
                    </el-table-column>
                    <el-table-column fixed show-overflow-tooltip prop="fit_isuse" width="80" label="使用状态" align="center">
                        <template slot-scope="scope">
                            <template v-if="scope.row.edit">
                                <el-input v-model="scope.row.fit_isuse" placeholder="使用状态"></el-input>
                            </template>
                            <span v-else>{{ scope.row.fit_isuse }}</span>                       
                        </template>
                    </el-table-column>

                    <el-table-column show-overflow-tooltip prop="fit_place" width="280" label="存放地点" align="center">
                        <template slot-scope="scope">
                            <template v-if="scope.row.edit">
                                <el-input v-model="scope.row.fit_place" placeholder="存放地点"></el-input>
                            </template>
                            <span v-else>{{ scope.row.fit_place }}</span> 
                        </template>
                    </el-table-column>
                    <el-table-column show-overflow-tooltip prop="fit_records" width="350" label="备注信息" align="center">
                        <template slot-scope="scope">
                            <template v-if="scope.row.edit">
                                <el-input v-model="scope.row.fit_records" placeholder="备注信息"></el-input>
                            </template>
                            <span v-else>{{ scope.row.fit_records }}</span>
                        </template>
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
            </el-main>
        </el-container>
        
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
            acc_permission:""              
        }
    },
    mounted(){
        this.setUserName(),
        this.initEquipInfo()
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
            let systemUuid = sessionStorage.getItem("systemUuid")
            let param = {
                "msg": {
                    "man_uuid":systemUuid
                }
            }
            this.$axios.post('FaultDBManage/searchinfo/',param                   
            ).then(function(response){
                if(response.data.stu == 200){
                    
                    var equipArr = response.data.fitmsg;
                    for(let i = 0;i<equipArr.length;i++){
                        let equipBox = {}
                        equipBox.uuid = equipArr[i].fields.uuid;
                        equipBox.fit_name = equipArr[i].fields.fit_name;
                        equipBox.fit_num = equipArr[i].fields.fit_num;
                        equipBox.fit_isuse = equipArr[i].fields.fit_isuse;
                        equipBox.fit_place = equipArr[i].fields.fit_place;
                        equipBox.fit_records = equipArr[i].fields.fit_records
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
                
            }else{
                
            }
            
        },
        
        deleteInfo(row){
            if(confirm("确认删除？")){
                if(true){          
                    let param = {
                                "msg": [
                                    {},{},{},{},{"uuid":"["+row.uuid+"]"}
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
                                
                            },
                            {
                            
                            },
                            {
                            
                            },
                            {
                                
                            },
                            {
                                "uuid":row.uuid,
                                "fit_name_old": oldArr[1],
                                "fit_num_old": oldArr[2],
                                "fit_isuse_old":oldArr[3],
                                "fit_place_old":oldArr[4],
                                "fit_records_old":oldArr[5],

                                "fit_name": row.fit_name,
                                "fit_num": row.fit_num,
                                "fit_isuse":row.fit_isuse,
                                "fit_place":row.fit_place,
                                "fit_records":row.fit_records,
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
	.first-page-content{
		background: #EEF1F6;
		padding-bottom: 30px;
		min-width: 1165px;
		min-height: 770px;
	}
	.el-main{
		padding:0px;
	}
</style>

