// pages/scode/scode.js
import Tost from '../../miniprogram_npm/@vant/weapp/toast/toast';
import Dialog from '../../miniprogram_npm/@vant/weapp/dialog/dialog'
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeName: '1',
    code_count: 5,
    panel_array: []
  },
  index : function(event) {
      wx.reLaunch({
        url: '../index/index',
      })
  },
  addNew : function(event) {
      wx.navigateTo({
        url: '../scodemag/add/add'
      })
  },
  reFill : function(event) {
    let idx = event.target.dataset.idx;
    let d = this.data.data_array;
    wx.navigateTo({
      url: '../scodemag/fill/fill?name='+d[idx].userName + " &idCard=" + d[idx].idCard,
    })
  },
  del: function (event) {
    let _this = this;
    let idx = event.target.dataset.idx;
    let qrUserId = this.data.data_array[idx].userId;
    Dialog.confirm({
      title:'删除确认',
      message : '是否确认删除？'
    }).then(() => {
      wx.getStorage({
        key: 'userId',
        success: function (res) {
          wx.request({
            url: app.globalData.urlBase + app.globalData.urlMap.qrcode_del,
            method: 'POST',
            data: {
              "userId": res.data,
              "userMagId": qrUserId
            },
            success: function (res) {
              if (res.data.code == 1) {
                Tost.success("删除成功");
                _this.onLoad();
              }
            }
          })
        }
      })
    })
    .catch(() => {

    })
  },
  panelOnChange: function (event) {
    this.setData({
      activeName: event.detail
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取所管理的用户信息接口
    let _this = this;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        _this.getMag(res.data);
      }
    })
  },
  getMag: function (uid) {
    let _this = this;
    wx.request({
      url: app.globalData.urlBase + app.globalData.urlMap.qrcode_mag + "?userId=" + uid,
      success: function (res) {
        if (res.data.code == 1) {
          _this.setData({
            data_array: res.data.data
          })
          // 数据处理
          let array = new Array();
          for (let i = 0; i < res.data.data.length; i++) {
            let arr = res.data.data[i];
            let tmpArr = {};
            let idCard = arr.idCard;
            let name = arr.userName;
            idCard = idCard.replace(idCard.substr(2, 14), "***********")
            if (name.length > 2) {
              name = name.replace(name.substr(1, name.length - 2), "*")
            } else {
              name = name.replace(name.substr(1, 2), "*")
            }
            tmpArr.userName = name;
            tmpArr.idCard = idCard;
            let tmp = app.globalData.urlBase + arr.qrCode;
            tmpArr.qrCode = tmp;
            array.push(tmpArr);
          }
          _this.setData({
            panel_array: array
          })
        } else {
          Tost.fail("服务器错误！")
        }
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