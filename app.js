//app.js
App({
  globalData: {
    userId: '' ,
    avatarUrl: '',
    city: '',
    country: '',
    gender: '',
    nickName: '',
    province: '',
    phoneNumber: ''
  },
  onLaunch: function () {
    // 小程序初次启动获取用户的基本信息，并且信息绑定到 globalData 中
    wx.login({
      success: res => {
        wx.getSetting({
          success: res => {
            // 如果有缓存，用户类型是员工、则直接跳转员工页面
            const type = wx.getStorageSync('type');
            if (type) {
              if (type === '0') {
                wx.reLaunch({
                  url: '/pages/staff/staff'
                })
              } else if (type === '1') {
                wx.reLaunch({
                  url: `/pages/index/index`
                })
              }
            }
          }
        })
      }
    })
  }
})