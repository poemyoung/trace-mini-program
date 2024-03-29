// pages/exiuserinfo/exiuserinfo.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      places:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
     wx.getStorage({
       key: 'userId',
       success:function(res) {
         let uid = encodeURIComponent(res.data);
        wx.request({
          url: app.globalData.urlBase + app.globalData.urlMap.exi_user_addr + "?userid="+uid,
          success:function(res) {
            if(res.data.code == 1) {
                _this.setData({
                  places:res.data.data
                })
            }
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