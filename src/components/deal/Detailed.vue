<template>
    <div class="detailedWrap">
        <div class="day">
            <TextArrow title="当日成交" @toNext="dayTransaction"></TextArrow>
            <TextArrow title="当日委托" @toNext="dayCommission"></TextArrow>
        </div>
        <TextArrow title="历史成交" @toNext="historicalTransaction"></TextArrow>
        <TextArrow title="历史委托" @toNext="historicalCommission"></TextArrow>
    </div>
</template>

<script>
import TextArrow from '../mine/TextArrow'
export default {
    methods:{
        dayTransaction(){
            console.log('dayTransaction')
            this.$router.push('/dayTransaction')
        },
        dayCommission(){
            console.log('dayCommission')
             this.$router.push('/dayCommission')
        },
        historicalTransaction(){
            console.log('historicalTransaction')
             this.$router.push('/historicalTransaction')
        },
        historicalCommission(){
            console.log('historicalCommission')
             this.$router.push('/historicalCommission')
        }
    },
    components: {
        TextArrow,
    }
}
</script>

<style lang="less" scoped>
@import '../../less/config.less';
.detailedWrap {
    padding-top: 0.2667rem;
    .day{
        margin-bottom: 0.2667rem;
    }
}
</style>

