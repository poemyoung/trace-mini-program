// pages/worksys/submit/submit.js
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    headline: '',
    imgList: [],
    content: '',
    show: false
  },
  cancel: function (event) {
    wx.navigateBack({
      delta: 1,
    })
  },
  submit: function () {
    this.setData({
      show: true
    })
    this.upToCloud();
  },
  submitWorkOrder: function (imgIDs) {
    let _this = this;
    wx.getStorage({
      key: 'userId',
      success: function (res) {
        wx.request({
          url: app.globalData.urlBase + app.globalData.urlMap.article_submit,
          method: 'POST',
          data: {
            "userId": res.data,
            "headLine": _this.data.headline,
            "content": _this.data.content,
            "imagePaths": imgIDs
          },
          success: function (d) {
            Toast.success("提交成功！")
            wx.navigateBack({
              delta: 1,
            })
          },
          fail: function (d) {
            Toast.fail("网络未连接！")
          },
          complete: function (d) {
            _this.setData({
              show: false
            })
          }
        })
      }
    })

  },
  upToCloud: function () {
    wx.cloud.init();
    const images = this.data.imgList;
    let _this = this;
    if (!images.length) {
      this.submitWorkOrder([]);
    } else {
      const tasks = images.map((file, index) => {
        return wx.cloud.uploadFile({
          cloudPath: _this.uuid() + '.png',
          filePath: file.url
        })
      });

      Promise.all(tasks)
        .then((res) => {
          var tmp = [];
          res.map((sRes, index) => {
            console.log(sRes)
            if (sRes.statusCode == 204) {
              let fid = sRes.fileID;
              tmp.push(fid);
            } else {
              Toast.fail("图片上传失败！")
            }
          })
          _this.submitWorkOrder(tmp);
        })
        .catch((res) => {
          Toast.fail("图片上传失败！")
        })
    }
  },
  uuid: function () {
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
  },
  deleteImg: function (event) {
    const imgDel = event.detail;
    let index = imgDel.index;
    let arrTmp = this.data.imgList;
    arrTmp.splice(
      index, 1
    )
    this.setData({
      imgList: arrTmp
    })

  },
  afterRead: function (event) {
    const img = event.detail;
    let imgObj = {};
    imgObj.url = img.file.url;
    imgObj.deletable = true
    imgObj.index = img.index;
    let fl = this.data.imgList;
    fl.push(imgObj);
    this.setData({
      imgList: fl
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