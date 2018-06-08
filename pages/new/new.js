//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    inputValue: ''
  },
  create: function (e) {
    var title = e.detail.value.title;
    var content = e.detail.value.content;

    wx.request({
      url: 'https://tonylifepix.cn/api/item/create',
      success: res => {
        console.log(res.data);
        wx.redirectTo({
          url: '../success/success'
        })
      },
      data: {
        'token': app.globalData.token,
        'title': title,
        'content': content,
      },
      method: 'POST'
    })
    
    
    
  }
})