// pages/detail/detail.js
//获取应用实例
const app = getApp()
Page({
  data: {
    jid: 0,
    isCreator:true,
    info: {
      id: 1,
      title: 'null',
      content:'null',
      creator: 'null',
      idate: '1970/01/01',
      total: 0,  
    },
    commiteelist: [],
    commiteelen:0
  },

  onLoad: function (options) {
    let jarid = options.id
    console.log('jid:' + jarid)
    wx.request({
      url: 'https://tonylifepix.cn/api/item/detail/'+jarid,
      success: res => {
        console.log(res.data);
        let datas = res.data.data.joined_user_set;
        datas.forEach( item => {
          item.created = item.created.substr(0,10)
        })
        this.setData({ 
          jid: res.data.data.id,
          isCreator: (res.data.data.owner.username == app.globalData.username),
          info:{
            id: res.data.data.id,
            title: res.data.data.title,
            content: res.data.data.content,
            creator: res.data.data.owner.nickName,
            idate: res.data.data.created.substring(0,10),
            total:res.data.data.total,
          },
          commiteelist: res.data.data.joined_user_set,
          commiteelen: res.data.data.joined_user_set.length
        })
      },
      data: {
        'token': app.globalData.token
      },
      method: 'GET'
    })
  },

  admit: function (){
    wx.navigateTo({
      url: '../pay/pay?id=' + this.data.jid,
    })
  },

  popMenu: function(){
    wx.showActionSheet({
      itemList: ['清空记录', '修改', '删除'],
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
    return {
      title: '您的好友邀请您一起自律',
      path: '/pages/detail/detail?id=' + this.data.jarid
    }
  }
})