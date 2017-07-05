<template>
    <div class="releaseCommentsWrap">
        <textarea name="" maxlength="200" v-model="comment" id="" rows="8" placeholder="请在此最多输入200字"></textarea>
        <div class="imgLists">
            <div class="imgContent" v-show="imgLists.length>0" v-for="(imgTeam,index) in imageList" :key="index" :data-index="index">
                <img :src="imgTeam.url" alt="" @click="open($event)">
                <img class="del" src="../../assets/quotes_forum_comment_pic_delete.png" @click="delImg(imgTeam)" alt="">
            </div>
            <div class="upImgWrap" v-show="imgLists.length<3">
                <img src="../../assets/quotes_forum_comment_upload.png" alt="">
                <input id="upImg" type="file" accept="*.jpg,*.gif,*.png" @change="onFileChange">
            </div>
        </div>
        <v-Button title='发送' :isActive='isActive' topNum='0.6667rem' @toNext='toSave'></v-Button>
    </div>
</template>
<script>
import Button from '@/components/buttons/Button690'
import market from '@/api/market/index'
import { toast } from '@/util/index'
import fancyBox from 'vue-fancybox';
export default {
    data() {
        return {
            comment: '',
            imgLists: [],
            imageList:[],
            picPathes:[],
            isActive: true
        }
    },
    methods: {
        onFileChange(e) {
            var files = e.target.files || e.dataTransfer.files;
            if (!files.length) return;
            this.createImage(files);
        },
        createImage(file) {
            var vm = this;
            if (file[0]) {
                if (file.size > 1024 * 1024 * 5) {
                    toast("图片大小最大不能超过5M")
                }
                else {
                    lrz(file[0], { width: 512, quality: 0.9 }, function (rst) {
                        let sendData = {
                            picBase64Str: rst.base64
                        }
                        market.upload(sendData).then(data => {
                            if (data.data.code == 200) {
                                vm.imgLists.push({ src: rst.base64, upImg: data.data.data });
                                vm.imageList.push(
                                    {
                                        width:100,
                                        height:100,
                                        url:rst.base64
                                    }
                                )
                            } else {
                                toast(data.data.message)
                            }
                        })
                    });
                }
            }
        },
        delImg(imgTeam) {
            console.log('delImg')
            this.imgLists.shift(imgTeam)
        },
        open(e){
            console.log('open')
            console.log(e)
            var that=this
            fancyBox(e.target,that.imageList)
            console.log(fancyBox)
        },
        toSave() {
            console.log('toComments')
            this.imgLists.map((item,index)=>{
                if(item.upImg==this.picPathes[index])return
                this.picPathes.push(item.upImg)
            })
            if(!this.comment && this.picPathes.length==0) {
                toast('请检查评论内容') 
                return;
            }
            if(this.comment.length>200){
                toast('内容最多输入200字')
                return 
            }
            let sendData={
                content:this.comment,
                picPathes: this.picPathes,
                productId:this.$store.state.productId
            }
            console.log(sendData)
        }
    },
    components: {
        'v-Button': Button
    }
}
</script>

<style lang="less" scoped>
@import '../../less/config.less';
.releaseCommentsWrap {
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
