//app.js
const login = require('utils/login.js') // 登录模块
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
    else
    {
      wx.request({
        url: 'https://tonylifepix.cn/api/checkuser',
        data: {
          token: this.globalData.token
        },
        success: res => {
          if (res.data.code<0)
          {
            login.WxLogin(this)
            // 登录出错，重新刷新一下页面
            wx.reLaunch({
              url: 'pages/index/index',
            })
          }
        }
      })
    }
  },
})