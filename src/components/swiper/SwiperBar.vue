<template>
    <div class="swiper-container" :class="swipeid">
        <div class="swiper-wrapper">
            <slot name="swiper-con"></slot>
        </div>
    </div>
</template>
<script>
import './swiper.js'
export default {
    props: {
        swipeid: {
            type: String,
            default: ''
        },
        effect: {
            type: String,
            default: 'slide'
        },
        direction: {
            type: String,
            default: 'horizontal'
        },
        scrollbarHide: {
            type: Boolean,
            default: true
        }
    },
    data() {
        return {
            dom: "",
            stretch: '-60'
        }
    },
    mounted() {
        var That = this;
        let dpr = document.querySelector('html').getAttribute('data-dpr')
        if (dpr == 1) {
            That.stretch = "-30"
        }
        if (dpr == 3) {
            That.stretch = "-90"
        }
        setTimeout(() => {
            this.dom = new Swiper('.' + That.swipeid, {
                effect: 'coverflow',
                //循环
                loop: true,
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: 'auto',
                coverflow: {
                    rotate: 0,
                    stretch: That.stretch,
                    depth: 100,
                    modifier: 1,
                    slideShadows: false
                },
                // //方向
                direction: That.direction,
                observer: true, //修改swiper自己或子元素时，自动初始化swiper
                observeParents: true //修改swiper的父元素时，自动初始化swiper
            })
        }, 300)
    }
}
</script>
<style>
@import './swiper.min.css';
.swiper-container {
    line-height: 0;
    background-color: #191A22;
}

.swiper-pagination-bullet {
    background: #999999;
}

.swiper-pagination-bullet-active {
    background: #F8CC00;
}
</style>
