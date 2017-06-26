<template>
    <div class="wrapnickname">
        <div class="nickname">
            <input type="text" v-model="nickname" @keyup='showClean' placeholder="请输入10位以内的中文昵称">
            <img src="../../../assets/icon_clean.png" @click="cleanNickName" v-show="isShow" alt="">
        </div>
        <div class="buttonWrap">
            <v-Button title='保存' :isActive='isActive' topNum='0.6667rem' @toNext='toSave'></v-Button>
        </div>
    </div>
</template>

<script>
import Button from '@/components/buttons/Button690'
import mine from '@/api/mine/index'
import { toast } from '@/util/index'
export default {
    data() {
        return {
            nickname: '',
            isShow: false,
            isActive: true
        }
    },
    methods: {
        showClean() {
            if (this.nickname !== '') {
                this.isShow = true
            } else {
                this.isShow = true
            }
        },
        cleanNickName() {
            this.nickname = ''
            this.isShow = false
        },
        toSave() {
            console.log('toSave')
            let senddata = {
                nickName: this.nickname
            }
            mine.nickName(senddata).then((data) => {
                if (data.data.code == 200) {
                     toast('昵称修改成功')
                      this.$router.go(-1)
                } else {
                    toast(data.data.message)
                }
            })
        }
    },
    mounted() {
        mine.getUserInforPost().then((data) => {
            this.$store.dispatch('userInfor', data.data.data)
            this.nickname = this.$store.state.userInfor.nickName
        })
    },
    beforeRouteEnter(to, from, next) {
        document.querySelector('title').innerText = '昵称'
        next()
    },
    components: {
        'v-Button': Button
    }
}
</script>

<style lang="less" scoped>
@import '../../../less/config.less';
.nickname {
    height: 1.30667rem;
    line-height: 1.30667rem;
    background-color: @bgcolor;
    font-size: @fontsize32;
    padding: 0 @p30;
    margin: 0.26667rem 0;
    position: relative;
    input {
        width: 90%;
        height: 1.30667rem;
        line-height: 1.30667rem;
        color: @color;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
    img {
        position: absolute;
        right: @p30;
        top: 0.45rem;
    }
}

.buttonWrap {
    padding: 0 @p30;
}
</style>
