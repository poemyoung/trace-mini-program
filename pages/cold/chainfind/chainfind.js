// pages/cold/chainfind/chainfind.js
import Toast from '../../../miniprogram_npm/@vant/weapp/toast/toast'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    code :'',
    cargo:{
      source:'四川省达州市渠县',
      id:'123',
      class:'医药',
      remark:'无',
      places:[
        '四川省达州市渠县',
        '四川省达州市宣汉县',
        '四川省成都市双流区'
      ]
    }
  },
  scanQr:function() {
      wx.scanCode({
        onlyFromCamera: true,
        scanType : ['qrCode'],
        success:function(res) {
          console.log(res);
          let qr_res = res.result;
         // 未完成 
        },
        fail:function(res) {
            Toast.fail("扫码失败")
        }
      })
  },
  codeChange:function(event) {
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