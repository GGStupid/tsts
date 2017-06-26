<template>
    <div class="fundDetailsWrap">
        <div class="topWrap">
            <div class="tabWrap" v-for="(item,index) in tabTitles" @click='toActive(index,item)' :key="index">
                <span v-if="item.path" :class="{'active':indexFlag==index}">{{item.title}}</span>
                <span v-else :class="{'active':flag==index}">{{item.title}}</span>
            </div>
        </div>
        <div class="listsWrap">
            <div class="fundDetails" v-for="(fundDetails,index) in fundDetailsLists" :key="index">
                <div class="top">
                    <span>{{fundDetails.type}}</span>
                    <span class="defalut" :class="{'Withdrawals':fundDetails.isAdd}">{{fundDetails.number}}</span>
                </div>
                <div class="middle">
                    <span>{{fundDetails.time}}</span>
                    <span>{{fundDetails.isFinish}}</span>
                </div>
                <div class="end" v-show="fundDetails.isWithdrawals">
                    <div>申请时间：{{fundDetails.time}}</div>
                    <span>{{fundDetails.isFinish=='提现成功'?'交易手续费':'失败原因'}}：</span>
                    <span>{{fundDetails.remarks}}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import mine from '@/api/mine/index'
export default {
    data() {
        return {
            page: 1,
            rows: 22,
            flag: 0,
            tabTitles: [
                { title: '全部' },
                { title: '时间买卖' },
                { title: '充值提现' }
            ],
            fundDetailsLists: [
                // {
                //     type: '提现',
                //     number: '-1000.00',
                //     time: '2017-03-01 15:20:30',
                //     isFinish: '提现失败',
                //     isAdd: false,
                //     isWithdrawals: true,
                //     remarks: 'asdfasdfasdfasdf'
                // },
                // {
                //     type: '银行卡充值',
                //     number: '+1000.00',
                //     time: '2017-03-01 15:20:30',
                //     isFinish: '充值成功',
                //     isAdd: true,
                //     isWithdrawals: false,
                //     remarks: 'asdfasdfasdfasdf'
                // },
                // {
                //     type: '购买 - 某某 (80001)',
                //     number: '+100.00',
                //     time: '2017-03-01 15:20:30',
                //     isFinish: '撤销成功',
                //     isAdd: true,
                //     isWithdrawals: false,
                //     remarks: 'asdfasdfasdfasdf'
                // },
                // {
                //     type: '购买 - 某某 (80001)',
                //     number: '-100.00',
                //     time: '2017-03-01 15:20:30',
                //     isFinish: '委托成功',
                //     isAdd: false,
                //     isWithdrawals: false,
                //     remarks: 'asdfasdfasdfasdf'
                // },
            ]
        }
    },
    methods: {
        loadAccountLog() {
            var that = this
            let sendData = {
                page: this.page,
                rows: this.rows
            }
            mine.accountLog(sendData).then(data => {
                data.data.data.rows.forEach(function (element) {
                    that.fundDetailsLists.push(element)
                }, this);
                if (data.data.data.rows.length == 0) {
                    document.querySelector('#app').removeEventListener('scroll', that.handleScroll)
                }
                this.page++
            })
        },
        handleScroll() {
            let scrollTop = document.querySelector('#app').scrollTop;
            let pageHeight = window.innerHeight;
            let allHeight = document.querySelector('.fundDetailsWrap').offsetHeight;
            if (scrollTop + pageHeight == allHeight) {
                this.loadAccountLog();
            }
        },
        toActive(index, item) {
            console.log('toActive')
            this.flag = index
        }
    },
    mounted() {
        let that = this;
        if (that.page === 1) {
            that.loadAccountLog();
            document.querySelector('#app').addEventListener('scroll', that.handleScroll);
        }
    },
    beforeRouteEnter(to, from, next) {
        document.querySelector('title').innerText = '资金明细'
        next()
    }
}
</script>

<style lang="less" scoped>
@import '../../less/config.less';
.fundDetailsWrap {
    .topWrap {
        display: flex;
        justify-content: space-around;
        align-items: center;
        background-color: @bgcolor;
        .tabWrap {
            height: 1.04rem;
            flex: 0 0 auto;
            background-color: @bgcolor;
            color: @color;
            font-size: 0.373333rem;
            span {
                display: inline-block;
                height: 1.04rem;
                line-height: 1.04rem;
            }
            .active {
                border-bottom: 0.0667rem solid @yellow;
                color: @yellow;
            }
        }
    }
    .listsWrap {
        margin-top: 0.26667rem;
        background-color: @bgcolor;
        .fundDetails {
            padding: @p30;
            line-height: 1.8;
            border-bottom: 1px solid @bordercolor;
            .top {
                display: flex;
                justify-content: space-between;
                color: #eee;
                font-size: 0.42667rem;
                .defalut {
                    color: #4affa5
                }
                .Withdrawals {
                    color: #F20624
                }
            }
            .middle {
                display: flex;
                justify-content: space-between;
                color: #999;
                font-size: 0.32rem;
            }
            .end {
                color: #999;
                font-size: 0.32rem;
            }
        }
    }
}
</style>
