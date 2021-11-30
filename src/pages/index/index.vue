<template>
    <div class="index">
<!-- <button @tap="handleUpload">上传</button> -->
<!-- <img :src="ssss" alt=""> -->
        <!-- <div class="bg-swiper">
            <index-swiper :list="list"></index-swiper>
        </div> -->
        <image class="inv" src="../../static/images/inv.png"/>
        <div class="video-content">
        <template v-if="isDisplay">
          <video id="myVideo" :src="videoSrc"  :controls="true" poster="视频封面地址"></video>
        </template>
        </div>
    </div>
</template>

<script>
import IndexSwiper from 'components/indexSwiper'
import tools from 'common/js/h_tools'
export default {
  name: 'Index',
  components: {
    IndexSwiper
  },
  data () {
    return {
      isPlay: true,
      list: [],
      isDisplay: false,
      audioCtx: '',
      audioUrl: '',
      videoSrc: ''
    }
  },
  onShow () {
    const that = this
    that.audioCtx = wx.createAudioContext('myAudio')
    that.isPlay = true
    this.isDisplayVideo()
  },

  methods: {
    handleUpload () {
      let list = []
      for (var i = 1; i < 89; i++) {
        list.push(`cloud://clound-env-5gd8uzdd31871ce7.636c-clound-env-5gd8uzdd31871ce7-1308481584/${i}.jpg`)
      }
      wx.cloud.database().collection('indexBanner').add({
        data: {
          indexBanner: list
        }
      })
    },
    audioPlay () {
      const that = this
      if (that.isPlay) {
        that.audioCtx.pause()
        that.isPlay = false
        tools.showToast('您已暂停音乐播放~')
      } else {
        that.audioCtx.play()
        that.isPlay = true
        tools.showToast('背景音乐已开启~')
      }
    },
    getList () {
      const that = this
      const db = wx.cloud.database()
      const banner = db.collection('banner')
      banner.get().then(res => {
        that.list = res.data[0].bannerList
      })
    },

    getMusicUrl () {
      const that = this
      const db = wx.cloud.database()
      const music = db.collection('music')
      music.get().then(res => {
        that.audioUrl = res.data[0].musicUrl
        that.audioCtx.play()
        that.getList()
      })
    },
    isDisplayVideo () {
      const db = wx.cloud.database()
      const state = db.collection('status')
      state.get().then(res => {
        this.isDisplay = res.data[0].isDisplay
        this.videoSrc = res.data[0].address
      })
    }
  },

  onShareAppMessage: function (res) {
    return {
      path: '/pages/index/main'
    }
  }
}
</script>

<style scoped lang="stylus">
@-webkit-keyframes musicRotate
  from
    -webkit-transformb rotate(0deg)
  to
    -webkit-transform rotate(360deg)
@-webkit-keyframes musicStop
  from
    -webkit-transform rotate(20deg)
  to
    -webkit-transform rotate(0deg)
@-webkit-keyframes musicStart
  from
    -webkit-transform rotate(0deg)
  to
    -webkit-transform rotate(20deg)
@-webkit-keyframes infoAnimation
  0%
    -webkit-transform scale(1) translate(0, 0)
  50%
    -webkit-transform scale(.9) translate(5px, 5px)
  100%
    -webkit-transform scale(1) translate(0, 0)
.index
  height 100%
  position relative
  .video-content
    width 100%
    height 100%
    #myVideo
      width 100%
      height 100%
  .img
    width 100%
    height 100%
  .bg-swiper
    width 100%
    height 100%
  .inv
    position absolute
    top 20rpx
    left 89rpx
    width 572rpx
    height 69rpx
    z-index 9
  .bg_music
    position fixed
    right 0
    top 20rpx
    width 100rpx
    z-index 99
    display flex
    justify-content flex-start
    align-items flex-start
    .musicImg
      width 60rpx
      height 60rpx
    .music_icon
      animation musicRotate 3s linear infinite
    .music_play
      width 28rpx
      height 60rpx
      margin-left -10rpx
      transform-origin top
      -webkit-transform rotate(20deg)
    .playImg
      animation musicStop 1s linear forwards
    .pauseImg
      animation musicStart 1s linear forwards
  .info
    width 630rpx
    background rgba(255, 255, 255, 0.75)
    z-index 9
    position fixed
    bottom 40rpx
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
  #myAudio
    display none
</style>
