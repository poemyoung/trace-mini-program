// pages/scan/scan.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    suggest : ['建议继续保持！','建议提高定位频率！','建议在家隔离！','建议集中隔离!'],
    status_desc : ['无风险','无风险','中风险','高风险'],
    status : 1,
    color: ['#29a766','#9cc0f8','#fcd989','#f17a6f'],
    face_color:['green','blue','yellow','red']
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(options);
      this.setData({
          status : options.status
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