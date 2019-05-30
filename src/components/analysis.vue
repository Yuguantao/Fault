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
                            <li class="active"><a href="javascript:void(0);" class="cmsall">故障分析</a></li>
                        </ul>
                    </div>
                </div>
                <div class="first-page-content" style="min-width: 1170px;">
					<div class="content-view-one">
						<!-- <div class="page-view-1">
							<div class="repair-status">
								<div class="repair-status-li first-page-bg" style="margin-left:1%">
									<img alt="" src="../assets/analysis/报修设备.png">
									<span class="repair-status-font" style="font-size: 14.07px;">未处理报修</span>
									<span class="repair-status-number ndbxnum" style="font-size: 28.35px;">4</span>
								</div>
								<div class="repair-status-li scond-page-bg">
									<img alt="" src="../assets/analysis/报事报修.png">
									<span class="repair-status-font" style="font-size: 14.07px;">今日报修</span>
									<span class="repair-status-number jrbxnum" style="font-size: 28.35px;">1</span>
								</div>
								<div class="repair-status-li third-page-bg">
									<img alt="" src="../assets/analysis/故障_99.png">
									<span class="repair-status-font" style="font-size: 14.07px;">故障数</span>
									<span class="repair-status-number gznum" style="font-size: 28.35px;">10</span>
								</div>
								<div class="repair-status-li four-page-bg" style="margin-right:0px">
									<img alt="" src="../assets/analysis/设备.png">
									<span class="repair-status-font" style="font-size: 14.07px;">设备完好率</span>
									<span class="repair-status-number sbwhl" style="font-size: 28.35px;">78%</span>
								</div>
							</div>
							
							<ul class="device-value">
								<li>
									<span>
										<img src="../assets/analysis/del1.png">
									</span>
									<span class="device-value-content">
										<div class="ybfnum" style="font-size: 28.35px;">1</div>
										<div class="" style="font-size: 14.07px;">已报废数量</div>
									</span>
								</li>
								<li>
									<span>
										<img src="../assets/analysis/del3.png">
									</span>
									<span class="device-value-content">
										<div class="bfjznum" style="font-size: 28.35px;">61,700</div>
										<div class="" style="font-size: 14.07px;">报废价值</div>
									</span>
								</li>
								<li>
									<span>
										<img src="../assets/analysis/del2.png">
									</span>
									<span class="device-value-content">
										<div class="jnbfnum" style="font-size: 28.35px;">1</div>
										<div class="" style="font-size: 14.07px;">今年报废数量</div>
									</span>
								</li>
								<li>
									<span>
										<img src="../assets/analysis/del4.png">
									</span>
									<span class="device-value-content">
										<div class="jnbfjznum" style="font-size: 28.35px;">61,700</div>
										<div class="" style="font-size: 14.07px;">今年报废价值</div>
									</span>
								</li>
							</ul>
						</div>
						<div class="page-view-2">
							<div class="page-view-2-li">
								<img src="../assets/analysis/组-28.png">
								<span class="device-value-content" style="margin-left:5%;">
									<div class="dallnum" style="font-size: 28.35px;">45</div>
									<div class="" style="font-size: 14.07px;">设备总数</div>
								</span>
							</div>
							<div class="page-view-2-li">
								<img src="../assets/analysis/组-29.png">
								<span class="device-value-content" style="margin-left:5%;">
									<div class="dallprice" style="font-size: 28.35px;">44,811,129</div>
									<div class="" style="font-size: 14.07px;">设备总价值</div>
								</span>
							</div>
							<div class="page-view-2-li">
								<img src="../assets/analysis/组-30.png">
								<span class="device-value-content" style="margin-left:5%;">
									<div class="jndnum" style="font-size: 28.35px;">24</div>
									<div class="" style="font-size: 14.07px;">今年新增设备</div>
								</span>
							</div>
							<div class="page-view-2-li">
								<img src="../assets/analysis/组-31.png">
								<span class="device-value-content" style="margin-left:5%;">
									<div class="jnallprice" style="font-size: 28.35px;">6,523,288</div>
									<div class="" style="font-size: 14.07px;">今年新增设备价值</div>
								</span>
							</div>
						</div> -->
						<div class="page-view-3" style="height: 398px;width: 47%;margin-right: 15px;">
							<span class="eachrt-title">近一年月份新增设备趋势图</span>
							<div id="repair-chargeMan" style="height: 398px; width: 100%; -webkit-tap-highlight-color: transparent; user-select: none;">

							</div>
						</div>
						<div class="page-view-3" style="height: 398px;width: 50%">
							<span class="eachrt-title">近一年月份故障趋势图</span>
							<div id="repair-chargeFau" style="height: 398px; width: 100%; -webkit-tap-highlight-color: transparent; user-select: none;">

							</div>
						</div>
					</div>
					<div class="content-view-two">
						<div class="page-view-4" style="position:relative;padding-top:40px;">
							<span class="eachrt-title">故障排名</span>
							<ul class="fault-tilte" style="position:absolute;padding-top:0px;font-size:13px;">
								<li style="width:12%;">排名</li>
								<li style="width:38%;">系统-型号-编号</li>
								<li style="width:23%;">生产部门</li>
								<li style="width:27%;">故障次数</li>
							</ul>
							<div style="overflow-x:auto;height:310px;font-size:13px;margin-top: 20px;width:100%;">
								<ul class="fault-li" v-for="(data,index) in items">
									<li  v-if="index==0" style="width:12%;color: rgb(237, 4, 1);font-weight:bold;">{{index+1}}</li>
									<li  v-else-if="index==1" style="width:12%;color: rgb(248, 121, 19);font-weight:bold;">{{index+1}}</li>
									<li  v-else-if="index==2" style="width:12%;color: rgb(149, 183, 41);font-weight:bold;">{{index+1}}</li>
									<li  v-else style="width:12%;font-weight: bold;">{{index+1}}</li>
									<li style="width:38%;">{{data.man_sys}} - {{data.man_model}} - {{data.man_num}}</li>
									<li style="width:25%;">{{data.man_department}}</li>
									<li style="width:25%;">{{data.fau_num}}</li>
								</ul>
							</div>
							
						</div>
						<div class="page-view-5" style="position:relative;">
							<span class="eachrt-title">设备中故障分类占比</span>
							<ul style="position:absolute;top:0;right:0;z-index:99999999;width:50%;">
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
								<el-select v-model="numValue"  placeholder="请选择编号" style="width:30%;" @change="getUuid">
									<el-option
									v-for="item in numOptions"
									:key="item.value"
									:label="item.label"
									:value="item.value">
									</el-option>
								</el-select>
							</ul>
							<div id="device-fenlei"  style="-webkit-tap-highlight-color: transparent; user-select: none;">
								
							</div>
						</div>
						<div class="page-view-6">
							<div class="repair-status">
								<div class="repair-status-li first-page-bg" style="margin-left:1%">
									<img alt="" src="../assets/analysis/报修设备.png">
									<span class="repair-status-font" style="font-size: 14.07px;">设备总数</span>
									<span class="repair-status-number ndbxnum" style="font-size: 28.35px;">{{equipmentNum}}</span>
								</div>
								<div class="repair-status-li scond-page-bg">
									<img alt="" src="../assets/analysis/报事报修.png">
									<span class="repair-status-font" style="font-size: 14.07px;">新增设备</span>
									<span class="repair-status-number jrbxnum" style="font-size: 28.35px;">{{addEquipment}}</span>
								</div>
								<div class="repair-status-li third-page-bg">
									<img alt="" src="../assets/analysis/故障_99.png">
									<span class="repair-status-font" style="font-size: 14.07px;">故障总数</span>
									<span class="repair-status-number gznum" style="font-size: 28.35px;">{{faultNum}}</span>
								</div>
								<div class="repair-status-li four-page-bg" style="margin-right:0px">
									<img alt="" src="../assets/analysis/设备.png">
									<span class="repair-status-font" style="font-size: 14.07px;">设备完好率</span>
									<span class="repair-status-number sbwhl" style="font-size: 28.35px;">78%</span>
								</div>
							</div>
							
							<ul class="device-value">
								<li>
									<span>
										<img src="../assets/analysis/del1.png">
									</span>
									<span class="device-value-content">
										<div class="ybfnum" style="font-size: 28.35px;">1</div>
										<div class="" style="font-size: 14.07px;">已报废数量</div>
									</span>
								</li>
								<li>
									<span>
										<img src="../assets/analysis/del3.png">
									</span>
									<span class="device-value-content">
										<div class="bfjznum" style="font-size: 28.35px;">61,700</div>
										<div class="" style="font-size: 14.07px;">设备总价值</div>
									</span>
								</li>
								<li>
									<span>
										<img src="../assets/analysis/del2.png">
									</span>
									<span class="device-value-content">
										<div class="jnbfnum" style="font-size: 28.35px;">1</div>
										<div class="" style="font-size: 14.07px;">今年报废数量</div>
									</span>
								</li>
								<li>
									<span>
										<img src="../assets/analysis/del4.png">
									</span>
									<span class="device-value-content">
										<div class="jnbfjznum" style="font-size: 28.35px;">61,700</div>
										<div class="" style="font-size: 14.07px;">今年新增设备价值</div>
									</span>
								</li>
							</ul>							
						</div>
					</div>
				</div>
            </el-main>
        </el-container>
    </div>
    
    
