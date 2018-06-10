// pages/welcome/welcome.js
var app = getApp()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },
  getUserInfo: function (e) {
    console.log(e)
    if(e.detail.errMsg.indexOf('fail')!=-1)
    {
      wx.showModal({
        title: '抱歉',
        content: '您点击了拒绝授权，将无法正常使用小程序，请重新点击登录按钮,或者退出小程序重试',
        success: function (res) {
          if(res.confirm)
          {

          }
          else if(res.cancel)
          {

          }
        }
      })
    }
    else
    {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      wx.navigateBack({
        fail: res => {
          wx.reLaunch({
            url: '/pages/index/index',
          })
        }
      })
      
    }
  },
  onLoad: function(){
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  }
})