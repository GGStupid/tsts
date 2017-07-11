<template>
    <div class="DateTimePickerWrap">
        <group :title='title'>
            <datetime v-model="value" placeholder="请选择日期" :min-year=minyear :max-year=maxyear :format="format" @on-change="change" year-row="{value}年" month-row="{value}月" day-row="{value}日" confirm-text="完成" cancel-text="取消"></datetime>
        </group>
    </div>
</template>

<script>
import { Group, Datetime } from 'vux'
export default {
    // data() {
    //     return {
    //         value: ''
    //     }
    // },
    computed:{
        value(){
            return this.parentvalue
        }
    },
    props:{
        title:{
            type:String,
            default:'起始日期'
        },
        parentvalue:'',
        minyear:{
            type:Number,
            default:1999
        },
        maxyear:{
            type:Number,
            default:2100
        },
        format:{
            default:'YYYY-MM-DD'//YYYY-MM-DD HH:mm
        }
    },
    methods: {
        change(value) {
            this.$emit('change',value)
        },
    },
    components: {
        Group,
        Datetime
    }
}
</script>
<style lang="less">
</style>