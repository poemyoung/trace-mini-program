//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
     // 获取用户信息
     wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  onShow : function(){
      // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        this.getUserInfo(res.code);
      }
    });
  },
  globalData: {
    userInfo: null,
    userId: "",
    urlBase: "https://www.poemyoung.xyz",
    urlMap:{
      login : "/miniapi/login",
      userinfofill : "/miniapi/isfill",
      fill : "/miniapi/fill"
    }
  },
  getUserInfo : function(data) {
    let that = this;
    console.log(this.globalData.urlBase + this.globalData.urlMap.login + "?openId="+data)
    wx.request({
      url: this.globalData.urlBase + this.globalData.urlMap.login + "?openId="+data,
      success : function(res){
        wx.setStorage({
          data: res.data.data,
          key: 'userId',
        })
      },
      fail: function(res){
        wx.showToast({
          title: '服务器错误',
        })(res.data.msg);
      },
      complete : function(res){
        console.log(res);
      }
    })
  }
})