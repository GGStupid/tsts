<template>
<div class="swiper-container" :class="swipeid">
	<div class="swiper-wrapper">
		<slot name="swiper-con"></slot>
	</div>
	<!-- 分页器 -->
	<div :class="{'swiper-pagination':pagination}"></div>
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
		loop: {
			type: Boolean,
			default: true
		},
		direction: {
			type: String,
			default: 'horizontal'
		},
		pagination: {
			type: Boolean,
			default: true
		},
		autoplay: {
			type: Number,
			default: 5000,
		},
		observer: {
			type: Boolean,
			default: true
		},
		observeParents: {
			type: Boolean,
			default: true
		},
		paginationType: {
			type: String,
			default: 'bullets'
		}
	},
	data(){
		return {
			dom:""
		}
	},
	mounted() {
		var That = this;
		setTimeout(()=>{
			this.dom = new Swiper('.' + That.swipeid, {
			effect: That.effect,
			//循环
			loop: true,
			//分页器
			pagination: '.swiper-pagination',
			//分页类型
			paginationType: That.paginationType, //fraction,progress,bullets
			//自动播放
			// autoplay: That.autoplay,
			autoplay: That.autoplay,
			//方向
			direction: That.direction,
			//特效 //slide,fade,coverflow,cube
			autoplayDisableOnInteraction: false,
			observer: That.observer, //修改swiper自己或子元素时，自动初始化swiper
			observeParents: That.observeParents //修改swiper的父元素时，自动初始化swiper
		})
		},200)
	}
}
</script>
<style>
@import './swiper.min.css';
.swiper-container{
	line-height: 0;
}
.swiper-pagination-bullet{
	background: #999999;
}
.swiper-pagination-bullet-active {
	background: #F8CC00;
}

</style>
