//app.js
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
    wx.setStorageSync('logs', logs)
    // 登录
    var code = null
    var token = null
    wx.login({
      success: res => {
        code = res.code
        //用code交换来token
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
        //获取用户权限情况
        wx.getSetting({
          success: res => {
            if (res.authSetting['scope.userInfo']) {
              //获取userinfo
              wx.getUserInfo({
                success: res => {
                  this.globalData.userInfo = res.userInfo
                  this.globalData.userInfo['token'] = this.globalData.token
                  if (this.userInfoReadyCallback) {
                    this.userInfoReadyCallback(res)
                  }
                  //更新服务器userinfo
                  wx.request({
                    url: 'https://tonylifepix.cn/api/getuser',
                    method: 'POST',
                    data: this.globalData.userInfo,
                    success: res => {
                      console.log(res.data)
                      //获取username
                      this.globalData.username = res.data.data.username
                      if (this.usernameReadyCallback) {
                        this.usernameReadyCallback(res.data.data.username)
                      }
                    }
                  })
                },
              })
            }
            else {
              //请求权限,已报废
              wx.authorize({
                scope: 'scope.userInfo'
              })
            }
          }
        })
      }
    })
  }
})