// pages/worksys/submit/submit.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      headline:'',
      imgList:[
      ],
      content:''
  },
  submit: function() {
      this.upToCloud();
  },
  upToCloud:function() {
    wx.cloud.init();
    const images = this.data.imgList;
    if(!images.length) {
      return ;
    }else {
        images.map((file,index) => {
          wx.cloud.uploadFile({
            cloudPath: 'test1.png',
            filePath: file.url,
            success: res => {
              console.log(res);
            },
            fail: res => {
              console.log(res);
            }
          })
        })
    }
  },
  deleteImg:function(event) {
    const imgDel = event.detail;
    let index = imgDel.index;
    let arrTmp = this.data.imgList;
    arrTmp.splice(
      index,1
    )
    this.setData({
      imgList: arrTmp
    })
    
  },
  afterRead:function(event) {
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