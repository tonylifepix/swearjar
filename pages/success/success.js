// pages/success/success.js
Page({
  data: {
    myqrcode:{},
  },

  gohelp: function () {
    wx.redirectTo({
      url: '../help/help'
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})