// pages/cold/chainfind/chainfind.js
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code: '',
    cargo: {},
    show: false
  },
  chargoLocate: function (event) {
    // 货物定位报备
  },
  findByCode: function (event) {
    // 发起编码查找
    let _this = this;
    let code = this.data.code;
    wx.request({
      url: app.globalData.urlBase + app.globalData.urlMap.chain_no + "?code=" + code,
      success: function (resl) {
        console.log(resl)
        if (resl.data.code == 1) {
          _this.setData({
            cargo: resl.data.data,
            show: true
          })
        } else {
          Toast.fail(resl.data.msg)
        }
      },
      fail: function (resl) {
        Toast.fail("服务器错误")
      }
    })
  },
  scanQr: function () {
    let _this = this;
    wx.scanCode({
      onlyFromCamera: true,
      scanType: ['qrCode'],
      success: function (res) {
        let qr_res = res.result;
        let encodeString = encodeURIComponent(qr_res);
        // 发送接口并解析 
        wx.request({
          url: app.globalData.urlBase + app.globalData.urlMap.chain_info + "?chargo=" + encodeString,
          success: function (resl) {
            if (resl.data.code == 1) {
              _this.setData({
                cargo: resl.data.data,
                show: true
              })
            } else {
              Toast.fail(resl.data.data.msg)
            }
          },
          fail: function (resl) {
            Toast.fail("服务器错误")
          }
        })
      },
      fail: function (res) {
        Toast.fail("扫码失败")
      }
    })
  },
  codeChange: function (event) {
    console.log(this.data.code);
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