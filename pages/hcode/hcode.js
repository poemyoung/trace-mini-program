// pages/hcode/hcode.js
const app = getApp();
var util = require('../../utils/util.js')
import Toast from '../../miniprogram_npm/@vant/weapp/toast/toast'
Page({
  /**
   * 页面的初始数据
   */
  data: {
      qrcode_path : '',
      url : '',
      user_name : '',
      user_idcard : '',
      status : 1,
      status_desc : ['正常','正常','在家隔离','集中隔离'],
      now_str : '',
      last_locate_str : ''
  },
  locate : function(event) {
    let _this = this;
     wx.getLocation({
       type : "gcj02",
       success : function(res) {
         wx.getStorage({
            key: 'userId',
            success : function(res1) {
              wx.request({
                url: app.globalData.urlBase + app.globalData.urlMap.loc_load,
                method: 'POST',
                data : {
                 latitude : res.latitude,
                 longitude : res.longitude,
                 userId : res1.data
                },
                success: function(res) {
                  Toast.success('定位成功');
                  _this.onLoad(event);
                },
                fail: function(res) {
                 Toast.fail("服务器错误！")
                }
              })
            }
         })
       },
       fail: function(res){
         Toast.fail("定位失败")
       }
     })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      // 请求服务器，发送二维码路径
      let _this = this;
      wx.getStorage({
        key: 'userId',
        success : function(res) {
          _this.loadQRCode(res.data);
        },
        fail : function(res) {
          _this.loadQRCode(0);
        },
        complete : function(res) {
          _this.getUserInfo(res.data);
        }
      })
      let time = util.formatTime(new Date());
      setInterval(function(){
        _this.setData({
          now_str : util.formatTime(new Date())
        })
      },1000)
  },
  getUserInfo : function(param) {
    let _this = this;
      wx.request({
        url: app.globalData.urlBase + app.globalData.urlMap.user_info_get + "?userId=" + param,
        success :function(res) {
          let idCard = res.data.data.idCard;
          let name = res.data.data.name;
          idCard = idCard.replace(idCard.substr(2,14),"***********")
          if(name.length > 2) {
            name = name.replace(name.substr(1,name.length-2),"*")
          }else {
            name = name.replace(name.substr(1,2),"*")
          }
          if(res.data.code == 1) {
            _this.setData({
              user_idcard : idCard,
              user_name : name
            })
          }else {
            wx.showToast({
              title: '用户不存在',
              icon : 'none'
            })
          }
        },
        fail : function(res) {
          wx.showToast({
            title: '服务器错误',
            icon : 'none'
          })
        }
      })
  },
  loadQRCode : function(param) {
    let that = this;
    wx.getLocation({
      type: 'gcj02',
      success : function(pos) {
        wx.request({
          url: app.globalData.urlBase + app.globalData.urlMap.qr_dynget,
          method : 'POST',
          data : {
            userId : param,
            latitude : pos.latitude,
            longitude : pos.longitude
          },
          success : function(res) {
            let dateStr = res.data.data.lastLocate;
            let d = new Date(dateStr);
            if(res.data.code == 1) {
                that.setData({
                  qrcode_path : res.data.data.qrUrl,
                  url : app.globalData.urlBase,
                  status : res.data.data.status,
                  last_locate_str : util.formatTime(d)
                })
            }else {
              wx.showToast({
                title: res.data.msg,
                icon : "none"
              })
            }
          },
          fail : function(res) {
            wx.showToast({
              title: '服务器错误',
              icon : "none"
            })
          }
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})