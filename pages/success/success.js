// pages/success/success.js
var app = getApp()
Page({
  data: {
    myqrcode:'',
    jarid:''
  },

  gohelp: function () {
    wx.redirectTo({
      url: '../help/help'
    })
  },

  onLoad: function (options) {
    let jarid = options.id
    this.setData({
      jarid:jarid,
      myqrcode:'https://tonylifepix.cn/api/wxacode/'+jarid,
    })
  },
  go2help: function () {
    wx.navigateTo({
      url: '../help/help'
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '您的好友邀请您一起自律',
      path: '/pages/detail/detail?id=' + this.data.jarid
    }
  }
})