// pages/detail/detail.js
//获取应用实例
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    jid: 0,
    isCreator:true,
    info: {
      id: 1,
      title: 'dummy title',
      content:'每个微信小程序都可以有自己的本地缓存每个微信小程序都可以有自己的本地缓存每个微信小程序都可以有自己的本地缓存每个微信小程序都可以有自己的本地缓存',
      creator: 'dummy',
      idate: '1970/01/01',
      total: 21,  
    },
    commiteelist: [{
      uid: 9,
      uava: '',
      uname: 'dummy1',
      ctime: '2001/01/02',
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   * TODO:这里还要把jar的数据给拉出来提供给页面
   *      如果拉取失败还要给个提示，然后回退
   */
  onLoad: function (options) {
    let jarid = options.id
    console.log('jid:' + jarid)
    
    wx.request({
      url: 'https://tonylifepix.cn/api/item/detail/'+jarid,
      success: res => {
        console.log(res.data);
        console.log(res.data.data.owner.username)
        console.log(app.globalData.username)
        console.log(res.data.data.owner.username == app.globalData.username)
        this.setData({ 
          jid: res.data.data.id,
          isCreator: (res.data.data.owner.username == app.globalData.username),
        })
      },
      data: {
        'token': app.globalData.token
      },
      method: 'GET'
    })

  },
  admit: function(jid){
    wx.navigateTo({
      url: '../pay/pay',
    })
  },
  popMenu: function(){
    wx.showActionSheet({
      itemList: ['分享','清空记录', '修改', '删除'],
      success: function (res) {
        console.log(res.tapIndex)
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})