</template>

<script>

// 引入基本模板
let echarts = require('echarts/lib/echarts')
// 引入图组件
require('echarts/lib/chart/line')
require('echarts/lib/chart/pie')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/dataZoom')
require('echarts/lib/component/legend')


export default {
    name:"analysis",
    data (){
        return{
			systemOptions:[],
			modalOptions:[],
			numOptions:[],
			systemValue:"",
			modalValue:"",
			numValue:"",
			items:[], 
			uuidValue:'',
			equipmentNum:0,
			addEquipment:0,
			faultNum:0 
        }
    },
    mounted(){
		this.initSystem()
		this.fauRanking()
		this.drawLineMan()
		this.drawLineFau()
		this.drawLinePie()
		this.getFauNumber()
		this.getManNumber()
    },
    methods: {
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
		fauRanking(){
			let param = {
						"msg":{
								"cmd":"manrank_by_fau"
							}
						}

            this.$axios.post('FaultDBManage/analysisrank/',param,                
            ).then(function(response){
                if(response.data.msg){
					var faultTypeArr = response.data.msg.rankInfo
					this.items = faultTypeArr
					this.items.sort(this.compare('fau_num'))
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })
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
					this.drawLinePie(this.uuidValue)
                }else{
                    
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })
        },		
		compare (property) {
			return function (a, b) {
				var value1 = a[property]
				var value2 = b[property]
				return value2 - value1
			}
		},
		drawLineMan(){
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('repair-chargeMan'))
			// 绘制图表
			
            let param ={
						"msg": {
								"cmd": "man_by_month"
							}
						}

            this.$axios.post('FaultDBManage/statisfau/',param                   
            ).then(function(response){
                if(response.data.stu == 200){
					let sum = 0
                    var xArr = response.data.month;
					var yArr = response.data.manNum;
					 for (let i = 0; i < yArr.length; i++) {
						let num = parseInt(yArr[i])
						sum += num;
					}
					this.addEquipment = sum

                    myChart.setOption({
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
                            name: '新增设备数目',
                            type: 'line',
							data: yArr,
							itemStyle: {  
								normal: { //颜色渐变函数 前四个参数分别表示四个位置依次为左、下、右、上
									color: new echarts.graphic.LinearGradient(0, 0, 0, 1,[{
											offset: 0, color: '#81befd' // 0% 处的颜色
										}, {
											offset: 0.4, color: '#e4f2ff' // 100% 处的颜色
										}, {
											offset: 1, color: '#fff' // 100% 处的颜色
										}]
									), //背景渐变色    
									lineStyle: {        // 系列级个性化折线样式  
										width: 1,  
										type: 'solid',  
										color: "#0180ff" //折线的颜色
									}  
								},  
								emphasis: {
									color: '#0180ff',   
									lineStyle: {        // 系列级个性化折线样式  
										width: 2,  
										type: 'dotted',  
										color: "#0180ff" 
									}  
								}  
							},//线条样式
							areaStyle: {normal: {}},
                        }]
                    });                  
                }else{
                    
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })
                       
		},
		drawLineFau(){
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('repair-chargeFau'))
			// 绘制图表
			
            let param ={
						"msg": {
								"cmd": "fau_by_month"
							}
						}

            this.$axios.post('FaultDBManage/statisfau/',param                   
            ).then(function(response){
                if(response.data.stu == 200){
                    var xArr = response.data.month;
                    var yArr = response.data.manNum;
                    myChart.setOption({
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
                    });                  
                }else{
                    
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })
                       
		},
		drawLinePie(arr){
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById('device-fenlei'))
			// 绘制图表
			let man_uuid
			if(!arr){
				man_uuid = sessionStorage.getItem("systemUuid")
			}else{
				man_uuid = arr
			}
            let param ={
                    "msg": {
                            "cmd": "faunum_with_fautype",
                            "man_uuid": man_uuid,
                            "starttime":"",
                            "endtime":""
                        }
                    }
            this.$axios.post('FaultDBManage/statisfau/',param                   
            ).then(function(response){
				let pieArr = []
                if(response.data.stu == 200){
                    var xArr = response.data.eType;
					var yArr = response.data.eNum;
					for(var i = 0;i<xArr.length;i++){
						let item = {}
						item.name = xArr[i]
						item.value = yArr[i]
						pieArr.push(item)
					}

                    myChart.setOption({
						 title : {
							x:'center'
						},
						tooltip : {
							trigger: 'item',
							formatter: "{a} <br/>{b} : {c} ({d}%)"
						},
						legend: {
							x : 'center',
							y : 'bottom',
							data:xArr
						},
						toolbox: {
							show : true,
							feature : {
								mark : {show: true},
								dataView : {show: true, readOnly: false},
								magicType : {
									show: true,
									type: ['pie', 'funnel']
								},
								restore : {show: true},
							},
						},
						calculable : true,
						series : [
							{
								name:'故障分类占比',
								type:'pie',
								radius : [30, 110],
								roseType : 'area',
								data:pieArr,
								itemStyle:{
									normal:{ 
										label:{ 
											show: true, 
											formatter: '{b} : {c} ({d}%)' 
										}, 
										labelLine :{show:true} 
									} 
								}
							}
						]
                    });                  
                }else{
                    
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })
                       
		},
		getFauNumber(){

			let paramFau = {
					"msg": {
							"cmd": "allfau_num"
						}
					}
			this.$axios.post('FaultDBManage/statisfau/',paramFau,                
            ).then(function(response){
                this.faultNum = response.data.msg
            }.bind(this)).catch(function (error) { 
                console.log(error);
			})
		},
		getManNumber(){
			let paramMan = {
						"msg": {
								"cmd": "allman_num"
							}
						}
			this.$axios.post('FaultDBManage/statisfau/',paramMan,                
            ).then(function(response){
                this.equipmentNum = response.data.msg
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
	@import "../../static/css/UserManage.css";
	@import "../../static/css/firstpage.css";


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

