<template>
  <div class="briefIntroductionWrap">
    <div class="video">
      <img src="../../assets/quotes_intro_pic.png" alt="">
    </div>
    <div class="timeWorth">
      <div class="title">
        <img src="../../assets/quotes_intro_line.png" alt=""> 时刻身价
      </div>
      <div class="content">
        <div class="worth">
          <span>身价</span>
          &nbsp;
          <span class="price">17069.64万元</span>
        </div>
        <div class="rules">
          身价计算方式：
          <br> (男80，女85 - 现在的年龄)x365x24x3600x昨收+今年剩下的天数x24x3600x昨收
          <br> 注明：以社会的平均寿命，参考发行人每一秒的价格及当前年龄计算得出，仅供参考
        </div>
      </div>
    </div>
    <div class="profile">
      <div class="title">
        <img src="../../assets/quotes_intro_line.png" alt=""> 个人简介
      </div>
      <div class="content">
        <div class="profileList">
          <span class="filed">姓名</span>
          <span>胡灵</span>
        </div>
        <div class="profileList">
          <span class="filed">国籍</span>
          <span>中国</span>
        </div>
        <div class="profileList">
          <span class="filed">民族</span>
          <span>汉族</span>
        </div>
        <div class="profileList">
          <span class="filed">出生年月</span>
          <span>1986-06-25</span>
        </div>
        <div class="profileList">
          <span class="filed">职业</span>
          <span>歌手，演员，主持人</span>
        </div>
        <div class="profileList">
          <span class="filed">毕业院校</span>
          <span>保密</span>
        </div>
      </div>
    </div>
    <div class="mainExperience">
      <div class="title">
        <img src="../../assets/quotes_intro_line.png" alt=""> 主要经历
      </div>
      <div class="content">
        2005年。阿朵所发生的分阿斯蒂芬阿斯蒂芬爱的色放阿飞ad散发的
        2005年。阿朵所发生的分阿斯蒂芬阿斯蒂芬爱的色放阿飞ad散发的2005年。阿朵所发生的分阿斯蒂芬阿斯蒂芬爱的色放阿飞ad散发的2005年。阿朵所发生的分阿斯蒂芬阿斯蒂芬爱的色放阿飞ad散发的2005年。阿朵所发生的分阿斯蒂芬阿斯蒂芬爱的色放阿飞ad散发的2005年。阿朵所发生的分阿斯蒂芬阿斯蒂芬爱的色放阿飞ad散发的2005年。阿朵所发生的分阿斯蒂芬阿斯蒂芬爱的色放阿飞ad散发的2005年。阿朵所发生的分阿斯蒂芬阿斯蒂芬爱的色放阿飞ad散发的2005年。阿朵所发生的分阿斯蒂芬阿斯蒂芬爱的色放阿飞ad散发的2005年。阿朵所发生的分阿斯蒂芬阿斯蒂芬爱的色放阿飞ad散发的2005年。阿朵所发生的分阿斯蒂芬阿斯蒂芬爱的色放阿飞ad散发的
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import '../../less/config.less';
.briefIntroductionWrap {
  background-color: #191a22;
  width: 100%;
  height: 15.46667rem;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
  .video {
    height: 5.62667rem;
    img {
      height: 5.62667rem;
    }
  }
  .timeWorth {
    background-color: @bgcolor;
    margin-bottom: 0.26667rem;
    .title {
      width: 9.2rem;
      height: 1.06667rem;
      line-height: 1.06667rem;
      border-bottom: 1px solid @bordercolor;
      color: #eee;
      font-size: 0.4rem;
      margin: 0 auto;
      img {
        height: 0.4rem;
        vertical-align: text-bottom;
      }
    }
    .content {
      width: 9.2rem;
      height: 3.546667rem;
      margin: 0 auto;
      .worth {
        font-size: 0.34667rem;
        color: #eee;
        line-height: 2.2;
        .price {
          color: @yellow;
        }
      }
      .rules {
        color: #999;
        font-size: 0.32rem;
        line-height: 1.5;
      }
    }
  }
  .profile {
    background-color: @bgcolor;
    margin-bottom: 0.26667rem;
    .title {
      width: 9.2rem;
      height: 1.06667rem;
      line-height: 1.06667rem;
      border-bottom: 1px solid @bordercolor;
      color: #eee;
      font-size: 0.4rem;
      margin: 0 auto;
      img {
        height: 0.4rem;
        vertical-align: text-bottom;
      }
    }
    .content{
      .profileList{
        font-size: 0.346667rem;
        color: #eee;
        padding: 0 @p30;
        span{
          height: 0.8rem;
          line-height: 0.8rem;
          display: inline-block;
        }
        .filed{
          color: #999;
           width: 1.8rem;
        }
      }
    }
  }
  .mainExperience{
    background-color: @bgcolor;
    margin-bottom: 0.26667rem;
    .title {
      width: 9.2rem;
      height: 1.06667rem;
      line-height: 1.06667rem;
      border-bottom: 1px solid @bordercolor;
      color: #eee;
      font-size: 0.4rem;
      margin: 0 auto;
      img {
        height: 0.4rem;
        vertical-align: text-bottom;
      }
    }
    .content{
      color: #eee;
      font-size: 0.35rem;
      line-height: 1.5;
      padding: @p30;
    }
  }
}
</style>
