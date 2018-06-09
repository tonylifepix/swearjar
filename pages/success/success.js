// pages/success/success.js
Page({
  data: {
    myqrcode:{},
    jarid:''
  },

  gohelp: function () {
    wx.redirectTo({
      url: '../help/help'
    })
  },

  onLoad: function (options) {
    let jarid = options.id
    this.data.jarid = jarid
    console.log('jid:' + jarid)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: '您的好友邀请您一起自律',
      path: '/detail?id=' + this.data.jarid
    }
  }
})