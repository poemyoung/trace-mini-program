// pages/symptom/symtomcos.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    symptom_detail : []
  },
  symSubmit : function(event) {
      var _this = this;
      wx.setStorage({
        key: "symptom_detail",
        data: _this.data.symptom_detail,
      })
      wx.navigateBack({
        delta: 1,
      })
  },
  onChange : function(event) {
      this.setData({
        symptom_detail : event.detail
      });
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