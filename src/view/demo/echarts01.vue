<template>
    <section class="chart-container">
        <el-row>
            <el-col :span="12">
                <div id="pieChart" style="width:100%; height:350px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="columnChart" style="width:100%; height:350px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="lineChart" style="width:100%; height:350px;"></div>
            </el-col>
            <el-col :span="12">
                <div id="lineChart01" style="width:100%; height:350px;"></div>
            </el-col>
        </el-row>
    </section>
</template>

<script>

//导入echarts依赖的实例
import echarts from 'echarts'
import { getResourse } from '../../api/demoApi';
import commonUtil from '../../plugins/echart'
/* import axios from 'axios' */
export default {
    data () {
        return {
            use:0,
            free:0,
        }
  },
    mounted: function () {
        var getResourseParams = {};
            let _this = this;
            getResourse(getResourseParams).then(resuceData => {
                let { msg, code} = resuceData;
                if (code !== 200) {
                    this.$message({
                    message: msg,
                    type: 'error'
                    });
                } else {
                    _this.use = resuceData.resourse[0].use;
                    _this.free = resuceData.resourse[0].free;
                    
                    let pieParams = {
                        pieChartId : 'pieChart',
                        pieChartName: '饼图',
                        pieColorList:['rgb(187,140,238)','rgb(134,146,243)'],
                        pieLegendData:['使用','未使用','异常'],
                        pieSeriesData:[{value:_this.use, name:'使用'},{value:_this.free, name:'未使用'},{value:200, name:'异常'}]
                    };
                    let columnParams = {
                        columnChartId : 'columnChart',
                        columnChartName : '柱状图',
                        columnColorList : ['rgb(205,85,85)','rgb(210,105,30)','rgb(0,139,0)','rgb(178,58,238)','rgb(54,100,139)','rgb(154,100,139)'],
                        columnxAxisData : ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
                        columnSeriesData : [5, 20, 36, 10, 10, 20]
                    };
                    let lineParams = {
                        lineChartId : 'lineChart',
                        lineTitleName : '折线图',
                        lineLegendData : ['邮件营销', '联盟广告', '搜索引擎'],
                        linexAxisData : ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
                        lineSeriesData : [
                                            {
                                                name: '邮件营销',
                                                type: 'line',
                                                stack: '总量',
                                                data: [120, 132, 101, 134, 90, 230, 210]
                                            },
                                            {
                                                name: '联盟广告',
                                                type: 'line',
                                                stack: '总量',
                                                data: [220, 182, 191, 234, 290, 330, 310]
                                            },
                                            {
                                                name: '搜索引擎',
                                                type: 'line',
                                                stack: '总量',
                                                data: [820, 932, 901, 934, 1290, 1330, 1320]
                                            }
                                        ]
                    }
                    commonUtil.drawPieChart(pieParams);
                    /* commonUtil.drawBarChart(columnParams); */
                    commonUtil.drawColumnChart(columnParams);
                    commonUtil.drawLineChart(lineParams);
                }
            });
    },
    methods: {
        advertLink(){
            this.$router.push({ path: '/table' });
        }
    },
}
</script>

<style scoped>
    .chart-container {
        width: 100%;
        float: left;
    }

    .el-col {
        padding: 30px 20px;
    }
</style>
