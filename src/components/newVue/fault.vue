<template>
    <div class="container-fluid container-box">
        <el-container>          
            <el-main class="container-fluid">
                <div class="container-fluid searchBox" style="position:absolute;top:0;left:0;">
                    <el-select v-model="query" style="width:120px;">
                        <el-option v-for="item in options" :key="item.value" :value="item.value" :label="item.label"></el-option>
                    </el-select>
                    <el-input
                        placeholder="在搜索框输入需要查询的故障类型，点击搜索"
                        style="width:400px;"
                        v-model="searchInput"
                        @keyup.native="get($event)"
                        @keydown.down.native="selectDown"
                        @keydown.up.native="selectUp"
                        clearable>
                    </el-input>

                    <el-select v-model="systemValue" clearable  placeholder="请选择" style="width:125px;">
                            <el-option
                        v-for="item in systemOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                        </el-option>
                    </el-select>
                    <el-button type="primary" @click="searchKeyword" style="font-size:16px;width:120px;">搜索</el-button>
                    <ul class="keywordBox" style="width:400px;position:absolute;overflow-x:hidden;overflow-y:auto;margin-left:124px;">
                        <li class="text-center" v-for ="(value,index) in myData" @click="searchValue($event)" style="height:32px;">
                            <span class=" textprimary" :class = "{gray:index==now}" style="display:block;padding-left:5px;color:#000;">{{value}}</span>
                        </li>
                    </ul>
                </div>
                <div class="container-fluid searchResult" style="position:absolute;top:120px;left:0;">
                    <div class="container-fluid" style="height:570px;overflow-x:hidden;overflow-y:auto;background-color:#fff;">
                        <ul class="part_b" >
                            <li v-for="(data,index) in Htems" v-if = "Htems.length != 0 && videoTable.length == 0" style="width:100%;text-align: left;">
                                <h4 style="text-align: left;"><b>设备名称：</b>{{data.fields.man_sys}}-{{data.fields.man_model}}-{{data.fields.man_num}}</h4>
                                <p class="describe c66"><b>功能用途：</b>{{data.fields.man_porpuse}}</p>
                                <p class="describe c66"><b>存放地点：</b>{{data.fields.man_place}}</p>
                                <p class="describe c66"><b>备注信息：</b>{{data.fields. man_remarks}}</p>
                                <div class="source">
                                    <span class="c66"><b>创建时间：</b></span><span class="c33 mr15">{{data.fields.man_impTime}}</span>
                                    <span class="c66"><b>责任部门：</b></span><span class="c33 mr15">{{data.fields.man_department}}</span>
                                    <span class="c66"><b>责任人：</b></span><span class="c33 mr15">{{data.fields.man_persion}}</span>
                                    <span class="c66"><b>生产厂家：</b></span><span class="c33 mr15">{{data.fields.man_mfrs}}</span>
                                    <span class="c66"><b>厂家联系人：</b></span><span class="c33 mr15">{{data.fields.man_mfrspersion}}</span>
                                </div>
                            </li>
                            <li v-for="(data,index) in items" v-if = "items.length != 0 && videoTable.length == 0" style="width:100%;text-align: left;">
                                <h4 style="text-align: left;"><b>故障现象：</b>{{data.fields.fau_phen}}</h4>
                                <p class="describe c66"><b>故障描述：</b>{{data.fields.fau_desc}}</p>
                                <p class="describe c66"><b>故障原因：</b>{{data.fields.fau_reason}}</p>
                                <p class="describe c66"><b>排除措施：</b>{{data.fields. fau_measure}}</p>
                                <div class="source">
                                    <span class="c66"><b>故障时间：</b></span><span class="c33 mr15">{{data.fields.fau_time}}</span>
                                    <span class="c66"><b>故障类型：</b></span><span class="c33 mr15">{{data.fields.fau_type}}</span>
                                    <span class="c66"><b>人员信息：</b></span><span class="c33 mr15">{{data.fields.fau_peopleInfo}}</span>
                                </div>
                            </li>

                            <el-table   :data="videoTable"
                                        ref="multipleTable"
                                        tooltip-effect="dark"
                                        style="cursor:pointer"
                                        height="500" 
                                        v-if= "systemValue == 3 && videoTable.length != 0"> 
                                    <el-table-column fixed show-overflow-tooltip sortable prop="data" label="时间" width="190" align="center"></el-table-column>
                                    <el-table-column fixed show-overflow-tooltip prop="sysName" label="系统名称"  width="400" align="center"></el-table-column>
                                    <el-table-column fixed show-overflow-tooltip prop="name" label="文件名称" width="400" align="center"></el-table-column>
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

                        </ul>
                        
                    </div>

                    
                </div>
            </el-main>
        </el-container>
        
        <router-view></router-view>
    </div>
    
    
