<template>
    <div class="barChartWrap" v-show="isBarChartShow">
        <div class="mask" @click="cancel">
        </div>
        <div class="barChartContent">
            <div class="title">交易规则</div>
            <div class="rulesContent">
                <div class="barWrap">
                    <div id="barmain"></div>
                </div>
                <p>
                    1.申购数量需为100秒或其整数倍，最多可申购108000秒
                </p>
                <p>
                    2.您可在6月8日20：00前进行申购，支付成功后冻结相应资金
                </p>
                <p>
                    3.申购结束后进行摇号抽签，中签处理（6月9日9：25-9:29）,最小中签数量为100秒或其整数倍
                </p>
                <p>
                    4.申购成功用户获得相应时间，未成功用户申购时间退回
                </p>
            </div>
        </div>
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
        barWidth() {
            var dpr = $('html').attr('data-dpr');
            if (dpr == 1) {
                return 21;
            } else if (dpr == 2) {
                return 42;
            } else {
                return 63;
            }
        },
        margin() {
            var dpr = $('html').attr('data-dpr');
            if (dpr == 1) {
                return 35;
            } else if (dpr == 2) {
                return 70;
            } else {
                return 105;
            }
        }
    },
    props: {
        isBarChartShow: {
            type: Boolean,
            default: true
        }
    },
    methods: {
        loadBarChart() {
            var myChart = echarts.init(document.getElementById('barmain'));
            // 指定图表的配置项和数据
            var option = {
                grid: {
                    top: '5%',
                    left: '17%',
                    right: '5%'
                },
                xAxis: {
                    axisTick: {
                        show: false
                    },
                    data: [
                        {
                            value: '阅读量',
                            textStyle: {
                                color: '#999',
                                fontSize: this.fontSize
                            }
                        },
                        {
                            value: '注册量',
                            textStyle: {
                                color: '#999',
                                fontSize: this.fontSize
                            }
                        },
                        {
                            value: '贡献量',
                            textStyle: {
                                color: '#999',
                                fontSize: this.fontSize
                            }
                        },
                    ]
                },
                yAxis: {
                    splitLine: { show: false },
                    axisTick: {
                        show: false
                    },
                    axisLabel: {
                        margin: this.margin,
                        textStyle: {
                            color: '#999',
                            fontSize: this.fontSize,
                            align: 'left'
                        }
                    }
                },
                series: [{
                    name: '销量',
                    type: 'bar',
                    barWidth: this.barWidth,
                    data: [{
                        value: 580,
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: '#999',
                                    fontSize: this.fontSize
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#cfa56d'
                            }
                        }
                    }, {
                        value: 810,
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: '#999',
                                    fontSize: this.fontSize
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#6d9bcf'
                            }
                        }
                    }, {
                        value: 300,
                        label: {
                            normal: {
                                show: true,
                                position: 'top',
                                textStyle: {
                                    color: '#999',
                                    fontSize: this.fontSize
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: '#6dcfa9'
                            }
                        }
                    }]
                }]
            };
            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
        },
        cancel(){
            this.$emit('cancel',false)
        }

    },
    watch: {
        isBarChartShow() {
            if (this.isBarChartShow) {
                this.loadBarChart()
            } else {
                return
            }
        }
    }
}
</script>
<style lang="less" scoped>
@import '../../less/config.less';
.mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 99;
    height: 100%;
    width: 100%;
    background-color: #000;
    opacity: 0.5;
}

.barChartContent {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 109;
    width: 8rem;
    height: 10.666667rem;
    background-color: #191a22;
    .title {
        padding: .4rem;
        color: #eee;
        font-size: .373333rem;
        text-align: center;
        height: 1.226667rem;
    }
    .rulesContent {
        color: #999;
        font-size: .32rem;
        text-align: left;
        #barmain {
            width: 8rem;
            height: 3.44rem;
        }
        p {
            padding: 0 .4rem;
            line-height: 1.8;
        }
    }
}
</style>
