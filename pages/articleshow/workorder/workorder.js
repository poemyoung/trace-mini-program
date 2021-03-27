// pages/articleshow/workorder/workorder.js
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast'
import util from '../../../utils/util'
import ArticleReq from '../../../api/article_req'
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
    rate: 0,
    new_content: '',
    imgList: [],
    show: false,
    isPop: false,
    popImage: '',
    sken: true
  },
  pop: function (event) {
    let img_src = event.currentTarget.dataset.src;
    console.log(img_src)
    this.setData({
      isPop: true,
      popImage: img_src
    })
  },
  popClose: function (event) {
    this.setData({
      isPop: false
    })
  },
  submitWorkOrder: function (imgIDs) {
    let _this = this;
    wx.request({
      url: app.globalData.urlBase + app.globalData.urlMap.new_reply,
      method: 'POST',
      data: {
        aid: _this.data.aid,
        headLine: _this.data.headLine,
        content: _this.data.new_content,
        imagePaths: imgIDs
      },
      success: function (res) {
        if (res.data.code == 1) {
          Toast.success("成功！")
          wx.redirectTo({
            url: '../workorder/workorder?aid=' + _this.data.aid,
          })
        } else {
          Toast.fail("服务器错误！")
        }
      },
      fail: function (res) {
        Toast.fail("服务器错误！")
      }
    })
  },

  upToCloud: function () {
    this.setData({
      show: true
    })
    wx.cloud.init();
    const images = this.data.imgList;
    let _this = this;
    if (!images.length) {
      this.submitWorkOrder([]);
    } else {
      const tasks = images.map((file, index) => {
        return wx.cloud.uploadFile({
          cloudPath: ArticleReq.uuid() + '.png',
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
  afterRead: function (event) {
    const imgs = event.detail.file;
    imgs.map((img, index) => {
      let imgObj = {};
      imgObj.url = img.url;
      imgObj.deletable = true
      imgObj.index = index;
      let fl = this.data.imgList;
      fl.push(imgObj);
      this.setData({
        imgList: fl
      })
    })
  },
  newReply: function (event) {
    this.upToCloud();
  },
  endWO: function (event) {
    let _this = this;
    wx.request({
      url: app.globalData.urlBase + app.globalData.urlMap.end_work_order,
      method: 'POST',
      data: {
        aid: _this.data.aid,
        eva: _this.data.rate
      },
      success: function (event) {
        wx.navigateBack({
          delta: 1,
        })
      },
      fail: function (event) {
        console.log(event)
        Toast.fail("服务器错误！")
      }
    })
  },
  rateChange: function (event) {
    const rate = event.detail;
    this.setData({
      rate: rate
    })
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
                  const arr = res.map((img, index) => {
                    if (img.statusCode == 200) {
                      return img.tempFilePath;
                    }
                  })
                  workorder.images = arr;

                })
                .then((res) => {
                  _this.setData({
                    wos: wo.wos
                  })
                })
                .then((res) => {
                  _this.setData({
                    sken: false
                  })
                })
                .catch((res) => {
                  Toast.fail("图片下载失败")
                })
            }
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