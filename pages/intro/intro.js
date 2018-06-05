// pages/intro/intro.js
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  join: function () {
    wx.redirectTo({
      url: '../detail/detail',
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})