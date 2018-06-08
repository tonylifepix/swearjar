//app.js
App({
  globalData: {
    userInfo: null,
    token: ''
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    var code = null
    var token = null
    wx.login({
      success: res => {
        code = res.code
        wx.request({
          url: 'https://tonylifepix.cn/auth/wxlogin',
          success: res => {
            console.log(res.data)
            this.globalData.token = res.data.token
            if (this.tokenCallback) {
              this.tokenCallback(res.data.token);
            }
          },
          data: {
            'code': code
          },
          method: 'POST'
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            },
          })
        }
        else{
          wx.authorize({ 
            scope: 'scope.userInfo' 
          })
        }
      }
    })
  }
})