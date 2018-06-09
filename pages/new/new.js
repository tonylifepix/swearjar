//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    inputValue: ''
  },
  gocreate: function (e) {
    var title = e.detail.value.title;
    var content = e.detail.value.content;
    var data = {
      'token': app.globalData.token,
      'title': title
    }
    if (!(content == null || content.length == 0))
      data['content'] = content
    wx.request({
      url: 'https://tonylifepix.cn/api/item/create',
      success: res => {
        console.log(res.data);
        wx.redirectTo({
          url: '../success/success'
        })
      },
      data: data,
      method: 'POST'
    })
  }
})