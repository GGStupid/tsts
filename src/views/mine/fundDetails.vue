<template>
    <div class="fundDetailsWrap">
        <div class="topWrap">
            <div class="tabWrap" v-for="(item,index) in tabTitles" @click='toActive(index,item)' :key="index">
                <span v-if="item.path" :class="{'active':indexFlag==index}">{{item.title}}</span>
                <span v-else :class="{'active':flag==index}">{{item.title}}</span>
            </div>
        </div>
        <div class="listsWrap">
            <div class="fundDetails" v-for="(fundDetails,index) in fundDetailsLists" :key="index" @click="toBig(index)">
                <div class="top">
                    <span :class="{'topLeft':toflag!=index}">{{fundDetails.remark}}</span>
                    <span class="defalut" :class="{'Withdrawals':fundDetails.direction==2}">{{fundDetails.direction==2?'+':'-'}}{{fundDetails.amount}}</span>
                </div>
                <div class="middle">
                    <span>{{fundDetails.createTime}}</span>
                    <span>{{fundDetails.typeFormatter}}</span>
                </div>
                <div class="end" v-show="fundDetails.isWithdrawals">
                    <div>申请时间：{{fundDetails.time}}</div>
                    <span>{{fundDetails.isFinish=='提现成功'?'交易手续费':'失败原因'}}：</span>
                    <span>{{fundDetails.remarks}}</span>
                </div>
            </div>
            <Nomore  :isNomoreShow='isNomoreShow'></Nomore>
        </div>
    </div>
</template>

<script>
import mine from '@/api/mine/index'
import Nomore from '@/components/Nomore'
import { toast } from '@/util/index'
export default {
    data() {
        return {
            page: 1,
            rows: 12,
            flag: 0,
            tabTitles: [
                { title: '全部', type: '' },
                { title: '时间买卖', type: 'time' },
                { title: '充值提现', type: 'pay' }
            ],
            type: '',
            toflag: 0,
            fundDetailsLists: [
            ],
            isNomoreShow: false,
            loading: false
        }
    },
    methods: {
        loadAccountLog() {
            var that = this
            this.loading = true
            let sendData = {
                page: this.page,
                rows: this.rows,
                type: this.type
            }
            mine.accountLog(sendData).then(data => {
                if (data.data.code == 200) {
                    this.loading = false
                    if (!data.data.data.rows) return
                    data.data.data.rows.forEach(function (element) {
                        that.fundDetailsLists.push(element)
                    }, this);
                    if (data.data.data.rows.length == 0) {
                        this.isNomoreShow = true
                        document.querySelector('#app').removeEventListener('scroll', that.handleScroll)
                    }
                    this.page++
                } else {
                    toast(data.data.message)
                }
            })
        },
        handleScroll() {
            let scrollTop = document.querySelector('#app').scrollTop;
            let pageHeight = window.innerHeight;
            let allHeight = document.querySelector('.fundDetailsWrap').offsetHeight;
            let a = allHeight - scrollTop - pageHeight
            if (a >= 0 && a <= 50) {
                if (this.loading) return
                this.loadAccountLog();
            }
        },
        toBig(i) {
            if (this.toflag == i) {
                this.toflag = 0
                return
            }
            this.toflag = i
        },
        toActive(index, item) {
            console.log('toActive')
            this.flag = index
            this.type = item.type
        }
    },
    filters: {
        formateTime(v) {
            if (!v) return
            return new Date(v).toLocaleString()
        }
    },
    watch: {
        type() {
            let that = this
            this.page = 1
            this.fundDetailsLists = []
            this.isNomoreShow = false
            if (that.page === 1) {
                that.loadAccountLog();
                document.querySelector('#app').addEventListener('scroll', that.handleScroll);
            }
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
    },
    components: {
        Nomore
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
                .topLeft {
                    flex: 1 1 2rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
                .defalut {
                    flex: 0 0 2rem;
                    text-align: right;
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
