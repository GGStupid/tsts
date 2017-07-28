<template>
    <div class="timeWrap">
        <div id="timemain"></div>
    </div>
</template>
<script>
import market from '@/api/market/index'
import { toast } from '@/util/index'
export default {
    data() {
        return {
            myChart: '',
            option: '',
            topPrice: '15.5',//最高价
            bottomPrice: '0',//最低价
            openPrice: '15.5',//开盘价
            rawData: [],
            ChatRespBody: '',
            arrCurTime: [],
            line_data: [],
            bar_data: [],
            ws: ''
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
        },
        maxPercent() {
            return `${this.maxDif * 100}%`
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
            if(!rawData)return
            for (var i = 0; i < rawData.length; i++) {
                if (this.line_data[i].name == rawData[i].ts) {
                    this.line_data[i].value = rawData[i].p
                    this.bar_data[i].value = rawData[i].q
                }
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
            var dtTimePM = new Date(dtCurDate.getFullYear(), dtCurDate.getMonth(), dtCurDate.getDate(), 13, 30, 0, 0)
            for (var i = 0; i <= 480; i++) {
                this.arrCurTime.push([this.addZero(dtTimePM.getHours()), this.addZero(dtTimePM.getMinutes())].join(":"));
                dtTimePM = new Date(dtTimePM.getTime() + 60 * 1000);
            }
            //***************************************************************//
            for (var i = 0; i < this.arrCurTime.length; i++) {
                this.line_data.push({ name: this.arrCurTime[i], value: "-" });
            }
            for (var i = 0; i < this.arrCurTime.length; i++) {
                this.bar_data.push({ name: this.arrCurTime[i], value: "-" });
            }
        },
        loadTimeChart() {
            this.myChart = echarts.init(document.getElementById('timemain'));
            this.splitData(this.rawData);
            this.option = {
                grid: [
                    {
                        top: '10',
                        bottom: '70',
                        left: '5',
                        right: '15'
                    },
                    {
                        bottom: '30',
                        left: '5',
                        right: '15',
                        height: '30',
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
                        axisTick: {
                            show: false
                        },
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
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#333'
                            }
                        },
                        data: this.arrCurTime
                    },
                    {
                        gridIndex: 0,
                        type: 'category',
                        boundaryGap: false,
                        axisTick: {
                            show: false
                        },
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
                        boundaryGap: true,
                        axisTick: {
                            show: false
                        },
                        axisLine: { onZero: false },
                        axisLabel: {
                            textStyle: {
                                color: '#eee',
                                fontSize: this.fontSize,
                                align: 'left'
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
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#333'
                            }
                        },
                        data: this.arrCurTime
                    },
                    {
                        gridIndex: 1,
                        type: 'category',
                        boundaryGap: true,
                        axisTick: {
                            show: false
                        },
                        axisLine: { onZero: false },
                        axisLabel: {
                            show: false
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: '#333'
                            }
                        },
                        data: this.arrCurTime
                    }
                ],
                yAxis: [
                    {
                        type: 'value',
                        position: 'left',
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: '#333'
                            }
                        },
                        splitNumber: 1,
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            showMinLabel: false,
                            showMaxLabel: true,
                            inside: true,
                            textStyle: {
                                color: '#f20462',
                                fontSize: this.fontSize,
                                align: 'center'
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
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            showMinLabel: false,
                            showMaxLabel: true,
                            inside: true,
                            textStyle: {
                                color: '#f20462',
                                fontSize: this.fontSize,
                                align: 'center'
                            },
                        },
                        max: this.top,
                        min: this.bottom
                    },
                    {
                        gridIndex: 1,
                        type: 'value',
                        splitLine: { show: false },
                        splitNumber: 1,
                        name: '万秒',
                        nameLocation: 'middle',
                        nameRotate: 0,
                        nameGap: '-30',
                        nameTextStyle: {
                            color: '#eee',
                            fontSize: this.fontSize
                        },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            inside: true,
                            showMinLabel: false,
                            textStyle: {
                                color: '#eee',
                                fontSize: this.fontSize
                            }
                        },
                    },
                    {
                        gridIndex: 1,
                        type: 'value',
                        splitLine: { show: false },
                        splitNumber: 1,
                        // name: '万秒',
                        // nameLocation: 'middle',
                        // nameRotate: 0,
                        // nameGap: '-30',
                        // nameTextStyle: {
                        //     color: '#eee',
                        //     fontSize: this.fontSize
                        // },
                        axisTick: {
                            show: false
                        },
                        axisLabel: {
                            inside: true,
                            showMinLabel: false,
                            textStyle: {
                                color: '#eee',
                                fontSize: this.fontSize
                            }
                        },
                    }
                ],
                series: [
                    {
                        type: 'line',
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        data: this.line_data,
                        lineStyle: {
                            normal: {
                                color: '#fff',
                                width: 1
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
                            animation: true,
                            symbol: 'rect',
                            symbolSize: 50
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
                                }
                            ]
                        }
                    },
                    {
                        type: 'bar',
                        xAxisIndex: 2,
                        yAxisIndex: 2,
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    var colorList;
                                    // if (data.valuesline[params.dataIndex] > data.valueap[params.dataIndex]) {
                                    //     colorList = '#FD1050';
                                    // } else {
                                    colorList = '#0CF49B';
                                    //}
                                    return colorList;
                                },
                            }
                        },
                        data: this.bar_data
                    },
                    {
                        type: 'effectScatter',
                        coordinateSystem: 'cartesian2d',
                        zlevel: 1,
                        symbolSize: 3,
                        xAxisIndex: 0,
                        yAxisIndex: 0,
                        showEffectOn: 'render',
                        rippleEffect: {
                            brushType: 'fill',
                            scale: 3.5
                        },
                        itemStyle: {
                            normal: {
                                color: '#f4e925',
                                shadowBlur: 2,
                                shadowColor: '#333'
                            }
                        }
                    }
                ]
            }
            this.myChart.setOption(this.option);
        }
    },
    mounted() {
        //群组
        // TIMED=`TIMED_${this.code}`
        let that = this
        needconn = true
        let sendData = {
            code: '10023'
        }
        // this.initDate()
        // let time;
        // let t11
        // market.getTimes(sendData).then(data => {
        //     if (data.data.code == 200) {
        //         if(!data.data.data)return
        //         this.rawData = data.data.data
        //         this.loadTimeChart()
        //         this.ws = initWs('ws://10.0.0.245:9999/', (e) => {
        //             let t = JSON.parse(e.text)
        //             if (t.ts >= "11:30" && t.ts < '13:30') {
        //                 if (!t11) {
        //                     t11 = t
        //                 }
        //                 this.line_data.map((i, v) => {
        //                     if (i.name == t11.ts) {
        //                         i.value = t11.p
        //                     }
        //                 })
        //                 this.bar_data.map((i, v) => {
        //                     if (i.name == t11.ts) {
        //                         i.value = t11.q
        //                     }
        //                 })
        //                 that.myChart.setOption({
        //                     series: [
        //                         {
        //                             type: 'line',
        //                             data: that.line_data
        //                         },
        //                         {
        //                             type: 'bar',
        //                             data: that.bar_data
        //                         },
        //                         {
        //                             type: 'effectScatter',
        //                             data: [[t11.ts, t11.p]]
        //                         }
        //                     ]
        //                 });
        //                 return
        //             }
        //             if (!time) {
        //                 time = t.ts
        //                 this.line_data.map((i, v) => {
        //                     if (i.name == t.ts) {
        //                         i.value = t.p
        //                         console.log(i)
        //                     }
        //                 })
        //                 this.bar_data.map((i, v) => {
        //                     if (i.name == t.ts) {
        //                         i.value = t.q
        //                     }
        //                 })
        //                 that.myChart.setOption({
        //                     series: [{
        //                         type: 'line',
        //                         data: that.line_data
        //                     },
        //                     {
        //                         type: 'bar',
        //                         data: that.bar_data
        //                     },
        //                     {
        //                         type: 'effectScatter',
        //                         data: [[t.ts, t.p]]
        //                     }
        //                     ]
        //                 });
        //                 return
        //             } else if (time == t.ts) {
        //                 return
        //             } else if (time != t.ts) {
        //                 time = t.ts
        //                 that.line_data.map((i, v) => {
        //                     if (i.name == t.ts) {
        //                         i.value = t.p
        //                         console.log(i)
        //                     }
        //                 })
        //                 that.bar_data.map((i, v) => {
        //                     if (i.name == t.ts) {
        //                         i.value = t.q
        //                     }
        //                 })
        //                 that.myChart.setOption({
        //                     series: [{
        //                         type: 'line',
        //                         data: that.line_data
        //                     },
        //                     {
        //                         type: 'bar',
        //                         data: that.bar_data
        //                     },
        //                     {
        //                         type: 'effectScatter',
        //                         data: [[t.ts, t.p]]
        //                     }
        //                     ]
        //                 });
        //                 return
        //             }
        //         });
        //     } else {
        //         toast(data.data.message)
        //     }
        // }).catch(error => {
        //     console.log(error)
        // });
    },
    beforeDestroy() {
        if (!this.ws) return
        needconn = false
        this.ws.onclose()
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
