<template>
    <div class="timeWrap">
        <div id="timemain"></div>
    </div>
</template>
<script>
var echarts = require('echarts');
export default {
    data() {
        return {
        }
    },
    computed: {

    },
    props: {

    },
    methods: {
        loadTimeChart() {
            var myChart = echarts.init(document.getElementById('timemain'));
            var option = {
                grid: [
                    {
                        top: '0',
                        left: '0',
                        right: '0'
                    }
                ],
                xAxis: {

                },
                yAxis: [
                    {
                        type: 'value',
                        show: true,
                        name: '0.13',
                        nameTextStyle: {
                            color: '#f20462'
                        },
                        position: 'left'
                    },
                    {
                        type: 'value',
                        show: true,
                        name: '30.00%',
                        position: 'right'
                    }
                ],
                series: [
                    {
                        type: 'line',
                        markLine: {
                            silent: false,
                            symbolSize: ['0', '0.00%'],
                            lineStyle:{
                                normal:{
                                    color:'#F8CC00',
                                    type:'dashed'
                                }
                            },
                            data: [
                              
                            ]
                        }
                    }
                ]
            }
            myChart.setOption(option);
        }
    },
    mounted() {
        this.loadTimeChart()
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
