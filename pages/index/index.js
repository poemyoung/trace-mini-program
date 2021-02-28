//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
        //查询用户是否已经填报完成基本信息
        if(app.globalData.userId && app.globalData.userId != '') {
        wx.request({
          url: app.globalData.urlBase + app.globalData.urlMap.userinfofill + "?userid=" + res.data,
          success: function(res) {
            console.log(res);
            let code = res.data.code;
            if(code === 200006) {
              wx.navigateTo({
                url: '../userinfo/userinfo',
              })
            }
          },
          fail : function(res) {
            wx.showToast({
              title: '请求错误'
            })
          }
        })
      }else {
        app.userIdCallBack = param => {
          wx.request({
            url: app.globalData.urlBase + app.globalData.urlMap.userinfofill + "?userid=" + param,
            success: function(res) {
              console.log(res)
              let code = res.data.code;
              if(code === 200006) {
                wx.navigateTo({
                  url: '../userinfo/userinfo',
                })
              }
            },
            fail : function(res) {
              wx.showToast({
                title: '请求错误'
              })
            }
        })
      }
      }
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
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
  getUserInfo: function(e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
