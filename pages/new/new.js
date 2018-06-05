Page({
  data: {
    inputValue: ''
  },
  create: function () {
    wx.redirectTo({
      url: '../success/success'
    })
  }
})