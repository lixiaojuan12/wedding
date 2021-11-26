<template>
    <div class="box">
        <swiper class="swiper"
            :autoplay="true"
            :circular="true"
            current=0
            :indicator-dots="false"
            easing-function="linear"
            @change="swiperChange"
        >
            <block v-for="(item, index) in list" :key="index">
                <swiper-item class="item">
                    <image mode="aspectFit" lazy-load="false" :src="item" show-menu-by-longpress
                    class="slide-image"/>
                </swiper-item>
            </block>
        </swiper>
        <view class="imageCount">{{current+1}}/{{list.length}}</view>
        <div class="info img" :animation="animationData">
            <div class="content">
                <h1>Mr.高 & Miss.李</h1>
                <p>谨定于 2021年12月21日 （星期日）中午12:00</p>
                <p>农历 冬月十六 中午十二点整 举办婚礼</p>
                <p>席设：石家庄市三江味道二楼</p>
                <p>地址：石家庄市裕华区开发区闽江道</p>
                <image src="../../static/images/we.png" class="img_footer"/>
            </div>
        </div>
        <!-- <image v-if="isGif" class="img" src="../../static/images/save_the_date_pu.gif"/> -->
    </div>
</template>

<script>
export default {
  name: 'GoodSwiper',
  props: ['list', 'isGif'],
  data () {
    return {
      current: 0
    }
  },
  methods: {
    /**
     * 当前图片索引
     */
    swiperChange (e) {
      this.current = e.mp.detail.current
    }
  },
  watch: {
    isGif (newValue, oldValue) {
      const that = this
      if (newValue) {
        that.isGif = newValue
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.box
    position relative
    height 100%
    .swiper
        height 100%
        width 100%
        .item
            width 100%
            height 100%
            image
                width 100%
                height 100%
                display block
    .img
        position absolute
        bottom 50rpx
        left 50rpx
        z-index 99
    .info
        width 630rpx
        background rgba(255, 255, 255, 0.75)
        z-index 9
        position fixed
        bottom 60rpx
        left 50rpx
        padding 10rpx
        animation infoAnimation 12s linear infinite
        .content
          width 626rpx
          border 1rpx solid #000
          display flex
          flex-direction column
          justify-content flex-start
          align-items center
          position relative
          padding-bottom 30rpx
          h1
            font-size 50rpx
            height 100rpx
            line-height 100rpx
          p
            font-size 24rpx
            height 60rpx
            line-height 60rpx
          .img_footer
            position absolute
            bottom 0
            left 53rpx
            z-index 99
            height 14rpx
            width 520rpx
    .imageCount
        position absolute
        width 120rpx
        height 50rpx
        background-color rgba(0, 0, 0, 0.3)
        border-radius 40rpx
        line-height 50rpx
        color #fff
        text-align center
        font-size 26rpx
        right 13px
        bottom 0rpx
        z-index 2
</style>
