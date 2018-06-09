// pages/welcome/welcome.js
Page({
  data: {

  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    //this.setData({
    //  userInfo: e.detail.userInfo,
    //  hasUserInfo: true
    //})
  }
})