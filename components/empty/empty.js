// pages/empty/empty.js
//获取应用实例
const app = getApp()
Page({
  data: {
    phoneNumber: ''
  },
  inputHandler(e) {
    this.setData({
      phoneNumber: e.detail.value
    });
  },
  cancel() {
    this.triggerEvent('cancelInput');
  },
  commit() {
    console.log(this.data.phoneNumber);
    app.globalData.phoneNumber = this.data.phoneNumber;
    // 请求
    wx.request({
      url: 'https://sharque.dlbn.top/fav/getFrist',
      data: {
        avatarUrl: app.globalData.avatarUrl,
        city: app.globalData.city,
        country: app.globalData.country,
        gender: app.globalData.gender,
        nickName: app.globalData.nickName,
        province: app.globalData.province,
        phoneNumber: app.globalData.phoneNumber
      },
      method: 'POST',
      success: res => {
        console.log(res);
        let { userId, type } = res.data;
        app.globalData.userId = userId;
        // type 0 员工 1 用户 如果是员工则跳转不同页面
        if (type == 0) {
          wx.reLaunch({
            url: '/pages/staff/staff'
          })
        } else if (type == 1) {
          wx.reLaunch({
            url: `/pages/index/index`
          })
        }
        // 本地缓存手机号，用户类型，userId
        wx.setStorage({
          data: app.globalData.phoneNumber,
          key: 'phoneNumber',
        })
        wx.setStorage({
          data: type,
          key: 'type',
        })
        wx.setStorage({
          data: userId,
          key: 'userId',
        })
      },
      fail: err => {
        console.log(err);
      }
    })
  }
})