<template>
    <div class="commonTab">
        <div class="tabWrap" v-for="(item,index) in tabTitles" @click='toActive(index,item)' :key="index">
            <span v-if="item.path" :class="{'active':indexFlag==index}">{{item.title}}</span>
            <span v-else :class="{'active':flag==index}">{{item.title}}</span>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            flag: 0
        }
    },
    props: {
        tabTitles: {
            type: Array
        }
    },
    computed: {
        indexFlag() {
            return this.$store.state.indexFlag
        }
    },
    methods: {
        toActive(index, item) {
            if (item.path) {
                this.$store.dispatch('upindexFlag', index)
            } else {
                this.flag = index
            }
            this.$emit('toNext', item)
        }
    },
    beforeRouteEnter(to, from, next) {
        next(() => {
            let path = localStorage.getItem('indexFlag')
            this.$store.dispatch('upindexFlag', path);
        })
    }
}
</script>

<style lang="less" scoped>
@height: 1.06667rem;
@actColor: #F8CC00;
@color: #ddd;
@fontSize: 0.373333rem;
@bgcolor: #20212a;
.commonTab {
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: @bgcolor;
}
.tabWrap {
    flex: 0 0 auto;
    height: @height;
    background-color: @bgcolor;
    color: @color;
    font-size: @fontSize;
    span {
        display: inline-block;
        height: @height;
        line-height: @height;
    }
    .active {
        border-bottom: 0.0667rem solid @actColor;
        color: @actColor;
    }
}
</style>
