//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    user_id : '',
    active : 0,
    notice_text : "在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
  },
  // 主动定位点击
  locateClick : function(event) {
    let _this = this;
     wx.getLocation({
       type : "gcj02",
       success : function(res) {
         let userId = 0;
         wx.getStorage({
            key: 'userId',
            success : function(res) {
              userId = res.data;
            }
         })
         wx.request({
           url: app.globalData.urlBase + app.globalData.urlMap.loc_load,
           method: 'POST',
           data : {
            latitude : res.latitude,
            longitude : res.longitude,
            userId : userId
           },
           success: function(res) {
             console.log(res)
            wx.showToast({
              title: '定位成功',
            })
           },
           fail: function(res) {
            wx.showToast({
              title: '服务器错误',
              icon: 'none'
            })
           }
         })
       },
       fail: function(res){
         wx.showToast({
           title: '定位失败',
           icon:'none'
         })
       }
     })
  },
  //疫情线索上报点击
  threadUp : function(event) {
    wx.navigateTo({
      url: '../threadup/tdupidx/tdupidx',
    })
  },
  //查疫情政策
  checkPolicy : function(event) {
      wx.navigateTo({
        url: '../ckpolicy/ckpolicyidx/ckpolicyidx',
      })
  },
  //看疫情新闻点击
  checkNews : function(event) {
    wx.navigateTo({
      url: '../cknews/cknewsidx/cknewsidx',
    })
  },
  //查风险地区点击
  checkHighRisk : function(event) {
      wx.navigateTo({
        url: '../ckhigh/ckhighidx/ckhighidx',
      })
  },
  //健康申报点击
  report : function(event) {
    wx.navigateTo({
      url: '../userinfo/userinfo',
    })
  },
  //肺炎科普点击
  popularize : function(event) {
    wx.navigateTo({
      url: '../pop/popidx/popidx',
    })
  },
  //提交工单点击
  workSys : function(event) {
    wx.navigateTo({
      url: '../worksys/submit/submit',
    })
  },
  // 扫一扫点击
  scanClick : function(event) {
    wx.scanCode({
      onlyFromCamera: true,
      scanType : ['qrCode'],
      success : function(res) {
        let qr_res = res;
       wx.request({
         url: app.globalData.urlBase + app.globalData.urlMap.qr_upload,
         method : 'POST',
         data : {
           res : qr_res
         },
         success : function(r) {
            wx.navigateTo({
              url: '../scan/scan?status='+r.data.data,
            })
         },
         fail : function(r) {
           wx.showToast({
             title: '服务器错误',
             icon : 'warn'
           })
         }
       })
        console.log(res);
      },
      fail : function(res) {
        wx.showToast({
          title: '扫码失败',
          icon : 'warn'
        })
      }
    })
    // wx.navigateTo({
    //   url: '../scan/scan',
    // })
  },
  //健康码点击
  healthyCode : function(event) {
    wx.navigateTo({
      url: '../hcode/hcode',
    })
  },
  //静态码点击
  staticCode : function(event) {
      wx.navigateTo({
        url: '../scode/scode',
      })
  },
  tabChange : function(event) {
    this.setData({
      active : event.detail
    })
    let nav_page = "";
    switch(event.detail) {
      case 1:
        nav_page = "../tabs/message/message";
        break;
      case 2:
        nav_page = "../tabs/mine/mine";
        break;
      default:
          wx.showToast({
            title: '页面跳转错误',
          })
    }
    wx.redirectTo({
      url: nav_page,
    })
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  userIsFill : function(param) {
    var _this = this;
    wx.request({
      url: app.globalData.urlBase + app.globalData.urlMap.userinfofill + "?userid=" + param,
      success: function(res) {
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
      },
      complete : function(event) {
          _this.setData({
            user_id : param
          })
      }
    })
  },
  onLoad: function () {
        //查询用户是否已经填报完成基本信息
      if(app.globalData.userId && app.globalData.userId != '') {
            this.userIsFill(app.globalData.userId);
      }else {
        app.userIdCallBack = this.userIsFill;
      }
      this.setData({
        user_id : app.globalData.userId
      })
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
