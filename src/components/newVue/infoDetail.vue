<template>
    <div class="container-fluid container-box">

        <vHead></vHead>
        <div class="container-fluid detailBox">
            <div class="container-fluid" >
                <el-tabs v-model="activeName">
                    <el-tab-pane :label="systemName" name="first"></el-tab-pane>
                </el-tabs>
            </div>
            <el-container style="padding:0 5px;">
                <el-main style="width:50%;">
                    <el-header>运行信息</el-header>
                    <div class="container-fluid"  style="height: 400px;border-bottom: 2px dashed #ccc5c5;">
                        <div class="basicInfoHead" style="position:relative;">
                            <span class="me-e">设备信息</span>
                            <div class="me-l">
                                <div class="icon" >
                                        <a class="mf-a"></a>
                                        <span class="mf-fn">系统</span>
                                        <span class="mf-fnv" style="width: 178px;">{{system}}</span>
                                </div>
                                <div class="icon" style="left:200px;">
                                    <a class="mf-a"></a>
                                    <span class="mf-fn">型号</span>
                                    <span class="mf-fnv" style="width: 178px;">{{model}}</span>
                                </div>
                                <div class="icon" style="left:400px;">
                                    <a class="mf-a"></a>
                                    <span class="mf-fn">编号</span>
                                    <span class="mf-fnv" style="width: 178px;">{{number}}</span>
                                </div>

                                <div class="icon" style="top:110px;">
                                    <a class="mf-a"></a>
                                    <span class="mf-fn">存放地点</span>
                                    <span class="mf-fnv" style="width: 178px;">{{man_place}}</span>
                                </div>
                                <div class="icon" style="top:110px;left:200px;">
                                    <a class="mf-a"></a>
                                    <span class="mf-fn">责任人</span>
                                    <span class="mf-fnv" style="width: 178px;">{{man_persion}}</span>
                                </div>
                                <div class="icon" style="top:110px;left:400px;">
                                    <a class="mf-a"></a>
                                    <span class="mf-fn">责任部门</span>
                                    <span class="mf-fnv" style="width: 178px;">{{man_department}}</span>
                                </div>

                                <div class="icon" style="top:178px;">
                                    <a class="mf-a"></a>
                                    <span class="mf-fn">生产厂家</span>
                                    <span class="mf-fnv" style="width: 178px;">{{man_mfrs}}</span>
                                </div>
                                <div class="icon" style="top:178px;left:200px;">
                                    <a class="mf-a"></a>
                                    <span class="mf-fn">厂家联系人</span>
                                    <span class="mf-fnv" style="width: 178px;">{{man_mfrspersion}}</span>
                                </div>
                                <div class="icon" style="top:178px;left:400px;">
                                    <a class="mf-a"></a>
                                    <span class="mf-fn">进场日期</span>
                                    <span class="mf-fnv" style="width: 178px;">{{inputTime}}</span>
                                </div>

                                <div class="icon" style="top:246px;">
                                    <a class="mf-a"></a>
                                    <span class="mf-fn">功能用途</span>
                                    <span class="mf-fnv" style="width: 400px;">{{man_enclosure}}</span>
                                </div>

                                <div class="icon" style="top:314px;">
                                    <a class="mf-a"></a>
                                    <span class="mf-fn">备注</span>
                                    <span class="mf-fnv" style="width: 400px;">{{man_remarks}}</span>
                                </div>

                            </div>
                        </div>
                    </div>
                    <div class="container-fluid">
                        <div class="basicInfoHead" style="position:relative;width:100%;height:220px;">
                            <span class="me-e">设备音视频信息</span>
                            <el-table   :data="videoManTable"
                                        ref="multipleTable"
                                        tooltip-effect="dark"
                                        style="cursor:pointer"
                                        height="210" > 
                                    <el-table-column fixed show-overflow-tooltip sortable prop="data" label="时间" width="190" align="center"></el-table-column>
                                    <el-table-column fixed show-overflow-tooltip prop="name" label="名称" width="400" align="center"></el-table-column>
                                    <el-table-column fixed show-overflow-tooltip prop="url" label="路径" v-if="false" width="400" align="center"></el-table-column>
                                    <el-table-column fixed="right" width="150" align="center" label="操作">
                                        <template slot-scope="scope">
                                            <el-button
                                                v-model="scope.$index"
                                                @click="playVideo(scope.$index, scope.row)"
                                                type="text" size="small" class="handleButton">查看</el-button>
                                        </template>
                                    </el-table-column>
                            </el-table>                            
                        </div>
                    </div>
                </el-main>
                <el-main class="elMainSecond" style="width:50%;">
                    <el-header>维护保障</el-header>
                    <div class="container-fluid"  style="height: 350px;margin-bottom: 46px;">
                        <div class="basicInfoHead" style="position:relative;">
                            <div class="basicInfoHead" style="position:relative;">
                                <span class="me-e">故障信息</span>
                                <span data-toggle="modal"  data-target="#addMounting" style="position:absolute;right:14px;top:-4px;color:#fff;background-color: #409EFF;border-radius:5px;border:1px solid #409EFF;width:108px;padding:5px;cursor:pointer;" @click="drawLineSetTimeout">故障发生次数</span>
                                <el-table :data="faultTable"
                                        ref="multipleTable"
                                        tooltip-effect="dark"
                                        style="cursor:pointer"
                                        height="330" 
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
                                                :disabled = "(acc_system.indexOf(system) >-1&&acc_permission != 0)||(acc_system.indexOf(system) <=-1&&acc_permission == 0)? false:true"
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
                                                :disabled = "(acc_system.indexOf(system) >-1&&acc_permission != 0)||(acc_system.indexOf(system) <=-1&&acc_permission == 0)? false:true"
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
                    <div class="container-fluid" style="width:100%;height:270px">
                        <div class="basicInfoHead" style="position:relative;width:100%;height:270px;">
                            <span class="me-e">故障音视频信息</span>
                            <el-table   :data="videoTable"
                                        ref="multipleTable"
                                        tooltip-effect="dark"
                                        style="cursor:pointer"
                                        height="230" > 
                                    <el-table-column fixed show-overflow-tooltip sortable prop="data" label="时间" width="190" align="center"></el-table-column>
                                    <el-table-column fixed show-overflow-tooltip prop="name" label="名称" width="400" align="center"></el-table-column>
                                    <el-table-column fixed show-overflow-tooltip prop="url" label="路径" v-if="false" width="400" align="center"></el-table-column>
                                    <el-table-column fixed="right" width="150" align="center" label="操作">
                                        <template slot-scope="scope">
                                            <el-button
                                                v-model="scope.$index"
                                                @click="playVideo(scope.$index, scope.row)"
                                                type="text" size="small" class="handleButton">查看</el-button>
                                        </template>
                                    </el-table-column>
                            </el-table>  
                        </div>
                    </div>
                </el-main>
            </el-container>
        </div>
        
        <div class="modal fade" id="addMounting" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style="display: none;">
            <div class="modal-dialog userBox" style="width:520px;height:400px;">
                <div class="modal-content" style="width:500px;">
                    <div class="container-fluid" style="border-bottom: 2px dashed #ccc5c5;width:500px;">
                        <div class="basicInfoHead" style="position:relative;width:500px;height:400px;">
                            <span class="me-e">故障发生次数</span>
                            <button style="position:absolute;top:0;right:0;" type="button" class="btn btn-default" data-dismiss="modal">关闭</button>
                            <div id="numCharts" style="width: 500px;height: 300px;"></div>                           
                        </div>
                    </div>   
                </div>
            </div>
        </div>
        <router-view></router-view>
    </div>
    
    
