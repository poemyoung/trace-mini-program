// pages/articleshow/workorder/workorder.js
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wos: [{
        aid: "2",
        headLine: "",
        content: "这是相关的内容",
        whom: true,
        time: '2021-03-24 17:39',
        images: [
          'http://tmp/BfdWmpyFZiCPb3adceb50d050860aa7bcccb154df6d6.png',
          'http://tmp/kmZ9OPP1jFJsf8eab036b5bf9f7703fadac45bd7db62.png'
        ]
      }, {
        aid: "3",
        headLine: "",
        content: "这是相关的内容，可能会很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长哦",
        whom: false,
        time: '2021-03-24 17:39',
        images: [
          'http://tmp/BfdWmpyFZiCPb3adceb50d050860aa7bcccb154df6d6.png',
          'http://tmp/kmZ9OPP1jFJsf8eab036b5bf9f7703fadac45bd7db62.png',
          'http://tmp/BfdWmpyFZiCPb3adceb50d050860aa7bcccb154df6d6.png',
          'http://tmp/BfdWmpyFZiCPb3adceb50d050860aa7bcccb154df6d6.png',
          'http://tmp/BfdWmpyFZiCPb3adceb50d050860aa7bcccb154df6d6.png',
          'http://tmp/BfdWmpyFZiCPb3adceb50d050860aa7bcccb154df6d6.png'
        ]
      },
      {
        aid: "4",
        headLine: "",
        content: "这是相关的内容，可能会很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长哦",
        whom: false,
        time: '2021-03-24 17:39'
      },
      {
        aid: "5",
        headLine: "",
        content: "这是相关的内容，可能会很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长哦",
        whom: false,
        time: '2021-03-24 17:39'
      },
      {
        aid: "6",
        headLine: "",
        content: "这是相关的内容，可能会很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长哦",
        whom: false,
        time: '2021-03-24 17:39'
      }
    ],
    headLine: '这是一个headLine很长很长很长',
    submit_time: '2021-03-25 17:38',
    status_desc: '未结单',
    last_time: '2021-03-25 17:38',
    aid: '2000000',
    eva: 2.5,
    imgList:[]
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
    const downLoadTask = this.downLoadImages(['cloud://wenrun-book-6666.7765-wenrun-book-6666-1300001131/cfd0c69d-fe90-4321-86c0-3ebddc4e3d31.png', 'cloud://wenrun-book-6666.7765-wenrun-book-6666-1300001131/7f4c50bd-81a3-4750-87f0-f2f147a13c81.png'])
    downLoadTask
    .then(function (res) {
      let imgArray = [];
      console.log(res);
      res.map((aRes,index) => {
        if(aRes.statusCode == 200) {
          imgArray.push(aRes.tempFilePath);
        }else{
        Toast.fail("图片不存在！");
        }
      })
      console.log(imgArray);
    })
    .catch(function(res){
      Toast.fail("图片不存在！");
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