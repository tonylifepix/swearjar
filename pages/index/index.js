//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    hasList:true, //TODO:在列表为空的时候将hasList=false
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
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
  onLoad: function () {
    app.tokenCallback = token => {
      wx.request({
        url: 'https://tonylifepix.cn/api/item/list',
        success: res => {
          console.log(res.data)
          this.setData({
            jarlist: res.data.data.all_item,
          })
        },
        data: {
          'token': app.globalData.token
        },
        method: 'GET'
      })
    }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onShow:function(e){
    console.log('onShow页面更新')
    if(app.globalData.token.length!=0){
      wx.startPullDownRefresh()
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
