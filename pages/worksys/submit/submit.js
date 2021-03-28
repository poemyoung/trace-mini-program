// pages/worksys/submit/submit.js
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast'
import ArticleReq from '../../../api/article_req'
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
    if(this.data.headline.length < 4){
      Toast.fail("标题长度至少4位");
      return;
    }
    this.setData({
      show: true
    })
    this.upToCloud();
  },
  submitWorkOrder: function (imgIDs) {
    // 参数校验
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
            setTimeout(() => {
              wx.navigateBack({
                delta: 2,
              })
            },1000)
           
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
    const imgs = event.detail.file;
    imgs.map((img,index) => {
      console.log(img)
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