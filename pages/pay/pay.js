// pages/pay/pay.js
const app = getApp()

Page({
  data: {
    jarid:null
  },
  mark: function(){
    wx.request({
      url: 'https://tonylifepix.cn/api/item/join/' + this.data.jarid,
      success: res => {
        console.log(res.data);
        setTimeout(function(){
          wx.showToast({
            title: '成功',
            icon: 'success',
            duration: 1000
          })
        },500)
        wx.navigateBack({})
      },
      data: {
        'token': app.globalData.token,
      },
      method: 'GET'
    })
  },
  onLoad: function (options) {
    let jarid = options.id
    console.log('jid:' + jarid)
    this.setData({
      jarid:jarid
    })
  }
})