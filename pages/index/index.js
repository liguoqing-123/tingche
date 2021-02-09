//index.js
//获取应用实例
const app = getApp()
Page({
  data: {
    orderId: '',
    userAvatar: '',
    userNickName: '',
    hNum: '',
    cNum: '',
    content: '',
    status: '', // 0 取车 1 正在取车 2 取车完成 3 取车失败,
    userId: '',
    isShow: false,
    popupShow: false, // 弹出层
    inputHNum: '',
    inputCNum: ''
  },
  onLoad() {
    const userAvatar = wx.getStorageSync('avatarUrl');
    const userNickName = wx.getStorageSync('nickName');
    this.setData({
      userAvatar,
      userNickName
    });
    const { userId } = app.globalData;
    if (userId) {
      this.setData({
        userId
      });
    }
    userId && wx.request({
      url: 'https://sharque.dlbn.top/fav/getNum',
      method: 'POST',
      data: {
        userId
      },
      success: res => {
        const { orderId, status, cNum, hNum, content, userAvatar, userNickName } = res.data;
        this.setData({
          orderId,
          status,
          cNum,
          hNum,
          content,
          userAvatar,
          userNickName
        });
      }
    })
  },
  // 关闭填写手牌号弹出层
  onCNumClose() {
    this.setData({ isShow: false });
  },
  // 点击 点我取车按钮
  getCar() {
    const avatarUrl = wx.getStorageSync('avatarUrl');
    const nickName = wx.getStorageSync('nickName');
    // 如果存储过头像和昵称直接使用
    if (avatarUrl && nickName) {
      
    } else {
      // 没有储存过头像昵称就获取用户信息，并且存储
      wx.getUserInfo({
        success: res => {
          app.globalData.avatarUrl = res.userInfo.avatarUrl;
          app.globalData.city = res.userInfo.city;
          app.globalData.country = res.userInfo.country;
          app.globalData.gender = res.userInfo.gender;
          app.globalData.nickName = res.userInfo.nickName;
          app.globalData.province = res.userInfo.province;
          wx.setStorage({
            data: res.userInfo.avatarUrl,
            key: 'avatarUrl',
          })
          wx.setStorage({
            data: res.userInfo.nickName,
            key: 'nickName',
          })
          // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          // 所以此处加入 callback 以防止这种情况
          if (this.userInfoReadyCallback) {
            this.userInfoReadyCallback(res)
          }
        },
        fail: err => {
          console.log('第一次获取用户信息失败', err);
        }
      })
    }
    const phoneNumber = wx.getStorageSync('phoneNumber');
    if (!phoneNumber) {
      this.setData({
        popupShow: true
      });
    } else if (!this.data.cNum) {
      this.setData({
        isShow: true
      });
    } else {
      wx.request({
        url: 'https://sharque.dlbn.top/fav/getCar',
        method: 'POST',
        data: {
          userId: this.data.userId, // 用户 ID
          hNum: this.data.hNum, // 房间号
          cNum: this.data.cNum, // 手牌号
          orderId: this.data.orderId
        },
        success: res => {
          this.onLoad();
          if (res.data.retMsg === '执行异常') {
            wx.showToast({
              title: res.data.retMsg,
              icon: 'none'
            })
          }
        }
      })
    }
  },
  onClosePopup() {
    this.setData({ popupShow: false });
  },
  cancelHander() {
    this.setData({
      isShow: false
    });
  },
  sureHandler() {
    if (!this.data.inputCNum) {
      wx.showToast({
        title: '手牌号不能为空',
        icon: 'none'
      })
    } else {
      this.setData({
        hNum: this.data.inputHNum,
        cNum: this.data.inputCNum
      }, () => {
        this.setData({
          isShow: false
        });
      });
    }
  },
  inputHNum(e) {
    this.setData({
      inputHNum: e.detail.value
    });
  },
  inputCNum(e) {
    this.setData({
      inputCNum: e.detail.value
    });
  }
})
