// pages/cold/chainup/chainup.js
const app = getApp()
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast'
Page({

  /**
   * 页面的初始数据
   */
  data: {
      classify:'',
      company:'',
      remark:'',
      classall:['医药','餐饮连锁','快消品','乳制品','米面','禽肉','水产','果蔬农产品','其它'],
      show:false,
      classChoose:'',
      qr:false,
      qrPath:'',
  },
  generate:function() {
    let _this = this;
      wx.request({
        url: app.globalData.urlBase + app.globalData.urlMap.chain_up,
        header : {
          'content-type': 'application/json'
        },
        method:'POST',
        data:{
          remark:_this.data.remark,
          classify:_this.data.classChoose,
          company:_this.data.company
        },
        success:function(res) {
          console.log(res);
          if(res.data.code == 1) {
            let p = app.globalData.urlBase + res.data.data;
            console.log(p);
              _this.setData({
                qr:true,
                qrPath:p
              })
          }else{
            Toast.fail("参数有误！")
          }
        },
        fail:function(res) {
            Toast.fail("服务器错误")
        }
      })
  },
  cancelClass:function(event) {
      this.setData({
        show:false
      })
  },
  confirmClass:function(event) {
    let cos = event.detail.value;
    this.setData({
      show:false,
      classChoose:cos
    })
  },
  showPopup:function() {
    this.setData({
      show:true
    })
  },
  onClose:function() {
    this.setData({
      show:false
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