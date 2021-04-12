// pages/pop/popidx/popidx.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      contents:[{
        headline:"症状",
        content:"发热干咳无力..."
      },{
        headline:"传播",
        content:"一些感染可通过接触空气中停留数分钟至数小时的小飞沫和颗粒中的病毒进行传播。 这些病毒可能会在距离感染者超过6英尺的地方对他人进行传染，甚至当感染者离开后也会进行传播。"
      }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     let _this = this;
     wx.request({
       url: app.globalData.urlBase + app.globalData.urlMap.pop,
       success:res => {
         console.log(res);
         _this.setData({
           contents:res.data.data
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