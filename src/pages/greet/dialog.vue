<template>
  <div class="dialog-content" v-if="visible">
    <!-- 切换方式 -->
    <div class="nav">
      <div class="gift" :class="[activeIndex === 0 ? 'active' : '']" @tap="() => handleGift(0)">礼物</div>
      <div class="cash" :class="[activeIndex === 1 ? 'active' : '']" @tap="() => handleGift(1)">礼金</div>
    </div>
    <!-- 主体内容 -->
    <div class="main" v-if="activeIndex === 0">
ssss
    </div>
    <div class="main section-two" v-if="activeIndex === 1">
      <input class="name-ipt ipt" type="text" v-model="name" placeholder="请填写您的姓名，不要使用表情符号" placeholder-style="color:#b2b2b2;">
      <input class='money-ipt ipt' type='number' placeholder='请输入礼金金额' adjust-position="true"
      :value="moneyNum"
      @input="handleMoneyInput"  placeholder-style="color:#b2b2b2;" v-model="moneyNum"/>
      <button class="btn" @click="handleSend">确认送出</button>
    </div>
  </div>
</template>

<script>
import tools from 'common/js/h_tools'
export default {
  data () {
    return {
      visible: false,
      activeIndex: 0,
      moneyNum: '',
      name: ''
    }
  },
  methods: {
    /**
     * 打开弹层
     */
    open () {
      this.visible = true
    },
    /**
     * 处理选项卡点击
     */
    handleGift (type) {
      this.activeIndex = type
    },
    handleMoneyInput (e) {
      this.moneyNum = e.mp.detail.value.replace(/\D/g, '')
    },
    /**
     * 发送礼金
     * 1.校验是否输入礼金与姓名
     * 2.是否登录微信授权
     * */
    handleSend () {
      if (!this.name) {
        tools.showToast('请输入您的姓名')
      }
      if (!this.moneyNum) {
        tools.showToast('请输入您的祝福礼金')
      }
      console.log(this.moneyNum, this.name)
      wx.cloud.cloudPay.unifiedOrder({
        'body': '小秋TIT店-超市',
        'spbillCreateIp': '127.0.0.1',
        'subMchId': '1900009231',
        'subAppid': 'wxe5f52902cf4de896',
        'totalFee': 1,
        'envId': 'test-f0b102',
        'functionName': 'pay_cb'
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.dialog-content
  position fixed
  bottom 0
  height 500rpx
  width 100%
  background-color rgba(0,0,0,.7)
  border-radius 20rpx 20rpx 0 0
  .nav
    overflow hidden
    color #fff
    padding 10rpx 0
    .gift
      float left
      width 50%
      text-align center
    .cash
      float right
      width 50%
      text-align center
    .active
      color #ff4c91
  .main
    padding 0 60rpx
    .ipt
      border: 1px solid #fff;
      background: #fff;
      border-radius: 10rpx;
      margin-bottom 20rpx
      padding 10rpx 30rpx
      color #333
      font-size 14px
    .btn
      background:  #ff4c91
      color #fff
      font-size 14px
      cursor pointer
  .section-two
    padding-top 60rpx
</style>
