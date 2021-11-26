<template>
    <div class="greet">
        <image class="head" src="../../static/images/heart-animation.gif"/>
        <scroll-view
            scroll-y
            class="box"
        >
            <div class="item" v-for="(item, index) in userList" :key="index">
                <image :src="item.user.avatarUrl"/>
                <p>{{item.user.nickName}}</p>
            </div>
        </scroll-view>
        <p class="count">已收到{{userList.length}}位好友送来的祝福</p>
        <div class="bottom">
            <button class="left" lang="zh_CN" @tap="sendGreetUserInfoProfile"  v-if="canIUseGetUserProfile">送上祝福</button>
            <button class="left" lang="zh_CN" open-type="getUserInfo" @getuserinfo="sendGreetUserInfo" v-else>送上祝福</button>
            <!-- <button class="right" @tap="handleGift">
              <img class="gift-img" :src="giftImg" alt="">
            </button> -->
            <button class="right" open-type="share">
             分享喜悦
              <!-- <img class="share-img" :src="shareImg" alt=""> -->
            </button>
        </div>
        <v-dialog ref="dialog"/>
    </div>
</template>

<script>
import tools from 'common/js/h_tools'
import vDialog from './dialog.vue'
export default {
  name: 'Greet',
  components: {vDialog},
  data () {
    return {
      userList: [],
      openId: '',
      userInfo: '',
      canIUseGetUserProfile: true
    }
  },
  onShow () {
    const that = this
    that.getUserList()
  },
  onLoad () {
    if (!wx.getUserProfile) {
      this.canIUseGetUserProfile = false
    }
  },
  methods: {
    /**
     * 获取用户信息使用getUserProfile
     */
    sendGreetUserInfoProfile (e) {
      let lastOpenId = wx.getStorageSync('openId')
      if (lastOpenId.length > 0) {
        tools.showToast('您已经送过祝福了~')
        return
      }
      wx.getUserProfile({
        lang: 'zh_CN',
        desc: '获取用户信息',
        success: res => {
          if (res.errMsg === 'getUserProfile:ok') {
            this.userInfo = res.userInfo
            wx.setStorageSync('userInfo', res.userInfo)
            wx.showLoading({
              title: '送祝福'
            })
            this.getOpenId()
          }
        },
        fail: err => {
          console.error(err, 'err')
        }
      })
    },
    /**
     * 获取用户信息使用getUserInfo
     */
    sendGreetUserInfo () {
      let lastOpenId = wx.getStorageSync('openId')
      if (lastOpenId.length > 0) {
        tools.showToast('您已经送过祝福了~')
        return
      }
      wx.getUserInfo({
        provider: 'weixin',
        lang: 'zh_CN',
        success: res => {
          this.userInfo = res.userInfo
          this.getOpenId()
        },
        fail: err => {
          console.error(err, 'err')
        }
      })
    },
    addUser () {
      const that = this
      const db = wx.cloud.database()
      const user = db.collection('user')
      user.add({
        data: {
          user: that.userInfo
        }
      }).then(res => {
        that.getUserList()
      })
    },

    getOpenId () {
      const that = this
      wx.cloud.callFunction({
        name: 'user',
        data: {}
      }).then(res => {
        that.openId = res.result.openid
        wx.setStorageSync('openId', res.result.openid)
        that.getIsExist()
      })
    },

    getIsExist () {
      const that = this
      const db = wx.cloud.database()
      const user = db.collection('user')
      user.where({
        _openid: that.openId
      }).get().then(res => {
        if (res.data.length === 0) {
          that.addUser()
        } else {
          wx.hideLoading()
          tools.showToast('您已经送过祝福了~')
        }
      })
    },

    getUserList () {
      const that = this
      wx.showLoading({
        title: '获取用户列表'
      })
      wx.cloud.callFunction({
        name: 'userList',
        data: {}
      }).then(res => {
        wx.hideLoading()
        that.userList = res.result.data.reverse()
      })
    },
    /**
     * 获取礼物
     * */
    handleGift () {
      console.log('sss')
      this.$refs.dialog.open()
    }
  }
}
</script>

<style lang="stylus" scoped>
.greet
    width 100%
    height 100%
    .head
        height 150rpx
        width 200rpx
        margin 0 auto
    .box
        height 700rpx
        width 690rpx
        margin-left 30rpx
        border-radius 16rpx
        box-shadow 0 0 10rpx rgba(0, 0, 0, 0.1)
        display flex
        justify-content flex-start
        align-items flex-start
        flex-wrap wrap
        .item
            width 120rpx
            display flex
            flex-direction column
            justify-content flex-start
            align-items center
            padding 25rpx
            float left
            image
                width 100rpx
                height 100rpx
                border-radius 50rpx
            p
                height 50rpx
                line-height 50rpx
                font-size 24rpx
                color #444
                width 100rpx
                overflow hidden
                text-overflow ellipsis
                white-space nowrap
                text-align center
    .bottom
        height 140rpx
        position fixed
        bottom 0
        left 0
        background rgba(255, 255, 255, 0.5)
        display flex
        align-items center
        width 100%
        .left
            height 80rpx
            line-height 80rpx
            font-size 28rpx
            width 300rpx
            color #fff
            background #E62C6B
            margin-right 20rpx
        .right
            height 80rpx
            line-height 80rpx
            font-size 28rpx
            color #fff
            width 300rpx
            background #2CA6F9
            // width 40px
            // height 40px
            // padding 0
            // background transparent
            // margin-left 10px
            // margin-right 30rpx
        .right::after
            border none
        @-webkit-keyframes icon
          0%
            opacity: 0.8;
            transform: translate(0,0);
          20%
            opacity: 1;
            transform: translate(0,-5px);
          30%
            opacity: 1;
            transform: translate(0,5px);
          40%
            opacity: 1;
            transform: translate(0,-5px);
          50%
            opacity: 1;
            transform: translate(0,5px);
          50%
            opacity: 1;
            transform: translate(0,0);
          100%
            opacity: 0.8;
            transform: translate(0,0);
        .gift-img
          width 50px
          height 45px
          animation:  icon 3s linear infinite;
        .share-img
          width 40px
          height 40px
    .count
        height 60rpx
        line-height 60rpx
        background rgba(255, 255, 255, 0.5)
        position fixed
        bottom 140rpx
        left 0
        font-size 28rpx
        color #444
        text-align center
        width 100%
</style>
