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
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 1000
        })
      },
      data: {
        'token': app.globalData.token,
      },
      method: 'GET'
    })
    
    wx.navigateBack({})
  },
  onLoad: function (options) {
    let jarid = options.id
    console.log('jid:' + jarid)
    this.setData({
      jarid:jarid
    })
  }
})