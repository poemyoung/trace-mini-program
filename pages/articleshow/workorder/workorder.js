// pages/articleshow/workorder/workorder.js
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast'
import util from '../../../utils/util'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wos: [],
    headLine: '',
    submit_time: '',
    status_desc: '',
    last_time: '',
    aid: '',
    eva: 0,
  },

  downLoadImages: function (images) {
    const down = images.map((image, index) => {
      return wx.cloud.downloadFile({
        fileID: image
      })
    })
    return Promise.all(down);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    let aid = options.aid;
    wx.cloud.init();
    // 发起请求获取文章详细信息
    wx.request({
      url: app.globalData.urlBase + app.globalData.urlMap.article_detail + "?aid=" + aid,
      success: function (res) {
        if (res.data.code == 1) {
          let wo = res.data.data;
          console.log(wo.wos)
          let last = util.formatTimeNoSec(new Date(wo.lastTime));
          let submitTime = util.formatTimeNoSec(new Date(wo.wos[0].time));
          let headLine = wo.wos[0].headLine;
          let no = wo.wos[0].aid
          if (headLine.length > 16) {
            headLine = headLine.substr(0, 16) + "..."
          }
          _this.setData({
            last_time: last,
            eva: wo.eva,
            status_desc: wo.statusDesc,
            submit_time: submitTime,
            headLine: headLine,
            aid: no
          })
          // 处理每一篇文章
          let baseUrl = app.globalData.urlBase;
          wo.wos.map((workorder, index) => {
            workorder.time = util.formatTimeNoSec(new Date(workorder.time));
            // 处理所有image然后重新设置images
            if (workorder.whom = false) {
              // 管理员
              workorder.images.map((img, index) => {
                workorder.images[index] = baseUrl + img;
              })
            } else {
              // 下载
              _this.downLoadImages(workorder.images)
                .then((res) => {
                  // 建立数组
                  let arr = [];
                  res.map((img) => {
                    if (arr.statusCode == 200) {
                      arr.push(img.tempFilePath);
                    }
                  })
                  workorder.images = arr;
                })
                .catch((res) => {
                  Toast.fail("图片下载失败")
                })
            }
          })
          _this.setData({
            wos: wo.wos
          })
        } else {
          Toast.fail("服务器错误！");
        }
      },
      fail: function (res) {
        Toast.fail("服务器错误！");
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