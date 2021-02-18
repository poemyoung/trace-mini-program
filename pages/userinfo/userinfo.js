// pages/userinfo/userinfo.js
// 引入SDK核心类，js文件根据自己业务，位置可自行放置
var QQMapWX = require('../../libs/qqmap-wx-jssdk.js');
var qqmapsdk;
Page({
  /**
   * 页面的初始数据
   */
  data: {
      name : '',
      cardId : '',
      phone : '',
      address : '',
      detail_addr : '',
      healthFlag : 0,
      status_now : 0,
      symptom : '',
      body_heat : 36,
      show : false,
      provinces : [],
      citys : [],
      counties : []
  },
  showPopup : function() {
    this.setData({
      show : true
    })
  },
  onClose() {
    this.setData({ show: false });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    qqmapsdk = new QQMapWX({
      key: 'RCEBZ-A3PK2-LGHU2-CWQKI-DVM23-NYBQ6'
  });
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
      // 调用接口
      var _this = this;
    //调用获取城市列表接口
    qqmapsdk.getCityList({
      success: function(res) {//成功后的回调
        _this.setData({
          provinces : res.result[0],
          cities : res.result[1],
          counties : res.result[2]
        })
      },
      fail: function(error) {
        console.error(error);
      }
    });

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

  },
  onChange: function(event) {
    
  }
})