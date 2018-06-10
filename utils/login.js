const WxLogin = (that) =>{
  // 登录
  let code = null
  let token = null
  wx.login({
    success: res => {
      code = res.code
      //用code交换来token
      wx.request({
        url: 'https://tonylifepix.cn/auth/wxlogin',
        success: res => {
          console.log(res.data)
          that.globalData.token = res.data.token
          wx.setStorageSync('token', that.globalData.token) // 存储一下token
          if (that.tokenCallback) {
            that.tokenCallback(res.data.token);
          }

          //获取用户权限情况
          wx.getSetting({
            success: res => {
              if (res.authSetting['scope.userInfo']) {
                //获取userinfo
                wx.getUserInfo({
                  success: res => {
                    that.globalData.userInfo = res.userInfo
                    that.globalData.userInfo['token'] = that.globalData.token
                    console.log("token 为 " + that.globalData.userInfo['token'] + " 如果token为undefined则说明出现bug")
                    if (that.userInfoReadyCallback) {
                      that.userInfoReadyCallback(res)
                    }
                    //更新服务器userinfo
                    wx.request({
                      url: 'https://tonylifepix.cn/api/getuser',
                      method: 'POST',
                      data: that.globalData.userInfo,
                      success: res => {
                        console.log(res.data)
                        //获取username
                        that.globalData.username = res.data.data.username
                        if (that.usernameReadyCallback) {
                          that.usernameReadyCallback(res.data.data.username)
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
        },
        data: {
          'code': code
        },
        method: 'POST'
      })
    }
  })
}

module.exports = {
  WxLogin: WxLogin
}
