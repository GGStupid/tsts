<template>
    <div class="listWrap">
        <v-TextArrow v-for="(list,index) in helpList" :title="list.className" :key="index" @toNext="toNext(list)"></v-TextArrow>
    </div>
</template>

<script>
import TextArrow from '@/components/mine/TextArrow'
import mine from '@/api/mine/index'
export default {
    data() {
        return {
            helpList: [],
        }
    },
    methods: {
        toNext(list) {
            console.log('toNext')
             this.$router.push('/aboutExercise/' + list.id)
            document.querySelector('title').innerText =list.className;
        },
    },
    components: {
        'v-TextArrow': TextArrow
    },
    mounted() {
        mine.classes().then(data => {
            console.log(data.data)
            this.helpList = data.data.data
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


