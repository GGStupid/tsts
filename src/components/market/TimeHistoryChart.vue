<template>
    <div class="timeWrap">
        <div id="timehistorymain"></div>
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
            // topPrice: this.$store.state.topPrice,//最高价
            // bottomPrice: this.$store.state.bottomPrice,//最低价
            // openPrice: this.$store.state.openPrice,//开盘价
            rawData: [],
            ChatRespBody: '',
            arrCurTime: [],
            line_data: [],
            bar_data: [],
            ws: ''
        }
    },
    computed: {
        topPrice(){
            return this.$store.state.topPrice//最高价
        },
        bottomPrice(){
            return this.$store.state.bottomPrice//最低价
        },
        openPrice(){
            return this.$store.state.openPrice//开盘价
        },
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
            if (!rawData) return
            for (var i = 0; i < rawData.length; i++) {
                this.arrCurTime.push(rawData[i].ts)
                this.line_data.push(rawData[i].p)
                this.bar_data.push(rawData[i].q)
            }
        },
        loadTimeChart() {
            this.myChart = echarts.init(document.getElementById('timehistorymain'));
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
                        axisLine: { onZero: true },
                        axisLabel: {
                            show: false,
                            textStyle: {
                                color: '#eee',
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
                        axisLine: { onZero: true },
                        axisLabel: {
                            show: false,
                            textStyle: {
                                color: '#eee',
                            },
                        },
                        data: this.arrCurTime
                    },
                    {
                        gridIndex: 1,
                        type: 'category',
                        boundaryGap: false,
                        axisTick: {
                            show: false
                        },
                        axisLine: { onZero: true },
                        axisLabel: {
                            textStyle: {
                                color: '#eee',
                                fontSize: this.fontSize,
                                align: 'left'
                            }
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#333'
                            }
                        },
                        data: this.arrCurTime,
                        max: 'dataMax'
                    },
                    {
                        gridIndex: 1,
                        type: 'category',
                        boundaryGap: false,
                        axisTick: {
                            show: false
                        },
                        axisLine: { onZero: true },
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
                            show: false,
                            showMinLabel: false,
                            showMaxLabel: false,
                            inside: true,
                            textStyle: {
                                color: '#f20462',
                                fontSize: this.fontSize,
                                align: 'center'
                            },
                        },
                        // max: this.top,
                        // min: this.bottom
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
                            show: false,
                            showMinLabel: false,
                            showMaxLabel: false,
                            inside: true,
                            textStyle: {
                                color: '#f20462',
                                fontSize: this.fontSize,
                                align: 'center'
                            },
                        },
                        // max: this.top,
                        // min: this.bottom
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
                        smooth: false,
                        showSymbol: false,
                        markPoint: {
                            animation: true,
                            symbol: 'rect',
                            symbolSize: 50
                        },
                        markLine: {
                            silent: false,
                            // symbol: ['2', '30'],
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
                                            formatter: '{c}'
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
                    // {
                    //     type: 'effectScatter',
                    //     coordinateSystem: 'cartesian2d',
                    //     zlevel: 1,
                    //     symbolSize: 3,
                    //     xAxisIndex: 0,
                    //     yAxisIndex: 0,
                    //     showEffectOn: 'render',
                    //     rippleEffect: {
                    //         brushType: 'fill',
                    //         scale: 3.5
                    //     },
                    //     itemStyle: {
                    //         normal: {
                    //             color: '#f4e925',
                    //             shadowBlur: 2,
                    //             shadowColor: '#333'
                    //         }
                    //     }
                    // }
                ]
            }
            this.myChart.setOption(this.option);
        }
    },
    mounted() {
        let that = this
        let sendData = {
            code: this.$store.state.code
        }
        market.history(sendData).then(data => {
            if (data.data.code == 200) {
                if (!data.data.data) return
                this.rawData = data.data.data
                this.loadTimeChart()
            } else {
                toast(data.data.message)
            }
        }).catch(error => {
            console.log(error)
        });
    },
    beforeDestroy() {

    }
}
</script>
<style lang="less" scoped>
@import '../../less/config.less';
.timeWrap {
    width: 100%;
    height: 100%;
    #timehistorymain {
        width: 100%;
        height: 100%;
    }
}
</style>
