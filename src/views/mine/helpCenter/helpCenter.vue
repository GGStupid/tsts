<template>
    <div class="listWrap">
        <v-TextArrow  title="关于淘刻" @toNext="aboutAmoy"></v-TextArrow>
        <v-TextArrow  title="关于行权" @toNext="aboutExercise"></v-TextArrow>
        <v-TextArrow  title="关于申购和交易" @toNext="aboutDeal"></v-TextArrow>
    </div>
</template>

<script>
import TextArrow from '@/components/mine/TextArrow'
import mine from '@/api/mine/index'
export default {
    data() {
        return {
           
        }
    },
    methods: {
        aboutAmoy() {
            console.log('aboutAmoy')
        },
        aboutExercise() {
            console.log('aboutExercise')
            this.$router.push('/aboutExercise')
        },
        aboutDeal() {
            console.log('aboutDeal')
        }
    },
    components: {
        'v-TextArrow': TextArrow
    },
    mounted(){
        mine.classes().then(data=>{
            console.log(data.data)
        })
    },
    beforeRouteEnter(to, from, next) {
        document.querySelector('title').innerText = '帮助中心';
        next()
    },
}
</script>

<style lang="less" scoped>
.listWrap {
    margin: 0.26667rem 0;
}
</style>


