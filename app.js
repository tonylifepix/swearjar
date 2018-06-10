//app.js
var login = require('utils/login.js') // 登录模块
App({
  globalData: {
    userInfo: null,
    token: '',
    username:''
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorage({key: 'logs', data: logs}) // 异步存储
    this.globalData.token = wx.getStorageSync('token') || ''
    console.log("缓存的token为 " +this.globalData.token)
    if(this.globalData.token == '')
    {
      login.WxLogin(this) // 登录模块化，传入this指针，并缓存token
    }
  },
})