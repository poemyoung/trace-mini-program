// pages/scode/scode.js
import Tost from '../../miniprogram_npm/@vant/weapp/toast/toast';

Page({

  /**
   * 页面的初始数据
   */
  data: {
      activeName : '1',
      code_count : 5,
      panel_array : [
        {
            'userName' : '徐**',
            'idCard' : '51*************16',
            'qrCode' : "https://www.poemyoung.xyz/1505084195_2021310131336.jpg"
        },{
          'userName' : '徐*',
            'idCard' : '51*************16',
            'qrCode' : "https://www.poemyoung.xyz/1505084195_2021310131336.jpg"
        },{
          'userName' : '徐*',
            'idCard' : '51*************16',
            'qrCode' : "https://www.poemyoung.xyz/1505084195_2021310131336.jpg"
        }
      ]
  },
  panelOnChange : function(event) {
    this.setData({
      activeName : event.detail
    })
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