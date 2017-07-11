<template>
    <div class="commentReportWrap">
        <textarea name="" maxlength="200" v-model="comment" id="" rows="8" placeholder="请在此最多输入200字"></textarea>
        <v-Button title='发送' :isActive='isActive' topNum='0.6667rem' @toNext='toSave'></v-Button>
    </div>
</template>
<script>
import Button from '@/components/buttons/Button690'
import market from '@/api/market/index'
import { toast } from '@/util/index'
export default {
    data() {
        return {
            baseImgUrl: this.$store.state.baseImgUrl,
            comment: '',
            isActive: true
        }
    },
    methods: {
        toSave() {
            console.log('toComments')
            if (!this.comment ) {
                toast('请输入评论内容')
                return
            }
            let send=this.$store.state.commentSendData
            send.content=this.comment
            market.comment(send).then(data => {
                if (data.data.code == 200) {
                    this.$router.go(-1)
                    toast('评论成功')
                } else {
                    toast(data.data.message)
                }
            })
        }
    },
    components: {
        'v-Button': Button
    }
}
</script>

<style lang="less" scoped>
@import '../../less/config.less';
.commentReportWrap {
    width: 100%;
    height: 100%;
    padding: @p30;
    background-color: #fff;
    textarea {
        width: 100%;
        font-size: 0.42667rem;
        border: none;
        resize: none;
    }
    .imgLists {
        font-size: 0;
        img {
            width: 1.8667rem;
            height: 1.8667rem;
        }
        .imgContent {
            display: inline-block;
            position: relative;
            width: 1.8667rem;
            height: 1.8667rem;
            margin-right: 0.1333rem;
            margin-bottom: 0.1333rem;
            .del {
                position: absolute;
                top: 0;
                right: 0;
                width: 0.34667rem;
                height: 0.34667rem;
            }
        }
        .upImgWrap {
            display: inline-block;
            position: relative;
            width: 1.8667rem;
            height: 1.8667rem;
            #upImg {
                position: absolute;
                top: 0;
                left: 0;
                width: 1.8667rem;
                height: 1.8667rem;
                opacity: 0;
            }
        }
    }
}
</style>
