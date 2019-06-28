<template>
    <div class="container-fluid container-box">
        <el-container class="container-fluid fl">
            <el-main>
                <ul class="fl parList" style="margin-bottom:40px;">
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
                
                <div class="content-view-two" style="float:left;width:100%;">
						<div class="page-view-4" style="position:relative;padding-top:40px;">
							<span class="eachrt-title">故障排名</span>
							<ul class="fault-tilte" style="position:absolute;padding-top:0px;font-size:13px;">
								<li style="width:12%;height:20px;">排名</li>
								<li style="width:38%;height:20px;">系统-型号-编号</li>
								<li style="width:23%;height:20px;">故障类型</li>
								<li style="width:27%;height:20px;">故障次数</li>
							</ul>
							<div style="overflow-x:auto;height:520px;font-size:13px;margin-top: 20px;width:100%;">
								<ul class="fault-li" v-for="(data,index) in items">
									<li  v-if="index==0" style="width:12%;color: rgb(237, 4, 1);font-weight:bold;">{{index+1}}</li>
									<li  v-else-if="index==1" style="width:12%;color: rgb(248, 121, 19);font-weight:bold;">{{index+1}}</li>
									<li  v-else-if="index==2" style="width:12%;color: rgb(149, 183, 41);font-weight:bold;">{{index+1}}</li>
									<li  v-else style="width:12%;font-weight: bold;">{{index+1}}</li>
									<li style="width:38%;">{{systemValue}} - {{modalValue}} - {{numValue}}</li>
									<li style="width:25%;">{{data.fau_type}}</li>
									<li style="width:25%;">{{data.fau_num}}</li>
								</ul>
							</div>
						</div>
                        <div class="first-page-content" style="min-width: 1170px;">
                            <div class="content-view-one">
                                <div class="page-view-3" style="height: 520px;width: 100%">
                                    <span class="eachrt-title">当前设备的故障发生次数</span>
                                    <div id="equipFault" style="width: 100%; height:100%;-webkit-tap-highlight-color: transparent; user-select: none;">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>            
            </el-main>
        </el-container>
    </div>
    
    
</template>

<script>
import { setTimeout } from 'timers';

import config from '../../router/MainConf'

let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/line')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/dataZoom')

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
            faultUuid:'',
            items:[]             
        }
    },
    mounted(){
        this.setUserName(),
        this.initSystem(),
        this.drawLine(),
        this.getInfoDetail()
        //this.fauRanking()
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
                    this.drawLine(this.uuidValue)
                }else{
                    
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })
        },
        initializeMemu () {
			this.menuList = JSON.parse(JSON.stringify(this.config.menu))
        },
        openTab (item) {
			this.$tab.open(item)
			this.initializeMemu()
		},
        getInfoDetail(manUuid){
            

            let man_uuid = manUuid
            // if(!manUuid){
            //     man_uuid = sessionStorage.getItem("systemUuid")
            // }else{
            //     man_uuid = manUuid
            // }
            this.items = []
            let param = {
                        "msg": {
                            "man_uuid":man_uuid
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
                        this.items.push(faultBox)
                        this.items.sort(this.compare('fau_num'))
                    }
                }else{
                    
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })

        },
        drawLine(uuid){
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('equipFault'))
            // 绘制图表

            let option={}
            let man_uuid = uuid;
            // if(!uuid){
            //     man_uuid = sessionStorage.getItem("systemUuid")
            // }else{
            //     man_uuid = uuid
            // }
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
							data: xArr,
							type: 'category',
        					boundaryGap: false,
                        },
                        yAxis: {},
                        series: [{
                            name: '发生故障次数',
                            type: 'line',
							data: yArr,
							itemStyle: {  
								normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
									color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[{
											offset: 0, color: '#ed0401' // 0% 处的颜色
										}, {
											offset: 0.4, color: '#ed0401' // 100% 处的颜色
										}, {
											offset: 1, color: '#fff' // 100% 处的颜色
										}]
									), //背景渐变色    
									lineStyle: {        // 系列级个性化折线样式  
										width: 1,  
										type: 'solid',  
										color: "#ed0401" //折线的颜色
									}  
								},  
								emphasis: {
									color: '#ed0401',   
									lineStyle: {        // 系列级个性化折线样式  
										width: 2,  
										type: 'dotted',  
										color: "#ed0401" 
									}  
								}  
							},//线条样式
							areaStyle: {normal: {}},
                        }]
                    }
                    myChart.setOption(option)

                }else{
                    
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })

            
            myChart.resize()
                       
        },
        compare (property) {
			return function (a, b) {
				var value1 = a[property]
				var value2 = b[property]
				return value2 - value1
			}
		},
        // fauRanking(){
		// 	let param = {
		// 				"msg":{
		// 						"cmd":"manrank_by_fau"
		// 					}
		// 				}

        //     this.$axios.post('FaultDBManage/analysisrank/',param,                
        //     ).then(function(response){
        //         if(response.data.msg){
		// 			var faultTypeArr = response.data.msg.rankInfo
		// 			this.items = faultTypeArr
		// 			this.items.sort(this.compare('fau_num'))
        //         }
        //     }.bind(this)).catch(function (error) { 
        //         console.log(error);
        //     })
		// },
    }
}
</script>

<style scoped>
    @import "../../../static/css/reset.css";
    @import "../../../static/css/index.css";
    @import "../../../static/css/firstpage.css";
    .container-fluid.index{
        margin: 450px auto 0;
    }
    .container-fluid {
        padding-right:0px;
        padding-left:0px;
        margin-right: auto;
        margin-left: auto;
    }

    .page-view-4{
        width: 50%;
        height: 520px;
    }
</style>

