//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    hasList:false,
    jarlist:[],
  },
  //事件处理函数
  go2newpage: function() {
    wx.navigateTo({
      url: '../new/new'
    })
  },
  jump2help: function () {
    wx.navigateTo({
      url: '../help/help'
    })
  },
  onLoad:function(){
    wx.getSetting({
      success: res => {
        if (!res.authSetting['scope.userInfo']) {
          wx.navigateTo({
            url: '../welcome/welcome'
          })
        }
      }
    })
  },
  onShow:function(e){
    if(app.globalData.token.length!=0){
      wx.showNavigationBarLoading()
      wx.request({
        url: 'https://tonylifepix.cn/api/item/list',
        success: res => {
          console.log(res.data.code)
          this.setData({
            jarlist: res.data.data.all_item,
            hasList: (res.data.data.all_item.length == 0) ? false : true
          })
          wx.hideNavigationBarLoading()
        },
        data: {
          'token': app.globalData.token
        },
        method: 'GET'
      })
    }else {
      app.tokenCallback = token => {
        wx.request({
          url: 'https://tonylifepix.cn/api/item/list',
          success: res => {
            console.log(res.data)
            this.setData({
              jarlist: res.data.data.all_item,
              hasList: (res.data.data.all_item.length == 0) ? false : true
            })
            wx.stopPullDownRefresh()
          },
          data: {
            'token': app.globalData.token
          },
          method: 'GET'
        })
        wx.hideNavigationBarLoading()
      }
    }
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  jardetail: function (e) {
    let id = e.currentTarget.dataset.jid
    wx.navigateTo({
      url: '../detail/detail?id=' + id
    })
  },
  onPullDownRefresh: function () {
    wx.request({
      url: 'https://tonylifepix.cn/api/item/list',
      success: res => {
        console.log(res.data)
        this.setData({
          jarlist: res.data.data.all_item
        })
        wx.stopPullDownRefresh()
      },
      data: {
        'token': app.globalData.token
      },
      method: 'GET'
    })
  }
})
