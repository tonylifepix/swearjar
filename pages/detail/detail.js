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
        console.log(this.data.jid)
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
        var now_page = getCurrentPages()[getCurrentPages().length-1];
        if(res.tapIndex == 0){
          console.log('清空记录')
          wx.request({
            url: 'https://tonylifepix.cn/api/item/clear/' + now_page.data.jid,
            success: res => {
              console.log(res.data);
              if (res.data.code == 1) {
                wx.startPullDownRefresh()
              }
            },
            data: {
              'token': app.globalData.token,
            },
            method: 'GET'
          })
        }
        if (res.tapIndex == 1) {
          console.log('修改')
        }
        if (res.tapIndex == 2) {
          console.log('删除')
          wx.request({
            url: 'https://tonylifepix.cn/api/item/delete/' + now_page.data.jid,
            success: res => {
              console.log(res.data);
              if(res.data.code==1){
                wx.navigateBack({})
              }
            },
            data: {
              'token': app.globalData.token,
            },
            method: 'GET'
          })
        }
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
      path: '/pages/detail/detail?id=' + this.data.jid
    }
  },

  onPullDownRefresh: function () {
    wx.request({
      url: 'https://tonylifepix.cn/api/item/detail/' + this.data.jid,
      success: res => {
        console.log(res.data);
        let datas = res.data.data.joined_user_set;
        datas.forEach(item => {
          item.created = item.created.substr(0, 10)
        })
        this.setData({
          jid: res.data.data.id,
          isCreator: (res.data.data.owner.username == app.globalData.username),
          info: {
            id: res.data.data.id,
            title: res.data.data.title,
            content: res.data.data.content,
            creator: res.data.data.owner.nickName,
            idate: res.data.data.created.substring(0, 10),
            total: res.data.data.total,
          },
          commiteelist: res.data.data.joined_user_set,
          commiteelen: res.data.data.joined_user_set.length
        })
        console.log(this.data.jid)
      },
      data: {
        'token': app.globalData.token
      },
      method: 'GET'
    })
  }
})