// pages/scodemag/add/add.js
import Tost from '../../../miniprogram_npm/@vant/weapp/toast/toast'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      name : '',
      cardId : '',
      user_dis : 1,
      mag_id : '',
      id_error : '',
      
  },
  idChange : function(event) {
    let f = this.idCheck(event.detail);
    if (f == false) {
      this.setData({
        id_error : '请输入正确身份证号'
      })
    }else {
      this.setData({
        id_error : ''
      })
    }
  },
  idCheck : function(param) {
    var reg =/(^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$)|(^[1-9]\d{5}\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}$)/;
    return reg.test(param);
  },
  verify : function(event) {
    let _this = this;
    if(!this.idCheck(_this.data.cardId)) {
      Tost.fail("参数有误！")
      return;
    }
    wx.request({
      url: app.globalData.urlBase + app.globalData.urlMap.user_exists,
      method : 'POST',
      data: {
        'name' : _this.data.name,
        'idCard' : _this.data.cardId
      },
      success : function(res) {
        if(res.data.code == 20004) {
          // 用户不存在
          _this.setData({
            user_dis : 3
          })
        }else {
          _this.setData({
            user_dis : 2,
            mag_id : res.data.data
          })
        }
      },
      fail : function(res) {
        console.log(res);
      }
    })
  },
  apply : function(event) {
    let _this = this;
    wx.navigateTo({
      url: '../fill/fill?name=' + _this.data.name+"&idCard="+_this.data.cardId,
    })  
  },
  noApply : function(event) {
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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