</template>

<script>
export default {
    name:"infoDetail",
    data (){
        return{
            userName:"",
            searchInput:"",
            activeName:"first",
            items:[],
            Htems:[],
            myData:[],
            keyword:'',
            now:-1,
            systemValue:'',
            systemOptions:[
                {
                    value: '1',
                    label: '故障数据库'
                }, {
                    value: '2',
                    label: '设备信息库'
                },
                {
                    value: '3',
                    label: '文件知识库'
                }
            ],
            valueArr:[],
            options: [{
                    value: '0',
                    label: '模糊搜索'
                }, {
                    value: '1',
                    label: '精确搜索'
                }],
            query: '1',
            videoTable:[],
        }
    },
    mounted(){
        this.setUserName()
        this.initSearchKeyword()
    },
    methods: {
        setUserName(){
            var self = this;
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

        },
        exitUser(){
            this.$router.push({ path: '/login' });
            sessionStorage.removeItem("user")
        },
        handleClick(tab, event) {
            console.log(tab, event);
        },
        searchKeyword(){
            this.items = []
            this.Htems = []
            let keyword = this.searchInput
            let userName = sessionStorage.getItem("user");
            this.videoTable = [];
            let ismanage,isfault,isurl;
            if(!this.systemValue){
                ismanage = "1";
                isfault = "1";
                isurl = "0"
            }else{
                if(this.systemValue == "2"){
                    ismanage = "1";
                    isfault = "0";
                    isurl = "0";
                }else if(this.systemValue == "3"){
                    ismanage = "0";
                    isfault = "0";
                    isurl = "1"
                }else{
                    ismanage = "0";
                    isfault = "1";
                    isurl = "0"
                }
            }
            let param ={
                        "msg": {
                                "wrd_accid": userName,
                                "isaccurate":this.query,
                                "ismanage":ismanage,
                                "isfault":isfault,
                                "isurl":isurl,
                                "condition": this.searchInput
                            }
                        }


            this.$axios.post('FaultDBManage/searchdetail/',param                   
            ).then(function(response){
                let arr = response.data.resu_fault
                let brr = response.data.resu_manage
                let crr = response.data.resu_url
                if(response.data.stu == 200){
                    this.items = arr
                    this.Htems = brr
                    for(var i = 0;i<crr.length;i++){
                        let faultVideoBox = {};
                        let Box = crr[i].split("/");
                            faultVideoBox.data = Box[6];
                            faultVideoBox.name = Box[7];
                            faultVideoBox.sysName = Box[3]+"-"+Box[4]+"-"+Box[5];
                            let url = "http://192.168.34.110:9999"+crr[i].trim().substr(1)
                            url = encodeURI(url);
                            faultVideoBox.url = url.replace("#","%23")
                                
                            this.videoTable.push(faultVideoBox)
                    }  
                }
                $(".keywordBox").hide()
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })
        },
        get:function (event) {
            if(event.keyCode==38||event.keyCode==40)return;
            if(event.keyCode == 13){
                this.searchKeyword()
                return
            }
            let keyword = this.searchInput
            let userName = sessionStorage.getItem("user");
            let param =         {
                        "msg": {
                                "wrd_accid": userName,
                                "wrd_records": keyword,
                            }
                        }

            this.$axios.post('FaultDBManage/searchkeywrd/',param                   
            ).then(function(response){
                if(response.data.stu == 200){
                    this.myData = response.data.msg
                    $(".keywordBox").show()
                }else{
                    this.myData = []
                    $(".keywordBox").hide()
                }
            }.bind(this)).catch(function (error) { 
                console.log(error);
            })
        },
        selectDown:function () {
            this.now++;
            if(this.now==this.myData.length)this.now=-1;
            this.searchInput=this.myData[this.now];
        },
        selectUp:function () {
            this.now--;
            if(this.now==-2)this.now=this.myData.length-1;
            this.searchInput=this.myData[this.now];
        },
        searchValue(event){
            $(".keywordBox").hide()
            this.searchInput = event.target.innerText
        },
        initSearchKeyword(){
            this.items = []
            this.Htems = []
            let keywordInit = sessionStorage.getItem("keyword")
            this.searchInput = keywordInit
            let keyword = this.searchInput
            let userName = sessionStorage.getItem("user");
            this.videoTable = []
            let ismanage,isfault,isurl;
            if(!this.systemValue){
                ismanage = "1";
                isfault = "1";
                isurl = "0"
            }else{
                if(this.systemValue == "2"){
                    ismanage = "1";
                    isfault = "0";
                    isurl = "0";
                }else if(this.systemValue == "3"){
                    ismanage = "0";
                    isfault = "0";
                    isurl = "1"
                }else{
                    ismanage = "0";
                    isfault = "1";
                    isurl = "0"
                }
            }
            let param ={
                        "msg": {
                                "wrd_accid": userName,
                                "isaccurate":this.query,
                                "ismanage":ismanage,
                                "isfault":isfault,
                                "isurl":isurl,
                                "condition": this.searchInput
                            }
                        }
            this.$axios.post('FaultDBManage/searchdetail/',param                   
            ).then(function(response){
                let arr = response.data.resu_fault
                let brr = response.data.resu_manage
                let crr = response.data.resu_url
                if(response.data.stu == 200){
                    this.items = arr
                    this.Htems = brr
                    for(var i = 0;i<crr.length;i++){
                        let faultVideoBox = {};
                        let Box = crr[i].split("/");
                            faultVideoBox.data = Box[6];
                            faultVideoBox.name = Box[7];
                            faultVideoBox.sysName = Box[3]+"-"+Box[4]+"-"+Box[5];
                            let url = "http://192.168.34.110:9999"+crr[i].trim().substr(1)
                            url = encodeURI(url);
                            faultVideoBox.url = url.replace("#","%23")
                                
                            this.videoTable.push(faultVideoBox)
                    }  
                }
                $(".keywordBox").hide()
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
    .noData1,.noData2{font-size:20px; display:none; text-align:center; margin-top:150px;}
    .parList{
        margin-bottom: 25px;
    }
    /* 搜索下拉框  */	
    .keywordBox{display:none;position: absolute; width: 500px; min-height: 44px; box-sizing: border-box; border-bottom: 1px solid #d1d1d1; border-left: 1px solid #d1d1d1; border-right: 1px solid #d1d1d1; box-shadow: 0 2px 5px #e2e2e2; background-color: #fff; padding: 10px 0; z-index:100;}
    .keywordBox li{text-indent: 10px; line-height: 32px; cursor: pointer; font-size:14px;}
    .grey{background-color:#e1e1e1;}
    .keywordBox li:hover{background-color:#e1e1e1;}
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
    .searchBox{
        margin:30px 0 25px 0;
    }
    .part_b{width: 100%; margin-top: 25px; padding-bottom: 40px;}
    .part_b li{line-height: 22px; margin-bottom: 20px;}
    .part_b h4{font-size: 16px; color: #0077c6; line-height: 28px;}
    .part_b h4 img{vertical-align: -2px; margin-right: 8px;}

        .title{
           color:#ffffff;
           text-align: center;
       }
       .gray{
           background-color: #dff0d8;
       }
       .textprimary{
           color:#000;
           text-align: left;
           font-family: "Microsoft YaHei UI";
           font-size: 12px;
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
    .content li p {
        text-align: left;

    }
</style>

