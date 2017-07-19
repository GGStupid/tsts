<template>
    <div class="timeWrap">
        <div id="timemain"></div>
    </div>
</template>
<script>
var echarts = require('echarts');
import market from '@/api/market/index'
import { toast } from '@/util/index'
export default {
    data() {
        return {
            myChart: '',
            topPrice: '15.5',//最高价
            bottomPrice: '0',//最低价
            openPrice: '15.5',//开盘价
            rawData: [],
            ChatRespBody: '',
            arrCurTime: [],
            line_data: [],
            bar_data: []
        }
    },
    computed: {
        fontSize() {
            var dpr = $('html').attr('data-dpr');
            if (dpr == 1) {
                return 12;
            } else if (dpr == 2) {
                return 24;
            } else {
                return 36;
            }
        },
        maxDif() {
            let d1 = this.topPrice - this.openPrice
            let d2 = this.openPrice - this.bottomPrice
            return d1 >= d2 ? d1 : d2
        },
        top() {
            return this.maxDif + parseFloat(this.openPrice)
        },
        bottom() {
            return this.openPrice - this.maxDif
        }
    },
    // props: {
    //     topPrice: '',
    //     bottomPrice: '',
    //     openPrice: '',
    //     code: ''
    // },
    methods: {
        addZero(val, len, top) {
            if (!arguments[1]) len = 2;
            if (!arguments[2]) top = true;
            if (val.toString().length < len) {
                while (len != val.toString().length) {
                    if (top) val = "0" + val.toString();
                    else val = val.toString() + "0";
                }
            }
            return val.toString();
        },
        getDataPos(item, arry) {
            if (!arry) return
            let len = arry.length
            for (var i = 0; i < arry.length; i++) {
                if (item.ts == arry[i].ts) {
                    arry.splice(i, 1, item)
                }
            }
        },
        splitData(rawData) {
            for (var i = 0; i < rawData.length; i++) {
                this.line_data.push(rawData[i].p);
                this.bar_data.push(rawData[i].q);
            }
        },
        initDate() {
            // 初始化 x轴 
            //***************************************************************//
            var dtCurDate = new Date();
            var dtTimeAM = new Date(dtCurDate.getFullYear(), dtCurDate.getMonth(), dtCurDate.getDate(), 9, 30, 0, 0)
            for (var i = 0; i <= 120; i++) {
                this.arrCurTime.push([this.addZero(dtTimeAM.getHours()), this.addZero(dtTimeAM.getMinutes())].join(":"));
                dtTimeAM = new Date(dtTimeAM.getTime() + 60 * 1000);
            }
            var dtTimePM = new Date(dtCurDate.getFullYear(), dtCurDate.getMonth(), dtCurDate.getDate(), 13, 0, 0, 0)
            for (var i = 0; i <= 480; i++) {
                this.arrCurTime.push([this.addZero(dtTimePM.getHours()), this.addZero(dtTimePM.getMinutes())].join(":"));
                dtTimePM = new Date(dtTimePM.getTime() + 60 * 1000);
            }
            //***************************************************************//
            for (var i = 0; i < this.arrCurTime.length; i++) {
                this.line_data.push("-");
            }
            for (var i = 0; i < this.arrCurTime.length; i++) {
                this.bar_data.push("-");
            }
        },
        loadTimeChart() {
            this.myChart = echarts.init(document.getElementById('timemain'));
            var data = this.splitData(this.rawData);
            var option = {
                grid: [
                    {
                        top: '10%',
                        bottom: '35%',
                        left: '10%',
                        right: '10%'
                    },
                    {
                        bottom: '10%',
                        left: '10%',
                        right: '10%',
                        height: '20%',
                    },
                ],
                textStyle: {
                    fontSize: this.fontSize
                },
                xAxis: [
                    {
                        gridIndex: 0,
                        type: 'category',
                        boundaryGap: false,
                        axisLine: { onZero: false },
                        axisLabel: {
                            show: false,
                            textStyle: {
                                color: '#eee',
                            },
                            interval: function (index, value) {
                                if (value == "09:30"
                                    || value == "11:30"
                                    || value == "18:00"
                                    || value == "21:00") {
                                    return true;
                                }
                                else return false;
                            },
                            formatter: function (value, index) {
                                if (value == "11:30") {
                                    return "11:30/13:30"
                                } else {
                                    return value
                                }
                            }
                        },
                        data: this.arrCurTime
                    },
                    {
                        gridIndex: 1,
                        type: 'category',
                        boundaryGap: false,
                        axisLine: { onZero: true },
                        axisLabel: {
                            textStyle: {
                                color: '#eee',
                                fontSize: this.fontSize
                            },
                            interval: function (index, value) {
                                if (value == "09:30"
                                    || value == "11:30"
                                    || value == "18:00"
                                    || value == "21:00") {
                                    return true;
                                }
                                else return false;
                            },
                            formatter: function (value, index) {
                                if (value == "11:30") {
                                    return "11:30/13:30"
                                } else {
                                    return value
                                }
                            }
                        },
                        data: this.arrCurTime
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        position: 'left',
                        splitLine: { show: false },
                        splitNumber: 1,
                        name: this.top,
                        nameTextStyle: {
                            color: '#f20462',
                            fontSize: this.fontSize
                        },
                        axisLabel: {
                            show: false,
                            showMinLabel: false,
                            showMaxLabel: true,
                            inside: true,
                            textStyle: {
                                color: '#f20462',
                                fontSize: this.fontSize
                            },
                        },
                        max: this.top,
                        min: this.bottom
                    },
                    {
                        type: 'value',
                        position: 'right',
                        splitLine: { show: false },
                        splitNumber: 1,
                        name: '30.00%',
                        nameTextStyle: {
                            color: '#f20462',
                            fontSize: this.fontSize
                        },
                        axisLabel: {
                            show: false,
                            showMinLabel: false,
                            inside: true,
                            textStyle: {
                                color: '#f20462',
                                fontSize: this.fontSize
                            },
                            // formatter: '{value} %',
                        },
                        max: this.top,
                        min: this.bottom
                    },
                    {
                        gridIndex: 1,
                        type: 'value',
                        name: '万秒',
                        splitLine: { show: false },
                        splitNumber: 1,
                        nameLocation: 'middle',
                        nameRotate: 0,
                        nameGap: '-55',
                        nameTextStyle: {
                            color: '#eee',
                            fontSize: this.fontSize
                        },
                        axisLabel: {
                            inside: true,
                            showMinLabel: false,
                            textStyle: {
                                color: '#eee',
                                fontSize: this.fontSize
                            }
                        },
                        // axisLine:{
                        //     show:false
                        // }
                    }
                ],
                series: [
                    {
                        type: 'line',
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        data: data.valuesline,
                        lineStyle: {
                            normal: {
                                color: '#fff',
                            }
                        },
                        areaStyle: {
                            normal: {
                                color: {
                                    type: 'linear',
                                    x: 0,
                                    y: 0,
                                    x2: 0,
                                    y2: 1,
                                    colorStops: [{
                                        offset: 0, color: 'rgba(0, 136, 212, 0.3)' // 0% 处的颜色
                                    }, {
                                        offset: 0.8, color: 'rgba(0, 136, 212, 0)' // 100% 处的颜色
                                    }],
                                    globalCoord: false // 缺省为 false
                                }
                            }
                        },
                        smooth: true,
                        showSymbol: false,
                        markPoint: {
                            animation: false
                        },
                        markLine: {
                            silent: false,
                            symbol: ['2', '30'],
                            symbolSize: ['none', 'none'],
                            lineStyle: {
                                normal: {
                                    color: '#F8CC00'
                                }
                            },
                            data: [
                                // {
                                //     name: '0.1',
                                //     // 支持 'average', 'min', 'max'
                                //     type: 'max',
                                //     valueIndex: 1,
                                //     yAxis: this.top,
                                //     label: {
                                //         normal: {
                                //             position: 'start',
                                //             // formatter:'{b}'
                                //         }
                                //     },
                                //     lineStyle: {
                                //         normal: {
                                //             type: 'solid',
                                //             color: '#27282d'
                                //         }
                                //     }
                                // },
                                {
                                    name: this.openPrice,
                                    // 支持 'average', 'min', 'max'
                                    type: 'average',
                                    valueIndex: 1,
                                    yAxis: this.openPrice,
                                    label: {
                                        normal: {
                                            position: 'middle',
                                            formatter: '{b}'
                                        }
                                    }
                                },
                                // {
                                //     name: this.bottom,
                                //     // 支持 'average', 'min', 'max'
                                //     type: 'min',
                                //     valueIndex: 1,
                                //     yAxis: this.bottom,
                                //     label: {
                                //         normal: {
                                //             position: 'start',
                                //             formatter: '{b}'
                                //         }
                                //     },
                                //     lineStyle: {
                                //         normal: {
                                //             type: 'solid',
                                //             color: '#27282d'
                                //         }
                                //     }
                                // }
                            ]
                        }
                    },
                    {
                        type: 'bar',
                        xAxisIndex: 1,
                        yAxisIndex: 2,
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    var colorList;
                                    if (data.valuesline[params.dataIndex] > data.valueap[params.dataIndex]) {
                                        colorList = '#FD1050';
                                    } else {
                                        colorList = '#0CF49B';
                                    }
                                    return colorList;
                                },
                            }
                        },
                        data: data.lolumnsbar,
                    }
                ]
            }
            this.myChart.setOption(option);
        }
    },
    mounted() {
        //群组
        // TIMED=`TIMED_${this.code}`
        let sendData = {
            code: '10023'
        }
        this.initDate()
        market.getTimes(sendData).then(data => {
            if (data.data.code == 200) {
                this.rawData = data.data.data
                this.loadTimeChart()
            } else {
                toast(data.data.message)
            }
        }).catch(error => {
            console.log(error)
        });
        // initWs('ws://127.0.0.1:9999/', (e) => {
        //     this.rawData.push(JSON.parse(e.text))
        // });
    }
}
</script>
<style lang="less" scoped>
@import '../../less/config.less';
.timeWrap {
    width: 100%;
    height: 100%;
    #timemain {
        width: 100%;
        height: 100%;
    }
}
</style>