</template>

<script>
import { setTimeout } from 'timers';
// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/line')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/dataZoom')


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
            faultTable: [],
            whetherShow:"",
            faultinfo_old:[],
            videoTable:[],
            acc_system:'',
            videoManTable:[],
            inputTime:'',
            man_porpuse: "",
            man_qualifi: "",
            man_place: "",
            man_enclosure: "",
            man_department: "",
            man_persion: "",
            man_mfrs: "",
            man_mfrspersion: "",
            man_remarks: ""
        }
    },
    mounted(){
        this.setUserName()
        this.getInfoDetail()
        this.drawLine()
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
            let systemName = sessionStorage.getItem("systemName")
            this.system = sessionStorage.getItem("system");
            this.model = sessionStorage.getItem("model");
            this.number = sessionStorage.getItem("number");
            this.inputTime = sessionStorage.getItem("inputTime");
            this.man_porpuse = sessionStorage.getItem("man_porpuse");
            this.man_qualifi = sessionStorage.getItem("man_qualifi");
            this.man_place = sessionStorage.getItem("man_place");
            this.man_enclosure = sessionStorage.getItem("man_enclosure");
            this.man_department = sessionStorage.getItem("man_department");
            this.man_persion = sessionStorage.getItem("man_persion");
            this.man_mfrs = sessionStorage.getItem("man_mfrs");
            this.man_mfrspersion = sessionStorage.getItem("man_mfrspersion");
            this.man_remarks = sessionStorage.getItem("man_remarks");
            
            this.systemName = "设备："+systemName

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
                        faultBox.fau_num = faultArr[i].fields.fau_num
                        faultBox.edit = false
                        this.faultTable.push(faultBox)
                    }


                    var manVedioArr = response.data.urlmsg;
                    let urlArrName = []
                    for(let i = 0;i<manVedioArr.length;i++){

                        let urlArr = manVedioArr[i].fields.url_file
                            urlArr = urlArr.substr(1)
                            urlArr = urlArr.substr(0, urlArr.length-1);
                            urlArr = urlArr.split(",")
                            for(var h = 0;h<urlArr.length;h++){
                                let brr = [];
                                brr = urlArr[h].split("/")
                                urlArrName.push(brr[brr.length-1])
                            }

                        for(var j = 0;j<urlArr.length;j++){
                            let faultVideoBox = {}
                                faultVideoBox.data = manVedioArr[i].fields.url_creDate;
                                faultVideoBox.name = urlArrName[j];
                                let url = "http://192.168.34.110:9999"+urlArr[j].trim().substr(1)
                                url = encodeURI(url);
                                faultVideoBox.url = url.replace("#","%23")
                                
                            this.videoManTable.push(faultVideoBox)
                        }
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
                this.getVideoInfo(row)
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
        getVideoInfo(row){
            this.videoTable = []
            let param = {
                        "msg": {
                            "fau_uuid":row.uuid
                            }
                        }
            this.$axios.post('FaultDBManage/searchinfo/',param                   
            ).then(function(response){
                if(response.data.stu == 200){
                    var faultVedioArr = response.data.urlmsg;
                    let urlArrName = []
                    for(let i = 0;i<faultVedioArr.length;i++){

                        let urlArr = faultVedioArr[i].fields.url_file
                            urlArr = urlArr.substr(1)
                            urlArr = urlArr.substr(0, urlArr.length-1);
                            urlArr = urlArr.split(",")
                            for(var h = 0;h<urlArr.length;h++){
                                let brr = [];
                                brr = urlArr[h].split("/")
                                urlArrName.push(brr[brr.length-1])
                            }

                        for(var j = 0;j<urlArr.length;j++){
                            let faultVideoBox = {}
                                faultVideoBox.data = faultVedioArr[i].fields.url_creDate;
                                faultVideoBox.name = urlArrName[j];
                                let url = "http://192.168.34.110:9999"+urlArr[j].trim().substr(1)
                                url = encodeURI(url);
                                faultVideoBox.url = url.replace("#","%23")
                                
                            this.videoTable.push(faultVideoBox)
                        }
                        

                    }
                }else{
                    
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })
        },
        playVideo(index,row){
            sessionStorage.setItem("url",row.url);
            let routeData
            if(row.name.indexOf("docx")>-1||row.name.indexOf("doc")>-1||row.name.indexOf("xls")>-1||row.name.indexOf("xlsx")>-1){
                routeData = this.$router.resolve({ path: '/word' });
            }else if(row.name.indexOf("jpg")>-1||row.name.indexOf("png")>-1){
                routeData = this.$router.resolve({ path: '/picture' });
            }else if(row.name.indexOf("mp3")>-1||row.name.indexOf("mid")>-1||row.name.indexOf("wav")>-1){
                routeData = this.$router.resolve({ path: '/audio' });
            }else{
                routeData = this.$router.resolve({ path: '/video' });
            }           
            window.open(routeData.href, '_blank');
        },
        drawLineSetTimeout(){
            this.drawLine()
        },
        drawLine(){
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('numCharts'))
            // 绘制图表

            let option={}
            let man_uuid = sessionStorage.getItem("systemUuid")
            let param ={
                    "msg": {
                            "cmd": "faunum_with_fautype",
                            "man_uuid": man_uuid,
                            "starttime":"",
                            "endtime":""
                        }
                    }
            var xArr,yArr;
            this.$axios.post('FaultDBManage/statisfau/',param                   
            ).then(function(response){
                if(response.data.stu == 200){
                    xArr = response.data.eType;
                    yArr = response.data.eNum;
                    option = {
                        tooltip: {},
                        dataZoom: [{
                            
                        }, {
                            type: 'inside'
                        }],
                        xAxis: {
                            data: xArr
                        },
                        yAxis: {},
                        series: [{
                            name: '次数',
                            type: 'line',
                            data: yArr
                        }]
                    };
                    myChart.setOption(option)                  
                }else{
                    
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })

            
            myChart.resize()
                       
        }
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
        margin: 50px 0 25px;
    }
    .el-table__footer-wrapper, .el-table__header-wrapper{
        display: none !important;
    }
    .detailBox{
        margin-top:45px;
        width:100%;
        height:785px;
        background: #e2e2e2;
    }
      .el-main {
        background-color: #E9EEF3;
        color: #333;
        height: 725px;
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
        font-size: 25px;
    }
    span.me-e{width:250px;display: block;font-family: Youyuan;font-size: 20px;font-weight: bold;color: #333;margin-top: 15px;border-left: 4px solid #3A9EE0;padding-left: 6px;height: 30px;line-height: 30px;margin-bottom:15px;}
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
        font-size: 16px;
        font-weight: bold;
    }
    div.mf-fnv{
        width: 100%;
        height: 70px;
        background: rgb(233, 230, 230);
        border:1px solid #999;
        border-radius: 5px;
    }
    span.mf-fnv{
        font-size: 13px;
        position: absolute;
        left: 15px;
        margin-top: 10px;       
    }
    .container-fluid >>> .el-tabs__item{
        font-size: 22px;
    }
</style>

