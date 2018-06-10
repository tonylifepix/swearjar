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
    //jarid的缓存是最优先的
    this.setData({
      jarid: jarid,
    })
    wx.showLoading({
      title: '加载中',
    })
    wx.downloadFile({
      url: 'https://tonylifepix.cn/api/wxacode/' + jarid,
      success: res=>{
        console.log(res.tempFilePath)
        if (res.statusCode === 200) {
          this.setData({
            myqrcode: res.tempFilePath,
          })
          wx.hideLoading()
        }else{
          //加载失败
          wx.hideLoading()
          wx.showToast({
            title: '获取图片失败',
            icon: '/statics/error.png',
            duration: 1000
          })
        }
      },
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
      title: '来和我一起自律吧~',
      path: '/pages/detail/detail?id=' + this.data.jarid,
      imageUrl:'/statics/logo.jpg'
    }
  }
})