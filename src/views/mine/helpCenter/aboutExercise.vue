<template>
    <div class="aboutExercise">
        <div class="wrap" v-for="(list,index) in aboutList" :key="index">
            <div class="title">
                {{list.title}}
            </div>
            <div class="details" v-html="list.content">
                
            </div>
        </div>
    </div>
</template>
<script>
import mine from '@/api/mine/index'
export default {
    data() {
        return {
            aboutList:[]
        }
    },
    mounted() {
        console.log('newDetail')
        let id = this.$route.params.classId
        let sendData = {
            classId: id
        }
        mine.contents(sendData).then(data => {
            this.aboutList=data.data.data
        })
    },
}
</script>
<style lang="less" scoped>
@import '../../../less/config.less';
.aboutExercise {
    margin: @p30 0;
    padding: 0 @p30;
    color: @placeColor;
    font-size: 0.34666rem;
    line-height: 1.8;
    .wrap {
        padding: 0.3rem 0;
        .title {
            color: @color;
            margin-bottom: 0.3rem;
        }
    }
}
</style>
