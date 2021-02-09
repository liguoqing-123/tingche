// pages/staff/staff.js
//获取应用实例
const app = getApp()
Page({
  data: {
    array: [], // 0 待完成 1 已完成
    isShow: false,
    errMsg: '',
    orderId: '',
    userId: ''
  },
  onLoad: function () {
    const app = getApp()
    const { userId } = app.globalData;
    wx.request({
      url: 'https://sharque.dlbn.top/fav/getLaderList',
      data: {
        userId
      },
      method: 'POST',
      success: res => {
        this.setData({
          array: res.data.array
        });
      }
    })
  },
  // 点击报错后触发
  changeErrMsg(e) {
    this.setData({
      orderId: e.detail.orderId,
      userId: e.detail.userId
    });
    this.setData({
      isShow: true
    });
  },
  cancelHandler() {
    this.setData({
      errMsg: '',
      isShow: false
    });
  },
  // 点击发送后触发
  sendHandler() {
    this.setData({
      isShow: false
    }, () => {
      const { orderId, userId } = this.data;
      wx.request({
        url: 'https://sharque.dlbn.top/fav/getLaderErr',
        method: 'POST',
        data: {
          userId,
          content: this.data.errMsg,
          orderId
        },
        success: res => {
          this.onLoad();
          wx.showToast({
            title: '报错成功',
            icon: 'success'
          })
        }
      })
    });
  },
  inputMsg(e) {
    this.setData({
      errMsg: e.detail.value
    });
  },
  // 点击完成任务
  finshed(e) {
    const orderId = e.detail.orderId;
    wx.request({
      url: 'https://sharque.dlbn.top/fav/getLaderCar',
      method: 'POST',
      data: {
        orderId
      },
      success: res => {
        this.onLoad();
        wx.showToast({
          title: '取车成功',
          icon: 'success'
        })
      }
    })
  },
  onClose() {
    this.setData({ isShow: false });
  }
})