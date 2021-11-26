import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

wx.cloud.init({
  env: 'clound-env-5gd8uzdd31871ce7'
})

const app = new Vue(App)
app.$mount()
