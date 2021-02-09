// pages/mine/mine.js
//获取应用实例
Page({
  data: {
    array: [] // 状态 1：正在取车；2: 取车完成 3： 取车失败
  },
  onLoad: function (options) {
    const app = getApp()
    const { userId } = app.globalData;
    wx.request({
      url: 'https://sharque.dlbn.top/fav/getUserList',
      method: 'POST',
      data: {
        userId
      },
      success: res => {
        this.setData({
          array: res.data.array
        });
      }
    })
  }
})